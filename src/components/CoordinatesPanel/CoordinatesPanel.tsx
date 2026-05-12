import React from 'react';
import { Coordinates } from '../../utils/geoUtils';
import { formatCoordinate, formatAltitude, formatAccuracy } from '../../utils/geoUtils';
import { MapPin, Mountain, Crosshair } from 'lucide-react';

interface CoordinatesPanelProps {
  coordinates: Coordinates | null;
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

export const CoordinatesPanel: React.FC<CoordinatesPanelProps> = ({
  coordinates,
  isLoading = false,
  error = null,
  onRefresh
}) => {
  if (error) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="text-red-400 text-sm text-center">{error}</div>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="mt-2 w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors text-sm font-semibold"
          >
            重试
          </button>
        )}
      </div>
    );
  }

  if (isLoading || !coordinates) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto" />
          <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-slate-700 rounded w-2/3 mx-auto" />
        </div>
        <div className="text-slate-500 text-sm text-center mt-3">正在获取位置...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 space-y-3">
      <div className="flex items-center space-x-2 text-amber-400 mb-2">
        <MapPin className="w-5 h-5" />
        <span className="font-semibold text-sm">当前位置</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300">
            <Crosshair className="w-4 h-4" />
            <span className="text-sm">纬度</span>
          </div>
          <span className="font-mono text-sm text-white">
            {formatCoordinate(coordinates.latitude, 'lat')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300">
            <Crosshair className="w-4 h-4" />
            <span className="text-sm">经度</span>
          </div>
          <span className="font-mono text-sm text-white">
            {formatCoordinate(coordinates.longitude, 'lng')}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300">
            <Mountain className="w-4 h-4" />
            <span className="text-sm">海拔</span>
          </div>
          <span className="font-mono text-sm text-white">
            {formatAltitude(coordinates.altitude)}
          </span>
        </div>
        
        <div className="pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">定位精度</span>
            <span className={`text-sm font-semibold ${
              coordinates.accuracy < 10 ? 'text-green-400' : 
              coordinates.accuracy < 30 ? 'text-yellow-400' : 'text-orange-400'
            }`}>
              {formatAccuracy(coordinates.accuracy)} (±{Math.round(coordinates.accuracy)}m)
            </span>
          </div>
        </div>
      </div>
      
      {onRefresh && (
        <button
          onClick={onRefresh}
          className="mt-3 w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-colors text-sm"
        >
          刷新位置
        </button>
      )}
    </div>
  );
};
