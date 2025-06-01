import React from 'react';
import { Trigram, LineType } from '../types';
import LineDisplay from './LineDisplay';

interface TrigramDisplayProps {
  trigram: Trigram;
  onClick: (trigram: Trigram) => void;
}

const TrigramDisplay: React.FC<TrigramDisplayProps> = ({ trigram, onClick }) => {
  return (
    <div 
      className="p-4 bg-gray-800 rounded-lg shadow-md text-center w-48 h-64 flex flex-col justify-between items-center transition-all duration-300 hover:shadow-yellow-500/50 hover:scale-105 cursor-pointer"
      onClick={() => onClick(trigram)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(trigram); }}
      aria-label={`Mostrar detalles del trigrama ${trigram.name}`}
    >
      <div>
        <h3 className="text-2xl font-semibold text-yellow-400 mb-1">{trigram.symbol}</h3>
        <h4 className="text-lg font-medium text-sky-300">{trigram.name}</h4>
        <p className="text-sm text-gray-400 mb-3">{trigram.chineseName}</p>
      </div>
      <div className="w-full">
        {/* Display lines from top to bottom visually, but data is bottom to top */}
        <LineDisplay type={trigram.lines[2] ? LineType.Solid : LineType.Broken} isSmall={true}/>
        <LineDisplay type={trigram.lines[1] ? LineType.Solid : LineType.Broken} isSmall={true}/>
        <LineDisplay type={trigram.lines[0] ? LineType.Solid : LineType.Broken} isSmall={true}/>
      </div>
    </div>
  );
};

export default TrigramDisplay;
