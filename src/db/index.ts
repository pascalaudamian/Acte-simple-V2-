import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AuditLog, OfficialSource } from '../types/index.ts';
import { INITIAL_AUDIT_LOGS, OFFICIAL_SOURCES } from '../data/sources.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');

export interface CitizenFeedback {
  id: string;
  procedureId?: string;
  type: string;
  message: string;
  ipHash?: string;
  createdAt: string;
}

const { Pool } = pg;

let pool: pg.Pool | null = null;
let isPostgresConnected = false;

// Initialize Postgres Pool if DATABASE_URL or PGHOST is defined
const dbUrl = process.env.DATABASE_URL;
if (dbUrl) {
  try {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  } catch (err) {
    console.error('Failed to instantiate PostgreSQL pool. Operating in resilient storage mode.');
  }
}

// Fallback file storage paths
const AUDIT_FILE = path.join(DATA_DIR, 'audit_logs.json');
const SOURCES_FILE = path.join(DATA_DIR, 'sources.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, defaultData: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${path.basename(filePath)}:`, err);
  }
  return defaultData;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${path.basename(filePath)}:`, err);
  }
}

/**
 * Initializes database schemas: applies Postgres migrations if connected,
 * otherwise sets up resilient local data store.
 */
export async function initDb(): Promise<{ mode: 'postgres' | 'file'; connected: boolean }> {
  ensureDataDir();

  if (pool) {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS official_sources (
            id VARCHAR(64) PRIMARY KEY,
            institution_name VARCHAR(255) NOT NULL,
            authority_type VARCHAR(255) NOT NULL,
            source_url TEXT NOT NULL,
            related_procedure_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
            last_checked_timestamp TIMESTAMPTZ NOT NULL,
            last_successful_check TIMESTAMPTZ NOT NULL,
            status VARCHAR(32) NOT NULL DEFAULT 'verified',
            last_change_summary TEXT,
            notes TEXT,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE TABLE IF NOT EXISTS audit_logs (
            id VARCHAR(64) PRIMARY KEY,
            timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            actor VARCHAR(120) NOT NULL,
            action VARCHAR(64) NOT NULL,
            procedure_id VARCHAR(64),
            procedure_title VARCHAR(255),
            details TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
          CREATE INDEX IF NOT EXISTS idx_audit_logs_procedure_id ON audit_logs(procedure_id);

          CREATE TABLE IF NOT EXISTS citizen_feedback (
            id VARCHAR(64) PRIMARY KEY,
            procedure_id VARCHAR(64),
            feedback_type VARCHAR(64) NOT NULL DEFAULT 'general',
            message TEXT NOT NULL,
            ip_hash VARCHAR(64),
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE INDEX IF NOT EXISTS idx_citizen_feedback_created ON citizen_feedback(created_at DESC);
          CREATE INDEX IF NOT EXISTS idx_citizen_feedback_procedure ON citizen_feedback(procedure_id);
        `);

        // Check if baseline sources exist
        const countRes = await client.query('SELECT COUNT(*) FROM official_sources');
        if (parseInt(countRes.rows[0].count, 10) === 0) {
          for (const s of OFFICIAL_SOURCES) {
            await client.query(
              `INSERT INTO official_sources (id, institution_name, authority_type, source_url, related_procedure_ids, last_checked_timestamp, last_successful_check, status, notes)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
               ON CONFLICT (id) DO NOTHING`,
              [s.id, s.institutionName, s.authorityType, s.sourceUrl, JSON.stringify(s.relatedProcedureIds), s.lastCheckedTimestamp, s.lastSuccessfulCheck, s.status, s.notes]
            );
          }
        }

        // Check baseline audit logs
        const logCount = await client.query('SELECT COUNT(*) FROM audit_logs');
        if (parseInt(logCount.rows[0].count, 10) === 0) {
          for (const l of INITIAL_AUDIT_LOGS) {
            await client.query(
              `INSERT INTO audit_logs (id, timestamp, actor, action, procedure_id, procedure_title, details)
               VALUES ($1, $2, $3, $4, $5, $6, $7)
               ON CONFLICT (id) DO NOTHING`,
              [l.id, l.timestamp, l.actor, l.action, l.procedureId, l.procedureTitle, l.details]
            );
          }
        }

        isPostgresConnected = true;
        console.log('PostgreSQL database initialized and connected successfully.');
        return { mode: 'postgres', connected: true };
      } finally {
        client.release();
      }
    } catch (err) {
      console.warn('PostgreSQL connection attempt failed. Falling back to durable file storage mode.');
      isPostgresConnected = false;
    }
  }

  // File fallback seed initialization
  if (!fs.existsSync(SOURCES_FILE)) {
    writeJsonFile(SOURCES_FILE, OFFICIAL_SOURCES);
  }
  if (!fs.existsSync(AUDIT_FILE)) {
    writeJsonFile(AUDIT_FILE, INITIAL_AUDIT_LOGS);
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    writeJsonFile(FEEDBACK_FILE, []);
  }

  return { mode: 'file', connected: false };
}

/**
 * Audit Log persistence
 */
