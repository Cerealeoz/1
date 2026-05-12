import React from 'react';
import { Compass, Star } from 'lucide-react';
import { getCompassRotation, generateCompassMarks } from '../../utils/compassUtils';

interface CompassDisplayProps {
  heading: number;
  isCalibrating?: boolean;
}

export const CompassDisplay: React.FC<CompassDisplayProps> = ({ heading, isCalibrating = false }) => {
  const rotation = getCompassRotation(heading);
  const marks = generateCompassMarks();

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 shadow-2xl border-4 border-slate-700 overflow-hidden ${isCalibrating ? 'animate-pulse' : ''}`}
        style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.1s ease-out' }}
      >
        {/* 内部渐变背景 */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 opacity-50" />
        
        {/* 刻度 */}
        {marks.map((mark, index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${mark.angle}deg) translateY(-45%)`,
            }}
          >
            <div
              className={`${
                mark.major
                  ? 'w-1 h-3 bg-amber-400'
                  : 'w-0.5 h-2 bg-slate-500'
              } rounded-full`}
            />
            {mark.label && (
              <div
                className="absolute top-0 left-1/2 text-xs font-bold"
                style={{
                  transform: 'translateX(-50%) translateY(-3rem)',
                  color: mark.label === '0' || mark.label === '360' ? '#ef4444' : '#94a3b8',
                }}
              >
                {mark.label === '0' || mark.label === '360' ? 'N' : mark.label}
              </div>
            )}
          </div>
        ))}

        {/* 方向标记 */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-red-500 font-bold text-lg">
          N
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-slate-400 font-semibold">
          S
        </div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold">
          W
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 font-semibold">
          E
        </div>

        {/* 中心点 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg flex items-center justify-center">
            <Star className="w-4 h-4 text-white fill-current" />
          </div>
        </div>
      </div>

      {/* 固定的方向指示器 */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
        <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-amber-400 drop-shadow-lg" />
      </div>
    </div>
  );
};
