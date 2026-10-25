import React, { useState, useMemo } from 'react';
import { Language, AudienceType, Procedure } from '../types';
import { LIFE_EVENTS, ADMINISTRATIVE_DOMAINS } from '../data/taxonomy';
import { COUNTIES } from '../data/counties';
import {
  Baby,
  Heart,
  Building2,
  Home,
  Briefcase,
  Clock,
  GraduationCap,
  PlaneLanding,
  ShieldAlert,
  MapPin,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  Laptop,
  Building,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  Compass
} from 'lucide-react';

interface LifeEventWizardProps {
  lang: Language;
  procedures: Procedure[];
  onSelectProcedure: (id: string) => void;
  onFindOfficeForProcedure: (procedureId: string, countyCode?: string) => void;
  savedProcedureIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

const EVENT_ICON_MAP: Record<string, React.ElementType> = {
  Baby,
  Heart,
  Building2,
  Home,
  Briefcase,
  Clock,
  GraduationCap,
  PlaneLanding,
  ShieldAlert,
  MapPin
};

export const LifeEventWizard: React.FC<LifeEventWizardProps> = ({
  lang,
  procedures,
  onSelectProcedure,
  onFindOfficeForProcedure,
  savedProcedureIds,
  onToggleSave
}) => {
  const [selectedEventId, setSelectedEventId] = useState<string>('having_a_child');
  const [selectedAudience, setSelectedAudience] = useState<AudienceType>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('');

  const activeLifeEvent = useMemo(
    () => LIFE_EVENTS.find((e) => e.id === selectedEventId) || LIFE_EVENTS[0],
    [selectedEventId]
  );

  // Recommended Procedures based on event, audience, and domain
  const matchingProcedures = useMemo(() => {
    return procedures.filter((p) => {
      // 1. Life event match
      const eventMatch = p.lifeEvents?.includes(selectedEventId as any) ||
        (p.administrativeDomain && activeLifeEvent.recommendedDomains.includes(p.administrativeDomain));

      if (!eventMatch) return false;

      // 2. Audience match
      if (selectedAudience !== 'all') {
        const audienceOk = p.audience.includes(selectedAudience) || p.audience.includes('all');
        if (!audienceOk) return false;
      }

      return true;
    });
  }, [procedures, selectedEventId, activeLifeEvent, selectedAudience]);

  const audienceOptions: { id: AudienceType; label: { ro: string; en: string } }[] = [
    { id: 'all', label: { ro: 'Oricare statut civic', en: 'Any civic status' } },
    { id: 'ro-citizen', label: { ro: 'Cetățean Român', en: 'Romanian Citizen' } },
    { id: 'eu-citizen', label: { ro: 'Cetățean UE / SEE / Elveția', en: 'EU / EEA / Swiss Citizen' } },
    { id: 'non-eu', label: { ro: 'Cetățean Non-UE (Stat Terț)', en: 'Non-EU Third-Country Citizen' } },
    { id: 'family-member', label: { ro: 'Membru de Familie', en: 'Family Member' } }
  ];

  const handleReset = () => {
    setSelectedEventId('having_a_child');
    setSelectedAudience('all');
    setSelectedCounty('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner */}
      <div className="mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-md border border-slate-700/60">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {lang === 'ro'
                ? 'Ghidaj civic aliniat cu Catalogul Național ROePAS & ServiciiPublice.gov.ro'
                : 'Civic guidance aligned with ROePAS & ServiciiPublice.gov.ro national portals'}
            </span>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ro' ? 'Resetează selecția' : 'Reset selections'}</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          {lang === 'ro'
            ? 'Asistentul Tău pentru Etape de Viață & Servicii Publice'
            : 'Your Life Events & Romanian Public Services Assistant'}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {lang === 'ro'
            ? 'Alege situația în care te afli pentru a primi foaia de parcurs cu procedurile oficiale necesare, documentele cerute, termenele legale și ghișeele din județul tău.'
            : 'Select your life situation to receive a tailored roadmap of official administrative procedures, required documents, deadlines, and local offices.'}
        </p>
      </div>

      {/* Grid: Left Column Controls, Right Column Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Step 1: Life Event Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {lang === 'ro' ? '1. Evenimentul tău de viață' : '1. Your Life Event'}
              </span>
              <span className="text-xs text-amber-600 font-semibold font-mono">
                {LIFE_EVENTS.length} {lang === 'ro' ? 'evenimente' : 'events'}
              </span>
            </div>

            <div className="space-y-1.5">
              {LIFE_EVENTS.map((event) => {
                const IconComponent = EVENT_ICON_MAP[event.iconName] || Compass;
                const isSelected = selectedEventId === event.id;

                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-all ${
                      isSelected
                        ? 'bg-amber-50 border-2 border-amber-500 text-slate-900 shadow-xs'
                        : 'border border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-md shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold leading-snug">
                        {event.title[lang]}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {event.description[lang]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Citizenship & Residency Profile */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
              {lang === 'ro' ? '2. Statutul tău de cetățenie / rezidență' : '2. Your Citizenship Status'}
            </span>

            <div className="grid grid-cols-1 gap-1.5">
              {audienceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedAudience(opt.id)}
                  className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedAudience === opt.id
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {opt.label[lang]}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: County Selector (Optional Local Arondare) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <label htmlFor="county-selector" className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              {lang === 'ro' ? '3. Județul tău (pentru ghișee arondate)' : '3. Your County (for local desks)'}
            </label>
            <select
              id="county-selector"
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="w-full text-sm rounded-lg border-slate-300 bg-white p-2.5 border focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">
                {lang === 'ro' ? '— Toate județele (41 + București) —' : '— All counties (41 + Bucharest) —'}
              </option>
              {COUNTIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name[lang]} ({c.code}) — {c.capital}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-2">
              {lang === 'ro'
                ? 'Dacă alegi județul, te vom direcționa automat către biroul arondat din localitatea ta.'
                : 'Select your county to automatically map the designated local administrative office.'}
            </p>
          </div>
        </div>

        {/* Results & Roadmap Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Event Overview Header Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 rounded-lg bg-amber-100 text-amber-800 font-bold text-sm">
                {lang === 'ro' ? 'Foaie de Parcurs' : 'Roadmap'}
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                {activeLifeEvent.title[lang]}
              </h2>
            </div>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed">
              {activeLifeEvent.description[lang]}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span>
                {lang === 'ro' ? 'Domenii administrative asociate:' : 'Related administrative domains:'}
              </span>
              {activeLifeEvent.recommendedDomains.map((domId) => {
                const dom = ADMINISTRATIVE_DOMAINS.find((d) => d.id === domId);
                return (
                  <span
                    key={domId}
                    className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium border border-slate-200"
                  >
                    {dom?.name[lang] || domId}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Procedures List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {lang === 'ro'
                    ? `Proceduri oficiale aplicabile (${matchingProcedures.length})`
                    : `Applicable official procedures (${matchingProcedures.length})`}
                </span>
              </h3>
            </div>

            {matchingProcedures.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-600 font-medium">
                  {lang === 'ro'
                    ? 'Nu a fost găsită nicio procedură pentru combinația de criterii selectată.'
                    : 'No procedures found for the selected criteria combination.'}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-3 text-xs text-amber-700 font-semibold hover:underline"
                >
                  {lang === 'ro' ? 'Resetează filtrele' : 'Reset filters'}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {matchingProcedures.map((procedure, index) => {
                  const isSaved = savedProcedureIds.includes(procedure.id);
                  const channel = procedure.submissionChannel || (procedure.isOnlineSubmissionPossible ? 'online' : 'in_person');

                  return (
                    <div
                      key={procedure.id}
                      className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 p-5 shadow-xs transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                            {index + 1}
                          </span>

                          {/* Submission Channel Badge */}
                          {channel === 'online' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Laptop className="w-3 h-3" />
                              <span>100% Online</span>
                            </span>
                          )}
                          {channel === 'hybrid' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                              <Laptop className="w-3 h-3" />
                              <span>+</span>
                              <Building className="w-3 h-3" />
                              <span>{lang === 'ro' ? 'Hibrid (Online + Ghișeu)' : 'Hybrid'}</span>
                            </span>
                          )}
                          {channel === 'in_person' && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                              <Building className="w-3 h-3" />
                              <span>{lang === 'ro' ? 'Prezență la Ghișeu' : 'In-Person'}</span>
                            </span>
                          )}

