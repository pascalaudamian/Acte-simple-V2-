import React from 'react';
import { Procedure, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { Clock, Building2, ChevronRight, BookmarkCheck, Bookmark, FileCheck2 } from 'lucide-react';

interface ProcedureCardProps {
  procedure: Procedure;
  lang: Language;
  onSelect: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const ProcedureCard: React.FC<ProcedureCardProps> = ({
  procedure,
  lang,
  onSelect,
  isSaved,
  onToggleSave,
}) => {
  const t = UI_TRANSLATIONS[lang];

  // Fee calculation summary
  const totalFee = procedure.fees.reduce((acc, fee) => acc + fee.amount, 0);
  const feeLabel = totalFee === 0 
    ? (lang === 'ro' ? 'Gratuit' : 'Free')
    : `${totalFee} RON`;

  const categoryLabels: Record<string, { ro: string; en: string }> = {
    identitate: { ro: 'Acte Identitate', en: 'Identity' },
    auto: { ro: 'Auto & Permise', en: 'Vehicles & Driving' },
    'stare-civila': { ro: 'Stare Civilă', en: 'Civil Status' },
    justitie: { ro: 'Justiție & Cazier', en: 'Justice & Records' },
    imigrare: { ro: 'Imigrare & Rezidență', en: 'Immigration & Residence' },
    sanatate: { ro: 'Sănătate (CNAS)', en: 'Health (CNAS)' },
    afaceri: { ro: 'Afaceri & Taxe (ANAF)', en: 'Business & Tax' }
  };

  const catName = categoryLabels[procedure.category]?.[lang] || procedure.category;

  return (
    <div 
      onClick={() => onSelect(procedure.id)}
      className="group relative bg-white border border-slate-200/90 rounded-xl p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-medium text-slate-700">{catName}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              {procedure.institution.shortName}
            </span>
          </div>

          {/* Quick Bookmark Toggle */}
          <button
            type="button"
            onClick={(e) => onToggleSave(procedure.id, e)}
            className={`p-1.5 rounded transition-colors ${
              isSaved
                ? 'text-amber-600 bg-amber-50 hover:bg-amber-100'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
            }`}
            title={isSaved ? t.procedure.inChecklist : t.procedure.addToChecklist}
            aria-label={isSaved ? t.procedure.inChecklist : t.procedure.addToChecklist}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
          {procedure.title[lang]}
        </h3>

        {/* Short Summary */}
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {procedure.shortSummary[lang]}
        </p>
      </div>

      {/* Footer Info Strip */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3 text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {procedure.processingTime.standard.split('(')[0].trim()}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="font-medium text-slate-700">
            {feeLabel}
          </span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span className="flex items-center gap-1 text-slate-500">
            <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
            {procedure.requiredDocuments.length} doc.
          </span>
        </div>

        <span className="inline-flex items-center text-amber-700 font-semibold group-hover:translate-x-0.5 transition-transform text-xs">
          <span>{lang === 'ro' ? 'Vezi ghidul' : 'View guide'}</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </span>
      </div>
    </div>
  );
};
