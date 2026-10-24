import React, { useState } from 'react';
import { Language, AudienceType, Procedure } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { Compass, ArrowRight, RotateCcw, Check, UserCheck, ShieldAlert } from 'lucide-react';
import { ProcedureCard } from './ProcedureCard';

interface OrientationWizardProps {
  lang: Language;
  procedures: Procedure[];
  onSelectProcedure: (id: string) => void;
  savedProcedureIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const OrientationWizard: React.FC<OrientationWizardProps> = ({
  lang,
  procedures,
  onSelectProcedure,
  savedProcedureIds,
  onToggleSave,
}) => {
  const t = UI_TRANSLATIONS[lang];

  // Wizard state: Step 1 (Citizenship Profile), Step 2 (Goal / Purpose)
  const [citizenship, setCitizenship] = useState<AudienceType | null>(null);
  const [purpose, setPurpose] = useState<string | null>(null);
  const [duration, setDuration] = useState<'short' | 'long' | null>(null);

  const resetWizard = () => {
    setCitizenship(null);
    setPurpose(null);
    setDuration(null);
  };

  // Filter recommendations based on answers
  const recommendedProcedures = procedures.filter((p) => {
    if (!citizenship) return false;

    // Check citizenship match
    const audienceMatch = p.audience.includes(citizenship) || p.audience.includes('all');
    if (!audienceMatch) return false;

    // If purpose selected
    if (purpose) {
      if (purpose === 'identity' && p.category !== 'identitate' && p.category !== 'stare-civila') return false;
      if (purpose === 'auto' && p.category !== 'auto') return false;
      if (purpose === 'work' && p.category !== 'imigrare' && p.category !== 'afaceri') return false;
      if (purpose === 'health' && p.category !== 'sanatate') return false;
      if (purpose === 'tax' && p.category !== 'afaceri') return false;
    }

    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Intro Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
          <Compass className="w-4 h-4" />
          <span>{lang === 'ro' ? 'Modul Ghidare & Cetățeni Internaționali' : 'Guidance & International Citizens Module'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          {t.wizard.title}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          {t.wizard.subtitle}
        </p>
      </div>

      {/* Privacy Notice on Data Minimization */}
      <div className="mb-8 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
        <UserCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800">{lang === 'ro' ? 'Confidențialitate garantată:' : 'Privacy guarantee:'}</strong>{' '}
          {lang === 'ro'
            ? 'Răspunsurile tale sunt procesate exclusiv în browser. Nu colectăm nume, date de contact, CNP sau date de identificare în timpul orientării.'
            : 'Your answers are processed strictly in your local browser memory. We never store personal identity numbers, names, or contact data.'}
        </div>
      </div>

      {/* Wizard Steps Form */}
      <div className="space-y-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        {/* Step 1: Citizenship Profile */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-3">
            <span className="text-amber-600 mr-2">1.</span>
            {t.wizard.q1}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { id: 'ro-citizen', label: t.wizard.q1_opt1, desc: lang === 'ro' ? 'Deții cetățenie română' : 'Hold Romanian citizenship' },
              { id: 'eu-citizen', label: t.wizard.q1_opt2, desc: lang === 'ro' ? 'Franța, Germania, Italia, Spania, etc.' : 'EU / EEA / Switzerland passport' },
              { id: 'non-eu', label: t.wizard.q1_opt3, desc: lang === 'ro' ? 'State din afara Uniunii Europene' : 'Third-country nationals' },
              { id: 'family-member', label: t.wizard.q1_opt4, desc: lang === 'ro' ? 'Căsătorit sau rudă de gradul 1' : 'Spouse, child, dependent parent' }
            ].map((opt) => {
              const isSelected = citizenship === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCitizenship(opt.id as AudienceType)}
                  className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 mb-0.5">{opt.label}</div>
                    <div className="text-[11px] text-slate-500">{opt.desc}</div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Purpose / Objective (Unlocks once citizenship is selected) */}
        {citizenship && (
          <div className="pt-6 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              <span className="text-amber-600 mr-2">2.</span>
              {t.wizard.q2}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'identity', label: t.wizard.q2_identity },
                { id: 'work', label: t.wizard.q2_work },
                { id: 'auto', label: t.wizard.q2_auto },
                { id: 'health', label: t.wizard.q2_health },
                { id: 'tax', label: lang === 'ro' ? 'Număr de Identificare Fiscală (NIF / ANAF)' : 'Tax Number (NIF / ANAF)' }
              ].map((opt) => {
                const isSelected = purpose === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setPurpose(opt.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs font-medium ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-500 ring-1 ring-amber-500 text-slate-900 font-semibold'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-700 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        {citizenship && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
            <button
              onClick={resetWizard}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ro' ? 'Reia chestionarul' : 'Reset answers'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Recommendations Output */}
      {citizenship && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900">
              {t.wizard.recommendations} ({recommendedProcedures.length})
            </h2>
          </div>

          {recommendedProcedures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedProcedures.map((proc) => (
                <ProcedureCard
                  key={proc.id}
                  procedure={proc}
                  lang={lang}
                  onSelect={onSelectProcedure}
                  isSaved={savedProcedureIds.includes(proc.id)}
                  onToggleSave={onToggleSave}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white border border-slate-200 rounded-xl">
              <p className="text-sm text-slate-600 mb-2">{t.wizard.noMatch}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
