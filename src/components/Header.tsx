import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { Globe, ChevronDown, BookmarkCheck, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onNavigate: (tab: string, procedureId?: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  onNavigate,
  savedCount,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'catalog', label: t.nav.catalog },
    { id: 'offices', label: t.officeFinder.nav },
    { id: 'international', label: t.nav.international },
    { id: 'prep', label: t.nav.prep },
    { id: 'checklists', label: t.nav.checklists, count: savedCount },
    { id: 'sources', label: t.nav.sources },
    { id: 'roeid', label: t.nav.roeid }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-sm">
      {/* Official Civic Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 text-center border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Platformă civică de asistență administrativă</span>
            <span className="sm:hidden">ActeSimple România</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Ghiduri conforme cu legislația României</span>
          </div>
          <div className="text-[11px] text-slate-400 hidden md:block">
            Sursă deschisă · Fără colectare de date private
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-slate-950 text-lg shadow-sm">
              A
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                ActeSimple
              </span>
              <span className="hidden lg:inline text-xs text-slate-400 ml-2 font-normal">
                .ro
              </span>
            </div>
          </button>

          {/* Main menu stays beside the brand on every viewport. */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm font-semibold text-slate-100 transition-colors hover:border-amber-400 hover:text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <span>{lang === 'ro' ? 'Meniu' : 'Menu'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
            </button>

            {menuOpen && (
              <nav
                aria-label={lang === 'ro' ? 'Meniu principal' : 'Main menu'}
                className="absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(18rem,calc(100vw-2rem))] rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl"
              >
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      onClick={() => handleNavClick(item.id)}
                      className={`flex min-h-11 w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive
                          ? 'bg-slate-800 font-semibold text-amber-400'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.count !== undefined && item.count > 0 && (
                        <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-mono text-amber-300">
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Zone 3: Primary Action & Language Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center bg-slate-800 rounded p-1 border border-slate-700 text-xs font-medium">
              <Globe className="w-3.5 h-3.5 text-slate-400 ml-1 mr-1.5" />
              <button
                onClick={() => onLanguageChange('ro')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  lang === 'ro'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                RO
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap ${
                  lang === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick Checklist Button (Desktop) */}
            <button
              onClick={() => handleNavClick('checklists')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors shadow-sm whitespace-nowrap"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{t.nav.checklists}</span>
              {savedCount > 0 && (
                <span className="bg-slate-950 text-white text-[11px] px-1.5 py-0.5 rounded-full font-mono">
                  {savedCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

    </header>
  );
};
