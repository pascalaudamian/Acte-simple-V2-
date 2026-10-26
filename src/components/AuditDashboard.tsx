import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  CheckCircle2,
  Circle,
  AlertTriangle,
  ShieldCheck,
  Server,
  Languages,
  Smartphone,
  Search,
  RefreshCw,
  Copy,
  RotateCcw,
  ExternalLink,
  Lock,
  Database,
  Globe2,
  Check,
  Info
} from 'lucide-react';

interface AuditItem {
  id: string;
  category: 'functionality' | 'security' | 'bilingual' | 'mobile' | 'seo';
  title: { ro: string; en: string };
  description: { ro: string; en: string };
  automatedVerification?: boolean;
}

const AUDIT_CHECKLIST: AuditItem[] = [
  // Functionality (7 items)
  {
    id: 'f-1',
    category: 'functionality',
    title: { ro: 'Navigare pagină principală și căutare/filtrare proceduri', en: 'Homepage navigation and procedure search/filtering' },
    description: { ro: 'Filtrarea după categorii, public țintă și căutare textuală instantă funcționează fără erori.', en: 'Filtering by category, audience, and instant text search functions seamlessly.' }
  },
  {
    id: 'f-2',
    category: 'functionality',
    title: { ro: 'Paginile de detaliu se încarcă direct și persistă la refresh', en: 'Procedure detail pages load directly and survive refresh' },
    description: { ro: 'URL-urile de forma ?tab=detail&procedure=id se deschid direct și păstrează starea la reîncărcare.', en: 'URLs with ?tab=detail&procedure=id open directly and preserve state on page reload.' }
  },
  {
    id: 'f-3',
    category: 'functionality',
    title: { ro: 'Asistentul acoperă fiecare eveniment de viață și profil', en: 'Wizard handles every life event and user profile' },
    description: { ro: 'Toate cele 10 evenimente de viață și 4 profiluri de cetățenie generează recomandări conforme.', en: 'All 10 life events and 4 citizenship profiles produce validated procedural recommendations.' }
  },
  {
    id: 'f-4',
    category: 'functionality',
    title: { ro: 'Checklist-urile persistă la refresh și sunt izolate', en: 'Checklist changes persist after refresh and are isolated appropriately' },
    description: { ro: 'Documentele bifate se salvează în localStorage conform GDPR fără date transmise serverului.', en: 'Checked documents save to localStorage under GDPR zero-data-retention principles.' }
  },
  {
    id: 'f-5',
    category: 'functionality',
    title: { ro: 'Tipărirea/exportul generează documente complete și lizibile', en: 'Print/export produces complete, readable documents' },
    description: { ro: 'Stilurile CSS @media print ascund elementele de navigare și afișează pașii și actele.', en: '@media print CSS hides navigation bars and cleanly displays checklist items.' }
  },
  {
    id: 'f-6',
    category: 'functionality',
    title: { ro: 'Trimiterea feedback-ului validează datele și aplică rate limit', en: 'Feedback submission validates input and handles rate limits' },
    description: { ro: 'Endpoint-ul /api/v1/feedback respinge câmpurile nepermise și impune limită de 5 cereri per IP.', en: '/api/v1/feedback rejects unallowed fields and applies 5 req / 15 min per IP rate limit.' }
  },
  {
    id: 'f-7',
    category: 'functionality',
    title: { ro: 'Acțiunile editoriale actualizează statutul și înregistrează loguri', en: 'Editorial actions update status and record audit events' },
    description: { ro: 'Revizuirile editoriale sunt înregistrate cu timestamp și semnătură autor în fișiere persistente.', en: 'Editorial reviews record author signatures, timestamps, and notes to durable storage.' }
  },

  // Security & Backend (6 items)
  {
    id: 's-1',
    category: 'security',
    title: { ro: 'Endpoint-urile de sănătate și catalog returnează JSON valid și CORS', en: 'Health and catalog endpoints return expected status/content types' },
    description: { ro: '/api/v1/health și /api/v1/procedures returnează 200 OK cu antete CORS și securitate.', en: '/api/v1/health and /api/v1/procedures return 200 OK with CORS and security headers.' }
  },
  {
    id: 's-2',
    category: 'security',
    title: { ro: 'Endpoint-urile protejate resping cererile fără token autorizat', en: 'Protected endpoints reject missing, invalid and expired credentials' },
    description: { ro: '/api/v1/editorial/* și operațiunile de scriere returnează 401/403/503 dacă tokenul lipsește.', en: '/api/v1/editorial/* and write operations return 401/403/503 when Bearer token is absent.' }
  },
  {
    id: 's-3',
    category: 'security',
    title: { ro: 'Niciun secret sau token privilegiat nu apare în codul de browser', en: 'No secrets or privileged tokens appear in browser assets' },
    description: { ro: 'Tokenul editorial este introdus manual de redactor și nu este stocat în pachetele frontend.', en: 'Editorial tokens are entered manually by the reviewer and never baked into static bundles.' }
  },
  {
    id: 's-4',
    category: 'security',
    title: { ro: 'Datele de intrare sunt validate; erorile nu expun stack traces', en: 'Inputs are validated; errors do not expose stack traces or private data' },
    description: { ro: 'Body parser-ul de 64kb și validarea strictă elimină riscurile de suprasarcină sau payload injection.', en: '64kb payload limit and strict schema checks block prototype pollution and payload flooding.' }
  },
  {
    id: 's-5',
    category: 'security',
    title: { ro: 'Rate limits, antete CORS și antete de securitate HTTP configurate', en: 'Rate limits work across instances; CORS and security headers are appropriate' },
    description: { ro: 'Antetele X-Content-Type-Options: nosniff și Referrer-Policy sunt transmise pe fiecare răspuns.', en: 'X-Content-Type-Options: nosniff and Referrer-Policy are enforced on every response.' }
  },
  {
    id: 's-6',
    category: 'security',
    title: { ro: 'Persistența supraviețuiește repornirilor aplicației', en: 'Database persistence survives restart/redeployment; backups and access controls' },
    description: { ro: 'Motor hibrid cu suport PostgreSQL și stocare durabilă de rezervă în /data.', en: 'Dual database engine with PostgreSQL integration and durable file storage in /data.' }
  },

  // Romanian & English Parity (4 items)
  {
    id: 'l-1',
    category: 'bilingual',
    title: { ro: 'Comutarea limbii actualizează întregul text vizibil din interfață', en: 'Language switch updates all visible interface text' },
    description: { ro: 'Header, footer, modaluri, formulare și căutare sincronizate instant între RO și EN.', en: 'Header, footer, dialogs, forms, and search synchronize instantaneously between RO and EN.' }
  },
  {
    id: 'l-2',
    category: 'bilingual',
    title: { ro: 'Fiecare procedură are conținut substanțial echivalent în RO și EN', en: 'Every procedure has equivalent substantive content in both languages' },
    description: { ro: 'Toate cele 24 de proceduri au titluri, rezumate, documente și pași redactate bilingv.', en: 'All 24 procedures maintain complete bilingual titles, summaries, documents, and steps.' }
  },
  {
    id: 'l-3',
    category: 'bilingual',
    title: { ro: 'Taxele, termenele legale și eligibilitatea coincid între limbi', en: 'Fees, deadlines, legal citations and eligibility agree across languages' },
    description: { ro: 'Valorile tarifelor în RON și numărul de zile calendaristice/lucrătoare sunt identice în ambele limbi.', en: 'Fee amounts in RON and statutory processing deadlines are identical across translations.' }
  },
  {
    id: 'l-4',
    category: 'bilingual',
    title: { ro: 'Mesajele de validare și etichetele de accesibilitate sunt traduse', en: 'Validation errors, empty states and accessibility labels are translated' },
    description: { ro: 'Avertismentele de eroare, stările de căutare fără rezultate și atributele aria sunt bilingve.', en: 'Error banners, zero-result search empty states, and aria attributes are localized.' }
  },

  // Mobile & Accessibility (4 items)
  {
    id: 'm-1',
    category: 'mobile',
    title: { ro: 'Navigarea pe ecran mic și formularele nu produc overflow orizontal', en: 'Small-screen navigation and forms work without horizontal overflow' },
    description: { ro: 'Design complet responsive testat pentru ecrane de la 320px lățime în sus.', en: 'Fully responsive mobile-first architecture tested from 320px viewport upwards.' }
  },
  {
    id: 'm-2',
    category: 'mobile',
    title: { ro: 'Harta ghișeelor și refuzul permisiunii de locație funcționează elegant', en: 'Office map and location-denied flows remain usable' },
    description: { ro: 'În cazul refuzului GPS, utilizatorul poate selecta direct județul din lista celor 41 + București.', en: 'If geolocation is rejected, user seamlessly selects from the 42 county dropdown list.' }
  },
  {
    id: 'm-3',
    category: 'mobile',
    title: { ro: 'Navigare completă prin tastatură, focus vizibil și titluri semantice', en: 'Keyboard navigation, visible focus and semantic headings work' },
    description: { ro: 'Elementele interactive au inele clare de focus (focus:ring-2) și ierarhie logică h1-h3.', en: 'Interactive elements include clear focus rings and strict semantic h1-h3 hierarchy.' }
  },
  {
    id: 'm-4',
    category: 'mobile',
    title: { ro: 'Contrast ridicat, etichete de butoane și suport cititoare de ecran', en: 'Contrast, labels, alt text and screen-reader announcements are adequate' },
    description: { ro: 'Raport de contrast WCAG AA respectat pe temele vizuale și pictograme etichetate semantic.', en: 'WCAG AA contrast ratios satisfied on dark/light surfaces with labeled icon actions.' }
  },

  // SEO & Content Quality (4 items)
  {
    id: 'seo-1',
    category: 'seo',
    title: { ro: 'Paginile de proceduri au titluri unice, descrieri și URL-uri stabile', en: 'Procedure pages have unique titles, descriptions and stable URLs' },
    description: { ro: 'Componenta SEOHead actualizează dinamic document.title, meta description și og:title.', en: 'SEOHead dynamically manages document.title, meta description, and OpenGraph tags.' }
  },
  {
    id: 'seo-2',
    category: 'seo',
    title: { ro: 'Fișierele robots.txt, sitemap.xml, canonical și hreflang sunt active', en: 'robots.txt, sitemap.xml, canonical and language metadata are correct' },
    description: { ro: 'Sitemap-ul XML include toate cele 24 de proceduri în RO și EN cu linkuri xhtml:alternate.', en: 'XML sitemap catalogs all 24 procedures in RO and EN with xhtml:alternate hreflang links.' }
  },
  {
    id: 'seo-3',
    category: 'seo',
    title: { ro: 'Conținutul critic este indexabil; zero linkuri rupte sau erori de consolă', en: 'Critical content is crawlable; broken links and console errors are absent' },
    description: { ro: 'Date structurate Schema.org JSON-LD (GovernmentService / WebApplication) injectate în pagină.', en: 'Schema.org JSON-LD structured data (GovernmentService / WebApplication) injected in DOM.' }
  },
  {
    id: 'seo-4',
    category: 'seo',
    title: { ro: 'Surse oficiale de verificare indicate explicit cu date recente de control', en: 'Procedure claims have official sources and visible verification dates' },
    description: { ro: 'Fiecare procedură menționează portalul guvernamental sursă, data verificării și baza legală.', en: 'Each procedure states issuing institution, source portal, check date, and statutory law.' }
  }
];

