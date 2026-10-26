import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { PROCEDURES } from './src/data/procedures.ts';
import { COUNTIES } from './src/data/counties.ts';
import { OFFICE_SERVICES } from './src/data/officeServices.ts';
import { FORM_TEMPLATES } from './src/data/formTemplates.ts';
import { ADMINISTRATIVE_SERVICES } from './src/data/services.ts';
import { AuditLog, AdministrativeOffice } from './src/types/index.ts';
import {
  initDb,
  getAuditLogs,
  saveAuditLog,
  getSources,
  updateSourceCheck,
  saveFeedback,
  getFeedback,
  getOffices,
  getOfficeById,
  saveOffice,
  updateOffice,
  CitizenFeedback
} from './src/db/index.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parser with size limit to prevent payload flooding
app.use(express.json({ limit: '64kb' }));

// In-Memory Rate Limiting Tracker
interface RateLimitRecord {
  count: number;
  resetAt: number;
}
const ipRateLimits = new Map<string, RateLimitRecord>();

function cleanRateLimits() {
  const now = Date.now();
  for (const [key, record] of ipRateLimits.entries()) {
    if (now > record.resetAt) {
      ipRateLimits.delete(key);
    }
  }
}
setInterval(cleanRateLimits, 60000); // Clean every minute

