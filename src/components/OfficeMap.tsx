import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { AdministrativeOffice, Language } from '../types';

interface OfficeMapProps {
  offices: AdministrativeOffice[];
  selectedOfficeId: string | null;
  onSelectOffice: (officeId: string) => void;
  userLocation: { lat: number; lng: number } | null;
  lang: Language;
  center?: [number, number];
  zoom?: number;
}

import { isValidLatLng, getSafeZoom, sanitizeCoordinates } from '../utils/geo';
export { isValidLatLng, getSafeZoom, sanitizeCoordinates };

// Color schemes by institution type for intuitive civic visual recognition
const INSTITUTION_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  SPCLEP: { bg: '#d97706', border: '#b45309', text: '#ffffff' }, // Amber
  PASAPOARTE: { bg: '#2563eb', border: '#1d4ed8', text: '#ffffff' }, // Royal Blue
  PERMISE_AUTO: { bg: '#059669', border: '#047857', text: '#ffffff' }, // Emerald
  INMATRICULARI: { bg: '#0d9488', border: '#0f766e', text: '#ffffff' }, // Teal
  IGI: { bg: '#7c3aed', border: '#6d28d9', text: '#ffffff' }, // Violet
  ANAF: { bg: '#475569', border: '#334155', text: '#ffffff' }, // Slate
  CNAS: { bg: '#0284c7', border: '#0369a1', text: '#ffffff' }, // Sky
  POLITIE_CAZIER: { bg: '#dc2626', border: '#b91c1c', text: '#ffffff' }, // Crimson
  STARE_CIVILA: { bg: '#db2777', border: '#be185d', text: '#ffffff' } // Rose
};

