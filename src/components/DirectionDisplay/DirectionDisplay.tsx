import React from 'react';
import { formatHeading, getDirectionName } from '../../utils/compassUtils';
import { Navigation } from 'lucide-react';

interface DirectionDisplayProps {
  heading: number;
  accuracy: number;
}

export const DirectionDisplay: React.FC<DirectionDisplayProps> = ({ heading, accuracy }) => {
  const direction = getDirectionName(heading);
  const formattedHeading = formatHeading(heading);

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-3">
        <Navigation 
          className="w-12 h-12 text-amber-400" 
          style={{ transform: `rotate(${heading}deg)` }}
        />
        <div>
          <div className="text-6xl font-bold text-slate-800 dark:text-white tracking-tight">
            {direction.name}
          </div>
          <div className="text-2xl font-mono text-slate-600 dark:text-slate-300 mt-1">
            {direction.abbr}
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 shadow-lg">
        <div className="text-5xl font-bold font-mono text-amber-400">
          {formattedHeading}
        </div>
        <div className="text-sm text-slate-400 mt-2">
          精度: {accuracy < 15 ? '高' : accuracy < 30 ? '中' : '低'}
        </div>
      </div>
    </div>
  );
};