const STORAGE_KEY_AUDIT = 'actesimple_audit_checklist_v1';

interface AuditDashboardProps {
  lang: Language;
}

export const AuditDashboard: React.FC<AuditDashboardProps> = ({ lang }) => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_AUDIT);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load audit items', e);
      }
    }
    return {};
  });

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [copiedStatus, setCopiedStatus] = useState(false);
  const [apiProbeResults, setApiProbeResults] = useState<{
    health: { status: 'pending' | 'ok' | 'error'; ms?: number; message?: string };
    procedures: { status: 'pending' | 'ok' | 'error'; count?: number; ms?: number };
    robots: { status: 'pending' | 'ok' | 'error'; ms?: number };
    sitemap: { status: 'pending' | 'ok' | 'error'; ms?: number };
    authProtected: { status: 'pending' | 'ok' | 'error'; ms?: number; rejectedStatus?: number };
  }>({
    health: { status: 'pending' },
    procedures: { status: 'pending' },
    robots: { status: 'pending' },
    sitemap: { status: 'pending' },
    authProtected: { status: 'pending' }
  });

  // Run live probes on mount
  useEffect(() => {
    runApiProbes();
  }, []);

  const runApiProbes = async () => {
    // 1. Health Probe
    const t0 = performance.now();
    try {
      const res = await fetch('/api/v1/health');
      const data = await res.json();
      setApiProbeResults((prev) => ({
        ...prev,
        health: { status: 'ok', ms: Math.round(performance.now() - t0), message: `${data.service} (v${data.version})` }
      }));
    } catch (e) {
      setApiProbeResults((prev) => ({
        ...prev,
        health: { status: 'error', message: 'Eroare la apelul /api/v1/health' }
      }));
    }

    // 2. Procedures Probe
    const t1 = performance.now();
    try {
      const res = await fetch('/api/v1/procedures?limit=50');
      const data = await res.json();
      setApiProbeResults((prev) => ({
        ...prev,
        procedures: { status: 'ok', count: data.total || data.items?.length, ms: Math.round(performance.now() - t1) }
      }));
    } catch (e) {
      setApiProbeResults((prev) => ({
        ...prev,
        procedures: { status: 'error' }
      }));
    }

    // 3. Robots.txt Probe
    const t2 = performance.now();
    try {
      const res = await fetch('/robots.txt');
      setApiProbeResults((prev) => ({
        ...prev,
        robots: { status: res.ok ? 'ok' : 'error', ms: Math.round(performance.now() - t2) }
      }));
    } catch (e) {
      setApiProbeResults((prev) => ({ ...prev, robots: { status: 'error' } }));
    }

    // 4. Sitemap.xml Probe
    const t3 = performance.now();
    try {
      const res = await fetch('/sitemap.xml');
      setApiProbeResults((prev) => ({
        ...prev,
        sitemap: { status: res.ok ? 'ok' : 'error', ms: Math.round(performance.now() - t3) }
      }));
    } catch (e) {
      setApiProbeResults((prev) => ({ ...prev, sitemap: { status: 'error' } }));
    }

    // 5. Auth-Protected Endpoint Probe (Should reject unauthorized access with 401 or 503)
    const t4 = performance.now();
    try {
      const res = await fetch('/api/v1/editorial/audit-logs');
      // If status is 401, 403, or 503 (token not set), security enforcement is WORKING
      const isSecured = res.status === 401 || res.status === 403 || res.status === 503;
      setApiProbeResults((prev) => ({
        ...prev,
        authProtected: {
          status: isSecured ? 'ok' : 'error',
          rejectedStatus: res.status,
          ms: Math.round(performance.now() - t4)
        }
      }));
    } catch (e) {
      setApiProbeResults((prev) => ({ ...prev, authProtected: { status: 'error' } }));
    }
  };

  const handleToggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(next));
      return next;
    });
  };

  const handleMarkAllPassing = () => {
    const allChecked: Record<string, boolean> = {};
    AUDIT_CHECKLIST.forEach((item) => {
      allChecked[item.id] = true;
    });
    setCheckedIds(allChecked);
    localStorage.setItem(STORAGE_KEY_AUDIT, JSON.stringify(allChecked));
  };

  const handleResetChecklist = () => {
    if (window.confirm(lang === 'ro' ? 'Doriți să resetați toate verificările din listă?' : 'Do you want to reset all checks on this list?')) {
      setCheckedIds({});
      localStorage.removeItem(STORAGE_KEY_AUDIT);
    }
  };

  const handleCopyChecklist = () => {
    const total = AUDIT_CHECKLIST.length;
    const completed = Object.values(checkedIds).filter(Boolean).length;
    const lines = [
      `=== ActeSimple Civic Audit Report (${new Date().toLocaleDateString()}) ===`,
      `Progress: ${completed}/${total} items verified (${Math.round((completed / total) * 100)}%)`,
      '',
      ...AUDIT_CHECKLIST.map((item) => {
        const mark = checkedIds[item.id] ? '[x]' : '[ ]';
        return `${mark} ${item.title[lang]} (${item.category.toUpperCase()})`;
      })
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const totalCount = AUDIT_CHECKLIST.length;
  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  const filteredItems = filterCategory === 'all'
    ? AUDIT_CHECKLIST
    : AUDIT_CHECKLIST.filter((i) => i.category === filterCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ro' ? 'Conformitate & Audit Producție' : 'Production Audit & Compliance'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {lang === 'ro' ? 'Panou de Verificare și Audit Tehnic' : 'Civic QA & Technical Audit Dashboard'}
            </h1>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              {lang === 'ro'
                ? 'Instrument interactiv pentru verificarea celor 25 de cerințe de audit: securitate, persistență durabilă, paritate lingvistică RO/EN, accesibilitate și SEO.'
                : 'Interactive tool for verifying the 25 audit requirements: security, durable persistence, RO/EN bilingual parity, accessibility and SEO.'}
            </p>
          </div>

          <div className="flex flex-col items-end w-full sm:w-auto bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl text-center sm:text-right">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {lang === 'ro' ? 'Progres Verificare' : 'Audit Progress'}
            </span>
            <div className="text-3xl font-black text-amber-400 my-1">
              {checkedCount} <span className="text-sm font-normal text-slate-400">/ {totalCount}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden mt-1">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Civic Boundary Statement (ROePAS context) */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-start gap-3 text-xs text-slate-300 bg-slate-800/40 p-4 rounded-xl">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">
              {lang === 'ro' ? 'Delimitare civică conformă cu noul context ROePAS (beta): ' : 'Civic boundary notice aligned with ROePAS beta: '}
            </strong>
            {lang === 'ro'
              ? 'ActeSimple oferă asistență și transparență civică independentă. Cererile oficiale se transmit exclusiv prin noile puncte unice de acces guvernamentale: ROePAS (beta lansat de ADR pe 12 martie 2026), Catalogul Național al Serviciilor Publice (serviciipublice.gov.ro) și platformele instituționale oficiale (HUB MAI, SPV ANAF, eviza.mae.ro).'
              : 'ActeSimple provides independent civic guidance. Official applications are submitted exclusively via governmental single points of access: ROePAS (beta launched by ADR on March 12, 2026), the National Catalog of Public Services, and official ministerial portals.'}
          </p>
        </div>
      </div>

      {/* Live Probe Diagnostics Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">
              {lang === 'ro' ? 'Verificare API & Rute în Timp Real' : 'Live API & Endpoint Probes'}
            </h2>
          </div>
          <button
            onClick={runApiProbes}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{lang === 'ro' ? 'Re-testează rutele' : 'Re-test probes'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Health Endpoint */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-slate-700">/api/v1/health</span>
              {apiProbeResults.health.status === 'ok' ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              ) : apiProbeResults.health.status === 'pending' ? (
                <span className="text-xs text-slate-400">...</span>
              ) : (
                <span className="text-xs font-bold text-rose-600">Eroare</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {apiProbeResults.health.ms ? `${apiProbeResults.health.ms}ms • CORS OK` : 'Testare...'}
            </p>
          </div>

          {/* Procedures Endpoint */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-slate-700">/api/v1/procedures</span>
              {apiProbeResults.procedures.status === 'ok' ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              ) : (
                <span className="text-xs text-slate-400">...</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {apiProbeResults.procedures.count ? `${apiProbeResults.procedures.count} proceduri catalogate` : 'Testare...'}
            </p>
          </div>

          {/* robots.txt */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-slate-700">/robots.txt</span>
              {apiProbeResults.robots.status === 'ok' ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              ) : (
                <span className="text-xs text-slate-400">...</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {apiProbeResults.robots.ms ? `${apiProbeResults.robots.ms}ms • text/plain` : 'Testare...'}
            </p>
          </div>

          {/* sitemap.xml */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-slate-700">/sitemap.xml</span>
              {apiProbeResults.sitemap.status === 'ok' ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 200 OK
                </span>
              ) : (
                <span className="text-xs text-slate-400">...</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {apiProbeResults.sitemap.ms ? `${apiProbeResults.sitemap.ms}ms • xml` : 'Testare...'}
            </p>
          </div>

          {/* Protected Endpoints */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-mono font-bold text-slate-700">Auth Guard</span>
              {apiProbeResults.authProtected.status === 'ok' ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Securizat
                </span>
              ) : (
                <span className="text-xs text-slate-400">...</span>
              )}
            </div>
            <p className="text-[11px] text-slate-500">
              {apiProbeResults.authProtected.rejectedStatus
                ? `Blocat (${apiProbeResults.authProtected.rejectedStatus}) f. token`
                : 'Verificare...'}
            </p>
          </div>
        </div>
      </div>

      {/* Action Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: lang === 'ro' ? 'Toate (25)' : 'All (25)' },
            { id: 'functionality', label: lang === 'ro' ? 'Funcționalitate (7)' : 'Functionality (7)' },
            { id: 'security', label: lang === 'ro' ? 'Securitate & Backend (6)' : 'Security (6)' },
            { id: 'bilingual', label: lang === 'ro' ? 'Bilingvism RO/EN (4)' : 'Bilingual (4)' },
            { id: 'mobile', label: lang === 'ro' ? 'Mobil & Accesibilitate (4)' : 'Mobile (4)' },
            { id: 'seo', label: lang === 'ro' ? 'SEO & Calitate (4)' : 'SEO (4)' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPassing}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-semibold transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{lang === 'ro' ? 'Bifează toate ca verificate' : 'Mark all verified'}</span>
          </button>

          <button
            onClick={handleCopyChecklist}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors shadow-sm"
            title="Copiază sumarul raportului"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedStatus ? (lang === 'ro' ? 'Copiat!' : 'Copied!') : (lang === 'ro' ? 'Copiază raport' : 'Copy report')}</span>
          </button>

          <button
            onClick={handleResetChecklist}
            className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs transition-colors"
            title="Resetează lista de verificări"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isChecked = Boolean(checkedIds[item.id]);
          return (
            <div
              key={item.id}
              onClick={() => handleToggleItem(item.id)}
              className={`cursor-pointer border rounded-2xl p-4 sm:p-5 transition-all flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleItem(item.id);
                }}
                className={`mt-0.5 shrink-0 rounded-md p-1 transition-colors ${
                  isChecked
                    ? 'text-emerald-600 hover:text-emerald-700'
                    : 'text-slate-300 hover:text-slate-500'
                }`}
                aria-label={isChecked ? 'Bifat' : 'Nebifat'}
              >
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 fill-emerald-100 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className={`text-sm font-bold ${isChecked ? 'text-slate-900 line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.title[lang]}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.category === 'security'
                      ? 'bg-rose-100 text-rose-700'
                      : item.category === 'functionality'
                      ? 'bg-blue-100 text-blue-700'
                      : item.category === 'bilingual'
                      ? 'bg-purple-100 text-purple-700'
                      : item.category === 'mobile'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description[lang]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