                          <span className="text-[11px] text-slate-500 font-medium">
                            {procedure.institution.shortName}
                          </span>
                        </div>

                        {/* Save to Checklist button */}
                        <button
                          onClick={(e) => onToggleSave(procedure.id, e)}
                          title={isSaved ? 'Salvat în checklist' : 'Salvează în checklist'}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isSaved
                              ? 'bg-amber-500 text-slate-950 border-amber-600'
                              : 'bg-slate-50 text-slate-500 border-slate-200 hover:text-slate-800'
                          }`}
                        >
                          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>

                      <h4
                        onClick={() => onSelectProcedure(procedure.id)}
                        className="text-base font-bold text-slate-900 hover:text-amber-600 cursor-pointer transition-colors mb-2"
                      >
                        {procedure.title[lang]}
                      </h4>

                      <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {procedure.shortSummary[lang]}
                      </p>

                      {/* Quick Meta: Fees & Legal Deadline */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 rounded-lg p-2.5 mb-4 border border-slate-100">
                        <div>
                          <span className="text-slate-500 font-medium">
                            {lang === 'ro' ? 'Cost administrativ:' : 'Administrative fee:'}
                          </span>{' '}
                          <strong className="text-slate-800">
                            {procedure.fees.length === 0 || procedure.fees[0].amount === 0
                              ? lang === 'ro' ? 'Gratuit (fără taxă)' : 'Free of charge'
                              : `${procedure.fees[0].amount} ${procedure.fees[0].currency}`}
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 font-medium">
                            {lang === 'ro' ? 'Termen de soluționare:' : 'Processing time:'}
                          </span>{' '}
                          <span className="text-slate-800">
                            {procedure.processingTime.standard}
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectProcedure(procedure.id)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-amber-600 py-1"
                          >
                            <span>{lang === 'ro' ? 'Vezi ghidul complet' : 'Read guide'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          {/* Find Office button */}
                          <button
                            onClick={() => onFindOfficeForProcedure(procedure.id, selectedCounty)}
                            className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded"
                          >
                            <MapPin className="w-3.5 h-3.5 text-slate-700" />
                            <span>
                              {selectedCounty
                                ? lang === 'ro' ? `Ghișeu în ${selectedCounty}` : `Office in ${selectedCounty}`
                                : lang === 'ro' ? 'Găsește ghișeu' : 'Find office'}
                            </span>
                          </button>
                        </div>

                        {/* Official Link */}
                        <a
                          href={procedure.officialServiceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-medium"
                        >
                          <span>{lang === 'ro' ? 'Portal oficial de stat' : 'Official gov portal'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