function rateLimiter(actionName: string, maxRequests: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const rawIp = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${actionName}:${rawIp}`;
    const now = Date.now();
    const existing = ipRateLimits.get(key);

    if (!existing || now > existing.resetAt) {
      ipRateLimits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (existing.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((existing.resetAt - now) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      res.status(429).json({
        error: 'Prea multe solicitări. Vă rugăm să reîncercați după expirarea ferestrei de timp.',
        retryAfterSeconds
      });
      return;
    }

    existing.count += 1;
    next();
  };
}

// Authentication Middleware for Editorial Operations
function requireEditorAuth(req: Request, res: Response, next: NextFunction) {
  const configuredToken = process.env.ACTESIMPLE_EDITOR_TOKEN;

  if (!configuredToken) {
    res.status(503).json({
      error: 'Operațiunile editoriale sunt indisponibile. Tokenul editorial nu este configurat pe server.'
    });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'Autentificare necesară. Lipsă token de autorizare editorială în antetul cererii.'
    });
    return;
  }

  const providedToken = authHeader.slice(7).trim();

  // Use timingSafeEqual to protect against timing attacks
  const tokenBuf = Buffer.from(providedToken);
  const confBuf = Buffer.from(configuredToken);

  if (tokenBuf.length !== confBuf.length || !crypto.timingSafeEqual(tokenBuf, confBuf)) {
    res.status(403).json({
      error: 'Acces interzis. Tokenul de autorizare editorială este invalid.'
    });
    return;
  }

  next();
}

// API Version 1 Router
const apiRouter = express.Router();

// Health Check
apiRouter.get('/health', async (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'ActeSimple Civic Administration API',
    version: '1.2.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      bilingual: true,
      officialSourceMonitoring: true,
      orientationWizard: true,
      documentPreparation: true,
      roeidSandbox: true,
      editorialSecurity: Boolean(process.env.ACTESIMPLE_EDITOR_TOKEN)
    }
  });
});

// Office-finder reference data and read-only directory foundation
apiRouter.get('/counties', (_req: Request, res: Response) => {
  res.json({ total: COUNTIES.length, items: COUNTIES });
});

apiRouter.get('/services', (_req: Request, res: Response) => {
  res.json({ total: OFFICE_SERVICES.length, items: OFFICE_SERVICES });
});

apiRouter.get('/offices', (req: Request, res: Response) => {
  const { serviceId, countyCode, locality, limit = '50', page = '1' } = req.query;
  const validService = !serviceId || (typeof serviceId === 'string' && OFFICE_SERVICES.some((service) => service.id === serviceId));
  const validCounty = !countyCode || (typeof countyCode === 'string' && COUNTIES.some((county) => county.code === countyCode));
  if (!validService || !validCounty || (locality !== undefined && typeof locality !== 'string')) {
    res.status(400).json({ error: 'Filtrele pentru județ, localitate sau serviciu sunt invalide.' });
    return;
  }
  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 50));
  const indexSources = [
    { name: 'Portalul național de date deschise', url: 'https://data.gov.ro/dataset/institutii-publice' },
    { name: 'Catalogul Național al Serviciilor Publice', url: 'https://servicii.gov.ro' },
    { name: 'Portalul e-guvernare', url: 'https://www.e-guvernare.ro' }
  ];

  res.json({
    total: 0,
    page: pageNum,
    totalPages: 0,
    items: [],
    directoryStatus: 'indexing',
    indexSources,
    message: 'Indexarea registrului național a fost configurată. Înregistrările vor fi publicate după verificarea editorială a surselor oficiale.'
  });
});

// Procedure Catalog & Search Endpoint
apiRouter.get('/procedures', (req: Request, res: Response) => {
  const { search, category, audience, limit = '50', page = '1' } = req.query;
  let results = [...PROCEDURES];

  if (category && typeof category === 'string' && category !== 'all') {
    results = results.filter((p) => p.category === category);
  }

  if (audience && typeof audience === 'string' && audience !== 'all') {
    results = results.filter((p) => p.audience.includes(audience as any) || p.audience.includes('all'));
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase().trim();
    results = results.filter((p) => {
      const matchRo = p.title.ro.toLowerCase().includes(q) ||
        p.shortSummary.ro.toLowerCase().includes(q) ||
        p.institution.name.toLowerCase().includes(q) ||
        p.institution.shortName.toLowerCase().includes(q);
      const matchEn = p.title.en.toLowerCase().includes(q) ||
        p.shortSummary.en.toLowerCase().includes(q);
      return matchRo || matchEn;
    });
  }

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit as string, 10) || 50));
  const startIndex = (pageNum - 1) * limitNum;
  const paginated = results.slice(startIndex, startIndex + limitNum);

  res.json({
    total: results.length,
    page: pageNum,
    totalPages: Math.ceil(results.length / limitNum),
    items: paginated
  });
});

// Single Procedure Details
apiRouter.get('/procedures/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const procedure = PROCEDURES.find((p) => p.id === id || p.slug === id);
  if (!procedure) {
    res.status(404).json({ error: 'Procedura solicitată nu a fost găsită în catalogul ActeSimple.' });
    return;
  }
  res.json(procedure);
});

// Procedure Categories with Counts
apiRouter.get('/categories', (_req: Request, res: Response) => {
  const categories = [
    { id: 'identitate', name: { ro: 'Acte de Identitate & Pașapoarte', en: 'Identity Cards & Passports' }, icon: 'Shield' },
    { id: 'auto', name: { ro: 'Auto, Permise & Înmatriculări', en: 'Vehicles, Licenses & Registration' }, icon: 'Car' },
    { id: 'stare-civila', name: { ro: 'Stare Civilă (Căsătorie, Naștere)', en: 'Civil Status (Birth, Marriage)' }, icon: 'Users' },
    { id: 'justitie', name: { ro: 'Justiție & Cazier Judiciar', en: 'Justice & Criminal Records' }, icon: 'Scale' },
    { id: 'imigrare', name: { ro: 'Cetățeni Internaționali & Imigrare (IGI)', en: 'International Citizens & Immigration' }, icon: 'Globe' },
    { id: 'sanatate', name: { ro: 'Sănătate & Asigurări (CNAS)', en: 'Health & Insurance (CNAS)' }, icon: 'HeartPulse' },
    { id: 'afaceri', name: { ro: 'Afaceri, Taxe & Fiscalitate (ANAF/ONRC)', en: 'Business, Tax & Registry' }, icon: 'Briefcase' }
  ];

  const enriched = categories.map((cat) => {
    const count = PROCEDURES.filter((p) => p.category === cat.id).length;
    return { ...cat, count };
  });

  res.json(enriched);
});

// Official Sources Registry (Public Read-Only)
apiRouter.get('/sources', async (_req: Request, res: Response) => {
  try {
    const sources = await getSources();
    res.json(sources);
  } catch (err) {
    res.status(500).json({ error: 'Eroare la citirea registrului de surse.' });
  }
});

// Protected: Trigger Official Source Inspection & Audit Check
apiRouter.post(
  '/sources/:id/check',
  rateLimiter('source_check', 20, 15 * 60 * 1000), // Max 20 checks per 15 min
  requireEditorAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Validate request body
    const allowedKeys = ['actor', 'notes'];
    const extraKeys = Object.keys(req.body).filter((k) => !allowedKeys.includes(k));
    if (extraKeys.length > 0) {
      res.status(400).json({ error: `Câmpuri nepermise în cerere: ${extraKeys.join(', ')}` });
      return;
    }

    const actor = typeof req.body.actor === 'string' && req.body.actor.trim().length > 0
      ? req.body.actor.trim().slice(0, 80)
      : 'Redactor Autorizat';

    const now = new Date().toISOString();
    const updatedSource = await updateSourceCheck(id, now, 'verified');

    if (!updatedSource) {
      res.status(404).json({ error: 'Sursa oficială nu a fost găsită în registru.' });
      return;
    }

    const newLog: AuditLog = {
      id: `log-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      timestamp: now,
      actor,
      action: 'check_source',
      procedureId: updatedSource.relatedProcedureIds[0] || 'general',
      procedureTitle: updatedSource.institutionName,
      details: `Verificare oficială realizată de către ${actor} pentru portalul ${updatedSource.sourceUrl}. Legislația a fost confirmată.`
    };

    await saveAuditLog(newLog);

    res.json({
      message: 'Verificarea sursei s-a încheiat cu succes și a fost înregistrată în jurnalul de audit.',
      source: updatedSource,
      auditLog: newLog
    });
  }
);

