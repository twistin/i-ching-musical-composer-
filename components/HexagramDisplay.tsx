import React from 'react';
import { Trigram, LineType } from '../types';
import LineDisplay from './LineDisplay';

interface HexagramDisplayProps {
  lowerTrigram: Trigram;
  upperTrigram: Trigram;
  onClick: () => void;
}

const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ lowerTrigram, upperTrigram, onClick }) => {
  const allLines = [
    ...lowerTrigram.lines, // Bottom three lines
    ...upperTrigram.lines  // Top three lines
  ];

  return (
    <div
      className="my-8 p-6 bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto cursor-pointer transform transition-all duration-300 hover:shadow-yellow-500/70 hover:scale-105"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
      aria-label="Ver detalles del hexagrama generado"
    >
      <h2 className="text-2xl font-semibold text-center text-yellow-400 mb-4">Hexagrama Generado</h2>
      <div className="flex flex-col items-center space-y-3">
        {/* Upper Trigram Display */}
        <div className="text-center">
            <div className="text-4xl text-sky-300">{upperTrigram.symbol}</div>
            <p className="text-sm text-sky-400">{upperTrigram.name}</p>
        </div>
        <div className="w-24">
          {/* Display lines from top to bottom visually for upper trigram */}
          <LineDisplay type={upperTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
          <LineDisplay type={upperTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
          <LineDisplay type={upperTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
        </div>

        {/* Separator (optional) */}
        {/* <hr className="w-20 border-gray-600 my-1" /> */}
        
        {/* Lower Trigram Display */}
         <div className="w-24">
          {/* Display lines from top to bottom visually for lower trigram */}
          <LineDisplay type={lowerTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
          <LineDisplay type={lowerTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
          <LineDisplay type={lowerTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
        </div>
        <div className="text-center">
             <div className="text-4xl text-sky-300">{lowerTrigram.symbol}</div>
            <p className="text-sm text-sky-400">{lowerTrigram.name}</p>
        </div>
      </div>
       <p className="text-xs text-center text-gray-400 mt-4">
        (Trigrama superior arriba, trigrama inferior abajo)
      </p>
      <p className="text-center text-sm text-yellow-300 mt-2 hover:underline">
        Haz clic para ver el significado y el código combinado.
      </p>
    </div>
  );
};

export default HexagramDisplay;