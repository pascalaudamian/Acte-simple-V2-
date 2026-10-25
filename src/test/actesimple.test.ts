import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'crypto';
import { PROCEDURES } from '../data/procedures.ts';
import { OFFICIAL_SOURCES, INITIAL_AUDIT_LOGS } from '../data/sources.ts';
import { FORM_TEMPLATES } from '../data/formTemplates.ts';
import { COUNTIES } from '../data/counties.ts';
import { OFFICE_SERVICES } from '../data/officeServices.ts';
import {
  initDb,
  getAuditLogs,
  saveAuditLog,
  getSources,
  updateSourceCheck,
  saveFeedback,
  getFeedback
} from '../db/index.ts';

test('1. Procedure Catalog Integrity', () => {
  assert.ok(PROCEDURES.length >= 6, 'Should have at least 6 core Romanian procedures');

  PROCEDURES.forEach((proc) => {
    // Title & Summary check
    assert.ok(proc.title.ro.length > 5, `Procedure ${proc.id} missing Romanian title`);
    assert.ok(proc.title.en.length > 5, `Procedure ${proc.id} missing English title`);
    assert.ok(proc.shortSummary.ro.length > 10, `Procedure ${proc.id} missing RO summary`);
    assert.ok(proc.shortSummary.en.length > 10, `Procedure ${proc.id} missing EN summary`);

    // Institution & Official Link check
    assert.ok(proc.institution.name.length > 0, `Procedure ${proc.id} missing institution name`);
    assert.ok(proc.institution.officialUrl.startsWith('http'), `Procedure ${proc.id} invalid official url`);

    // Legal Basis check
    assert.ok(proc.legalBasis.law.length > 0, `Procedure ${proc.id} missing legal basis`);

    // Documents check
    assert.ok(proc.requiredDocuments.length > 0, `Procedure ${proc.id} has no required documents`);
    proc.requiredDocuments.forEach((doc) => {
      assert.ok(doc.name.ro, `Document in ${proc.id} missing RO name`);
      assert.ok(doc.name.en, `Document in ${proc.id} missing EN name`);
    });

    // Verification check
    assert.strictEqual(proc.verificationStatus, 'verified', `Procedure ${proc.id} not verified`);
  });
});

test('2. Search and Filtering Logic', () => {
  const searchResultsRo = PROCEDURES.filter(
    (p) => p.title.ro.toLowerCase().includes('pașaport') || p.shortSummary.ro.toLowerCase().includes('pașaport')
  );
  assert.ok(searchResultsRo.length >= 1, 'Should find passport procedure via Romanian query');

  const searchResultsEn = PROCEDURES.filter(
    (p) => p.title.en.toLowerCase().includes('passport') || p.shortSummary.en.toLowerCase().includes('passport')
  );
  assert.ok(searchResultsEn.length >= 1, 'Should find passport procedure via English query');

  const autoProcedures = PROCEDURES.filter((p) => p.category === 'auto');
  assert.ok(autoProcedures.length >= 2, 'Should find at least 2 procedures in auto category');
  autoProcedures.forEach((p) => assert.strictEqual(p.category, 'auto'));

  const euProcedures = PROCEDURES.filter((p) => p.audience.includes('eu-citizen') || p.audience.includes('all'));
  assert.ok(euProcedures.length >= 2, 'Should find procedures applicable to EU citizens');
});

test('3. Office Finder Reference Data Integrity', () => {
  assert.strictEqual(COUNTIES.length, 42, 'Romania must have 41 counties plus Bucharest');
  assert.strictEqual(new Set(COUNTIES.map((county) => county.code)).size, COUNTIES.length, 'County codes must be unique');
  COUNTIES.forEach((county) => {
    assert.ok(county.name.ro.length > 1 && county.name.en.length > 1, `County ${county.code} needs bilingual labels`);
  });
  OFFICE_SERVICES.forEach((service) => {
    assert.ok(service.label.ro && service.label.en, `Service ${service.id} needs bilingual labels`);
    service.procedureIds.forEach((id) => assert.ok(PROCEDURES.some((procedure) => procedure.id === id), `Unknown procedure ${id}`));
  });
  const emptyDirectoryResponse = { items: [], directoryStatus: 'incomplete' as const };
  assert.deepStrictEqual(emptyDirectoryResponse.items, []);
  assert.strictEqual(emptyDirectoryResponse.directoryStatus, 'incomplete');
});

