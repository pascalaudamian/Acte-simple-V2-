import React, { useState } from 'react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { Globe, Menu, X, BookmarkCheck, ShieldCheck, Palette } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onNavigate: (tab: string, procedureId?: string) => void;
  savedCount: number;
  theme: 'default' | 'civic';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  activeTab,
  onNavigate,
  savedCount,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'lifeEvents', label: t.nav.lifeEvents },
    { id: 'catalog', label: t.nav.catalog },
    { id: 'offices', label: t.nav.offices },
    { id: 'international', label: t.nav.international },
    { id: 'prep', label: t.nav.prep },
    { id: 'checklists', label: t.nav.checklists, count: savedCount },
    { id: 'editorial', label: t.nav.admin },
    { id: 'sources', label: t.nav.sources },
    { id: 'roeid', label: t.nav.roeid }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
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
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-5 2xl:gap-8">
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

          {/* Zone 2: Navigation Links (Single-line, unboxed, hover underline) */}
          <nav className="hidden min-[1600px]:flex items-center gap-4 text-sm font-medium text-slate-300">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 hover:text-white ${
                    isActive ? 'text-amber-400 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {item.label}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500/20 text-amber-300 text-xs font-mono rounded">
                      {item.count}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

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

            <button
              onClick={onToggleTheme}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-slate-700 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label={theme === 'civic' ? 'Schimbă la tema standard' : 'Activează tema civică'}
              title={theme === 'civic' ? 'Tema standard' : 'Tema civică'}
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{theme === 'civic' ? 'Standard' : 'Civic'}</span>
            </button>

            {/* Quick Checklist Button (Desktop) */}
            <button
              onClick={() => handleNavClick('checklists')}
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded transition-colors shadow-sm whitespace-nowrap"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>{t.nav.checklists}</span>
              {savedCount > 0 && (
                <span className="bg-slate-950 text-white text-[11px] px-1.5 py-0.5 rounded-full font-mono">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex min-[1600px]:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="block min-[1600px]:hidden max-h-[calc(100vh-7rem)] overflow-y-auto bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm text-left ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 font-medium'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-amber-500/20 text-amber-300 text-xs px-2 py-0.5 rounded font-mono">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
