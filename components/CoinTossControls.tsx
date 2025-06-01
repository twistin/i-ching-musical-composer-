
import React from 'react';
import { LineType, TossedLine } from '../types';
import LineDisplay from './LineDisplay';

interface CoinTossControlsProps {
  onToss: () => void;
  tossedLinesResult: TossedLine[];
  isTossing: boolean;
}

const CoinTossControls: React.FC<CoinTossControlsProps> = ({ onToss, tossedLinesResult, isTossing }) => {
  // Helper to render line value (6, 7, 8, 9) and type (Yin/Yang)
  const renderLineInfo = (line: TossedLine, index: number) => {
    let lineTypeText = '';
    if (line.type === LineType.Solid) lineTypeText = "Yang";
    else if (line.type === LineType.Broken) lineTypeText = "Yin";

    return (
      <div key={index} className="flex flex-col items-center p-2 bg-gray-700 rounded m-1 w-20">
        <span className="text-xs text-gray-400">Línea {index + 1}</span>
        <LineDisplay type={line.type} />
        <span className="text-sm font-mono text-yellow-300">{line.value}</span>
        <span className="text-xs text-sky-300">{lineTypeText}</span>
      </div>
    );
  };

  return (
    <div className="my-8 p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center text-sky-300 mb-6">Oráculo Musical I Ching</h2>
      <button
        onClick={onToss}
        disabled={isTossing}
        className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-800 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
      >
        {isTossing ? 'Lanzando Monedas...' : 'Lanzar Monedas (Generar Hexagrama)'}
      </button>
      {tossedLinesResult.length === 6 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-center text-sky-400 mb-3">Resultado del Lanzamiento (Hexagrama):</h3>
          <p className="text-xs text-center text-gray-400 mb-4">(Líneas mostradas de abajo hacia arriba, la primera es la inferior)</p>
          <div className="flex flex-wrap justify-center gap-1">
            {/* Display lines in order of tossing (1st is bottom, 6th is top) */}
            {/* Reverse for visual display if preferred, but keep data order consistent */}
            {tossedLinesResult.map((line, index) => renderLineInfo(line, index)).reverse()}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoinTossControls;
    