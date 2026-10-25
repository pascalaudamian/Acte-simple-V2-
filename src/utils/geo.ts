/**
 * Geographic Coordinate and Map Utilities
 * Provides resilient coordinate validation and safe zoom calculation
 * to prevent Leaflet "Invalid LatLng object: (NaN, NaN)" runtime crashes.
 */

/**
 * Validates whether the given latitude and longitude are valid, finite, in-range geographic numbers.
 */
export function isValidLatLng(lat: unknown, lng: unknown): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  );
}

/**
 * Safely sanitizes a coordinate object, ensuring both lat and lng are valid numbers.
 * Returns null if coordinates are invalid or missing.
 */
export function sanitizeCoordinates(coords: unknown): { lat: number; lng: number } | null {
  if (!coords || typeof coords !== 'object') return null;
  const c = coords as Record<string, unknown>;
  const lat = typeof c.lat === 'number' ? c.lat : Number(c.lat);
  const lng = typeof c.lng === 'number' ? c.lng : Number(c.lng);

  if (isValidLatLng(lat, lng)) {
    return { lat, lng };
  }
  return null;
}

/**
 * Safely calculates target zoom level for Leaflet animations (flyTo/setView).
 * Prevents `Math.max(14, undefined)` which evaluates to NaN in JavaScript and crashes Leaflet.
 */
export function getSafeZoom(
  currentZoom: unknown,
  minZoom: number = 14,
  fallbackZoom: number = 14
): number {
  if (typeof currentZoom === 'number' && Number.isFinite(currentZoom) && !isNaN(currentZoom)) {
    return Math.max(minZoom, currentZoom);
  }
  return fallbackZoom;
}

/**
 * Straight-line Haversine distance in kilometers between two geo-points.
 */
export function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (!isValidLatLng(lat1, lon1) || !isValidLatLng(lat2, lon2)) {
    return NaN;
  }
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