export async function getAuditLogs(limit = 50): Promise<AuditLog[]> {
  if (isPostgresConnected && pool) {
    try {
      const res = await pool.query(
        'SELECT id, timestamp, actor, action, procedure_id AS "procedureId", procedure_title AS "procedureTitle", details FROM audit_logs ORDER BY timestamp DESC LIMIT $1',
        [limit]
      );
      return res.rows.map((row) => ({
        ...row,
        timestamp: new Date(row.timestamp).toISOString()
      }));
    } catch (err) {
      console.error('Postgres getAuditLogs failed, reading from resilient storage');
    }
  }
  const logs = readJsonFile<AuditLog[]>(AUDIT_FILE, INITIAL_AUDIT_LOGS);
  return logs.slice(0, limit);
}

export async function saveAuditLog(log: AuditLog): Promise<void> {
  if (isPostgresConnected && pool) {
    try {
      await pool.query(
        'INSERT INTO audit_logs (id, timestamp, actor, action, procedure_id, procedure_title, details) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [log.id, log.timestamp, log.actor, log.action, log.procedureId || null, log.procedureTitle || null, log.details]
      );
      return;
    } catch (err) {
      console.error('Postgres saveAuditLog failed, saving to resilient storage');
    }
  }
  const logs = readJsonFile<AuditLog[]>(AUDIT_FILE, INITIAL_AUDIT_LOGS);
  logs.unshift(log);
  writeJsonFile(AUDIT_FILE, logs);
}

/**
 * Official Sources persistence
 */
export async function getSources(): Promise<OfficialSource[]> {
  if (isPostgresConnected && pool) {
    try {
      const res = await pool.query(
        'SELECT id, institution_name AS "institutionName", authority_type AS "authorityType", source_url AS "sourceUrl", related_procedure_ids AS "relatedProcedureIds", last_checked_timestamp AS "lastCheckedTimestamp", last_successful_check AS "lastSuccessfulCheck", status, notes FROM official_sources ORDER BY id'
      );
      return res.rows.map((row) => ({
        ...row,
        lastCheckedTimestamp: new Date(row.lastCheckedTimestamp).toISOString(),
        lastSuccessfulCheck: new Date(row.lastSuccessfulCheck).toISOString(),
        changeHistory: []
      }));
    } catch (err) {
      console.error('Postgres getSources failed, reading from resilient storage');
    }
  }
  return readJsonFile<OfficialSource[]>(SOURCES_FILE, OFFICIAL_SOURCES);
}

export async function updateSourceCheck(sourceId: string, timestamp: string, status: 'verified' | 'change_detected' | 'review_required'): Promise<OfficialSource | null> {
  if (isPostgresConnected && pool) {
    try {
      const res = await pool.query(
        `UPDATE official_sources
         SET last_checked_timestamp = $1, last_successful_check = $1, status = $2, updated_at = NOW()
         WHERE id = $3
         RETURNING id, institution_name AS "institutionName", authority_type AS "authorityType", source_url AS "sourceUrl", related_procedure_ids AS "relatedProcedureIds", last_checked_timestamp AS "lastCheckedTimestamp", last_successful_check AS "lastSuccessfulCheck", status, notes`,
        [timestamp, status, sourceId]
      );
      if (res.rows.length > 0) {
        return {
          ...res.rows[0],
          lastCheckedTimestamp: new Date(res.rows[0].lastCheckedTimestamp).toISOString(),
          lastSuccessfulCheck: new Date(res.rows[0].lastSuccessfulCheck).toISOString(),
          changeHistory: []
        };
      }
      return null;
    } catch (err) {
      console.error('Postgres updateSourceCheck failed, updating in resilient storage');
    }
  }

  const sources = readJsonFile<OfficialSource[]>(SOURCES_FILE, OFFICIAL_SOURCES);
  const idx = sources.findIndex((s) => s.id === sourceId);
  if (idx === -1) return null;
  sources[idx] = {
    ...sources[idx],
    lastCheckedTimestamp: timestamp,
    lastSuccessfulCheck: timestamp,
    status
  };
  writeJsonFile(SOURCES_FILE, sources);
  return sources[idx];
}

/**
 * Citizen Feedback persistence
 */
export async function saveFeedback(feedback: CitizenFeedback): Promise<void> {
  if (isPostgresConnected && pool) {
    try {
      await pool.query(
        'INSERT INTO citizen_feedback (id, procedure_id, feedback_type, message, ip_hash, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [feedback.id, feedback.procedureId || null, feedback.type, feedback.message, feedback.ipHash || null, feedback.createdAt]
      );
      return;
    } catch (err) {
      console.error('Postgres saveFeedback failed, saving to resilient storage');
    }
  }

  const list = readJsonFile<CitizenFeedback[]>(FEEDBACK_FILE, []);
  list.unshift(feedback);
  writeJsonFile(FEEDBACK_FILE, list);
}

export async function getFeedback(limit = 100): Promise<CitizenFeedback[]> {
  if (isPostgresConnected && pool) {
    try {
      const res = await pool.query(
        'SELECT id, procedure_id AS "procedureId", feedback_type AS "type", message, ip_hash AS "ipHash", created_at AS "createdAt" FROM citizen_feedback ORDER BY created_at DESC LIMIT $1',
        [limit]
      );
      return res.rows.map((row) => ({
        ...row,
        createdAt: new Date(row.createdAt).toISOString()
      }));
    } catch (err) {
      console.error('Postgres getFeedback failed, reading from resilient storage');
    }
  }
  return readJsonFile<CitizenFeedback[]>(FEEDBACK_FILE, []).slice(0, limit);
}
