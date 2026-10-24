import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { ShieldCheck, ExternalLink, X } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = UI_TRANSLATIONS[lang];
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  const officialLinks = [
    { name: 'Ghișeul.ro (Plăți)', url: 'https://www.ghiseul.ro' },
    { name: 'HUB MAI (Cazier & Servicii)', url: 'https://hub.mai.gov.ro' },
    { name: 'DGEP (Evidența Persoanelor)', url: 'http://dgep.mai.gov.ro' },
    { name: 'epasapoarte.ro', url: 'https://epasapoarte.ro' },
    { name: 'DGPCIV (Permise & Înmatriculări)', url: 'https://dgpci.mai.gov.ro' },
    { name: 'IGI (Imigrări & Rezidență)', url: 'https://igi.mai.gov.ro' },
    { name: 'ANAF (Fisc)', url: 'https://www.anaf.ro' },
    { name: 'CNAS (Sănătate)', url: 'https://cnas.ro' },
  ];

  return (
    <footer className="no-print bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-20 md:pb-12 safe-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center font-bold text-slate-950 text-xs">
                A
              </div>
              <span className="text-base font-bold text-white tracking-tight">ActeSimple</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {t.footer.disclaimer}
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ro' ? 'Date salvate exclusiv local pe dispozitivul tău (zero cookies de tracking).' : 'Data stored strictly locally on your device (zero tracking cookies).'}</span>
            </div>
          </div>

          {/* Quick Civic Navigation */}
          <div>
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] mb-3">
              {lang === 'ro' ? 'Secțiuni Platformă' : 'Platform Sections'}
            </h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('catalog')} className="hover:text-amber-400 transition-colors">
                  {t.nav.catalog}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('international')} className="hover:text-amber-400 transition-colors">
                  {t.nav.international}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('prep')} className="hover:text-amber-400 transition-colors">
                  {t.nav.prep}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('checklists')} className="hover:text-amber-400 transition-colors">
                  {t.nav.checklists}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sources')} className="hover:text-amber-400 transition-colors">
                  {t.nav.sources}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Verified Official Portals */}
          <div>
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] mb-3">
              {lang === 'ro' ? 'Portaluri Oficiale de Stat' : 'Official State Portals'}
            </h3>
            <ul className="space-y-2">
              {officialLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition-colors inline-flex items-center gap-1"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 text-slate-600" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal Modals */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>{t.footer.copyright}</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-slate-200 underline decoration-slate-600 underline-offset-2"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-slate-200 underline decoration-slate-600 underline-offset-2"
            >
              {t.footer.terms}
            </button>
            <button
              onClick={() => setActiveModal('disclaimer')}
              className="hover:text-slate-200 underline decoration-slate-600 underline-offset-2"
            >
              {t.footer.disclaimerLink}
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal Dialog */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {activeModal === 'privacy' && t.footer.privacy}
                {activeModal === 'terms' && t.footer.terms}
                {activeModal === 'disclaimer' && t.footer.disclaimerLink}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-3">
              {activeModal === 'privacy' && (
                <>
                  <p>
                    <strong>Angajament GDPR și Minimizare:</strong> ActeSimple a fost conceput pe principiul confidențialității prin design (Privacy by Design). Nu solicităm crearea obligatorie a unui cont pentru consultarea procedurilor.
                  </p>
                  <p>
                    <strong>Stocare Locală:</strong> Toate listele de verificare, stadiile documentelor bifate și notițele personale sunt salvate exclusiv în stocarea locală (localStorage) a dispozitivului dumneavoastră. Ele nu sunt transmise, procesate sau stocate pe serverele noastre.
                  </p>
                  <p>
                    <strong>Dreptul de Ștergere:</strong> Puteți șterge instantaneu și definitiv toate datele salvate folosind butonul „Șterge toate datele locale” din ecranul Checklist-urile mele.
                  </p>
                </>
              )}

              {activeModal === 'terms' && (
                <>
                  <p>
                    <strong>Utilizarea Platformei:</strong> ActeSimple pune la dispoziția publicului ghiduri informative structurate pentru simplificarea interacțiunii cu administrația publică din România.
                  </p>
                  <p>
                    <strong>Fără Reprezentare Oficială:</strong> Utilizarea formularelor sau listelor de verificare ActeSimple nu înlocuiește depunerea oficială la autoritatea competentă și nu generează efecte juridice automate.
                  </p>
                  <p>
                    <strong>Verificare Prealabilă:</strong> Deși echipa noastră monitorizează regulat legislația, vă recomandăm să verificați cerințele specifice la ghișeul local unde sunteți arondați.
                  </p>
                </>
              )}

              {activeModal === 'disclaimer' && (
                <>
                  <p>
                    <strong>Declinare de Responsabilitate:</strong> ActeSimple este o inițiativă civică independentă, fără afiliere directă sau reprezentare exclusivă a Guvernului României, a vreunui minister sau a vreunei autorități publice.
                  </p>
                  <p>
                    Toate mărcile, denumirile instituțiilor și trimiterile legislative aparțin autorităților emitente respective și sunt citate exclusiv în scop de informare civică și orientare a cetățenilor.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-3 border-t border-slate-200 text-right">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                {lang === 'ro' ? 'Am înțeles' : 'Understood'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