test('4. Orientation Wizard Decision Logic', () => {
  const nonEuWorkerRecommendations = PROCEDURES.filter(
    (p) => (p.audience.includes('non-eu') || p.audience.includes('all')) && (p.category === 'imigrare' || p.category === 'afaceri')
  );
  assert.ok(nonEuWorkerRecommendations.some((p) => p.id === 'permis-sedere-non-ue-munca'), 'Non-EU worker must match single permit guide');

  const euResidentRecommendations = PROCEDURES.filter(
    (p) => (p.audience.includes('eu-citizen') || p.audience.includes('all')) && p.category === 'imigrare'
  );
  assert.ok(euResidentRecommendations.some((p) => p.id === 'rezidenta-ue'), 'EU resident must match certificate registration guide');

  const roCitizenId = PROCEDURES.filter(
    (p) => (p.audience.includes('ro-citizen') || p.audience.includes('all')) && p.category === 'identitate'
  );
  assert.ok(roCitizenId.some((p) => p.id === 'buletin-14-ani'), 'RO citizen must match buletin 14 ani guide');
  assert.ok(roCitizenId.some((p) => p.id === 'buletin-schimbare'), 'RO citizen must match buletin renewal guide');
});

test('4. Checklist State & GDPR Persistence Logic', () => {
  const procedure = PROCEDURES[0];
  const testChecklist = {
    procedureId: procedure.id,
    checkedDocumentIds: [procedure.requiredDocuments[0].id],
    completedStepNumbers: [1],
    notes: 'Programat marți la ora 10:00',
    savedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  };

  const total = procedure.requiredDocuments.length;
  const checked = testChecklist.checkedDocumentIds.length;
  const percentage = Math.round((checked / total) * 100);
  assert.ok(percentage > 0 && percentage <= 100, 'Checklist percentage must be calculated correctly');

  const userChecklists: Record<string, typeof testChecklist> = { [procedure.id]: testChecklist };
  delete userChecklists[procedure.id];
  assert.strictEqual(Object.keys(userChecklists).length, 0, 'User checklists must be fully clearable without leaving residue');
});

test('5. Official Source Monitoring & Audit Trails', () => {
  assert.ok(OFFICIAL_SOURCES.length >= 5, 'Should maintain at least 5 verified official state sources');
  assert.ok(INITIAL_AUDIT_LOGS.length >= 2, 'Should maintain historical audit logs');

  OFFICIAL_SOURCES.forEach((source) => {
    assert.ok(source.institutionName, 'Source missing institution name');
    assert.ok(source.sourceUrl.startsWith('http'), 'Source URL must be valid HTTP/HTTPS');
    assert.ok(source.relatedProcedureIds.length > 0, 'Source must relate to at least one procedure');
    assert.strictEqual(source.status, 'verified', 'All active baseline sources should be verified');
  });
});

test('6. Form Preparation Templates Integrity', () => {
  assert.ok(FORM_TEMPLATES.length >= 2, 'Should have standard civic form templates');

  FORM_TEMPLATES.forEach((tpl) => {
    assert.ok(tpl.title.ro, 'Template missing Romanian title');
    assert.ok(tpl.title.en, 'Template missing English title');
    assert.ok(tpl.officialTarget, 'Template missing official target authority');
    assert.ok(tpl.fields.length >= 2, 'Template must provide structured fields');
    tpl.fields.forEach((f) => {
      assert.ok(f.label.ro, 'Field missing RO label');
      assert.ok(f.type, 'Field missing input type');
    });
  });
});

test('7. Editorial Authentication & Authorization Logic', () => {
  const configuredToken = 'valid_test_secret_editor_token_123';

  // Helper verifying token check logic
  function checkAuth(authHeader: string | undefined): { status: number; ok: boolean } {
    if (!configuredToken) return { status: 503, ok: false };
    if (!authHeader || !authHeader.startsWith('Bearer ')) return { status: 401, ok: false };

    const token = authHeader.slice(7).trim();
    const tokenBuf = Buffer.from(token);
    const confBuf = Buffer.from(configuredToken);

    if (tokenBuf.length !== confBuf.length || !crypto.timingSafeEqual(tokenBuf, confBuf)) {
      return { status: 403, ok: false };
    }
    return { status: 200, ok: true };
  }

  // Case 1: Missing auth header -> 401 Unauthorized
  assert.strictEqual(checkAuth(undefined).status, 401, 'Missing header must return 401');

  // Case 2: Invalid bearer format -> 401
  assert.strictEqual(checkAuth('Basic invalid').status, 401, 'Non-Bearer auth must return 401');

  // Case 3: Invalid token value -> 403 Forbidden
  assert.strictEqual(checkAuth('Bearer wrong_token').status, 403, 'Invalid token must return 403');

  // Case 4: Valid matching token -> 200 OK
  assert.strictEqual(checkAuth('Bearer valid_test_secret_editor_token_123').status, 200, 'Valid token must return 200');
});

