import React, { useState } from 'react';
import { Trigram, LineType } from '../types';
import LineDisplay from './LineDisplay';

interface HexagramDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  lowerTrigram: Trigram;
  upperTrigram: Trigram;
  hexagramMeaning: string | null;
  isLoadingMeaning: boolean;
  meaningError: string | null;
}

const CodeBlock: React.FC<{ title: string; code: string; trigramName: string; type: 'SynthDef' | 'Pbind' }> = ({ title, code, trigramName, type }) => {
  const [copySuccess, setCopySuccess] = useState('');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess('¡Copiado!');
      setTimeout(() => setCopySuccess(''), 2000);
    } catch (err) {
      setCopySuccess('Error al copiar');
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div>
      <h4 className="text-lg font-semibold text-purple-300 mb-1">{title} ({trigramName}):</h4>
      <div className="relative">
        <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-xs text-sky-200 font-mono shadow-inner max-h-40">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold py-1 px-2 rounded"
          aria-label={`Copiar código ${type} de ${trigramName}`}
        >
          {copySuccess || 'Copiar'}
        </button>
      </div>
    </div>
  );
};


const HexagramDetailModal: React.FC<HexagramDetailModalProps> = ({
  isOpen,
  onClose,
  lowerTrigram,
  upperTrigram,
  hexagramMeaning,
  isLoadingMeaning,
  meaningError,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hexagram-modal-title"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative text-gray-200 transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-yellow-400 text-3xl font-bold leading-none z-10"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <div className="text-center mb-6">
            <h2 id="hexagram-modal-title" className="text-3xl font-bold text-yellow-400">
                Hexagrama: {upperTrigram.symbol} sobre {lowerTrigram.symbol}
            </h2>
            <p className="text-lg text-sky-300">
                {upperTrigram.name} (Superior) / {lowerTrigram.name} (Inferior)
            </p>
        </div>
        
        {/* Visual Hexagram Representation */}
        <div className="flex justify-center items-center space-x-6 mb-6">
            <div className="w-20">
                <div className="text-4xl text-sky-300 text-center mb-1">{upperTrigram.symbol}</div>
                <LineDisplay type={upperTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={upperTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={upperTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
            </div>
            <div className="w-20">
                 <div className="text-4xl text-sky-300 text-center mb-1">{lowerTrigram.symbol}</div>
                <LineDisplay type={lowerTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={lowerTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={lowerTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
            </div>
        </div>


        <div className="space-y-6">
          {/* Hexagram Meaning Section */}
          <div>
            <h3 className="text-xl font-semibold text-teal-300 mb-2">Significado del Hexagrama:</h3>
            {isLoadingMeaning && <p className="text-sky-300 italic">Generando significado con IA...</p>}
            {meaningError && <p className="text-red-400 bg-red-900 bg-opacity-30 p-3 rounded">{meaningError}</p>}
            {hexagramMeaning && !isLoadingMeaning && (
              <div className="bg-gray-700 p-4 rounded-md shadow">
                <p className="text-gray-300 whitespace-pre-wrap">{hexagramMeaning}</p>
              </div>
            )}
          </div>

          {/* SuperCollider Code Section */}
          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Ideas para SuperCollider:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Lower Trigram Code */}
              <div className="space-y-3 p-3 bg-gray-750 rounded-md border border-gray-700">
                 <h4 className="text-lg font-semibold text-sky-300 mb-1">Trigrama Inferior: {lowerTrigram.name} ({lowerTrigram.symbol})</h4>
                <CodeBlock title="SynthDef" code={lowerTrigram.superColliderIdeas.synthExample} trigramName={lowerTrigram.name} type="SynthDef" />
                <CodeBlock title="Patrón (Pbind)" code={lowerTrigram.superColliderIdeas.patternExample} trigramName={lowerTrigram.name} type="Pbind" />
              </div>

              {/* Upper Trigram Code */}
              <div className="space-y-3 p-3 bg-gray-750 rounded-md border border-gray-700">
                <h4 className="text-lg font-semibold text-sky-300 mb-1">Trigrama Superior: {upperTrigram.name} ({upperTrigram.symbol})</h4>
                <CodeBlock title="SynthDef" code={upperTrigram.superColliderIdeas.synthExample} trigramName={upperTrigram.name} type="SynthDef" />
                <CodeBlock title="Patrón (Pbind)" code={upperTrigram.superColliderIdeas.patternExample} trigramName={upperTrigram.name} type="Pbind" />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition duration-150 text-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HexagramDetailModal;