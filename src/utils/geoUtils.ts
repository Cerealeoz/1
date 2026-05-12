export interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
}

export interface GeoError {
  code: string;
  message: string;
}

export const formatCoordinate = (value: number, type: 'lat' | 'lng'): string => {
  const direction = type === 'lat' 
    ? (value >= 0 ? 'N' : 'S')
    : (value >= 0 ? 'E' : 'W');
  
  const absValue = Math.abs(value);
  const degrees = Math.floor(absValue);
  const minutes = ((absValue - degrees) * 60).toFixed(2);
  
  return `${degrees}°${minutes}' ${direction}`;
};

export const formatAltitude = (altitude: number | null): string => {
  if (altitude === null || altitude === undefined) {
    return '未知';
  }
  return `${Math.round(altitude)} 米`;
};

export const formatAccuracy = (accuracy: number): string => {
  if (accuracy < 10) {
    return '高精度';
  } else if (accuracy < 50) {
    return '中等精度';
  } else {
    return '低精度';
  }
};

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value: number): number => {
  return (value * Math.PI) / 180;
};
