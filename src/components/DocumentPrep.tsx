import React, { useState } from 'react';
import { Language, FormTemplate } from '../types';
import { FORM_TEMPLATES } from '../data/formTemplates';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { FileText, Printer, AlertTriangle, CheckCircle, RotateCcw, ShieldAlert, Download } from 'lucide-react';

interface DocumentPrepProps {
  lang: Language;
}

export const DocumentPrep: React.FC<DocumentPrepProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(FORM_TEMPLATES[0].id);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const activeTemplate = FORM_TEMPLATES.find((tpl) => tpl.id === selectedTemplateId) || FORM_TEMPLATES[0];

  const handleFieldChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleReset = () => {
    setFormData({});
    setShowPreview(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          {t.prep.title}
        </h1>
        <p className="text-sm text-slate-600">
          {t.prep.subtitle}
        </p>
      </div>

      {/* Mandatory Civic Safeguard & Disclaimer */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>{lang === 'ro' ? 'Clarificare juridică esențială:' : 'Essential Legal Notice:'}</strong>{' '}
          {t.prep.disclaimerNotice}
        </div>
      </div>

      {/* Template Selector Tabs */}
      <div className="no-print mb-6">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
          {t.prep.selectTemplate}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {FORM_TEMPLATES.map((tpl) => {
            const isSelected = tpl.id === selectedTemplateId;
            return (
              <button
                key={tpl.id}
                onClick={() => {
                  setSelectedTemplateId(tpl.id);
                  setFormData({});
                  setShowPreview(false);
                }}
                className={`p-3 rounded-xl border text-left transition-all text-xs ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm font-semibold'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span className="truncate">{tpl.title[lang]}</span>
                </div>
                <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {tpl.officialTarget.split('(')[0].trim()}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Preview Split/Tab */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="no-print border-b border-slate-200 pb-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {activeTemplate.title[lang]}
            </h2>
            <p className="text-xs text-slate-500">
              {activeTemplate.description[lang]}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {showPreview ? (lang === 'ro' ? 'Modifică datele' : 'Edit details') : (lang === 'ro' ? 'Previzualizează formular' : 'Preview document')}
            </button>
            {showPreview && (
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.prep.printBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Input Form Fields Mode */}
        {!showPreview ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowPreview(true);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeTemplate.fields.map((field) => (
                <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs font-medium text-slate-800 mb-1">
                    {field.label[lang]}{' '}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder?.[lang] || ''}
                      required={field.required}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      required={field.required}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white"
                    >
                      <option value="">{lang === 'ro' ? '-- Selectează --' : '-- Select --'}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label[lang]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={formData[field.id] || ''}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      placeholder={field.placeholder?.[lang] || ''}
                      required={field.required}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  )}

                  {field.helpText && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{field.helpText[lang]}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.prep.resetBtn}</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
              >
                {lang === 'ro' ? 'Generează previzualizarea documentului' : 'Generate document preview'}
              </button>
            </div>
          </form>
        ) : (
          /* Official Printable Document Preview Format */
          <div className="print-area font-serif text-slate-900 text-sm leading-relaxed p-6 border border-slate-300 rounded-lg bg-stone-50/30">
            {/* Document Header */}
            <div className="text-center border-b border-stone-300 pb-4 mb-6">
              <div className="text-xs uppercase tracking-widest text-stone-600 mb-1">
                {activeTemplate.officialTarget}
              </div>
              <h3 className="text-lg font-bold text-stone-900 uppercase">
                {activeTemplate.title.ro}
              </h3>
            </div>

            {/* Document Body depending on template */}
            {activeTemplate.id === 'declaratie-luare-in-spatiu' ? (
              <div className="space-y-4 text-xs sm:text-sm">
                <p>
                  Subsemnatul(a), <strong>{formData.proprietar_nume || '_________________________'}</strong>, 
                  având CNP <strong>{formData.proprietar_cnp || '_____________'}</strong>, 
                  posesor al actului de identitate seria/numărul <strong>{formData.proprietar_ci_serie || '_________'}</strong>,
                </p>
                <p>
                  în calitate de proprietar al imobilului situat în: <strong>{formData.adresa_locuinta || '________________________________________________________'}</strong>,
                  conform actului de proprietate <strong>{formData.act_proprietate_detalii || '________________________________________________'}</strong>,
                </p>
                <p>
                  declar prin prezenta că <strong>SUNT DE ACORD</strong> ca numitul(a) <strong>{formData.solicitant_nume || '_________________________'}</strong>, 
                  având CNP <strong>{formData.solicitant_cnp || '_____________'}</strong>, 
                  să își stabilească domiciliul / reședința la adresa menționată mai sus.
                </p>
                <p className="text-[11px] text-stone-600 italic pt-2">
                  Dau prezenta declarație spre a-i servi la Serviciul Public Comunitar de Evidență a Persoanelor pentru eliberarea cărții de identitate. Cunosc prevederile art. 326 din Codul Penal privind falsul în declarații.
                </p>
                <div className="pt-12 grid grid-cols-2 text-center text-xs">
                  <div>
                    Data: {new Date().toLocaleDateString('ro-RO')}<br />
                    Locul: _________________
                  </div>
                  <div>
                    Semnătura proprietarului găzduitor,<br />
                    (se semnează în fața funcționarului SPCLEP)<br />
                    ____________________________
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs sm:text-sm">
                <p>
                  Subsemnatul(a) <strong>{formData.declarant_nume || formData.asigurat_nume || '_________________________'}</strong>, 
                  având CNP <strong>{formData.declarant_cnp || formData.asigurat_cnp || '_____________'}</strong>,
                </p>
                <p>
                  Declar prin prezenta următoarele circumstanțe:{' '}
                  <strong>{formData.imprejurari_pierdere || formData.motiv_solicitare || '__________________________________________________________________'}</strong>
                </p>
                <p className="text-[11px] text-stone-600 italic pt-2">
                  Cunoscând sancțiunile legii penale privind falsul în declarații, declar că datele furnizate sunt conforme cu realitatea.
                </p>
                <div className="pt-12 grid grid-cols-2 text-center text-xs">
                  <div>
                    Data: {new Date().toLocaleDateString('ro-RO')}
                  </div>
                  <div>
                    Semnătura solicitantului,<br />
                    ____________________________
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
