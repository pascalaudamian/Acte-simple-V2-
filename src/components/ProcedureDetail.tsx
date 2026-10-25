import React, { useState } from 'react';
import { Procedure, Language, UserChecklistState } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import {
  ArrowLeft,
  Building2,
  Clock,
  Coins,
  FileText,
  AlertTriangle,
  ExternalLink,
  Printer,
  Share2,
  BookmarkCheck,
  Bookmark,
  CheckCircle2,
  Circle,
  HelpCircle,
  Send,
  Calendar,
  ShieldCheck,
  MapPin
} from 'lucide-react';

interface ProcedureDetailProps {
  procedure: Procedure;
  lang: Language;
  onBack: () => void;
  checklistState?: UserChecklistState;
  onToggleDocument: (procedureId: string, docId: string) => void;
  onToggleStep: (procedureId: string, stepNumber: number) => void;
  onToggleSaveProcedure: (procedureId: string) => void;
  isSaved: boolean;
  onFindOffice?: (procedureId: string) => void;
}

export const ProcedureDetail: React.FC<ProcedureDetailProps> = ({
  procedure,
  lang,
  onBack,
  checklistState,
  onToggleDocument,
  onToggleStep,
  onToggleSaveProcedure,
  isSaved,
  onFindOffice,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const checkedDocs = checklistState?.checkedDocumentIds || [];
  const completedSteps = checklistState?.completedStepNumbers || [];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: procedure.title[lang],
          text: procedure.shortSummary[lang],
          url,
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setIsSubmittingFeedback(true);
    try {
      await fetch('/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          procedureId: procedure.id,
          message: feedbackText,
          type: 'procedure_improvement'
        }),
      });
      setFeedbackSent(true);
      setFeedbackText('');
    } catch (err) {
      // In local offline fallback, show success anyway
      setFeedbackSent(true);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const totalFee = procedure.fees.reduce((acc, f) => acc + f.amount, 0);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Utility Bar (No-Print) */}
      <div className="no-print flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'ro' ? 'Înapoi la catalog' : 'Back to catalog'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleSaveProcedure(procedure.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
              isSaved
                ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-sm'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? t.procedure.inChecklist : t.procedure.addToChecklist}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            title="Tipărește lista de verificare"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">{t.procedure.printChecklist}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            title={copiedLink ? (lang === 'ro' ? 'Link copiat!' : 'Copied!') : t.procedure.share}
          >
            <Share2 className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Main Document / Printable Content */}
      <div className="print-area bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm">
        {/* Header Metadata */}
        <div className="border-b border-slate-200 pb-6 mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 flex-wrap">
            <span className="font-semibold text-slate-800 uppercase tracking-wide">
              {procedure.institution.shortName}
            </span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'ro' ? 'Verificat oficial' : 'Officially verified'}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{procedure.lastVerifiedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight mb-4">
            {procedure.title[lang]}
          </h1>

          <p className="text-base text-slate-700 leading-relaxed max-w-3xl">
            {procedure.shortSummary[lang]}
          </p>
        </div>

        {/* Quick Facts Strip (4 Columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 mb-10 text-xs">
          <div>
            <div className="text-slate-500 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ro' ? 'Termen estimat' : 'Estimated time'}</span>
            </div>
            <div className="font-semibold text-slate-900 font-mono">
              {procedure.processingTime.standard.split('(')[0]}
            </div>
          </div>

          <div>
            <div className="text-slate-500 mb-1 flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ro' ? 'Total taxe' : 'Total fees'}</span>
            </div>
            <div className="font-semibold text-slate-900 font-mono">
              {totalFee === 0 ? (lang === 'ro' ? 'Gratuit' : 'Free') : `${totalFee} RON`}
            </div>
          </div>

          <div>
            <div className="text-slate-500 mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ro' ? 'Acte dosar' : 'Folder docs'}</span>
            </div>
            <div className="font-semibold text-slate-900 font-mono">
              {procedure.requiredDocuments.length} {lang === 'ro' ? 'documente' : 'documents'}
            </div>
          </div>

          <div>
            <div className="text-slate-500 mb-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{lang === 'ro' ? 'Canal depunere' : 'Filing channel'}</span>
            </div>
            <div className="font-semibold text-slate-900">
              {procedure.submissionChannel === 'online'
                ? '100% Online'
                : procedure.submissionChannel === 'hybrid'
                ? (lang === 'ro' ? 'Hibrid (Online + Ghișeu)' : 'Hybrid (Online + Desk)')
                : (lang === 'ro' ? 'Prezență la Ghișeu' : 'In person')}
            </div>
          </div>
        </div>

        {/* Channel & Office Finder Action Banner */}
        <div className="no-print mb-10 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 border-slate-200">
          <div>
            <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>
                {procedure.submissionChannel === 'online'
                  ? (lang === 'ro' ? 'Procedură disponibilă electronic' : 'Fully digital procedure')
                  : (lang === 'ro' ? 'Găsește ghișeul arondat localității tale' : 'Locate the assigned local desk in your county')}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-xl">
              {procedure.submissionChannel === 'online'
                ? (lang === 'ro'
                  ? 'Această procedură se poate iniția și soluționa direct online prin portalul securizat al statului.'
                  : 'This procedure can be initiated and solved online through the official state portal.')
                : (lang === 'ro'
                  ? 'Verifică adresa exactă a ghișeului, programul de lucru cu publicul și dacă este necesară programare prealabilă.'
                  : 'Check the exact office address, public hours, accessibility, and appointment requirements.')}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {procedure.submissionChannel !== 'online' && onFindOffice && (
              <button
                type="button"
                onClick={() => onFindOffice(procedure.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shadow-xs"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ro' ? 'Găsește ghișeul tău' : 'Find your office'}</span>
              </button>
            )}

            <a
              href={procedure.officialServiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:border-slate-400 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <span>{lang === 'ro' ? 'Portal Oficial' : 'Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Section 1: Who Needs This & Prerequisites */}
        <section className="mb-10 page-break-inside-avoid">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <span>01.</span>
            <span>{t.procedure.whoNeeds} & {t.procedure.prerequisites}</span>
          </h2>
          
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-sm text-slate-700 mb-4 leading-relaxed">
            <strong className="text-slate-900">{lang === 'ro' ? 'Public vizat:' : 'Target audience:'}</strong>{' '}
            {procedure.targetWho[lang]}
          </div>

          <ul className="space-y-2 text-sm text-slate-700">
            {procedure.prerequisites[lang].map((prereq, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2: Interactive Required Documents Checklist */}
        <section className="mb-10 page-break-inside-avoid">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>02.</span>
              <span>{t.procedure.requiredDocuments}</span>
            </h2>
            <span className="text-xs text-slate-500">
              {checkedDocs.length} / {procedure.requiredDocuments.length} {lang === 'ro' ? 'pregătite' : 'prepared'}
            </span>
          </div>

          <div className="space-y-3">
            {procedure.requiredDocuments.map((doc) => {
              const isChecked = checkedDocs.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => onToggleDocument(procedure.id, doc.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-amber-50/50 border-amber-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 text-slate-400 hover:text-amber-600 transition-colors shrink-0"
                    aria-label={isChecked ? 'Bifat' : 'Nebifat'}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 fill-amber-100" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap text-xs mb-1">
                      <span className="font-semibold text-slate-900 text-sm">
                        {doc.name[lang]}
                      </span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className={doc.isMandatory ? 'font-medium text-red-700' : 'text-slate-500'}>
                        {doc.isMandatory ? t.procedure.mandatory : t.procedure.optional}
                      </span>
                      {doc.isOriginalRequired && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-slate-600">{t.procedure.original}</span>
                        </>
                      )}
                      {doc.copyCount > 0 && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-slate-600">{doc.copyCount} {t.procedure.copies}</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {doc.description[lang]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 3: Step-by-Step Instructions */}
        <section className="mb-10 page-break-inside-avoid">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>03.</span>
            <span>{t.procedure.steps}</span>
          </h2>

          <div className="space-y-4">
            {procedure.steps.map((step) => {
              const isDone = completedSteps.includes(step.stepNumber);
              return (
                <div
                  key={step.stepNumber}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    onClick={() => onToggleStep(procedure.id, step.stepNumber)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    title={isDone ? 'Pas finalizat' : 'Marchează ca finalizat'}
                  >
                    {isDone ? '✓' : step.stepNumber}
                  </button>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      {step.title[lang]}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {step.description[lang]}
                    </p>

                    {step.locationOrUrl && (
                      <div className="no-print pt-1">
                        <a
                          href={step.locationOrUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
                        >
                          <span>{lang === 'ro' ? 'Deschide serviciul oficial dedicat' : 'Open official service portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 4: Fees and Payment Methods */}
        <section className="mb-10 page-break-inside-avoid">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span>04.</span>
            <span>{t.procedure.fees}</span>
          </h2>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">{lang === 'ro' ? 'Denumire Taxă' : 'Fee Description'}</th>
                  <th className="py-2.5 px-4">{lang === 'ro' ? 'Sumă' : 'Amount'}</th>
                  <th className="py-2.5 px-4">{lang === 'ro' ? 'Modalități de plată acceptate' : 'Payment methods'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {procedure.fees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-medium text-slate-900">{fee.description[lang]}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {fee.amount === 0 ? (lang === 'ro' ? '0 RON (Gratuit)' : 'Free') : `${fee.amount} ${fee.currency}`}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {fee.paymentMethods.join(' · ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Warnings & Legal Precautions */}
        {procedure.warnings.length > 0 && (
          <section className="mb-10 page-break-inside-avoid">
            <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>{t.procedure.warningTitle}</span>
            </h2>

            <div className="space-y-2">
              {procedure.warnings.map((warn, index) => (
                <div key={index} className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 leading-relaxed">
                  {warn[lang]}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 6: Official Authority, Legal Basis & Direct Verification */}
        <section className="border-t border-slate-200 pt-6 text-xs text-slate-600 space-y-3">
          <div className="flex items-start gap-2">
            <Building2 className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800">{t.procedure.institution}:</strong>{' '}
              <span>{procedure.institution.name}</span>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-slate-800">{t.procedure.legalBasis}:</strong>{' '}
              <a
                href={procedure.legalBasis.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 underline hover:text-amber-800 inline-flex items-center gap-1"
              >
                <span>{procedure.legalBasis.law}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <strong className="text-slate-800">{t.procedure.verifiedOn}:</strong>{' '}
              <span className="font-mono">{procedure.lastVerifiedDate}</span> ({t.procedure.verifiedStatus})
            </div>
          </div>

          <div className="no-print pt-2 flex flex-wrap items-center gap-3">
            <a
              href={procedure.officialServiceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>{t.procedure.officialLink}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            {onFindOffice && (
              <button
                onClick={() => onFindOffice(procedure.id)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-950" />
                <span>{lang === 'ro' ? 'Găsește un ghișeu arondat' : 'Find an assigned counter'}</span>
              </button>
            )}
          </div>
        </section>

        {/* Civic Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-[11px] leading-relaxed">
          {t.procedure.disclaimer}
        </div>
      </div>

      {/* Citizen Feedback / Improvement Box (No-Print) */}
      <section className="no-print mt-8 bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>{lang === 'ro' ? 'Ai observat o schimbare sau o neconcordanță?' : 'Spotted a change or discrepancy?'}</span>
        </h3>
        <p className="text-xs text-slate-600 mb-3">
          {lang === 'ro' 
            ? 'Spune-ne dacă o taxă, un program sau un document solicitat s-a modificat la ghișeul local. Redacția noastră va analiza și actualiza ghidul.'
            : 'Let us know if a fee, schedule, or required document was updated. Our editorial desk will investigate and update the guide.'}
        </p>

        {feedbackSent ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs">
            {lang === 'ro' 
              ? '✓ Mulțumim! Semnalarea ta a fost transmisă echipei editoriale.' 
              : '✓ Thank you! Your report has been submitted to the editorial desk.'}
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="flex gap-2">
            <input
              type="text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder={lang === 'ro' ? 'Ex: La sectorul 2 taxa se poate plăti și la ghișeu...' : 'e.g., At sector 2 fee can also be paid at the counter...'}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              disabled={isSubmittingFeedback || !feedbackText.trim()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === 'ro' ? 'Trimite' : 'Send'}</span>
            </button>
          </form>
        )}
      </section>
    </article>
  );
};
