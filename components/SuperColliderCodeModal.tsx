
import React, { useState } from 'react';
import { Trigram } from '../types';

interface SuperColliderCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trigram: Trigram | null;
}

const SuperColliderCodeModal: React.FC<SuperColliderCodeModalProps> = ({ isOpen, onClose, trigram }) => {
  const [synthCopySuccess, setSynthCopySuccess] = useState('');
  const [patternCopySuccess, setPatternCopySuccess] = useState('');

  if (!isOpen || !trigram) {
    return null;
  }

  const copyToClipboard = async (text: string, type: 'synth' | 'pattern') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'synth') {
        setSynthCopySuccess('¡Copiado!');
        setPatternCopySuccess('');
      } else {
        setPatternCopySuccess('¡Copiado!');
        setSynthCopySuccess('');
      }
      setTimeout(() => {
        setSynthCopySuccess('');
        setPatternCopySuccess('');
      }, 2000);
    } catch (err) {
      if (type === 'synth') {
        setSynthCopySuccess('Error al copiar');
      } else {
        setPatternCopySuccess('Error al copiar');
      }
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative text-gray-200 transform transition-all duration-300 scale-100"
        onClick={e => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-yellow-400 text-2xl font-bold leading-none"
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        
        <div className="flex items-center mb-6">
          <div className="text-6xl text-yellow-400 mr-5">{trigram.symbol}</div>
          <div>
            <h2 id="modal-title" className="text-3xl font-bold text-sky-300">{trigram.name}</h2>
            <p className="text-lg text-gray-400">{trigram.chineseName}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Ejemplo de SynthDef:</h3>
            <div className="relative">
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-sky-200 font-mono shadow-inner">
                <code>{trigram.superColliderIdeas.synthExample}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(trigram.superColliderIdeas.synthExample, 'synth')}
                className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold py-1 px-2 rounded"
                aria-label="Copiar código SynthDef"
              >
                {synthCopySuccess || 'Copiar'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-purple-300 mb-2">Ejemplo de Patrón (Pbind):</h3>
             <div className="relative">
              <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto text-sm text-sky-200 font-mono shadow-inner">
                <code>{trigram.superColliderIdeas.patternExample}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(trigram.superColliderIdeas.patternExample, 'pattern')}
                className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-xs font-semibold py-1 px-2 rounded"
                aria-label="Copiar código de Patrón"
              >
                {patternCopySuccess || 'Copiar'}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition duration-150"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SuperColliderCodeModal;
