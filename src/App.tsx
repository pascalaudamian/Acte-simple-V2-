import React, { useState, useEffect, useMemo } from 'react';
import { Language, Procedure, UserChecklistState } from './types';
import { PROCEDURES } from './data/procedures';
import { UI_TRANSLATIONS } from './utils/i18n';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { ProcedureCard } from './components/ProcedureCard';
import { ProcedureDetail } from './components/ProcedureDetail';
import { OrientationWizard } from './components/OrientationWizard';
import { DocumentPrep } from './components/DocumentPrep';
import { ChecklistManager } from './components/ChecklistManager';
import { SourceMonitor } from './components/SourceMonitor';
import { RoeidSandbox } from './components/RoeidSandbox';
import { OfficeFinder } from './components/OfficeFinder';
import { LifeEventWizard } from './components/LifeEventWizard';
import { EditorialWorkflow } from './components/EditorialWorkflow';
import { Footer } from './components/Footer';
import { ADMINISTRATIVE_DOMAINS } from './data/taxonomy';
import {
  Search,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileCheck2,
  Users,
  Car,
  Scale,
  HeartPulse,
  Briefcase,
  WifiOff,
  Filter,
  CheckCircle2,
  Clock,
  MapPin
} from 'lucide-react';

const STORAGE_KEY_LANG = 'actesimple_lang';
const STORAGE_KEY_CHECKLISTS = 'actesimple_checklists';

