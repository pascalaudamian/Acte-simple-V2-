import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { ShieldCheck, Lock, ExternalLink, AlertTriangle, KeyRound, Cpu, CheckCircle2 } from 'lucide-react';

interface RoeidSandboxProps {
  lang: Language;
}

export const RoeidSandbox: React.FC<RoeidSandboxProps> = ({ lang }) => {
  const t = UI_TRANSLATIONS[lang];
  const [simulatedCitizen, setSimulatedCitizen] = useState<{
    name: string;
    cnpMasked: string;
    authLevel: string;
    timestamp: string;
  } | null>(null);

  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const handleSimulateLogin = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setSimulatedCitizen({
        name: 'STEFAN POPESCU',
        cnpMasked: '1900412****** (Hash SHA-256 Validat)',
        authLevel: 'LoA High (eIDAS Nivel Ridicat)',
        timestamp: new Date().toISOString(),
      });
      setIsAuthorizing(false);
    }, 1200);
  };

  const handleLogout = () => {
    setSimulatedCitizen(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
          <KeyRound className="w-4 h-4" />
          <span>{lang === 'ro' ? 'Interoperabilitate Națională & Arhitectură Tehnică' : 'National Interoperability & Technical Architecture'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          {t.roeid.title}
        </h1>
        <p className="text-sm text-slate-600">
          {t.roeid.subtitle}
        </p>
      </div>

      {/* Official Status Notice */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900 text-slate-200 text-xs leading-relaxed border border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{lang === 'ro' ? 'Statutul de Interoperabilitate cu Statul Român' : 'Interoperability Status with the Romanian State'}</span>
        </div>
        <p className="text-slate-300">
          {t.roeid.statusNotice}
        </p>
      </div>

      {/* Integration Analysis & Criteria Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
            <Cpu className="w-4 h-4 text-amber-600" />
            <span>ROeID (ADR)</span>
          </div>
          <p className="text-slate-600 mb-3 leading-relaxed">
            {lang === 'ro' 
              ? 'Protocolul OpenID Connect (OIDC) / SAML 2.0 administrat de Autoritatea pentru Digitalizarea României. Necesită parteneriat instituțional și audit de securitate cibernetică.'
              : 'OpenID Connect (OIDC) / SAML 2.0 protocol managed by the Authority for the Digitalization of Romania (ADR). Requires formal institutional clearance.'}
          </p>
          <a
            href="https://roeid.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
          >
            <span>roeid.ro</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>ROePAS & Ghișeul.ro</span>
          </div>
          <p className="text-slate-600 mb-3 leading-relaxed">
            {lang === 'ro'
              ? 'Platforma Națională de Plăți și Programări. ActeSimple oferă linkuri directe verificate către plata securizată a taxelor oficiale de buletin, pașaport și permise.'
              : 'National Payments and Appointments Platform. ActeSimple provides direct verified links for secure statutory fee payments.'}
          </p>
          <a
            href="https://www.ghiseul.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 hover:text-amber-800 font-medium inline-flex items-center gap-1"
          >
            <span>ghiseul.ro</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs shadow-sm">
          <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>PNI & Regimul GDPR</span>
          </div>
          <p className="text-slate-600 mb-3 leading-relaxed">
            {lang === 'ro'
              ? 'Principiul minimizării datelor: ActeSimple nu stochează niciun act de identitate sau parolă pe servere. Datele rămân exclusiv în memoria locală a cetățeanului.'
              : 'Strict data minimization: ActeSimple stores zero identity scans or passwords on servers. All checklist states remain locally in user device storage.'}
          </p>
          <span className="text-emerald-700 font-semibold">{lang === 'ro' ? 'Securitate prin design' : 'Privacy by design'}</span>
        </div>
      </div>

      {/* Interactive Sandbox Simulator */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 mb-2">
          {t.roeid.sandboxTitle}
        </h2>
        <p className="text-xs text-slate-600 mb-6">
          {t.roeid.sandboxDesc}
        </p>

        {simulatedCitizen ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>{t.roeid.authenticatedAs} {simulatedCitizen.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="text-xs text-red-700 hover:underline font-semibold"
              >
                {t.roeid.logoutBtn}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-emerald-800 font-mono">
              <div>
                <span className="text-emerald-700 block text-[11px] font-sans font-medium">{t.roeid.cnpLabel}</span>
                <span>{simulatedCitizen.cnpMasked}</span>
              </div>
              <div>
                <span className="text-emerald-700 block text-[11px] font-sans font-medium">Nivel Încredere eIDAS:</span>
                <span>{simulatedCitizen.authLevel}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-emerald-200/80 text-[11px] text-emerald-700">
              Notă: Aceasta este o demonstrație sandbox a fluxului de interoperabilitate OIDC. Datele private nu sunt trimise către niciun server terț.
            </div>
          </div>
        ) : (
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <Lock className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-4">
              {lang === 'ro'
                ? 'Apasă butonul de mai jos pentru a previzualiza cum va funcționa fluxul oficial ROeID odată aprobat de autorități.'
                : 'Click below to preview the official ROeID flow once formally provisioned by national authorities.'}
            </p>
            <button
              onClick={handleSimulateLogin}
              disabled={isAuthorizing}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors inline-flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>{isAuthorizing ? (lang === 'ro' ? 'Se negociază protocolul OIDC...' : 'Negotiating OIDC token...') : t.roeid.simulateLoginBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
