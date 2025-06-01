import React from 'react';
import { Trigram, LineType } from '../types';
import LineDisplay from './LineDisplay';

interface TrigramDetailCardProps {
  trigram: Trigram;
  title: string;
}

const TrigramDetailCard: React.FC<TrigramDetailCardProps> = ({ trigram, title }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-500 hover:shadow-sky-500/50">
      <h2 className="text-2xl font-bold text-sky-400 mb-2">{title}</h2>
      <div className="flex items-center mb-4">
        <div className="text-5xl text-yellow-400 mr-4">{trigram.symbol}</div>
        <div>
          <h3 className="text-xl font-semibold text-yellow-300">{trigram.name}</h3>
          <p className="text-md text-gray-400">{trigram.chineseName}</p>
        </div>
      </div>
      <div className="mb-3 w-20 mx-auto">
         {/* Display lines from top to bottom visually, but data is bottom to top */}
        <LineDisplay type={trigram.lines[2] ? LineType.Solid : LineType.Broken} />
        <LineDisplay type={trigram.lines[1] ? LineType.Solid : LineType.Broken} />
        <LineDisplay type={trigram.lines[0] ? LineType.Solid : LineType.Broken} />
      </div>

      <div className="space-y-4 text-left">
        <div>
          <h4 className="text-lg font-semibold text-teal-300">Escalas/Melodía:</h4>
          <p className="text-gray-300 text-sm">{trigram.musicalElements.scalesMelody}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-teal-300">Textura:</h4>
          <p className="text-gray-300 text-sm">{trigram.musicalElements.texture}</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-teal-300">Polirritmia:</h4>
          <p className="text-gray-300 text-sm">{trigram.musicalElements.polyrhythm}</p>
        </div>
        <div className="pt-2">
          <h4 className="text-lg font-semibold text-purple-300">Ideas para SuperCollider:</h4>
          <p className="text-gray-300 text-sm"><strong className="text-purple-400">Concepto:</strong> {trigram.superColliderIdeas.concept}</p>
          <p className="text-gray-300 text-sm mt-1"><strong className="text-purple-400">Ej. SynthDef:</strong> {trigram.superColliderIdeas.synthExample}</p>
          <p className="text-gray-300 text-sm mt-1"><strong className="text-purple-400">Ej. Patrón:</strong> {trigram.superColliderIdeas.patternExample}</p>
        </div>
      </div>
    </div>
  );
};

export default TrigramDetailCard;
