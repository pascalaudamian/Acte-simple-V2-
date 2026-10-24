import React, { useState, useEffect } from 'react';
import { OfficialSource, AuditLog, Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { OFFICIAL_SOURCES, INITIAL_AUDIT_LOGS } from '../data/sources';
import { ExternalLink, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, History, Lock, Unlock, X } from 'lucide-react';

interface SourceMonitorProps {
  lang: Language;
}

export const SourceMonitor: React.FC<SourceMonitorProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [sources, setSources] = useState<OfficialSource[]>(OFFICIAL_SOURCES);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [checkingId, setCheckingId] = useState<string | null>(null);
  const [reviewNote, setReviewNote] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // In-memory editor token state (never stored in localStorage/cookies)
  const [editorToken, setEditorToken] = useState<string>('');
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [isEditorAuthenticated, setIsEditorAuthenticated] = useState<boolean>(false);
  const [tokenInput, setTokenInput] = useState<string>('');

  // Fetch public sources
  useEffect(() => {
    fetch('/api/v1/sources')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setSources(data);
      })
      .catch(() => {});
  }, []);

  // Fetch protected audit logs if token is provided
  const loadAuditLogs = async (token: string) => {
    try {
      const res = await fetch('/api/v1/editorial/audit-logs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setAuditLogs(data);
          setIsEditorAuthenticated(true);
        }
      } else if (res.status === 401 || res.status === 403) {
        setIsEditorAuthenticated(false);
      }
    } catch (err) {
      console.warn('Failed to fetch protected audit logs.');
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    const token = tokenInput.trim();
    setEditorToken(token);
    loadAuditLogs(token);
    setShowAuthModal(false);
    setTokenInput('');
    setReviewNote({
      message: lang === 'ro' ? 'Sesiune editorială inițiată în memorie (fără stocare în cookies/localStorage).' : 'Editorial session initiated in memory (zero cookie/localStorage persistence).',
      type: 'info'
    });
    setTimeout(() => setReviewNote(null), 4000);
  };

  const handleLogout = () => {
    setEditorToken('');
    setIsEditorAuthenticated(false);
    setAuditLogs(INITIAL_AUDIT_LOGS.slice(0, 3));
    setReviewNote({
      message: lang === 'ro' ? 'Sesiune editorială închisă.' : 'Editorial session disconnected.',
      type: 'info'
    });
    setTimeout(() => setReviewNote(null), 3000);
  };

  const handleCheckSource = async (sourceId: string) => {
    if (!editorToken) {
      setReviewNote({
        message: lang === 'ro'
          ? 'Operațiune protejată: Este necesară autentificarea cu token editorial pentru a lansa verificări ale surselor oficiale.'
          : 'Protected operation: Editorial authentication token is required to execute source verification.',
        type: 'error'
      });
      setShowAuthModal(true);
      return;
    }

    setCheckingId(sourceId);
    try {
      const res = await fetch(`/api/v1/sources/${sourceId}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${editorToken}`
        },
        body: JSON.stringify({ actor: 'Redactor Autorizat (Sesiune Activă)' }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      const result = await res.json();
      if (result.source) {
        setSources((prev) => prev.map((s) => (s.id === sourceId ? result.source : s)));
      }
      if (result.auditLog) {
        setAuditLogs((prev) => [result.auditLog, ...prev]);
      }
      setReviewNote({
        message: lang === 'ro'
          ? 'Sursa oficială a fost verificată și persistată cu succes în baza de date.'
          : 'Official source verified and persisted in database.',
        type: 'success'
      });
      setTimeout(() => setReviewNote(null), 4000);
    } catch (err: any) {
      setReviewNote({
        message: `${lang === 'ro' ? 'Eroare de autorizare:' : 'Authorization error:'} ${err.message}`,
        type: 'error'
      });
      setTimeout(() => setReviewNote(null), 5000);
    } finally {
      setCheckingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Editorial Auth Control */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'ro' ? 'Integritate & Monitorizare Normativă' : 'Integrity & Legislative Monitoring'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {t.sources.title}
          </h1>
          <p className="text-sm text-slate-600">
            {t.sources.subtitle}
          </p>
        </div>

        {/* Editor Access Button */}
        <div className="no-print">
          {isEditorAuthenticated ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs">
              <Unlock className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">
                {lang === 'ro' ? 'Redacție Autentificată' : 'Editorial Authorized'}
              </span>
              <button
                onClick={handleLogout}
                className="ml-2 text-emerald-900 hover:text-red-700 underline text-[11px]"
              >
                {lang === 'ro' ? 'Deconectare' : 'Logout'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-sm transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'ro' ? 'Autentificare Redacție' : 'Editorial Access'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Review Notice Bar */}
      {reviewNote && (
        <div
          className={`mb-6 p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
            reviewNote.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : reviewNote.type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          {reviewNote.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{reviewNote.message}</span>
        </div>
      )}

      {/* Editorial Policy Safeguard Box */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed">
        <div className="font-bold text-white mb-1 flex items-center gap-2">
          <span>{lang === 'ro' ? 'Protocolul Editorial ActeSimple (Anti-Halucinație Juridică)' : 'ActeSimple Editorial Protocol (Legal Accuracy)'}</span>
        </div>
        <p className="text-slate-300">
          {lang === 'ro'
            ? 'ActeSimple NU publică modificări legislative automat doar în baza modificării unei pagini web sau prin interpretarea unui model lingvistic. Orice alertă de schimbare este supusă verificării umane de către juriști sau experți în administrație înainte de a fi publicată pe platformă.'
            : 'ActeSimple DOES NOT publish legal changes automatically based merely on scraped html diffs or language model interpretations. Any change alert is reviewed by human legal editors before updating public guides.'}
        </p>
      </div>

      {/* Official Sources Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">
            {lang === 'ro' ? 'Registrul Portalurilor Guvernamentale Monitorizate' : 'Monitored Government Portal Registry'}
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {sources.length} {lang === 'ro' ? 'surse active' : 'active sources'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">{t.sources.institutionHeader}</th>
                <th className="py-3 px-4">{t.sources.urlHeader}</th>
                <th className="py-3 px-4">{t.sources.statusHeader}</th>
                <th className="py-3 px-4">{t.sources.lastCheckedHeader}</th>
                <th className="py-3 px-4 text-right">{t.sources.actionHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sources.map((src) => {
                const isChecking = checkingId === src.id;
                return (
                  <tr key={src.id} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-medium text-slate-900 max-w-xs">
                      <div>{src.institutionName}</div>
                      <div className="text-[11px] text-slate-500">{src.authorityType}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={src.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 hover:text-amber-800 font-mono inline-flex items-center gap-1"
                      >
                        <span className="truncate max-w-[200px]">{src.sourceUrl.replace('https://', '').replace('http://', '')}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {src.status === 'verified' ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.sources.verifiedBadge}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          <span>{t.sources.changeNotice}</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">
                      {new Date(src.lastCheckedTimestamp).toLocaleDateString('ro-RO')} {new Date(src.lastCheckedTimestamp).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleCheckSource(src.id)}
                        disabled={isChecking}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded border text-[11px] font-semibold transition-colors disabled:opacity-50 ${
                          isEditorAuthenticated
                            ? 'border-amber-400 bg-amber-50 text-amber-900 hover:bg-amber-100'
                            : 'border-slate-300 text-slate-600 hover:bg-slate-100'
                        }`}
                        title={isEditorAuthenticated ? 'Lansează verificare oficială' : 'Necesită token redactor'}
                      >
                        <RefreshCw className={`w-3 h-3 ${isChecking ? 'animate-spin text-amber-600' : 'text-slate-500'}`} />
                        <span>{isChecking ? t.sources.checking : t.sources.runCheck}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editorial Audit Trail (Protected) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <History className="w-4 h-4 text-slate-500" />
            <span>{t.sources.auditLogTitle}</span>
          </h2>
          {!isEditorAuthenticated && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>{lang === 'ro' ? 'Acces complet protejat' : 'Full access protected'}</span>
            </span>
          )}
        </div>

        <div className="space-y-3">
          {auditLogs.slice(0, 8).map((log) => (
            <div
              key={log.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-start justify-between gap-4 text-xs"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 text-slate-500 mb-1 flex-wrap">
                  <span className="font-semibold text-slate-800">{log.actor}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-slate-600">
                    {new Date(log.timestamp).toLocaleDateString('ro-RO')} {new Date(log.timestamp).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {log.procedureTitle && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-medium">{log.procedureTitle}</span>
                    </>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Authentication Modal (Session Memory Only) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ro' ? 'Autentificare Redacție' : 'Editorial Access'}</span>
              </div>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              {lang === 'ro'
                ? 'Introduceți tokenul editorial configurat pe server. Tokenul este păstrat exclusiv în memoria temporară a sesiunii curente (nu se salvează pe disc sau în localStorage).'
                : 'Enter the server-configured editorial token. The token is stored strictly in current session memory (never persisted to disk or localStorage).'}
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  {lang === 'ro' ? 'Token de Securitate Editorială' : 'Editorial Security Token'}
                </label>
                <input
                  type="password"
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Bearer token..."
                  required
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowAuthModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  {lang === 'ro' ? 'Anulează' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  disabled={!tokenInput.trim()}
                  className="px-4 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50"
                >
                  {lang === 'ro' ? 'Autorizează' : 'Authorize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