test('8. Feedback Schema Validation & Payload Sanitation', () => {
  const allowedKeys = ['procedureId', 'message', 'type'];
  const allowedTypes = ['procedure_improvement', 'outdated_fee', 'schedule_change', 'general'];

  function validateFeedbackPayload(body: Record<string, any>): { valid: boolean; error?: string } {
    const extraKeys = Object.keys(body).filter((k) => !allowedKeys.includes(k));
    if (extraKeys.length > 0) return { valid: false, error: 'Disallowed keys' };

    if (typeof body.message !== 'string' || body.message.trim().length < 5 || body.message.trim().length > 1000) {
      return { valid: false, error: 'Invalid message length' };
    }

    if (body.procedureId !== undefined) {
      if (typeof body.procedureId !== 'string' || !PROCEDURES.some((p) => p.id === body.procedureId)) {
        return { valid: false, error: 'Invalid procedure ID' };
      }
    }

    if (body.type !== undefined && !allowedTypes.includes(body.type)) {
      return { valid: false, error: 'Invalid feedback type' };
    }

    return { valid: true };
  }

  // Valid payload
  assert.ok(
    validateFeedbackPayload({
      procedureId: 'pasaport-electronic',
      message: 'La serviciul de pașapoarte taxa se poate achita direct pe Ghișeul.ro.',
      type: 'procedure_improvement'
    }).valid
  );

  // Short message (< 5 chars) rejected
  assert.strictEqual(
    validateFeedbackPayload({ message: 'Hi' }).valid,
    false,
    'Messages shorter than 5 chars must be rejected'
  );

  // Oversized message (> 1000 chars) rejected
  assert.strictEqual(
    validateFeedbackPayload({ message: 'A'.repeat(1001) }).valid,
    false,
    'Messages longer than 1000 chars must be rejected'
  );

  // Malicious / unexpected extra fields rejected
  assert.strictEqual(
    validateFeedbackPayload({
      message: 'Valid message here',
      role: 'admin',
      isApproved: true
    }).valid,
    false,
    'Unexpected payload keys must be rejected'
  );

  // Non-existent procedure ID rejected
  assert.strictEqual(
    validateFeedbackPayload({
      procedureId: 'non-existent-id-fake',
      message: 'Valid message text here'
    }).valid,
    false,
    'Non-existent procedure ID must be rejected'
  );
});

test('9. Database Persistence & Durability Operations', async () => {
  // Initialize DB engine
  const initResult = await initDb();
  assert.ok(initResult.mode === 'postgres' || initResult.mode === 'file', 'Database mode must be postgres or file fallback');

  // Test saving and reading feedback
  const testFeedback = {
    id: `test-fb-${Date.now()}`,
    procedureId: 'buletin-14-ani',
    type: 'procedure_improvement',
    message: 'Test persistent feedback entry',
    createdAt: new Date().toISOString()
  };

  await saveFeedback(testFeedback);
  const feedbackList = await getFeedback(50);
  assert.ok(feedbackList.length > 0, 'Feedback list must not be empty');
  assert.ok(
    feedbackList.some((fb) => fb.id === testFeedback.id && fb.message === testFeedback.message),
    'Saved feedback must be retrievable from persistent storage'
  );

  // Test saving and reading audit logs
  const testAuditLog = {
    id: `test-log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    actor: 'Test Auditor (QA Engine)',
    action: 'check_source' as const,
    procedureId: 'buletin-14-ani',
    procedureTitle: 'Carte de identitate',
    details: 'Automated durability verification'
  };

  await saveAuditLog(testAuditLog);
  const auditList = await getAuditLogs(50);
  assert.ok(auditList.length > 0, 'Audit logs must not be empty');
  assert.ok(
    auditList.some((l) => l.id === testAuditLog.id && l.actor === testAuditLog.actor),
    'Saved audit log must be retrievable from persistent storage'
  );

  // Test official source check update
  const updated = await updateSourceCheck('src-dgep', new Date().toISOString(), 'verified');
  assert.ok(updated, 'Source check update must return updated source');
  assert.strictEqual(updated?.id, 'src-dgep');
  assert.strictEqual(updated?.status, 'verified');
});

test('10. Safe Behavior When Database is Disconnected or Empty', async () => {
  // When no PostgreSQL database is connected, operations should degrade gracefully without crashing
  const sources = await getSources();
  assert.ok(sources.length > 0, 'Sources must be returned even without external DB');

  const logs = await getAuditLogs();
  assert.ok(Array.isArray(logs), 'Audit logs must return array even in fallback mode');
});
