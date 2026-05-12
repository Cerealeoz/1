import { useState, useEffect, useCallback } from 'react';
import { Coordinates, GeoError } from '../utils/geoUtils';

export interface UseGeolocationReturn {
  coordinates: Coordinates | null;
  error: GeoError | null;
  isLoading: boolean;
  isAvailable: boolean;
  refresh: () => void;
}

export const useGeolocation = (): UseGeolocationReturn => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<GeoError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const handleSuccess = useCallback((position: GeolocationPosition) => {
    setCoordinates({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      accuracy: position.coords.accuracy,
    });
    setIsLoading(false);
    setError(null);
  }, []);

  const handleError = useCallback((error: GeolocationPositionError) => {
    setError({
      code: error.code.toString(),
      message: getErrorMessage(error.code),
    });
    setIsLoading(false);
  }, []);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setIsAvailable(false);
      setError({
        code: '0',
        message: '您的浏览器不支持地理定位',
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    });
  }, [handleSuccess, handleError]);

  const refresh = useCallback(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    getCurrentPosition();

    const watchId = navigator.geolocation?.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
      }
    );

    return () => {
      if (watchId !== undefined) {
        navigator.geolocation?.clearWatch(watchId);
      }
    };
  }, [getCurrentPosition, handleSuccess, handleError]);

  return {
    coordinates,
    error,
    isLoading,
    isAvailable,
    refresh,
  };
};

const getErrorMessage = (code: number): string => {
  switch (code) {
    case GeolocationPositionError.PERMISSION_DENIED:
      return '位置权限被拒绝，请允许访问位置';
    case GeolocationPositionError.POSITION_UNAVAILABLE:
      return '无法获取位置信息';
    case GeolocationPositionError.TIMEOUT:
      return '获取位置超时，请重试';
    default:
      return '获取位置时发生未知错误';
  }
};