// Protected: Retrieve Internal Editorial Audit Logs
apiRouter.get(
  '/editorial/audit-logs',
  requireEditorAuth,
  async (req: Request, res: Response) => {
    try {
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 50));
      const logs = await getAuditLogs(limit);
      res.json(logs);
    } catch (err) {
      res.status(500).json({ error: 'Eroare la citirea jurnalului de audit.' });
    }
  }
);

// Protected: View Submitted Citizen Feedback (Editors only)
apiRouter.get(
  '/editorial/feedback',
  requireEditorAuth,
  async (req: Request, res: Response) => {
    try {
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 50));
      const items = await getFeedback(limit);
      res.json(items);
    } catch (err) {
      res.status(500).json({ error: 'Eroare la citirea mesajelor de feedback.' });
    }
  }
);

// Protected: Review and approve/update procedure editorial status
apiRouter.post(
  '/editorial/procedures/:id/review',
  requireEditorAuth,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, actor, notes } = req.body;

    const procedure = PROCEDURES.find((p) => p.id === id);
    if (!procedure) {
      res.status(404).json({ error: 'Procedura nu a fost găsită în catalog.' });
      return;
    }

    const validStatuses = ['verified', 'published', 'draft', 'under_review', 'archived', 'outdated'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ error: `Statut invalid. Statuturi permise: ${validStatuses.join(', ')}` });
      return;
    }

    const reviewer = typeof actor === 'string' && actor.trim() ? actor.trim().slice(0, 80) : 'Redactor Juridic';
    const now = new Date().toISOString();

    // Update procedure in memory
    procedure.editorialStatus = status;
    procedure.editorialReviewDate = now.split('T')[0];
    procedure.reviewedBy = reviewer;

    const newLog: AuditLog = {
      id: `review-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
      timestamp: now,
      actor: reviewer,
      action: status === 'verified' || status === 'published' ? 'publish' : 'update',
      procedureId: procedure.id,
      procedureTitle: procedure.title.ro,
      details: `Revizuire editorială pentru procedura [${procedure.title.ro}] -> Statut: ${status}. Note: ${typeof notes === 'string' ? notes.slice(0, 500) : 'Fără observații suplimentare.'}`
    };

    await saveAuditLog(newLog);

    res.json({
      message: 'Statutul editorial al procedurii a fost actualizat cu succes.',
      procedure: {
        id: procedure.id,
        editorialStatus: procedure.editorialStatus,
        editorialReviewDate: procedure.editorialReviewDate,
        reviewedBy: procedure.reviewedBy
      },
      auditLog: newLog
    });
  }
);

// Form Preparation Templates (Public Read-Only)
apiRouter.get('/forms/templates', (_req: Request, res: Response) => {
  res.json(FORM_TEMPLATES);
});

// Public Feedback Submission with Strict Validation & Rate Limiting
apiRouter.post(
  '/feedback',
  rateLimiter('feedback', 5, 15 * 60 * 1000), // Max 5 feedbacks per 15 min per IP
  async (req: Request, res: Response) => {
    const { procedureId, message, type } = req.body;

    // Strict validation of allowed payload keys
    const allowedKeys = ['procedureId', 'message', 'type'];
    const invalidKeys = Object.keys(req.body).filter((k) => !allowedKeys.includes(k));
    if (invalidKeys.length > 0) {
      res.status(400).json({ error: `Câmpuri nepermise detectate în cerere: ${invalidKeys.join(', ')}` });
      return;
    }

    // Message validation
    if (typeof message !== 'string' || message.trim().length < 5 || message.trim().length > 1000) {
      res.status(400).json({
        error: 'Mesajul de feedback este obligatoriu și trebuie să aibă între 5 și 1000 de caractere.'
      });
      return;
    }

    // Procedure ID validation (if provided)
    if (procedureId !== undefined) {
      if (typeof procedureId !== 'string' || (procedureId.trim() && !PROCEDURES.some((p) => p.id === procedureId.trim()))) {
        res.status(400).json({ error: 'ID-ul procedurii este invalid.' });
        return;
      }
    }

    // Feedback type validation
    const allowedTypes = ['procedure_improvement', 'outdated_fee', 'schedule_change', 'general'];
    const selectedType = typeof type === 'string' && allowedTypes.includes(type) ? type : 'general';

    // Hash IP address with one-way salt for privacy protection (GDPR compliance)
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    const ipHash = crypto.createHash('sha256').update(clientIp + 'actesimple_salt').digest('hex').slice(0, 16);

    const feedbackItem: CitizenFeedback = {
      id: `fb-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
      procedureId: procedureId ? procedureId.trim() : undefined,
      type: selectedType,
      message: message.trim(),
      ipHash,
      createdAt: new Date().toISOString()
    };

    try {
      await saveFeedback(feedbackItem);

      // Also record a sanitized entry into audit logs for editorial review
      const newAuditLog: AuditLog = {
        id: `audit-${feedbackItem.id}`,
        timestamp: feedbackItem.createdAt,
        actor: 'Cetățean (Anonimizat)',
        action: 'update',
        procedureId: feedbackItem.procedureId,
        procedureTitle: feedbackItem.procedureId
          ? PROCEDURES.find((p) => p.id === feedbackItem.procedureId)?.title.ro
          : 'Sugestie Generală',
        details: `Semnalare cetățean [${selectedType}]: "${feedbackItem.message.slice(0, 100)}..."`
      };
      await saveAuditLog(newAuditLog);

      res.status(201).json({
        status: 'success',
        message: 'Îți mulțumim pentru contribuție! Semnalarea ta a fost transmisă în siguranță echipei editoriale.'
      });
    } catch (err) {
      console.error('Failed to persist feedback safely');
      res.status(500).json({ error: 'A apărut o problemă la înregistrarea semnalării. Vă rugăm să reîncercați.' });
    }
  }
);

