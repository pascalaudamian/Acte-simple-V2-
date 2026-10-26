import React, { useState, useEffect, useMemo } from 'react';
import { Language, AdministrativeOffice, County, AdministrativeService } from '../types';
import { COUNTIES } from '../data/counties';
import { ADMINISTRATIVE_SERVICES } from '../data/services';
import { PROCEDURES } from '../data/procedures';
import { UI_TRANSLATIONS } from '../utils/i18n';
import { OfficeMap } from './OfficeMap';
import {
  MapPin,
  Search,
  Navigation,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Accessibility,
  ArrowRight,
  Filter,
  X,
  Layers,
  Map as MapIcon,
  List as ListIcon,
  Compass,
  Building
} from 'lucide-react';

interface OfficeFinderProps {
  lang: Language;
  onNavigateToProcedure: (procedureId: string) => void;
  initialServiceId?: string;
  initialCountyCode?: string;
}

export const OfficeFinder: React.FC<OfficeFinderProps> = ({
  lang,
  onNavigateToProcedure,
  initialServiceId,
  initialCountyCode
}) => {
  const t = UI_TRANSLATIONS[lang];

  // Filters & User selection states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId || 'all');
  const [selectedCountyCode, setSelectedCountyCode] = useState<string>(initialCountyCode || 'all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);

  // Geolocation state
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Mobile layout state: 'list' or 'map'
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'map'>('list');

  // Offices data state
  const [offices, setOffices] = useState<AdministrativeOffice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // County Search Filter inside dropdown
  const [countySearchText, setCountySearchText] = useState<string>('');

  // Fetch offices from API or fallback data
  useEffect(() => {
    let isCancelled = false;

    async function loadOffices() {
      setIsLoading(true);
      setFetchError(null);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCountyCode !== 'all') queryParams.set('county', selectedCountyCode);
        if (selectedServiceId !== 'all') queryParams.set('service', selectedServiceId);
        if (selectedCity !== 'all') queryParams.set('city', selectedCity);
        if (searchQuery.trim()) queryParams.set('search', searchQuery.trim());
        if (userLocation) {
          queryParams.set('lat', userLocation.lat.toString());
          queryParams.set('lng', userLocation.lng.toString());
        }

        const res = await fetch(`/api/v1/offices?${queryParams.toString()}`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        if (!isCancelled) {
          setOffices(data.items || []);
          // Auto-select first office if none selected and results exist
          if (data.items && data.items.length > 0 && !selectedOfficeId) {
            setSelectedOfficeId(data.items[0].id);
          }
        }
      } catch (err) {
        console.warn('API error, falling back to local dataset:', err);
        // Fallback import
        const { VERIFIED_OFFICES } = await import('../data/offices');
        if (!isCancelled) {
          let filtered = [...VERIFIED_OFFICES];
          if (selectedCountyCode !== 'all') {
            filtered = filtered.filter((o) => o.county.toUpperCase() === selectedCountyCode.toUpperCase());
          }
          if (selectedServiceId !== 'all') {
            filtered = filtered.filter((o) => o.providedServiceIds.includes(selectedServiceId));
          }
          if (selectedCity !== 'all') {
            filtered = filtered.filter((o) => o.city.toLowerCase().includes(selectedCity.toLowerCase()));
          }
          if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(
              (o) =>
                o.name.ro.toLowerCase().includes(q) ||
                o.name.en.toLowerCase().includes(q) ||
                o.address.toLowerCase().includes(q) ||
                o.city.toLowerCase().includes(q)
            );
          }
          setOffices(filtered);
          if (filtered.length > 0 && !selectedOfficeId) {
            setSelectedOfficeId(filtered[0].id);
          }
        }
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }

    loadOffices();
    return () => {
      isCancelled = true;
    };
  }, [selectedCountyCode, selectedServiceId, selectedCity, searchQuery, userLocation]);

  // Handle Geolocation Request
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(lang === 'en' ? 'Geolocation not supported by browser.' : 'Geolocația nu este suportată de browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        setIsLocating(false);
        console.warn('Geolocation error:', error.message);
        setLocationError(t.offices.locationError);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleClearLocation = () => {
    setUserLocation(null);
    setLocationError(null);
  };

  // Get currently selected county object
  const currentCounty = useMemo(() => {
    return COUNTIES.find((c) => c.code === selectedCountyCode);
  }, [selectedCountyCode]);

  // Filtered counties for combobox
  const filteredCounties = useMemo(() => {
    if (!countySearchText.trim()) return COUNTIES;
    const q = countySearchText.toLowerCase().trim();
    return COUNTIES.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.ro.toLowerCase().includes(q) ||
        c.name.en.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q)
    );
  }, [countySearchText]);

  // Selected office object
  const activeOffice = useMemo(() => {
    if (!selectedOfficeId) return offices[0] || null;
    return offices.find((o) => o.id === selectedOfficeId) || offices[0] || null;
  }, [offices, selectedOfficeId]);

  // Related procedures resolved at this office
  const relatedProcedures = useMemo(() => {
    if (!activeOffice) return [];
    return PROCEDURES.filter((p) => activeOffice.relatedProcedureIds.includes(p.id));
  }, [activeOffice]);

  // Generate directions links
  const directionsLinks = useMemo(() => {
    if (!activeOffice) return null;
    const { lat, lng } = activeOffice.coordinates;
    const label = encodeURIComponent(lang === 'en' ? activeOffice.name.en : activeOffice.name.ro);
    return {
      google: `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      apple: `https://maps.apple.com/?daddr=${lat},${lng}&q=${label}`,
      osm: `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${lat}%2C${lng}`
    };
  }, [activeOffice, lang]);

  // Prefecture portal URL generator
  const prefectureUrl = useMemo(() => {
    if (!currentCounty || currentCounty.code === 'all') return 'https://prefectura.mai.gov.ro';
    if (currentCounty.code === 'B') return 'https://b.prefectura.mai.gov.ro';
    const cleanCode = currentCounty.code.toLowerCase();
    return `https://${cleanCode}.prefectura.mai.gov.ro`;
  }, [currentCounty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header & Purpose Banner */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-500 uppercase mb-1">
          <Building className="w-4 h-4" />
          <span>{lang === 'en' ? 'Administrative Infrastructure' : 'Infrastructură Administrativă'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-2">
          {t.offices.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
          {t.offices.subtitle}
        </p>
      </div>

      {/* Filter Ribbon & Guided Flow */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-5 shadow-xs mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: Service Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.offices.selectService}
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => {
                setSelectedServiceId(e.target.value);
              }}
              className="w-full text-sm rounded border border-slate-300 bg-white py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="all">{t.offices.allServices}</option>
              {ADMINISTRATIVE_SERVICES.map((s) => (
                <option key={s.id} value={s.id}>
                  {lang === 'en' ? s.title.en : s.title.ro} ({s.responsibleAuthority})
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: County Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.offices.selectCounty}
            </label>
            <select
              value={selectedCountyCode}
              onChange={(e) => {
                setSelectedCountyCode(e.target.value);
                setSelectedCity('all'); // Reset city on county change
              }}
              className="w-full text-sm rounded border border-slate-300 bg-white py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="all">{t.offices.allCounties}</option>
              {COUNTIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {lang === 'en' ? c.name.en : c.name.ro} ({c.code}) - {c.capital}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: City / Locality Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {t.offices.selectCity}
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={selectedCountyCode === 'all'}
              className="w-full text-sm rounded border border-slate-300 bg-white py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="all">{t.offices.allCities}</option>
              {currentCounty?.majorLocalities.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Secondary Row: Free Search & Geolocation Action */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Free Text Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.offices.searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded border border-slate-200 focus:outline-none focus:border-slate-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Location button */}
          <div className="flex items-center gap-2">
            {!userLocation ? (
              <button
                onClick={handleUseLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded border border-slate-300 transition-colors whitespace-nowrap cursor-pointer"
              >
                <Navigation className={`w-3.5 h-3.5 text-blue-600 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? t.offices.locating : t.offices.useLocation}</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs font-medium py-1.5 px-3 bg-blue-50 text-blue-800 border border-blue-200 rounded">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>{t.offices.locationActive}</span>
                <button
                  onClick={handleClearLocation}
                  className="text-blue-600 hover:text-blue-900 ml-1 text-xs font-bold"
                  title={t.offices.clearLocation}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Clear All Filters */}
            {(selectedServiceId !== 'all' || selectedCountyCode !== 'all' || selectedCity !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedServiceId('all');
                  setSelectedCountyCode('all');
                  setSelectedCity('all');
                  setSearchQuery('');
                }}
                className="text-xs text-slate-500 hover:text-slate-800 py-1.5 px-2 underline"
              >
                {t.offices.resetFilters}
              </button>
            )}
          </div>
        </div>

        {/* Location Error alert */}
        {locationError && (
          <div className="mt-3 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>

      {/* Mobile Switch: List vs Map */}
      <div className="lg:hidden flex items-center justify-between bg-slate-100 p-1 rounded mb-4">
        <button
          onClick={() => setMobileViewMode('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded transition-colors ${
            mobileViewMode === 'list'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListIcon className="w-4 h-4" />
          <span>{t.offices.viewList} ({offices.length})</span>
        </button>
        <button
          onClick={() => setMobileViewMode('map')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded transition-colors ${
            mobileViewMode === 'map'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapIcon className="w-4 h-4" />
          <span>{t.offices.viewMap}</span>
        </button>
      </div>

      {/* Main Content Area: Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Office Directory List (5 cols on lg) */}
        <div
          className={`lg:col-span-5 flex flex-col gap-3 ${
            mobileViewMode === 'map' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-medium">
            <span>
              <strong className="text-slate-800">{offices.length}</strong> {t.offices.showingResults}
            </span>
            {userLocation && (
              <span className="text-blue-700 font-mono text-[11px]">
                * {t.offices.straightLineDist}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-500 bg-white border border-slate-200 rounded-lg">
              <div className="animate-spin w-6 h-6 border-2 border-slate-800 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-xs">{lang === 'en' ? 'Loading offices...' : 'Se încarcă lista ghișeelor...'}</p>
            </div>
          ) : offices.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
              <Building className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                {t.offices.noResults}
              </h3>
              <p className="text-xs text-slate-600 mb-4 max-w-sm mx-auto leading-relaxed">
                {selectedCountyCode !== 'all'
                  ? t.offices.directoryIncompleteDesc
                  : (lang === 'en' ? 'Try adjusting your filters or search query.' : 'Încearcă să resetezi filtrele sau să cauți alt termen.')}
              </p>
              {selectedCountyCode !== 'all' && (
                <a
                  href={prefectureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold py-2 px-3 bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors"
                >
                  <span>{t.offices.prefectureLink} ({currentCounty?.name.ro})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {offices.map((office) => {
                const isSelected = activeOffice?.id === office.id;
                return (
                  <div
                    key={office.id}
                    onClick={() => {
                      setSelectedOfficeId(office.id);
                      if (window.innerWidth < 1024) {
                        setMobileViewMode('map');
                      }
                    }}
                    className={`p-4 rounded-lg border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-blue-50/50 border-blue-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {office.institutionType} · {office.county}
                      </span>
                      {office.distanceKm !== undefined && (
                        <span className="text-xs font-mono font-bold text-blue-700 bg-blue-100/60 px-1.5 py-0.5 rounded">
                          {office.distanceKm} km
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                      {lang === 'en' ? office.name.en : office.name.ro}
                    </h3>

                    <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{office.address}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="truncate max-w-[190px]">
                          {lang === 'en' ? office.openingHours.en.split('\n')[0] : office.openingHours.ro.split('\n')[0]}
                        </span>
                      </div>
                      <span className="text-blue-600 font-semibold text-xs flex items-center gap-0.5">
                        {lang === 'en' ? 'Details' : 'Detalii'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Directory completion notice if county selected */}
          {selectedCountyCode !== 'all' && offices.length > 0 && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded text-xs text-amber-900">
              <div className="font-semibold mb-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.offices.directoryIncomplete}</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed mb-2">
                {t.offices.directoryIncompleteDesc}
              </p>
              <a
                href={prefectureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-950 underline hover:no-underline"
              >
                <span>{t.offices.prefectureLink} ({currentCounty?.name.ro})</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Map & Selected Office Detail (7 cols on lg) */}
        <div
          className={`lg:col-span-7 flex flex-col gap-4 ${
            mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Map Container */}
          <div className="w-full h-[360px] sm:h-[420px] rounded-lg overflow-hidden border border-slate-200 shadow-xs">
            <OfficeMap
              offices={offices}
              selectedOfficeId={selectedOfficeId}
              onSelectOffice={(id) => setSelectedOfficeId(id)}
              userLocation={userLocation}
              lang={lang}
            />
          </div>

          {/* Detailed Office Panel (Active Office Card) */}
          {activeOffice && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs">
              {/* Header with Type & Verification Badge */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                      {activeOffice.institutionType}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Județul {activeOffice.county} · {activeOffice.city}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {lang === 'en' ? activeOffice.name.en : activeOffice.name.ro}
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="font-semibold">{t.offices.sourceVerified}</span>
                </div>
              </div>

              {/* Office Metadata Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
                {/* Address & Directions */}
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.offices.address}
                  </div>
                  <div className="flex items-start gap-2 text-slate-800 leading-relaxed">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{activeOffice.address}</span>
                  </div>
                  {activeOffice.distanceKm !== undefined && (
                    <div className="text-[11px] text-blue-700 font-mono font-medium pl-6">
                      {activeOffice.distanceKm} km {t.offices.straightLineDist}
                    </div>
                  )}
                </div>

                {/* Opening Hours */}
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.offices.hours}
                  </div>
                  <div className="flex items-start gap-2 text-slate-800">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <pre className="font-sans whitespace-pre-line text-xs text-slate-700">
                      {lang === 'en' ? activeOffice.openingHours.en : activeOffice.openingHours.ro}
                    </pre>
                  </div>
                </div>

                {/* Contact: Phone & Email */}
                {(activeOffice.phone || activeOffice.email) && (
                  <div className="space-y-1.5">
                    <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      {lang === 'en' ? 'Contact Information' : 'Contact Oficial'}
                    </div>
                    {activeOffice.phone && (
                      <div className="flex items-center gap-2 text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`tel:${activeOffice.phone.replace(/\s+/g, '')}`} className="hover:text-blue-600 font-mono">
                          {activeOffice.phone}
                        </a>
                      </div>
                    )}
                    {activeOffice.email && (
                      <div className="flex items-center gap-2 text-slate-800">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${activeOffice.email}`} className="hover:text-blue-600 font-mono">
                          {activeOffice.email}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Appointment & Accessibility Policy */}
                <div className="space-y-1.5">
                  <div className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    {t.offices.appointmentRequirement}
                  </div>
                  <div className="flex items-center gap-2 text-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="font-medium">
                      {activeOffice.appointmentRequirement === 'mandatory'
                        ? t.offices.mandatoryAppointment
                        : activeOffice.appointmentRequirement === 'recommended'
                        ? t.offices.recommendedAppointment
                        : activeOffice.appointmentRequirement === 'hybrid'
                        ? t.offices.hybridAppointment
                        : t.offices.walkInAppointment}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 mt-1">
                    <Accessibility className="w-3.5 h-3.5 text-slate-500" />
                    <span>
                      {activeOffice.accessibility.wheelchairAccessible
                        ? t.offices.wheelchairAccessible
                        : t.offices.wheelchairNotAccessible}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Directions & Official Booking */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {activeOffice.bookingUrl && (
                  <a
                    href={activeOffice.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded shadow-xs transition-colors"
                  >
                    <span>{t.offices.bookingPortal}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {/* Directions external links dropdown/buttons */}
                {directionsLinks && (
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 font-medium">{t.offices.getDirections}:</span>
                    <a
                      href={directionsLinks.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded border border-slate-200 transition-colors"
                    >
                      {t.offices.openGoogleMaps}
                    </a>
                    <a
                      href={directionsLinks.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded border border-slate-200 transition-colors"
                    >
                      {t.offices.openAppleMaps}
                    </a>
                  </div>
                )}
              </div>

              {/* Linked Procedures Handled Here */}
              {relatedProcedures.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    {t.offices.relatedProcedures}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {relatedProcedures.map((proc) => (
                      <button
                        key={proc.id}
                        onClick={() => onNavigateToProcedure(proc.id)}
                        className="text-left p-2.5 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                            {lang === 'en' ? proc.title.en : proc.title.ro}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate max-w-[220px]">
                            {lang === 'en' ? proc.shortSummary.en : proc.shortSummary.ro}
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 transition-colors ml-2 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Editorial Legal Notice */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
                {t.offices.disclaimerNotice}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
