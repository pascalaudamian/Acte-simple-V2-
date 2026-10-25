import React, { useState, useMemo } from 'react';
import { Language, Procedure, EditorialStatus, AuditLog } from '../types';
import { ADMINISTRATIVE_DOMAINS } from '../data/taxonomy';
import {
  ShieldCheck,
  Clock,
  AlertTriangle,
  FileCheck2,
  Lock,
  Unlock,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit3,
  Calendar,
  Layers,
  Building,
  Laptop
} from 'lucide-react';

interface EditorialWorkflowProps {
  lang: Language;
  procedures: Procedure[];
  onSelectProcedure: (id: string) => void;
}

export const EditorialWorkflow: React.FC<EditorialWorkflowProps> = ({
  lang,
  procedures,
  onSelectProcedure
}) => {
  const [editorToken, setEditorToken] = useState<string>('');
  const [isTokenSaved, setIsTokenSaved] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [domainFilter, setDomainFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedForReview, setSelectedForReview] = useState<Procedure | null>(null);
  const [reviewNote, setReviewNote] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('Redactor Juridic');
  const [localStatuses, setLocalStatuses] = useState<Record<string, EditorialStatus>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Status computation taking into account local state overrides
  const enrichedProcedures = useMemo(() => {
    return procedures.map((p) => {
      const currentStatus = localStatuses[p.id] || p.editorialStatus || 'verified';
      return {
        ...p,
        currentStatus
      };
    });
  }, [procedures, localStatuses]);

  // Statistics
  const stats = useMemo(() => {
    const verified = enrichedProcedures.filter((p) => p.currentStatus === 'verified').length;
    const pending = enrichedProcedures.filter((p) => p.currentStatus === 'pending_review').length;
    const draft = enrichedProcedures.filter((p) => p.currentStatus === 'draft').length;
    const outdated = enrichedProcedures.filter((p) => p.currentStatus === 'outdated').length;
    return {
      total: enrichedProcedures.length,
      verified,
      pending,
      draft,
      outdated
    };
  }, [enrichedProcedures]);

  // Filtered List
  const filteredProcedures = useMemo(() => {
    return enrichedProcedures.filter((p) => {
      if (statusFilter !== 'all' && p.currentStatus !== statusFilter) return false;
      if (domainFilter !== 'all' && p.administrativeDomain !== domainFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const roMatch = p.title.ro.toLowerCase().includes(q) || p.institution.name.toLowerCase().includes(q);
        const enMatch = p.title.en.toLowerCase().includes(q);
        if (!roMatch && !enMatch) return false;
      }
      return true;
    });
  }, [enrichedProcedures, statusFilter, domainFilter, searchQuery]);

  const handleUpdateStatus = async (newStatus: EditorialStatus) => {
    if (!selectedForReview) return;
    setIsSubmitting(true);
    setFeedbackMessage(null);

    // Update local state immediately
    setLocalStatuses((prev) => ({
      ...prev,
      [selectedForReview.id]: newStatus
    }));

    try {
      // If an editor token is provided, send real audit log to server API
      if (editorToken.trim()) {
        const response = await fetch('/api/v1/sources/src-dgep-mai/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${editorToken.trim()}`
          },
          body: JSON.stringify({
            actor: reviewerName,
            notes: `Revizie statut procedură [${selectedForReview.id}] -> ${newStatus}. ${reviewNote}`
          })
        });

        if (!response.ok && response.status !== 503) {
          const err = await response.json();
          throw new Error(err.error || 'Eroare la autorizarea pe server.');
        }
      }

      setFeedbackMessage({
        type: 'success',
        text: lang === 'ro'
          ? `Statutul procedurii a fost actualizat cu succes în [${newStatus.toUpperCase()}].`
          : `Procedure status updated successfully to [${newStatus.toUpperCase()}].`
      });

      setTimeout(() => {
        setSelectedForReview(null);
        setReviewNote('');
      }, 1200);
    } catch (err: any) {
      setFeedbackMessage({
        type: 'error',
        text: err.message || (lang === 'ro' ? 'Eroare la actualizarea statutului.' : 'Error updating status.')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Editorial Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'ro' ? 'Redacție & Asigurarea Calității Legale' : 'Editorial & Legal Quality Assurance'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          {lang === 'ro' ? 'Fluxul Editorial de Aprobare și Verificare' : 'Editorial Review & Publication Workflow'}
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          {lang === 'ro'
            ? 'Fiecare procedură din ActeSimple este supusă unei verificări normative stricte bazate pe legislația românească (ROePAS / Monitorul Oficial), prevenind halucinațiile juridice și taxele inexacte.'
            : 'Every ActeSimple procedure undergoes rigorous statutory verification against official Romanian legislation, preventing legal hallucinations or inaccurate fees.'}
        </p>
      </div>

      {/* Editorial Status Stats KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">{lang === 'ro' ? 'Total Proceduri' : 'Total Procedures'}</div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{stats.total}</div>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 shadow-xs">
          <div className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'ro' ? 'Verificate (Publicate)' : 'Verified (Published)'}</span>
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-1 font-mono">{stats.verified}</div>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200 shadow-xs">
          <div className="text-xs text-amber-800 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ro' ? 'În Revizie' : 'Pending Review'}</span>
          </div>
          <div className="text-2xl font-black text-amber-900 mt-1 font-mono">{stats.pending}</div>
        </div>

        <div className="bg-slate-100/80 p-4 rounded-xl border border-slate-300 shadow-xs">
          <div className="text-xs text-slate-700 font-semibold flex items-center gap-1">
            <Edit3 className="w-3.5 h-3.5 text-slate-500" />
            <span>{lang === 'ro' ? 'Ciornă / Draft' : 'Draft / New'}</span>
          </div>
          <div className="text-2xl font-black text-slate-800 mt-1 font-mono">{stats.draft}</div>
        </div>

        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs text-rose-800 font-semibold flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>{lang === 'ro' ? 'Necesită Actualizare' : 'Requires Update'}</span>
          </div>
          <div className="text-2xl font-black text-rose-900 mt-1 font-mono">{stats.outdated}</div>
        </div>
      </div>

      {/* Editor Bearer Token Authentication Box */}
      <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${isTokenSaved ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-amber-400'}`}>
              {isTokenSaved ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{lang === 'ro' ? 'Autentificare Redacție Securizată' : 'Protected Editorial Authorization'}</span>
                {isTokenSaved && (
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                    AUTORIZAT
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {lang === 'ro'
                  ? 'Operațiunile privilegiate de aprobare folosesc antetul Bearer și variabile de mediu de server.'
                  : 'Privileged review operations use Bearer authorization and server-side env variables.'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="password"
              placeholder={lang === 'ro' ? 'Introdu tokenul editorial...' : 'Enter editor token...'}
              value={editorToken}
              onChange={(e) => {
                setEditorToken(e.target.value);
                setIsTokenSaved(Boolean(e.target.value.trim()));
              }}
              className="text-xs bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 focus:ring-1 focus:ring-amber-400 focus:outline-none w-full sm:w-60 font-mono"
            />
            {isTokenSaved && (
              <button
                onClick={() => {
                  setEditorToken('');
                  setIsTokenSaved(false);
                }}
                className="text-xs text-slate-400 hover:text-white px-2 py-2"
              >
                {lang === 'ro' ? 'Curăță' : 'Clear'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1 max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={lang === 'ro' ? 'Caută procedură sau instituție...' : 'Search procedure or institution...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 bg-white p-2 focus:outline-none"
          >
            <option value="all">{lang === 'ro' ? 'Toate statusurile' : 'All statuses'}</option>
            <option value="verified">{lang === 'ro' ? 'Verificate (Publicate)' : 'Verified (Published)'}</option>
            <option value="pending_review">{lang === 'ro' ? 'În Revizie' : 'Pending Review'}</option>
            <option value="draft">{lang === 'ro' ? 'Ciornă / Draft' : 'Draft'}</option>
            <option value="outdated">{lang === 'ro' ? 'Necesită Actualizare' : 'Outdated'}</option>
          </select>

          {/* Domain Filter */}
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 bg-white p-2 focus:outline-none"
          >
            <option value="all">{lang === 'ro' ? 'Toate cele 10 domenii' : 'All 10 domains'}</option>
            {ADMINISTRATIVE_DOMAINS.map((dom) => (
              <option key={dom.id} value={dom.id}>
                {dom.name[lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-slate-500 font-mono">
          {filteredProcedures.length} {lang === 'ro' ? 'proceduri afișate' : 'procedures listed'}
        </div>
      </div>

      {/* Procedures Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">{lang === 'ro' ? 'Procedură & Instituție' : 'Procedure & Institution'}</th>
                <th className="py-3 px-4">{lang === 'ro' ? 'Domeniu Oficial' : 'Official Domain'}</th>
                <th className="py-3 px-4">{lang === 'ro' ? 'Canal' : 'Channel'}</th>
                <th className="py-3 px-4">{lang === 'ro' ? 'Baza Legală' : 'Legal Basis'}</th>
                <th className="py-3 px-4">{lang === 'ro' ? 'Ultima Verificare' : 'Last Verified'}</th>
                <th className="py-3 px-4">{lang === 'ro' ? 'Statut Editorial' : 'Editorial Status'}</th>
                <th className="py-3 px-4 text-right">{lang === 'ro' ? 'Acțiuni' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProcedures.map((proc) => {
                const domain = ADMINISTRATIVE_DOMAINS.find((d) => d.id === proc.administrativeDomain);
                const channel = proc.submissionChannel || (proc.isOnlineSubmissionPossible ? 'online' : 'in_person');

                return (
                  <tr key={proc.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs">
                      <div className="font-bold text-slate-900 hover:text-amber-600 cursor-pointer" onClick={() => onSelectProcedure(proc.id)}>
                        {proc.title[lang]}
                      </div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {proc.institution.shortName}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {domain ? domain.name[lang] : proc.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {channel === 'online' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Laptop className="w-3 h-3" />
                          <span>Online</span>
                        </span>
                      )}
                      {channel === 'hybrid' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <Laptop className="w-3 h-3" />
                          <span>Hibrid</span>
                        </span>
                      )}
                      {channel === 'in_person' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <Building className="w-3 h-3" />
                          <span>Ghișeu</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-xs text-[11px] text-slate-600">
                      <div className="truncate" title={proc.legalBasis.law}>
                        {proc.legalBasis.law}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {proc.lastVerifiedDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {proc.currentStatus === 'verified' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{lang === 'ro' ? 'Verificat' : 'Verified'}</span>
                        </span>
                      )}
                      {proc.currentStatus === 'pending_review' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>{lang === 'ro' ? 'În Revizie' : 'Pending'}</span>
                        </span>
                      )}
                      {proc.currentStatus === 'draft' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-200 text-slate-800 border border-slate-300">
                          <Edit3 className="w-3 h-3 text-slate-600" />
                          <span>{lang === 'ro' ? 'Ciornă' : 'Draft'}</span>
                        </span>
                      )}
                      {proc.currentStatus === 'outdated' && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-300">
                          <AlertTriangle className="w-3 h-3 text-rose-600" />
                          <span>{lang === 'ro' ? 'Învechit' : 'Outdated'}</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedForReview(proc);
                          setFeedbackMessage(null);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>{lang === 'ro' ? 'Revizuiește' : 'Review'}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal / Drawer */}
      {selectedForReview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                  {lang === 'ro' ? 'Panou de Revizuire Editorială' : 'Editorial Review Panel'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {selectedForReview.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForReview(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Verification Metadata Box */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-5">
              <div>
                <span className="text-slate-500 font-medium">{lang === 'ro' ? 'Instituție responsabilă:' : 'Institution:'}</span>{' '}
                <strong className="text-slate-800">{selectedForReview.institution.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">{lang === 'ro' ? 'Bază legală atestată:' : 'Statutory legal basis:'}</span>{' '}
                <span className="text-slate-800">{selectedForReview.legalBasis.law}</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium">{lang === 'ro' ? 'Sursă oficială statutară:' : 'Official source portal:'}</span>{' '}
                <a
                  href={selectedForReview.officialServiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-700 hover:underline font-mono inline-flex items-center gap-1"
                >
                  <span>{selectedForReview.officialServiceUrl}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Note & Actor Inputs */}
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {lang === 'ro' ? 'Nume redactor / verificator:' : 'Reviewer name:'}
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {lang === 'ro' ? 'Notă de revizie / justificare normativă:' : 'Review note / statutory justification:'}
                </label>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder={
                    lang === 'ro'
                      ? 'Ex: Verificat conform noilor norme din Monitorul Oficial nr. ...'
                      : 'Ex: Verified against updated statutory decree...'
                  }
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            {feedbackMessage && (
              <div
                className={`p-3 rounded-lg text-xs mb-4 font-medium flex items-center gap-2 ${
                  feedbackMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {feedbackMessage.text}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedForReview(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                {lang === 'ro' ? 'Anulează' : 'Cancel'}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleUpdateStatus('pending_review')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
              >
                {lang === 'ro' ? 'Trimite în Revizie' : 'Mark as Pending'}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleUpdateStatus('outdated')}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200"
              >
                {lang === 'ro' ? 'Marchează Învechit' : 'Mark as Outdated'}
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleUpdateStatus('verified')}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'ro' ? 'Aprobă & Marchează Verificat' : 'Approve & Verify'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