export default function App() {
  // 1. Language state with URL sync & localStorage persistence
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang === 'ro' || urlLang === 'en') return urlLang;
      const saved = localStorage.getItem(STORAGE_KEY_LANG);
      if (saved === 'ro' || saved === 'en') return saved;
    }
    return 'ro';
  });

  // 2. Navigation & View State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string | null>(null);
  const [officeFinderServiceId, setOfficeFinderServiceId] = useState<string | undefined>(undefined);
  const [officeFinderCountyCode, setOfficeFinderCountyCode] = useState<string | undefined>(undefined);

  // 3. Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  // 4. Offline State Detection
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // 5. Checklist State (Local-only persistence)
  const [checklists, setChecklists] = useState<Record<string, UserChecklistState>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_CHECKLISTS);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading local checklists', e);
      }
    }
    return {};
  });

  // Sync language change
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(STORAGE_KEY_LANG, newLang);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', newLang);
    window.history.replaceState({}, '', url.toString());
  };

  // Sync checklists to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLISTS, JSON.stringify(checklists));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [checklists]);

  // Online / Offline listeners for Android & PWA
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const t = UI_TRANSLATIONS[lang];

  // Navigation handler
  const handleNavigate = (tab: string, procedureId?: string) => {
    if (procedureId) {
      setSelectedProcedureId(procedureId);
      setActiveTab('detail');
    } else {
      setSelectedProcedureId(null);
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to office finder for specific procedure
  const handleFindOfficeForProcedure = (procedureId: string, countyCode?: string) => {
    const proc = PROCEDURES.find((p) => p.id === procedureId);
    let serviceId = proc?.officeFinderCategory;

    if (!serviceId) {
      if (procedureId.includes('pasaport')) serviceId = 'serv-pasapoarte';
      else if (procedureId.includes('buletin')) serviceId = 'serv-buletin';
      else if (procedureId.includes('permis-conducere')) serviceId = 'serv-permise-auto';
      else if (procedureId.includes('inmatriculare')) serviceId = 'serv-inmatriculari';
      else if (procedureId.includes('rezidenta') || procedureId.includes('sedere') || procedureId.includes('non-ue')) serviceId = 'serv-imigrare-igi';
      else if (procedureId.includes('cazier')) serviceId = 'serv-cazier';
      else if (procedureId.includes('nastere') || procedureId.includes('casatorie') || procedureId.includes('transcriere')) serviceId = 'serv-stare-civila';
      else if (procedureId.includes('alocatie') || procedureId.includes('crestere-copil') || procedureId.includes('incluziune')) serviceId = 'serv-social-anpis';
      else if (procedureId.includes('somaj') || procedureId.includes('revisal')) serviceId = 'serv-somaj-anofm';
      else if (procedureId.includes('pensie')) serviceId = 'serv-pensii-cnpp';
      else if (procedureId.includes('carte-funciara') || procedureId.includes('urbanism')) serviceId = 'serv-cadastru-ancpi';
      else if (procedureId.includes('srl') || procedureId.includes('pfa')) serviceId = 'serv-onrc-firme';
      else if (procedureId.includes('diplom') || procedureId.includes('primar')) serviceId = 'serv-educatie-cnred';
      else if (procedureId.includes('apostila')) serviceId = 'serv-apostila-prefectura';
      else if (procedureId.includes('apia') || procedureId.includes('animale')) serviceId = 'serv-agricultura-apia';
      else if (procedureId.includes('cetatenie')) serviceId = 'serv-cetatenie-anc';
      else if (procedureId.includes('nif')) serviceId = 'serv-taxe-anaf';
      else if (procedureId.includes('sanatate')) serviceId = 'serv-sanatate-cnas';
    }

    setOfficeFinderServiceId(serviceId);
    setOfficeFinderCountyCode(countyCode);
    setActiveTab('offices');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save Procedure to Checklist
  const handleToggleSaveProcedure = (procedureId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setChecklists((prev) => {
      const copy = { ...prev };
      if (copy[procedureId]) {
        delete copy[procedureId];
      } else {
        const now = new Date().toISOString();
        copy[procedureId] = {
          procedureId,
          checkedDocumentIds: [],
          completedStepNumbers: [],
          notes: '',
          savedAt: now,
          lastUpdated: now
        };
      }
      return copy;
    });
  };

  // Toggle Document item inside checklist
  const handleToggleDocument = (procedureId: string, docId: string) => {
    setChecklists((prev) => {
      const current = prev[procedureId] || {
        procedureId,
        checkedDocumentIds: [],
        completedStepNumbers: [],
        notes: '',
        savedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const alreadyChecked = current.checkedDocumentIds.includes(docId);
      const updatedDocs = alreadyChecked
        ? current.checkedDocumentIds.filter((id) => id !== docId)
        : [...current.checkedDocumentIds, docId];

      return {
        ...prev,
        [procedureId]: {
          ...current,
          checkedDocumentIds: updatedDocs,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  // Toggle Step item
  const handleToggleStep = (procedureId: string, stepNumber: number) => {
    setChecklists((prev) => {
      const current = prev[procedureId] || {
        procedureId,
        checkedDocumentIds: [],
        completedStepNumbers: [],
        notes: '',
        savedAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const alreadyCompleted = current.completedStepNumbers.includes(stepNumber);
      const updatedSteps = alreadyCompleted
        ? current.completedStepNumbers.filter((n) => n !== stepNumber)
        : [...current.completedStepNumbers, stepNumber];

      return {
        ...prev,
        [procedureId]: {
          ...current,
          completedStepNumbers: updatedSteps,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  // Update Notes
  const handleUpdateNotes = (procedureId: string, notes: string) => {
    setChecklists((prev) => {
      const current = prev[procedureId];
      if (!current) return prev;
      return {
        ...prev,
        [procedureId]: {
          ...current,
          notes,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  // Set Reminder
  const handleSetReminder = (procedureId: string, date: string, label: string) => {
    setChecklists((prev) => {
      const current = prev[procedureId];
      if (!current) return prev;
      return {
        ...prev,
        [procedureId]: {
          ...current,
          reminderDate: date,
          reminderLabel: label,
          lastUpdated: new Date().toISOString()
        }
      };
    });
  };

  // Clear all data (GDPR)
  const handleClearAllData = () => {
    if (window.confirm(t.checklist.clearConfirm)) {
      setChecklists({});
      localStorage.removeItem(STORAGE_KEY_CHECKLISTS);
    }
  };

  // Filtered Procedures Memo
  const filteredProcedures = useMemo(() => {
    let list = [...PROCEDURES];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedAudience !== 'all') {
      list = list.filter((p) => p.audience.includes(selectedAudience as any) || p.audience.includes('all'));
    }

    if (selectedDomain !== 'all') {
      list = list.filter((p) => p.administrativeDomain === selectedDomain);
    }

    if (selectedChannel !== 'all') {
      list = list.filter((p) => {
        const ch = p.submissionChannel || (p.isOnlineSubmissionPossible ? 'online' : 'in_person');
        return ch === selectedChannel;
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const roMatch = p.title.ro.toLowerCase().includes(q) ||
          p.shortSummary.ro.toLowerCase().includes(q) ||
          p.institution.name.toLowerCase().includes(q) ||
          p.institution.shortName.toLowerCase().includes(q);
        const enMatch = p.title.en.toLowerCase().includes(q) ||
          p.shortSummary.en.toLowerCase().includes(q);
        return roMatch || enMatch;
      });
    }

    return list;
  }, [searchQuery, selectedCategory, selectedDomain, selectedChannel, selectedAudience]);

  // Selected Procedure Object for detail view
  const currentProcedure = PROCEDURES.find((p) => p.id === selectedProcedureId);

  const savedCount = Object.keys(checklists).length;

  const categories = [
    { id: 'identitate', name: { ro: 'Acte Identitate & Pașapoarte', en: 'Identity Cards & Passports' }, icon: ShieldCheck, count: PROCEDURES.filter(p => p.category === 'identitate').length },
    { id: 'stare-civila', name: { ro: 'Stare Civilă (Naștere, Căsătorie)', en: 'Civil Status (Birth, Marriage)' }, icon: Users, count: PROCEDURES.filter(p => p.category === 'stare-civila').length },
    { id: 'social', name: { ro: 'Beneficii Sociale & Alocații', en: 'Social Benefits & Child Allowance' }, icon: HeartPulse, count: PROCEDURES.filter(p => p.category === 'social').length },
    { id: 'munca', name: { ro: 'Muncă & Șomaj (ANOFM)', en: 'Employment & Unemployment' }, icon: Briefcase, count: PROCEDURES.filter(p => p.category === 'munca').length },
    { id: 'pensii', name: { ro: 'Pensii & Retragere (CNPP)', en: 'Pensions & Retirement' }, icon: Clock, count: PROCEDURES.filter(p => p.category === 'pensii').length },
    { id: 'auto', name: { ro: 'Auto, Permise & Înmatriculări', en: 'Vehicles, Licenses & Registration' }, icon: Car, count: PROCEDURES.filter(p => p.category === 'auto').length },
    { id: 'proprietate', name: { ro: 'Cadastru & Proprietate (ANCPI)', en: 'Cadastre & Property (ANCPI)' }, icon: Building2, count: PROCEDURES.filter(p => p.category === 'proprietate').length },
    { id: 'afaceri', name: { ro: 'Firme & Registrul Comerțului (ONRC)', en: 'Business & Trade Register' }, icon: Briefcase, count: PROCEDURES.filter(p => p.category === 'afaceri').length },
    { id: 'justitie', name: { ro: 'Justiție, Cazier & Apostilă', en: 'Justice, Records & Apostille' }, icon: Scale, count: PROCEDURES.filter(p => p.category === 'justitie').length },
    { id: 'educatie', name: { ro: 'Educație & Echivalare (CNRED)', en: 'Education & Diploma Equivalence' }, icon: ShieldCheck, count: PROCEDURES.filter(p => p.category === 'educatie').length },
    { id: 'imigrare', name: { ro: 'Imigrare & Rezidență (IGI)', en: 'Immigration & Residence (IGI)' }, icon: Users, count: PROCEDURES.filter(p => p.category === 'imigrare').length },
    { id: 'cetatenie', name: { ro: 'Cetățenie Română (ANC)', en: 'Citizenship (ANC)' }, icon: ShieldCheck, count: PROCEDURES.filter(p => p.category === 'cetatenie').length },
    { id: 'mediu-agricultura', name: { ro: 'Subvenții Agricole (APIA)', en: 'Agricultural Grants (APIA)' }, icon: Building2, count: PROCEDURES.filter(p => p.category === 'mediu-agricultura').length },
    { id: 'sanatate', name: { ro: 'Sănătate & Card CNAS', en: 'Health Insurance (CNAS)' }, icon: HeartPulse, count: PROCEDURES.filter(p => p.category === 'sanatate').length }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Offline Alert Banner */}
      {!isOnline && (
        <div className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>
            {lang === 'ro'
              ? 'Mod Offline activ: Ai acces complet la ghidurile și checklist-urile salvate pe acest dispozitiv.'
              : 'Offline Mode: You have full access to your locally saved guides and checklists.'}
          </span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        savedCount={savedCount}
      />

      {/* Main App Content Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="bg-slate-900 text-white pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-6">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ro' ? 'Ghiduri verificate conform legilor în vigoare' : 'Statutory verified civic guides'}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance">
                  {lang === 'ro' 
                    ? 'Procedurile tale administrative în România, explicate simplu.'
                    : 'Your administrative procedures in Romania, clearly explained.'}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                  {t.subtagline}
                </p>

                {/* Primary Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveTab('catalog');
                  }}
                  className="max-w-2xl mx-auto mb-6 flex flex-col sm:flex-row gap-2"
                >
                  <div className="relative flex-1">
                    <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.hero.searchPlaceholder}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-colors shadow-sm whitespace-nowrap"
                  >
                    {t.hero.searchButton}
                  </button>
                </form>

                {/* Popular Keywords Strip */}
                <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{t.hero.popularLabel}</span>
                  {['Buletin 14 ani', 'Pașaport electronic', 'Preschimbare permis', 'Cazier online', 'Rezidență IGI', 'Card CNAS'].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => {
                        setSearchQuery(kw.split(' ')[0]);
                        setActiveTab('catalog');
                      }}
                      className="text-slate-300 hover:text-amber-300 underline decoration-slate-600 underline-offset-2 transition-colors"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Life Events Assistant Hero Banner */}
            <section className="bg-indigo-900/90 text-white border-b border-indigo-800 py-6 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 justify-center sm:justify-start">
                    <Compass className="w-4 h-4 text-amber-300" />
                    <span>{lang === 'ro' ? 'Asistent pe Etape de Viață (ROePAS & ServiciiPublice.gov.ro)' : 'Life Events Assistant (ROePAS Standards)'}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {lang === 'ro' ? 'Naștere, Căsătorie, Pensie, Firme, Cadastru sau Șomaj?' : 'Birth, Marriage, Retirement, Business, or Cadastre?'}
                  </h3>
                  <p className="text-xs text-indigo-200 max-w-2xl leading-relaxed">
                    {lang === 'ro'
                      ? 'Primește instantaneu lista procedurilor administrative aplicabile situației tale, documentele necesare și birourile arondate județului tău.'
                      : 'Get instant official roadmaps tailored to your life situation, required documents, and local county desks.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('lifeEvents')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-all shadow-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{lang === 'ro' ? 'Ghidaj pe Etape de Viață' : 'Open Life Events Guide'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* International Citizens & Orientation Hero Banner */}
            <section className="bg-amber-500/10 border-b border-amber-500/20 py-6 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2 justify-center sm:justify-start">
                    <Compass className="w-4 h-4 text-amber-700" />
                    <span>{t.hero.internationalBannerTitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-2xl leading-relaxed">
                    {t.hero.internationalBannerDesc}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('international')}
                  className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm inline-flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>{lang === 'ro' ? 'Deschide Ghidul de Orientare' : 'Open Orientation Wizard'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </section>

            {/* Office Finder & Interactive Map Entry Banner */}
            <section className="bg-slate-900 text-white border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lang === 'ro' ? 'Ghișee în 41 de județe + București' : 'Counters in all 41 counties + Bucharest'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {lang === 'ro' ? 'Găsește un ghișeu oficial & birou administrativ' : 'Find an Official Counter & Administrative Office'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {lang === 'ro'
                      ? 'Localizează ghișeele de evidență a populației (SPCLEP), pașapoarte, permise auto (DRPCIV) și imigrare (IGI) arondate ție, cu adresă exactă, program de lucru cu publicul, linkuri de programare și indicații de traseu.'
                      : 'Locate local population register counters (SPCLEP), passport offices, driving license services, and immigration (IGI) bureaus, with exact addresses, public hours, official booking portals, and navigation directions.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setOfficeFinderServiceId(undefined);
                    setActiveTab('offices');
                  }}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-slate-950" />
                  <span>{lang === 'ro' ? 'Găsește un ghișeu' : 'Find an Office'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* Categories Browse Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                    {lang === 'ro' ? 'Explorează procedurile după categorie' : 'Browse procedures by category'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {lang === 'ro' ? 'Ghiduri pas cu pas organizate pe domenii de interes civic' : 'Step-by-step guides structured by civic domain'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setActiveTab('catalog');
                      }}
                      className="group bg-white border border-slate-200/90 rounded-2xl p-5 text-left hover:border-slate-300 hover:shadow-sm transition-all flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors flex items-center justify-center shrink-0 text-slate-700">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                          {cat.name[lang]}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {cat.count} {lang === 'ro' ? 'ghiduri detaliate' : 'detailed guides'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Popular Featured Procedures */}
            <section className="bg-slate-100/60 border-t border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                      {lang === 'ro' ? 'Cele mai accesate ghiduri administrative' : 'Most accessed administrative guides'}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {lang === 'ro' ? 'Verificate recent de redacția civică' : 'Recently audited by civic editors'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('catalog')}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 inline-flex items-center gap-1"
                  >
                    <span>{lang === 'ro' ? 'Vezi tot catalogul' : 'View all'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {PROCEDURES.slice(0, 6).map((procedure) => (
                    <ProcedureCard
                      key={procedure.id}
                      procedure={procedure}
                      lang={lang}
                      onSelect={(id) => handleNavigate('detail', id)}
                      isSaved={Boolean(checklists[procedure.id])}
                      onToggleSave={handleToggleSaveProcedure}
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PROCEDURE CATALOG */}
        {activeTab === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mb-2">
                {t.catalog.title}
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl">
                {t.catalog.subtitle}
              </p>
            </div>

            {/* Filters Strip */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    {lang === 'ro' ? 'Cuvânt cheie' : 'Keyword search'}
                  </label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={lang === 'ro' ? 'Caută procedură sau instituție...' : 'Search procedure or authority...'}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>

                {/* Administrative Domain Filter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    {lang === 'ro' ? 'Domeniu Administrativ' : 'Administrative Domain'}
                  </label>
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="all">{lang === 'ro' ? 'Toate cele 10 domenii oficiale' : 'All 10 official domains'}</option>
                    {ADMINISTRATIVE_DOMAINS.map((dom) => (
                      <option key={dom.id} value={dom.id}>
                        {dom.name[lang]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submission Channel Filter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    {lang === 'ro' ? 'Canal de depunere' : 'Submission channel'}
                  </label>
                  <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="all">{lang === 'ro' ? 'Toate canalele (Online & Ghișeu)' : 'All channels (Online & Desk)'}</option>
                    <option value="online">{lang === 'ro' ? '100% Online (fără deplasare)' : '100% Online'}</option>
                    <option value="hybrid">{lang === 'ro' ? 'Hibrid (Online + Ghișeu)' : 'Hybrid (Online + Desk)'}</option>
                    <option value="in_person">{lang === 'ro' ? 'Prezență fizică la Ghișeu' : 'In-Person at Desk'}</option>
                  </select>
                </div>

                {/* Audience Filter */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    {t.catalog.filterAudience}
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                  >
                    <option value="all">{t.catalog.allAudiences}</option>
                    <option value="ro-citizen">{lang === 'ro' ? 'Cetățeni Români' : 'Romanian Citizens'}</option>
                    <option value="eu-citizen">{lang === 'ro' ? 'Cetățeni UE / SEE / Elveția' : 'EU / EEA / Swiss Citizens'}</option>
                    <option value="non-eu">{lang === 'ro' ? 'Cetățeni Non-UE' : 'Non-EU Nationals'}</option>
                    <option value="family-member">{lang === 'ro' ? 'Membri de familie' : 'Family Members'}</option>
                  </select>
                </div>
              </div>

              {/* Active filters status */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>
                  {filteredProcedures.length} {t.catalog.showingResults}
                </span>

                {(searchQuery || selectedCategory !== 'all' || selectedDomain !== 'all' || selectedChannel !== 'all' || selectedAudience !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDomain('all');
                      setSelectedChannel('all');
                      setSelectedAudience('all');
                    }}
                    className="text-amber-700 hover:underline font-semibold"
                  >
                    {t.catalog.resetFilters}
                  </button>
                )}
              </div>
            </div>

            {/* Grid */}
            {filteredProcedures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProcedures.map((procedure) => (
                  <ProcedureCard
                    key={procedure.id}
                    procedure={procedure}
                    lang={lang}
                    onSelect={(id) => handleNavigate('detail', id)}
                    isSaved={Boolean(checklists[procedure.id])}
                    onToggleSave={handleToggleSaveProcedure}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-slate-900 mb-1">{t.catalog.noResults}</h3>
                <p className="text-xs text-slate-500 mb-4">
                  {lang === 'ro' ? 'Încearcă să folosești termeni mai generali sau să resetezi filtrele.' : 'Try using more general keywords or resetting filters.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedAudience('all');
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
                >
                  {t.catalog.resetFilters}
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: PROCEDURE DETAIL */}
        {activeTab === 'detail' && currentProcedure && (
          <ProcedureDetail
            procedure={currentProcedure}
            lang={lang}
            onBack={() => handleNavigate('catalog')}
            checklistState={checklists[currentProcedure.id]}
            onToggleDocument={handleToggleDocument}
            onToggleStep={handleToggleStep}
            onToggleSaveProcedure={handleToggleSaveProcedure}
            isSaved={Boolean(checklists[currentProcedure.id])}
            onFindOffice={handleFindOfficeForProcedure}
          />
        )}

        {/* VIEW: LIFE EVENT WIZARD (NEW NATIONAL ASSISTANT) */}
        {activeTab === 'lifeEvents' && (
          <LifeEventWizard
            lang={lang}
            procedures={PROCEDURES}
            onSelectProcedure={(id) => handleNavigate('detail', id)}
            onFindOfficeForProcedure={handleFindOfficeForProcedure}
            savedProcedureIds={Object.keys(checklists)}
            onToggleSave={handleToggleSaveProcedure}
          />
        )}

        {/* VIEW: ADMINISTRATIVE OFFICE FINDER & MAP */}
        {activeTab === 'offices' && (
          <OfficeFinder
            lang={lang}
            onNavigateToProcedure={(id) => handleNavigate('detail', id)}
            initialServiceId={officeFinderServiceId}
            initialCountyCode={officeFinderCountyCode}
          />
        )}

        {/* VIEW 4: INTERNATIONAL CITIZENS & ORIENTATION WIZARD */}
        {activeTab === 'international' && (
          <OrientationWizard
            lang={lang}
            procedures={PROCEDURES}
            onSelectProcedure={(id) => handleNavigate('detail', id)}
            savedProcedureIds={Object.keys(checklists)}
            onToggleSave={handleToggleSaveProcedure}
          />
        )}

        {/* VIEW 5: DOCUMENT PREPARATION */}
        {activeTab === 'prep' && (
          <DocumentPrep lang={lang} />
        )}

        {/* VIEW 6: CHECKLIST MANAGER */}
        {activeTab === 'checklists' && (
          <ChecklistManager
            lang={lang}
            procedures={PROCEDURES}
            checklists={checklists}
            onSelectProcedure={(id) => handleNavigate('detail', id)}
            onRemoveProcedure={(id) => handleToggleSaveProcedure(id)}
            onUpdateNotes={handleUpdateNotes}
            onSetReminder={handleSetReminder}
            onClearAllData={handleClearAllData}
          />
        )}

        {/* VIEW 7: EDITORIAL WORKFLOW & STATUTORY REVIEW */}
        {activeTab === 'editorial' && (
          <EditorialWorkflow
            lang={lang}
            procedures={PROCEDURES}
            onSelectProcedure={(id) => handleNavigate('detail', id)}
          />
        )}

        {/* VIEW 8: SOURCE MONITOR & EDITORIAL REGISTRY */}
        {activeTab === 'sources' && (
          <SourceMonitor lang={lang} />
        )}

        {/* VIEW 9: ROEID INTEROPERABILITY ARCHITECTURE */}
        {activeTab === 'roeid' && (
          <RoeidSandbox lang={lang} />
        )}
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigate} />

      {/* Mobile Fixed Bottom Navigation for Android & Touch Web */}
      <MobileNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        lang={lang}
        savedCount={savedCount}
      />
    </div>
  );
}
