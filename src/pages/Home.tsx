import React from 'react';
import { CompassDisplay } from '../components/Compass/CompassDisplay';
import { DirectionDisplay } from '../components/DirectionDisplay/DirectionDisplay';
import { CoordinatesPanel } from '../components/CoordinatesPanel/CoordinatesPanel';
import { useCompass } from '../hooks/useCompass';
import { useGeolocation } from '../hooks/useGeolocation';
import { AlertCircle, Compass as CompassIcon } from 'lucide-react';

export const Home: React.FC = () => {
  const {
    heading,
    accuracy,
    error: compassError,
    isSupported,
    isCalibrating,
    requestPermission,
    resetCompass
  } = useCompass();

  const {
    coordinates,
    error: geoError,
    isLoading: geoLoading,
    isAvailable,
    refresh
  } = useGeolocation();

  const handleRequestPermission = async () => {
    await requestPermission();
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
        <div className="bg-slate-800/80 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full text-center border border-slate-700 shadow-2xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">设备不支持</h2>
          <p className="text-slate-300 mb-6">
            抱歉，您的设备不支持指南针功能。请使用支持方向传感器的设备。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* 标题 */}
        <header className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-3">
            <CompassIcon className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              指南针
            </h1>
          </div>
          <p className="text-slate-400 text-sm">实时方向指引</p>
        </header>

        {/* 权限提示 */}
        {compassError && (
          <div className="bg-amber-500/20 border border-amber-500/50 rounded-xl p-4">
            <p className="text-amber-300 text-sm text-center mb-3">{compassError}</p>
            <button
              onClick={handleRequestPermission}
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-semibold"
            >
              授权指南针
            </button>
          </div>
        )}

        {/* 方向显示 */}
        <DirectionDisplay heading={heading} accuracy={accuracy} />

        {/* 罗盘 */}
        <div onDoubleClick={resetCompass} className="cursor-pointer select-none">
          <CompassDisplay heading={heading} isCalibrating={isCalibrating} />
          <p className="text-center text-slate-500 text-xs mt-2">
            双击重置方向
          </p>
        </div>

        {/* 坐标面板 */}
        {isAvailable && (
          <CoordinatesPanel
            coordinates={coordinates}
            isLoading={geoLoading}
            error={geoError?.message || null}
            onRefresh={refresh}
          />
        )}

        {/* 使用提示 */}
        <footer className="text-center space-y-2 pt-4">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <h3 className="text-amber-400 font-semibold mb-2 text-sm">使用提示</h3>
            <ul className="text-slate-400 text-xs space-y-1">
              <li>• 将设备水平放置以获得最佳精度</li>
              <li>• 远离磁场干扰源（电子设备、金属物体）</li>
              <li>• 首次使用可能需要校准</li>
            </ul>
          </div>
          
          <p className="text-slate-600 text-xs">
            © 2024 指南针APP - 您的可靠方向指引
          </p>
        </footer>
      </div>
    </div>
  );
};