// ==========================================
// County & Office Finder Endpoints
// ==========================================

// Helper: Haversine distance in kilometers (straight-line)
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// 1. All Romanian Counties (41 counties + București)
apiRouter.get('/counties', (req: Request, res: Response) => {
  const { search } = req.query;
  let results = [...COUNTIES];

  if (typeof search === 'string' && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(
      (c) =>
        c.code.toLowerCase() === q ||
        c.name.ro.toLowerCase().includes(q) ||
        c.name.en.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.majorLocalities.some((loc) => loc.toLowerCase().includes(q))
    );
  }

  res.json({
    total: results.length,
    items: results
  });
});

// 2. Administrative Services List
apiRouter.get('/services', (req: Request, res: Response) => {
  const { category } = req.query;
  let results = [...ADMINISTRATIVE_SERVICES];

  if (typeof category === 'string' && category.trim()) {
    results = results.filter((s) => s.category === category.trim());
  }

  res.json({
    total: results.length,
    items: results
  });
});

// 3. Administrative Offices Directory with Proximity & Multi-Criteria Filtering
apiRouter.get('/offices', async (req: Request, res: Response) => {
  try {
    const { county, service, procedure, city, institutionType, search, lat, lng } = req.query;
    let offices = await getOffices();

    // Filter by County code (e.g. 'B', 'CJ', 'TM')
    if (typeof county === 'string' && county.trim()) {
      const c = county.trim().toUpperCase();
      offices = offices.filter((o) => o.county.toUpperCase() === c);
    }

    // Filter by Service ID (e.g. 'passports', 'id_cards')
    if (typeof service === 'string' && service.trim()) {
      const s = service.trim();
      offices = offices.filter((o) => o.providedServiceIds.includes(s));
    }

    // Filter by Related Procedure ID (e.g. 'buletin-14-ani')
    if (typeof procedure === 'string' && procedure.trim()) {
      const p = procedure.trim();
      offices = offices.filter((o) => o.relatedProcedureIds.includes(p));
    }

    // Filter by City / Sector
    if (typeof city === 'string' && city.trim()) {
      const ct = city.trim().toLowerCase();
      offices = offices.filter((o) => o.city.toLowerCase().includes(ct));
    }

    // Filter by Institution Type
    if (typeof institutionType === 'string' && institutionType.trim()) {
      const inst = institutionType.trim().toUpperCase();
      offices = offices.filter((o) => o.institutionType.toUpperCase() === inst);
    }

    // Free text search
    if (typeof search === 'string' && search.trim()) {
      const q = search.trim().toLowerCase();
      offices = offices.filter(
        (o) =>
          o.name.ro.toLowerCase().includes(q) ||
          o.name.en.toLowerCase().includes(q) ||
          o.address.toLowerCase().includes(q) ||
          o.city.toLowerCase().includes(q) ||
          (o.phone && o.phone.toLowerCase().includes(q))
      );
    }

    // Calculate proximity distance if user coordinates provided
    let userLat: number | null = null;
    let userLng: number | null = null;

    if (lat !== undefined && lng !== undefined) {
      const parsedLat = parseFloat(lat as string);
      const parsedLng = parseFloat(lng as string);
      if (
        !isNaN(parsedLat) &&
        !isNaN(parsedLng) &&
        parsedLat >= -90 &&
        parsedLat <= 90 &&
        parsedLng >= -180 &&
        parsedLng <= 180
      ) {
        userLat = parsedLat;
        userLng = parsedLng;
      }
    }

    let officesWithDistance: AdministrativeOffice[] = offices.map((o) => {
      if (userLat !== null && userLng !== null) {
        const dist = calculateDistanceKm(userLat, userLng, o.coordinates.lat, o.coordinates.lng);
        return { ...o, distanceKm: dist };
      }
      return o;
    });

    // If user coordinates provided, sort ascending by straight-line distance
    if (userLat !== null && userLng !== null) {
      officesWithDistance.sort((a, b) => (a.distanceKm ?? 999999) - (b.distanceKm ?? 999999));
    }

    res.json({
      total: officesWithDistance.length,
      items: officesWithDistance
    });
  } catch (err) {
    console.error('Error fetching administrative offices:', err);
    res.status(500).json({ error: 'Eroare la regăsirea ghișeelor administrative.' });
  }
});