export const OfficeMap: React.FC<OfficeMapProps> = ({
  offices,
  selectedOfficeId,
  onSelectOffice,
  userLocation,
  lang,
  center = [45.9432, 24.9668], // Romania geographic center
  zoom = 7
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let resizeObserver: ResizeObserver | null = null;

    if (!mapInstanceRef.current) {
      const safeCenter: [number, number] = (
        Array.isArray(center) &&
        center.length === 2 &&
        isValidLatLng(center[0], center[1])
      ) ? [center[0], center[1]] : [45.9432, 24.9668];

      const safeZoom = typeof zoom === 'number' && Number.isFinite(zoom) && !isNaN(zoom) ? zoom : 7;

      const map = L.map(mapContainerRef.current, {
        center: safeCenter,
        zoom: safeZoom,
        zoomControl: true,
        scrollWheelZoom: false // Avoid intercepting page scroll
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Ensure proper layout dimensions once rendered
      setTimeout(() => {
        try {
          map.invalidateSize();
        } catch {
          // ignore
        }
      }, 50);

      // Keep Leaflet in sync with container layout changes
      if (typeof window !== 'undefined' && 'ResizeObserver' in window && mapContainerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          try {
            if (mapInstanceRef.current) {
              mapInstanceRef.current.invalidateSize();
            }
          } catch {
            // ignore
          }
        });
        resizeObserver.observe(mapContainerRef.current);
      }
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        userMarkerRef.current = null;
      }
    };
  }, []);

  // Update Markers when offices or selectedOfficeId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    try {
      markersLayer.clearLayers();
    } catch {
      // ignore
    }

    if (!Array.isArray(offices) || offices.length === 0) return;

    const bounds = L.latLngBounds([]);
    let validCount = 0;

    offices.forEach((office) => {
      if (!office?.coordinates || !isValidLatLng(office.coordinates.lat, office.coordinates.lng)) {
        return; // skip offices with missing or non-finite coordinates
      }

      const officeLat = Number(office.coordinates.lat);
      const officeLng = Number(office.coordinates.lng);
      const isSelected = office.id === selectedOfficeId;
      const palette = INSTITUTION_COLORS[office.institutionType] || {
        bg: '#2563eb',
        border: '#1d4ed8',
        text: '#ffffff'
      };

      const iconHtml = `
        <div style="position: relative; display: flex; align-items: center; justify-content: center; width: ${isSelected ? '38px' : '30px'}; height: ${isSelected ? '38px' : '30px'}; background-color: ${palette.bg}; border: 2.5px solid ${isSelected ? '#ffffff' : palette.border}; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 10px rgba(0,0,0,0.35); transition: transform 0.2s ease;">
          <div style="transform: rotate(45deg); color: ${palette.text}; font-size: ${isSelected ? '12px' : '10px'}; font-weight: 800; font-family: ui-sans-serif, system-ui, sans-serif; text-transform: uppercase;">
            ${office.institutionType.slice(0, 3)}
          </div>
          ${isSelected ? '<div style="position: absolute; inset: -5px; border-radius: 50%; border: 2px solid #3b82f6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>' : ''}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'office-custom-marker',
        html: iconHtml,
        iconSize: [isSelected ? 38 : 30, isSelected ? 38 : 30],
        iconAnchor: [isSelected ? 19 : 15, isSelected ? 38 : 30],
        popupAnchor: [0, isSelected ? -38 : -30]
      });

      const marker = L.marker([officeLat, officeLng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 1000 : 100
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-2 text-slate-900 font-sans max-w-xs';
      popupContent.innerHTML = `
        <div class="text-[10px] font-bold tracking-wider uppercase text-blue-700 mb-0.5">
          ${office.institutionType} · ${office.city}
        </div>
        <div class="text-sm font-bold text-slate-900 leading-snug mb-1">
          ${lang === 'en' ? office.name.en : office.name.ro}
        </div>
        <div class="text-xs text-slate-600 mb-2 leading-relaxed">
          ${office.address}
        </div>
        <div class="text-[11px] text-slate-700 bg-slate-100 p-1.5 rounded mb-2 font-mono">
          ${lang === 'en' ? office.openingHours.en : office.openingHours.ro}
        </div>
        <button id="btn-select-${office.id}" class="w-full text-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-1.5 px-3 rounded transition-colors cursor-pointer">
          ${lang === 'en' ? 'Select & View Details' : 'Selectează și vezi detalii'}
        </button>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectOffice(office.id);
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`btn-select-${office.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectOffice(office.id);
            map.closePopup();
          };
        }
      });

      markersLayer.addLayer(marker);
      bounds.extend([officeLat, officeLng]);
      validCount += 1;

      if (isSelected) {
        marker.openPopup();
      }
    });

    // If a specific office is selected, center on it smoothly
    if (selectedOfficeId) {
      const selected = offices.find((o) => o.id === selectedOfficeId);
      if (selected?.coordinates && isValidLatLng(selected.coordinates.lat, selected.coordinates.lng)) {
        const targetLat = Number(selected.coordinates.lat);
        const targetLng = Number(selected.coordinates.lng);
        const targetZoom = getSafeZoom(map.getZoom(), 14, 14);

        try {
          map.stop(); // Abort any conflicting animations
          map.flyTo([targetLat, targetLng], targetZoom, {
            duration: 1.2
          });
        } catch (flyError) {
          console.warn('Map flyTo failed, falling back to setView:', flyError);
          try {
            map.setView([targetLat, targetLng], targetZoom);
          } catch {
            // ignore
          }
        }
        return;
      }
    }

    // Otherwise, fit bounds if multiple offices exist
    if (validCount > 0 && bounds.isValid()) {
      try {
        map.stop();
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
      } catch (err) {
        console.warn('Map fitBounds failed:', err);
      }
    }
  }, [offices, selectedOfficeId, lang, onSelectOffice]);

  // Handle User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userLocation && isValidLatLng(userLocation.lat, userLocation.lng)) {
      const userLat = Number(userLocation.lat);
      const userLng = Number(userLocation.lng);

      if (!userMarkerRef.current) {
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div style="position: relative; width: 22px; height: 22px; background-color: #2563eb; border: 3px solid #ffffff; border-radius: 50%; box-shadow: 0 0 10px rgba(37,99,235,0.6);">
              <div style="position: absolute; inset: -6px; border-radius: 50%; border: 2px solid #60a5fa; animation: pulse 2s infinite;"></div>
            </div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        });

        try {
          userMarkerRef.current = L.marker([userLat, userLng], {
            icon: userIcon,
            zIndexOffset: 2000
          }).addTo(map);

          userMarkerRef.current.bindPopup(`
            <div class="text-xs font-bold text-slate-900 p-1">
              ${lang === 'en' ? 'Your Current Location' : 'Locația ta actuală'}
            </div>
          `);
        } catch (err) {
          console.warn('Failed to add user location marker:', err);
        }
      } else {
        try {
          userMarkerRef.current.setLatLng([userLat, userLng]);
        } catch (err) {
          console.warn('Failed to update user location marker:', err);
        }
      }
    } else if (userMarkerRef.current) {
      try {
        map.removeLayer(userMarkerRef.current);
      } catch {
        // ignore
      }
      userMarkerRef.current = null;
    }
  }, [userLocation, lang]);

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[560px] bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Map Legend Overlay */}
      <div className="absolute bottom-2 left-2 z-20 bg-white/95 backdrop-blur-xs p-2 rounded shadow-md border border-slate-200 text-[11px] text-slate-700 hidden sm:block max-w-[200px]">
        <div className="font-semibold text-slate-900 mb-1">
          {lang === 'en' ? 'Institutions' : 'Instituții'}
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Pașapoarte</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
            <span>SPCLEP (Evidență)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            <span>Permise / DRPCIV</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
            <span>IGI (Imigrare)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
