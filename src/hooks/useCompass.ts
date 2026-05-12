import { useState, useEffect, useCallback } from 'react';

export interface DeviceOrientation {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
}

export interface UseCompassReturn {
  heading: number;
  accuracy: number;
  orientation: DeviceOrientation;
  error: string | null;
  isSupported: boolean;
  isCalibrating: boolean;
  requestPermission: () => Promise<boolean>;
  resetCompass: () => void;
}

export const useCompass = (): UseCompassReturn => {
  const [heading, setHeading] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [orientation, setOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isCalibrating, setIsCalibrating] = useState<boolean>(false);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setError(null);
          return true;
        } else {
          setError('设备方向权限被拒绝');
          return false;
        }
      } catch (err) {
        setError('无法请求设备方向权限');
        return false;
      }
    }
    return true;
  }, []);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.alpha !== null && event.beta !== null && event.gamma !== null) {
      let alpha = event.alpha;
      let beta = event.beta;
      let gamma = event.gamma;

      setOrientation({
        alpha,
        beta,
        gamma,
      });

      let calculatedHeading = alpha;
      if (window.matchMedia('(orientation: portrait)').matches) {
        if (beta !== null && gamma !== null) {
          calculatedHeading = alpha + gamma;
        }
      }

      calculatedHeading = ((calculatedHeading % 360) + 360) % 360;

      const webkitHeading = (event as any).webkitCompassHeading;
      if (webkitHeading !== undefined) {
        setHeading(360 - webkitHeading);
      } else {
        setHeading(calculatedHeading);
      }

      if (event.absolute) {
        setAccuracy(10);
      } else {
        setAccuracy(25);
      }
    }
  }, []);

  const resetCompass = useCallback(() => {
    setHeading(0);
    setIsCalibrating(true);
    setTimeout(() => setIsCalibrating(false), 1000);
  }, []);

  useEffect(() => {
    if (typeof DeviceOrientationEvent === 'undefined') {
      setIsSupported(false);
      setError('您的设备不支持方向传感器');
      return;
    }

    window.addEventListener('deviceorientation', handleOrientation, true);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation, true);
    };
  }, [handleOrientation]);

  return {
    heading,
    accuracy,
    orientation,
    error,
    isSupported,
    isCalibrating,
    requestPermission,
    resetCompass,
  };
};
