import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AuditLog, OfficialSource, AdministrativeOffice } from '../types/index.ts';
import { INITIAL_AUDIT_LOGS, OFFICIAL_SOURCES } from '../data/sources.ts';
import { ADMINISTRATIVE_OFFICES } from '../data/offices.ts';

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
const OFFICES_FILE = path.join(DATA_DIR, 'offices.json');

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

          CREATE TABLE IF NOT EXISTS administrative_offices (
            id VARCHAR(64) PRIMARY KEY,
            name JSONB NOT NULL,
            institution_type VARCHAR(64) NOT NULL,
            county VARCHAR(16) NOT NULL,
            city VARCHAR(120) NOT NULL,
            address TEXT NOT NULL,
            coordinates JSONB NOT NULL,
            phone VARCHAR(64),
            email VARCHAR(120),
            website_url TEXT,
            booking_url TEXT,
            provided_service_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
            related_procedure_ids JSONB NOT NULL DEFAULT '[]'::jsonb,
            opening_hours JSONB NOT NULL,
            accessibility JSONB NOT NULL DEFAULT '{}'::jsonb,
            appointment_requirement VARCHAR(32) NOT NULL DEFAULT 'recommended',
            appointment_notes JSONB,
            source_url TEXT NOT NULL,
            last_verified_timestamp TIMESTAMPTZ NOT NULL,
            verification_status VARCHAR(32) NOT NULL DEFAULT 'verified',
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
          );

          CREATE INDEX IF NOT EXISTS idx_offices_county ON administrative_offices(county);
          CREATE INDEX IF NOT EXISTS idx_offices_city ON administrative_offices(city);
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

        // Check baseline offices
        const officeCount = await client.query('SELECT COUNT(*) FROM administrative_offices');
        if (parseInt(officeCount.rows[0].count, 10) === 0) {
          for (const o of ADMINISTRATIVE_OFFICES) {
            await client.query(
              `INSERT INTO administrative_offices (id, name, institution_type, county, city, address, coordinates, phone, email, website_url, booking_url, provided_service_ids, related_procedure_ids, opening_hours, accessibility, appointment_requirement, appointment_notes, source_url, last_verified_timestamp, verification_status)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
               ON CONFLICT (id) DO NOTHING`,
              [
                o.id,
                JSON.stringify(o.name),
                o.institutionType,
                o.county,
                o.city,
                o.address,
                JSON.stringify(o.coordinates),
                o.phone || null,
                o.email || null,
                o.websiteUrl || null,
                o.bookingUrl || null,
                JSON.stringify(o.providedServiceIds),
                JSON.stringify(o.relatedProcedureIds),
                JSON.stringify(o.openingHours),
                JSON.stringify(o.accessibility),
                o.appointmentRequirement,
                o.appointmentNotes ? JSON.stringify(o.appointmentNotes) : null,
                o.sourceUrl,
                o.lastVerifiedTimestamp,
                o.verificationStatus
              ]
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

  // File fallback seed initialization & catalog synchronization
  if (!fs.existsSync(SOURCES_FILE)) {
    writeJsonFile(SOURCES_FILE, OFFICIAL_SOURCES);
  }
  if (!fs.existsSync(AUDIT_FILE)) {
    writeJsonFile(AUDIT_FILE, INITIAL_AUDIT_LOGS);
  }
  if (!fs.existsSync(FEEDBACK_FILE)) {
    writeJsonFile(FEEDBACK_FILE, []);
  }

  const existingOffices = fs.existsSync(OFFICES_FILE)
    ? readJsonFile<AdministrativeOffice[]>(OFFICES_FILE, ADMINISTRATIVE_OFFICES)
    : [];
  const officeIdSet = new Set(existingOffices.map((o) => o.id));
  let officesUpdated = false;
  for (const off of ADMINISTRATIVE_OFFICES) {
    if (!officeIdSet.has(off.id)) {
      existingOffices.push(off);
      officeIdSet.add(off.id);
      officesUpdated = true;
    }
  }
  if (officesUpdated || !fs.existsSync(OFFICES_FILE)) {
    writeJsonFile(OFFICES_FILE, existingOffices);
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

/**
 * Administrative Offices persistence & search
 */
export async function getOffices(filter?: {
  county?: string;
  service?: string;
  city?: string;
  search?: string;
}): Promise<AdministrativeOffice[]> {
  if (isPostgresConnected && pool) {
    try {
      let query = `
        SELECT id, name, institution_type AS "institutionType", county, city, address, coordinates,
               phone, email, website_url AS "websiteUrl", booking_url AS "bookingUrl",
               provided_service_ids AS "providedServiceIds", related_procedure_ids AS "relatedProcedureIds",
               opening_hours AS "openingHours", accessibility, appointment_requirement AS "appointmentRequirement",
               appointment_notes AS "appointmentNotes", source_url AS "sourceUrl",
               last_verified_timestamp AS "lastVerifiedTimestamp", verification_status AS "verificationStatus"
        FROM administrative_offices
        WHERE 1=1
      `;
      const params: any[] = [];
      let paramIdx = 1;

      if (filter?.county && filter.county !== 'all') {
        query += ` AND county = $${paramIdx++}`;
        params.push(filter.county);
      }

      if (filter?.city && filter.city !== 'all') {
        query += ` AND city = $${paramIdx++}`;
        params.push(filter.city);
      }

      if (filter?.service && filter.service !== 'all') {
        query += ` AND provided_service_ids ? $${paramIdx++}`;
        params.push(filter.service);
      }

      query += ` ORDER BY county, city, id`;

      const res = await pool.query(query, params);
      return res.rows.map((row) => ({
        ...row,
        lastVerifiedTimestamp: new Date(row.lastVerifiedTimestamp).toISOString()
      }));
    } catch (err) {
      console.error('Postgres getOffices failed, falling back to file storage');
    }
  }

  let list = readJsonFile<AdministrativeOffice[]>(OFFICES_FILE, ADMINISTRATIVE_OFFICES);
  if (list.length < ADMINISTRATIVE_OFFICES.length) {
    const existingIdSet = new Set(list.map((o) => o.id));
    for (const off of ADMINISTRATIVE_OFFICES) {
      if (!existingIdSet.has(off.id)) {
        list.push(off);
        existingIdSet.add(off.id);
      }
    }
    writeJsonFile(OFFICES_FILE, list);
  }

  if (filter?.county && filter.county !== 'all') {
    list = list.filter((o) => o.county.toUpperCase() === filter.county?.toUpperCase());
  }

  if (filter?.city && filter.city !== 'all') {
    list = list.filter((o) => o.city.toLowerCase().includes(filter.city?.toLowerCase() || ''));
  }

  if (filter?.service && filter.service !== 'all') {
    list = list.filter((o) => o.providedServiceIds.includes(filter.service!));
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    list = list.filter(
      (o) =>
        o.name.ro.toLowerCase().includes(q) ||
        o.name.en.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q) ||
        o.address.toLowerCase().includes(q)
    );
  }

  return list;
}

export async function getOfficeById(id: string): Promise<AdministrativeOffice | null> {
  if (isPostgresConnected && pool) {
    try {
      const res = await pool.query(
        `SELECT id, name, institution_type AS "institutionType", county, city, address, coordinates,
                phone, email, website_url AS "websiteUrl", booking_url AS "bookingUrl",
                provided_service_ids AS "providedServiceIds", related_procedure_ids AS "relatedProcedureIds",
                opening_hours AS "openingHours", accessibility, appointment_requirement AS "appointmentRequirement",
                appointment_notes AS "appointmentNotes", source_url AS "sourceUrl",
                last_verified_timestamp AS "lastVerifiedTimestamp", verification_status AS "verificationStatus"
         FROM administrative_offices
         WHERE id = $1`,
        [id]
      );
      if (res.rows.length > 0) {
        return {
          ...res.rows[0],
          lastVerifiedTimestamp: new Date(res.rows[0].lastVerifiedTimestamp).toISOString()
        };
      }
      return null;
    } catch (err) {
      console.error('Postgres getOfficeById failed, reading from file storage');
    }
  }

  const list = readJsonFile<AdministrativeOffice[]>(OFFICES_FILE, ADMINISTRATIVE_OFFICES);
  return list.find((o) => o.id === id) || null;
}

export async function saveOffice(office: AdministrativeOffice): Promise<void> {
  if (isPostgresConnected && pool) {
    try {
      await pool.query(
        `INSERT INTO administrative_offices (
           id, name, institution_type, county, city, address, coordinates,
           phone, email, website_url, booking_url, provided_service_ids,
           related_procedure_ids, opening_hours, accessibility, appointment_requirement,
           appointment_notes, source_url, last_verified_timestamp, verification_status
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           institution_type = EXCLUDED.institution_type,
           county = EXCLUDED.county,
           city = EXCLUDED.city,
           address = EXCLUDED.address,
           coordinates = EXCLUDED.coordinates,
           phone = EXCLUDED.phone,
           email = EXCLUDED.email,
           website_url = EXCLUDED.website_url,
           booking_url = EXCLUDED.booking_url,
           provided_service_ids = EXCLUDED.provided_service_ids,
           related_procedure_ids = EXCLUDED.related_procedure_ids,
           opening_hours = EXCLUDED.opening_hours,
           accessibility = EXCLUDED.accessibility,
           appointment_requirement = EXCLUDED.appointment_requirement,
           appointment_notes = EXCLUDED.appointment_notes,
           source_url = EXCLUDED.source_url,
           last_verified_timestamp = EXCLUDED.last_verified_timestamp,
           verification_status = EXCLUDED.verification_status,
           updated_at = NOW()`,
        [
          office.id,
          JSON.stringify(office.name),
          office.institutionType,
          office.county,
          office.city,
          office.address,
          JSON.stringify(office.coordinates),
          office.phone || null,
          office.email || null,
          office.websiteUrl || null,
          office.bookingUrl || null,
          JSON.stringify(office.providedServiceIds),
          JSON.stringify(office.relatedProcedureIds),
          JSON.stringify(office.openingHours),
          JSON.stringify(office.accessibility),
          office.appointmentRequirement,
          office.appointmentNotes ? JSON.stringify(office.appointmentNotes) : null,
          office.sourceUrl,
          office.lastVerifiedTimestamp,
          office.verificationStatus
        ]
      );
      return;
    } catch (err) {
      console.error('Postgres saveOffice failed, saving to file storage');
    }
  }

  const list = readJsonFile<AdministrativeOffice[]>(OFFICES_FILE, ADMINISTRATIVE_OFFICES);
  const idx = list.findIndex((o) => o.id === office.id);
  if (idx !== -1) {
    list[idx] = office;
  } else {
    list.push(office);
  }
  writeJsonFile(OFFICES_FILE, list);
}

export async function updateOffice(
  id: string,
  updates: Partial<AdministrativeOffice>
): Promise<AdministrativeOffice | null> {
  const existing = await getOfficeById(id);
  if (!existing) return null;
  const merged: AdministrativeOffice = {
    ...existing,
    ...updates,
    id,
    lastVerifiedTimestamp: new Date().toISOString()
  };
  await saveOffice(merged);
  return merged;
}

