import React, { useMemo, useState } from 'react';
import { ArrowLeft, LocateFixed, Search, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { COUNTIES } from '../data/counties';
import { OFFICE_SERVICES } from '../data/officeServices';
import { UI_TRANSLATIONS } from '../utils/i18n';

interface OfficeFinderProps { lang: Language; procedureId?: string | null; onNavigate: (tab: string, procedureId?: string) => void; }

export const OfficeFinder: React.FC<OfficeFinderProps> = ({ lang, procedureId, onNavigate }) => {
  const t = UI_TRANSLATIONS[lang].officeFinder;
  const suggestedService = OFFICE_SERVICES.find((service) => service.procedureIds.includes(procedureId || ''))?.id || '';
  const [serviceId, setServiceId] = useState(suggestedService);
  const [countyCode, setCountyCode] = useState('');
  const [countyQuery, setCountyQuery] = useState('');
  const [locality, setLocality] = useState('');
  const [locationState, setLocationState] = useState<'idle' | 'loading' | 'selected' | 'denied'>('idle');
  const [searchState, setSearchState] = useState<'idle' | 'loading' | 'complete' | 'error'>('idle');
  const [searchMessage, setSearchMessage] = useState('');

  const filteredCounties = useMemo(() => COUNTIES.filter((county) => {
    const query = countyQuery.trim().toLocaleLowerCase();
    return !query || `${county.name.ro} ${county.name.en} ${county.code}`.toLocaleLowerCase().includes(query);
  }), [countyQuery]);

  const useLocation = () => {
    if (!navigator.geolocation) { setLocationState('denied'); return; }
    setLocationState('loading');
    navigator.geolocation.getCurrentPosition(() => setLocationState('selected'), () => setLocationState('denied'), { enableHighAccuracy: false, maximumAge: 300000, timeout: 8000 });
  };

  const service = OFFICE_SERVICES.find((item) => item.id === serviceId);
  const selectedCounty = COUNTIES.find((county) => county.code === countyCode);

  const searchOffices = async () => {
    if (!serviceId) return;
    setSearchState('loading');
    setSearchMessage('');

    const params = new URLSearchParams({ serviceId, page: '1', limit: '50' });
    if (countyCode) params.set('countyCode', countyCode);
    if (locality.trim()) params.set('locality', locality.trim());

    try {
      const response = await fetch(`/api/v1/offices?${params.toString()}`);
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Search failed');
      setSearchState('complete');
      setSearchMessage(payload.message || t.incompleteDescription);
    } catch {
      setSearchState('error');
      setSearchMessage(lang === 'ro' ? 'Căutarea nu a putut fi finalizată. Încearcă din nou.' : 'The search could not be completed. Please try again.');
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <button onClick={() => onNavigate('catalog')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-950 mb-8">
        <ArrowLeft className="w-4 h-4" /> {t.backButton}
      </button>
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-800 bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-full mb-4"><ShieldCheck className="w-4 h-4" /> ActeSimple</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 mb-3">{t.title}</h1>
        <p className="text-base text-slate-600 leading-relaxed">{t.subtitle}</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-7">
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
            {t.serviceLabel}
            <select value={serviceId} onChange={(event) => setServiceId(event.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option value="">{t.servicePlaceholder}</option>
              {OFFICE_SERVICES.map((item) => <option key={item.id} value={item.id}>{item.label[lang]}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-800">
            {t.countyLabel}
            <div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={countyQuery} onChange={(event) => { setCountyQuery(event.target.value); setCountyCode(''); }} placeholder={t.countyPlaceholder} className="w-full rounded-xl border border-slate-300 pl-9 pr-3 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-amber-500" /></div>
            {countyQuery && <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-1"><div className="flex flex-col gap-1">{filteredCounties.map((county) => <button type="button" key={county.code} onClick={() => { setCountyCode(county.code); setCountyQuery(county.name[lang]); }} className="text-left rounded-lg px-3 py-2 text-sm hover:bg-amber-100">{county.name[lang]} <span className="text-slate-400">({county.code})</span></button>)}</div></div>}
            {selectedCounty && <span className="text-xs font-normal text-slate-500">{selectedCounty.name[lang]}</span>}
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-800 sm:col-span-2">
            {t.localityLabel}<input value={locality} onChange={(event) => setLocality(event.target.value)} placeholder={t.localityPlaceholder} className="rounded-xl border border-slate-300 px-3 py-3 font-normal focus:outline-none focus:ring-2 focus:ring-amber-500" />
          </label>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={useLocation} disabled={locationState === 'loading'} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-800 hover:border-slate-400 disabled:opacity-60"><LocateFixed className="w-4 h-4" />{locationState === 'loading' ? t.locationLoading : t.locationButton}</button>
          <button type="button" onClick={searchOffices} disabled={!serviceId || searchState === 'loading'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"><Search className="w-4 h-4" />{searchState === 'loading' ? (lang === 'ro' ? 'Se caută…' : 'Searching…') : t.searchButton}</button>
        </div>
        {locationState === 'selected' && <p className="mt-3 text-xs text-emerald-700">{t.selectedLocation}</p>}
        {locationState === 'denied' && <p className="mt-3 text-xs text-amber-800">{navigator.geolocation ? t.locationDenied : t.locationUnavailable}</p>}
        {searchMessage && <p role="status" className={`mt-3 text-sm ${searchState === 'error' ? 'text-red-700' : 'text-slate-700'}`}>{searchMessage}</p>}
      </div>
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-950">{t.incompleteTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">{t.incompleteDescription}</p>
        {service && <button onClick={() => onNavigate('detail', service.procedureIds[0])} className="mt-4 text-sm font-bold text-amber-900 underline underline-offset-4 hover:text-amber-700">{t.officialLink}</button>}
        {!service && <p className="mt-4 text-sm font-semibold text-amber-900">{t.noService}</p>}
      </div>
    </section>
  );
};
