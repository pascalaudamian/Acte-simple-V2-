import React, { useState } from 'react';
import { Procedure, Language, UserChecklistState } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import {
  BookmarkCheck,
  Trash2,
  Bell,
  Calendar,
  CheckCircle2,
  Printer,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';

interface ChecklistManagerProps {
  lang: Language;
  procedures: Procedure[];
  checklists: Record<string, UserChecklistState>;
  onSelectProcedure: (id: string) => void;
  onRemoveProcedure: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onSetReminder: (id: string, date: string, label: string) => void;
  onClearAllData: () => void;
}

export const ChecklistManager: React.FC<ChecklistManagerProps> = ({
  lang,
  procedures,
  checklists,
  onSelectProcedure,
  onRemoveProcedure,
  onUpdateNotes,
  onSetReminder,
  onClearAllData,
}) => {
  const t = UI_TRANSLATIONS[lang];
  const savedIds = Object.keys(checklists);
  const savedProcedures = procedures.filter((p) => savedIds.includes(p.id));

  const [reminderModalId, setReminderModalId] = useState<string | null>(null);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderNote, setReminderNote] = useState('');

  const handleSaveReminder = (id: string) => {
    if (!reminderDate) return;
    onSetReminder(id, reminderDate, reminderNote || 'Programare / Expirare act');
    setReminderModalId(null);
    setReminderDate('');
    setReminderNote('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            {t.checklist.title}
          </h1>
          <p className="text-sm text-slate-600">
            {t.checklist.subtitle}
          </p>
        </div>

        {savedProcedures.length > 0 && (
          <div className="no-print flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>{lang === 'ro' ? 'Tipărește dosarele' : 'Print folders'}</span>
            </button>
            <button
              onClick={onClearAllData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>{t.checklist.clearAllData}</span>
            </button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {savedProcedures.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm">
          <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-base font-bold text-slate-900 mb-2">
            {t.checklist.empty}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {lang === 'ro' 
              ? 'Bifează butonul „Salvează în checklist” de pe pagina oricărei proceduri pentru a-ți urmări actele adunate și termenele limită.' 
              : 'Click "Save to checklist" on any procedure guide to track your collected documents and upcoming deadlines.'}
          </p>
        </div>
      ) : (
        /* Saved Procedures List */
        <div className="space-y-6">
          {savedProcedures.map((proc) => {
            const state = checklists[proc.id] || {
              checkedDocumentIds: [],
              completedStepNumbers: [],
              notes: '',
              savedAt: '',
              lastUpdated: ''
            };
            const checkedCount = state.checkedDocumentIds.length;
            const totalDocs = proc.requiredDocuments.length;
            const progressPct = totalDocs > 0 ? Math.round((checkedCount / totalDocs) * 100) : 0;

            return (
              <div
                key={proc.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Item Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1 flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">{proc.institution.shortName}</span>
                        <span aria-hidden="true">·</span>
                        <span>{proc.processingTime.standard.split('(')[0]}</span>
                      </div>
                      <h2
                        onClick={() => onSelectProcedure(proc.id)}
                        className="text-base sm:text-lg font-bold text-slate-900 hover:text-amber-700 transition-colors cursor-pointer"
                      >
                        {proc.title[lang]}
                      </h2>
                    </div>

                    <div className="no-print flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setReminderModalId(proc.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          state.reminderDate
                            ? 'bg-amber-50 border-amber-300 text-amber-800'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                        title={state.reminderDate ? `Memento: ${state.reminderDate}` : t.checklist.addReminder}
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveProcedure(proc.id)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                        title={t.checklist.deleteProcedure}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar & Counter */}
                  <div className="my-4">
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
                      <span>{t.checklist.progress} ({checkedCount}/{totalDocs} {t.checklist.documentsChecked})</span>
                      <span className="font-mono font-bold text-slate-900">{progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Reminder Pill if Set */}
                  {state.reminderDate && (
                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
                      <Calendar className="w-3.5 h-3.5 text-amber-700" />
                      <span className="font-medium">{state.reminderLabel || 'Memento'}:</span>
                      <span className="font-mono font-semibold">{state.reminderDate}</span>
                    </div>
                  )}

                  {/* Personal Notes (Local Only) */}
                  <div className="mt-3">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      {lang === 'ro' ? 'Notițe personale (salvate doar pe acest dispozitiv)' : 'Personal Notes (local only)'}
                    </label>
                    <textarea
                      rows={2}
                      value={state.notes || ''}
                      onChange={(e) => onUpdateNotes(proc.id, e.target.value)}
                      placeholder={t.checklist.notesPlaceholder}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-slate-700 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Footer link to open detail */}
                <div className="no-print pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">
                    {lang === 'ro' ? 'Salvat la' : 'Saved on'} {state.savedAt ? new Date(state.savedAt).toLocaleDateString('ro-RO') : 'Recent'}
                  </span>
                  <button
                    onClick={() => onSelectProcedure(proc.id)}
                    className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-800"
                  >
                    <span>{lang === 'ro' ? 'Deschide dosarul complet' : 'Open complete folder'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Reminder Setting Modal */}
      {reminderModalId && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span>{t.checklist.addReminder}</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              {lang === 'ro' 
                ? 'Selectează data programării sau data la care expiră documentul pentru a nu depăși termenele legale.' 
                : 'Select appointment date or document expiry date to stay ahead of statutory deadlines.'}
            </p>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {lang === 'ro' ? 'Denumire memento' : 'Reminder label'}
                </label>
                <input
                  type="text"
                  value={reminderNote}
                  onChange={(e) => setReminderNote(e.target.value)}
                  placeholder={lang === 'ro' ? 'Ex: Programare la ghișeu sector 1' : 'e.g., Desk appointment sector 1'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {t.checklist.reminderDate}
                </label>
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setReminderModalId(null)}
                className="px-3 py-2 text-slate-600 hover:text-slate-800"
              >
                {lang === 'ro' ? 'Anulează' : 'Cancel'}
              </button>
              <button
                onClick={() => handleSaveReminder(reminderModalId)}
                disabled={!reminderDate}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 disabled:opacity-50"
              >
                {lang === 'ro' ? 'Salvează Memento' : 'Save Reminder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