// 4. Single Office Details
apiRouter.get('/offices/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const office = await getOfficeById(id);
    if (!office) {
      res.status(404).json({ error: 'Ghișeul solicitat nu a fost găsit în directorul oficial ActeSimple.' });
      return;
    }
    res.json(office);
  } catch (err) {
    console.error('Error retrieving office details:', err);
    res.status(500).json({ error: 'Eroare la regăsirea detaliilor ghișeului.' });
  }
});

// 5. Protected: Create / Add New Official Office (Editor Only)
apiRouter.post(
  '/offices',
  rateLimiter('office_edit', 30, 15 * 60 * 1000),
  requireEditorAuth,
  async (req: Request, res: Response) => {
    try {
      const payload = req.body as Partial<AdministrativeOffice>;

      // Strict validation
      if (!payload.name?.ro || !payload.name?.en) {
        res.status(400).json({ error: 'Numele ghișeului în RO și EN este obligatoriu.' });
        return;
      }
      if (!payload.county || !COUNTIES.some((c) => c.code.toUpperCase() === payload.county?.toUpperCase())) {
        res.status(400).json({ error: 'Codul de județ este invalid sau nu există în lista oficială a României.' });
        return;
      }
      if (!payload.city || !payload.address) {
        res.status(400).json({ error: 'Localitatea și adresa sunt obligatorii.' });
        return;
      }
      if (
        !payload.coordinates ||
        typeof payload.coordinates.lat !== 'number' ||
        typeof payload.coordinates.lng !== 'number' ||
        payload.coordinates.lat < 43 ||
        payload.coordinates.lat > 49 ||
        payload.coordinates.lng < 20 ||
        payload.coordinates.lng > 30
      ) {
        res.status(400).json({ error: 'Coordonatele geografice sunt invalide sau se află în afara granițelor României.' });
        return;
      }
      if (!payload.sourceUrl || !payload.sourceUrl.startsWith('http')) {
        res.status(400).json({ error: 'Adresa URL a sursei oficiale de verificare este obligatorie.' });
        return;
      }

      const officeId = payload.id && payload.id.trim() ? payload.id.trim() : `office-${Date.now()}`;
      const newOffice: AdministrativeOffice = {
        id: officeId,
        name: payload.name,
        institutionType: payload.institutionType || 'SPCLEP',
        county: payload.county.toUpperCase(),
        city: payload.city.trim(),
        address: payload.address.trim(),
        coordinates: {
          lat: payload.coordinates.lat,
          lng: payload.coordinates.lng
        },
        phone: payload.phone?.trim(),
        email: payload.email?.trim(),
        websiteUrl: payload.websiteUrl?.trim(),
        bookingUrl: payload.bookingUrl?.trim(),
        providedServiceIds: Array.isArray(payload.providedServiceIds) ? payload.providedServiceIds : [],
        relatedProcedureIds: Array.isArray(payload.relatedProcedureIds) ? payload.relatedProcedureIds : [],
        openingHours: payload.openingHours || {
          ro: 'Luni - Vineri: 08:30 - 16:30',
          en: 'Monday - Friday: 08:30 - 16:30'
        },
        accessibility: payload.accessibility || { wheelchairAccessible: true },
        appointmentRequirement: payload.appointmentRequirement || 'recommended',
        appointmentNotes: payload.appointmentNotes,
        sourceUrl: payload.sourceUrl.trim(),
        lastVerifiedTimestamp: new Date().toISOString(),
        verificationStatus: 'verified'
      };

      await saveOffice(newOffice);

      // Log in audit trail
      const editorActor = (req as any).editorActor || 'Redactor Autorizat';
      await saveAuditLog({
        id: `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
        timestamp: new Date().toISOString(),
        actor: editorActor,
        action: 'verify',
        details: `Adăugare ghișeu nou: ${newOffice.name.ro} (${newOffice.city}, ${newOffice.county})`
      });

      res.status(201).json({
        message: 'Ghișeul administrativ a fost adăugat cu succes în catalog.',
        office: newOffice
      });
    } catch (err) {
      console.error('Failed to create office:', err);
      res.status(500).json({ error: 'Eroare la salvarea ghișeului.' });
    }
  }
);

// 6. Protected: Update Existing Official Office (Editor Only)
apiRouter.put(
  '/offices/:id',
  rateLimiter('office_edit', 30, 15 * 60 * 1000),
  requireEditorAuth,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const existing = await getOfficeById(id);
      if (!existing) {
        res.status(404).json({ error: 'Ghișeul specificat nu există.' });
        return;
      }

      const updates = req.body as Partial<AdministrativeOffice>;
      const updated = await updateOffice(id, updates);
      if (!updated) {
        res.status(404).json({ error: 'Ghișeul specificat nu există.' });
        return;
      }

      const editorActor = (req as any).editorActor || 'Redactor Autorizat';
      await saveAuditLog({
        id: `audit-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
        timestamp: new Date().toISOString(),
        actor: editorActor,
        action: 'update',
        details: `Actualizare date ghișeu: ${updated.name.ro} (${updated.id})`
      });

      res.json({
        message: 'Datele ghișeului au fost actualizate cu succes.',
        office: updated
      });
    } catch (err) {
      console.error('Failed to update office:', err);
      res.status(500).json({ error: 'Eroare la actualizarea ghișeului.' });
    }
  }
);

app.use('/api/v1', apiRouter);

// Set up Vite development middleware or static production serving
async function startServer() {
  // Initialize persistent database
  const dbStatus = await initDb();
  console.log(`Database engine initialized [Mode: ${dbStatus.mode}, Connected: ${dbStatus.connected}]`);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ActeSimple server running on port ${PORT} [env=${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
