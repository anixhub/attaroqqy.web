import React from 'react';

interface IslamicDividerProps {
  darkMode?: boolean;
  className?: string;
}

export const IslamicDivider: React.FC<IslamicDividerProps> = ({ darkMode, className = '' }) => {
  return (
    <div className={`flex items-center justify-center py-4 select-none ${className}`}>
      <div className={`h-px w-24 sm:w-36 ${darkMode ? 'bg-emerald-800' : 'bg-amber-700/30'}`} />
      
      {/* Islamic 8-Pointed Rub el Hizb Star Accent */}
      <div className="mx-3 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rotate-45 ${darkMode ? 'bg-[#C9A227]' : 'bg-[#0B5E3A]'}`} />
        <div className="relative flex items-center justify-center w-5 h-5">
          <div className={`absolute w-3.5 h-3.5 rotate-45 border ${darkMode ? 'border-[#C9A227]' : 'border-[#0B5E3A]'}`} />
          <div className={`absolute w-3.5 h-3.5 border ${darkMode ? 'border-[#C9A227]' : 'border-[#0B5E3A]'}`} />
          <span className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-[#C9A227]' : 'bg-[#C9A227]'}`} />
        </div>
        <span className={`w-1.5 h-1.5 rotate-45 ${darkMode ? 'bg-[#C9A227]' : 'bg-[#0B5E3A]'}`} />
      </div>

      <div className={`h-px w-24 sm:w-36 ${darkMode ? 'bg-emerald-800' : 'bg-amber-700/30'}`} />
    </div>
  );
};
