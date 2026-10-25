import React from 'react';
import { Home, Compass, BookOpen, BookmarkCheck, FileText, MapPin } from 'lucide-react';
import { Language } from '../types';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  lang: Language;
  savedCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  onNavigate,
  lang,
  savedCount,
}) => {
  const tabs = [
    { id: 'home', label: lang === 'ro' ? 'Acasă' : 'Home', icon: Home },
    { id: 'catalog', label: lang === 'ro' ? 'Catalog' : 'Catalog', icon: BookOpen },
    { id: 'offices', label: lang === 'ro' ? 'Ghișee' : 'Offices', icon: MapPin },
    { id: 'international', label: lang === 'ro' ? 'Orientare' : 'Orientation', icon: Compass },
    { id: 'prep', label: lang === 'ro' ? 'Formulare' : 'Forms', icon: FileText },
    { id: 'checklists', label: lang === 'ro' ? 'Dosar' : 'Checklist', icon: BookmarkCheck, count: savedCount },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 text-slate-300 safe-bottom">
      <div className="grid grid-cols-6 h-14">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
                isActive ? 'text-amber-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 whitespace-nowrap">{tab.label}</span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
