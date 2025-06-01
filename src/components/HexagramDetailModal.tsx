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
    if (!navigator.clipboard) {
      // Fallback for older browsers or insecure contexts (like http)
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed"; // Avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess('¡Copiado!');
      } catch (err) {
        setCopySuccess('Error');
        console.error('Fallback: Oops, unable to copy', err);
      }
      document.body.removeChild(textArea);
      setTimeout(() => setCopySuccess(''), 2000);
      return;
    }

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
        <pre className="bg-gray-900 p-3 rounded-md overflow-x-auto text-xs text-sky-200 font-mono shadow-inner max-h-40 whitespace-pre-wrap break-all">
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
      className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-out opacity-100"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="hexagram-modal-title"
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative text-gray-200 transform transition-all duration-300 ease-out scale-100"
        onClick={e => e.stopPropagation()} 
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
        
        <div className="flex justify-center items-start space-x-6 mb-6"> {/* items-start for alignment if symbols differ in height */}
            <div className="w-24 text-center">
                <div className="text-4xl text-sky-300 mb-1">{upperTrigram.symbol}</div>
                 {/* Display lines from top to bottom visually for upper trigram */}
                <LineDisplay type={upperTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={upperTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={upperTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
            </div>
            <div className="w-24 text-center">
                 <div className="text-4xl text-sky-300 mb-1">{lowerTrigram.symbol}</div>
                 {/* Display lines from top to bottom visually for lower trigram */}
                <LineDisplay type={lowerTrigram.lines[2] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={lowerTrigram.lines[1] ? LineType.Solid : LineType.Broken} />
                <LineDisplay type={lowerTrigram.lines[0] ? LineType.Solid : LineType.Broken} />
            </div>
        </div>


        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-teal-300 mb-2">Significado del Hexagrama (IA):</h3>
            {isLoadingMeaning && <div className="flex justify-center items-center my-4"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-300"></div><p className="ml-3 text-sky-300 italic">Generando significado...</p></div>}
            {meaningError && <p className="text-red-400 bg-red-900 bg-opacity-40 p-3 rounded border border-red-700">{meaningError}</p>}
            {hexagramMeaning && !isLoadingMeaning && (
              <div className="bg-gray-700 p-4 rounded-md shadow prose prose-sm prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{hexagramMeaning}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-400 mb-3">Ideas para SuperCollider:</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 p-4 bg-gray-750 rounded-lg border border-gray-700 shadow-md">
                 <h4 className="text-lg font-semibold text-sky-300 mb-1">Inferior: {lowerTrigram.name} ({lowerTrigram.symbol})</h4>
                <CodeBlock title="SynthDef" code={lowerTrigram.superColliderIdeas.synthExample} trigramName={lowerTrigram.name} type="SynthDef" />
                <CodeBlock title="Patrón (Pbind)" code={lowerTrigram.superColliderIdeas.patternExample} trigramName={lowerTrigram.name} type="Pbind" />
              </div>

              <div className="space-y-3 p-4 bg-gray-750 rounded-lg border border-gray-700 shadow-md">
                <h4 className="text-lg font-semibold text-sky-300 mb-1">Superior: {upperTrigram.name} ({upperTrigram.symbol})</h4>
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
