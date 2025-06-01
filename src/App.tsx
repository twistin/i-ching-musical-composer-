import React, { useState, useCallback, useEffect } from 'react';
import { Trigram, TossedLine, LineType } from './types';
import { TRIGRAM_DATA, findTrigramByLines } from './constants';
import TrigramDetailCard from './components/TrigramDetailCard';
import CoinTossControls from './components/CoinTossControls';
import TrigramDisplay from './components/TrigramDisplay';
import SuperColliderCodeModal from './components/SuperColliderCodeModal';
import HexagramDisplay from './components/HexagramDisplay';
import HexagramDetailModal from './components/HexagramDetailModal';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Access API_KEY from Vite's environment variables
const API_KEY = import.meta.env.VITE_API_KEY;

const App: React.FC = () => {
  const [lowerTrigram, setLowerTrigram] = useState<Trigram | null>(null);
  const [upperTrigram, setUpperTrigram] = useState<Trigram | null>(null);
  const [tossedLinesResult, setTossedLinesResult] = useState<TossedLine[]>([]);
  const [isTossing, setIsTossing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedTrigramForModal, setSelectedTrigramForModal] = useState<Trigram | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isHexagramModalOpen, setIsHexagramModalOpen] = useState<boolean>(false);
  const [hexagramMeaning, setHexagramMeaning] = useState<string | null>(null);
  const [isHexagramMeaningLoading, setIsHexagramMeaningLoading] = useState<boolean>(false);
  const [hexagramMeaningError, setHexagramMeaningError] = useState<string | null>(null);
  
  const [ai, setAi] = useState<GoogleGenAI | null>(null);

  useEffect(() => {
    if (API_KEY) {
      try {
        setAi(new GoogleGenAI({ apiKey: API_KEY }));
        console.log("GoogleGenAI SDK initialized.");
      } catch (e) {
        console.error("Failed to initialize GoogleGenAI SDK:", e);
        setHexagramMeaningError("Error al inicializar el servicio de IA. Verifica la clave API y la configuración.");
      }
    } else {
      console.warn("VITE_API_KEY is not set in .env file. Gemini API features will be disabled.");
      setHexagramMeaningError("La clave API para el servicio de IA no está configurada (revisa tu archivo .env). El significado del hexagrama no se puede generar.");
    }
  }, []);


  const simulateCoinToss = (): number => {
    const coin1 = Math.random() < 0.5 ? 2 : 3; // 2 for tails (yin), 3 for heads (yang)
    const coin2 = Math.random() < 0.5 ? 2 : 3;
    const coin3 = Math.random() < 0.5 ? 2 : 3;
    return coin1 + coin2 + coin3; // Sum: 6 (old yin), 7 (young yang), 8 (young yin), 9 (old yang)
  };

  const getLineFromTossValue = (value: number): TossedLine => {
    if (value === 6) return { type: LineType.Broken, value, isChanging: true }; // Old Yin (becomes Yang)
    if (value === 7) return { type: LineType.Solid, value };                 // Young Yang
    if (value === 8) return { type: LineType.Broken, value };               // Young Yin
    if (value === 9) return { type: LineType.Solid, value, isChanging: true };   // Old Yang (becomes Yin)
    throw new Error("Invalid coin toss value: " + value);
  };
  
  const fetchHexagramMeaning = useCallback(async (lower: Trigram, upper: Trigram) => {
    if (!ai) {
      setHexagramMeaningError("El servicio de IA no está inicializado. No se puede generar el significado.");
      console.log('Attempted to fetch meaning, but AI service not available.');
      return;
    }
    setIsHexagramMeaningLoading(true);
    setHexagramMeaning(null);
    setHexagramMeaningError(null);

    const prompt = `Interpreta el hexagrama del I Ching formado por el trigrama inferior '${lower.name} (${lower.chineseName})' (representando '${lower.superColliderIdeas.concept}') y el trigrama superior '${upper.name} (${upper.chineseName})' (representando '${upper.superColliderIdeas.concept}'). Describe su significado general, simbolismo clave y posibles implicaciones o inspiraciones para la composición musical. Sé conciso y evocador, en español.`;

    try {
      console.log("Fetching hexagram meaning with prompt:", prompt);
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-preview-04-17', 
        contents: prompt,
      });
      console.log("Gemini API response received.");
      setHexagramMeaning(response.text);
    } catch (e: any) {
      console.error("Error fetching hexagram meaning from Gemini API:", e);
      let userFriendlyError = "Error al generar el significado del hexagrama. Inténtalo de nuevo.";
      if (e.message) {
          userFriendlyError += ` (Detalle: ${e.message})`;
      }
      setHexagramMeaningError(userFriendlyError);
    } finally {
      setIsHexagramMeaningLoading(false);
    }
  }, [ai]);

  const handleCoinToss = useCallback(() => {
    setIsTossing(true);
    setError(null);
    setLowerTrigram(null);
    setUpperTrigram(null);
    setTossedLinesResult([]); 
    setHexagramMeaning(null);
    setHexagramMeaningError(null);

    const linesCollector: TossedLine[] = []; 
    const tossPromises = [];

    for (let i = 0; i < 6; i++) {
      tossPromises.push(
        new Promise<void>(resolve => {
          setTimeout(() => {
            const tossValue = simulateCoinToss();
            const line = getLineFromTossValue(tossValue);
            linesCollector.push(line); 

            setTossedLinesResult(currentLines => [...currentLines, line]);
            resolve();
          }, i * 200); 
        })
      );
    }
    
    Promise.all(tossPromises).then(() => {
      setTossedLinesResult([...linesCollector]);

      const lowerLinesBoolean: [boolean, boolean, boolean] = [
        linesCollector[0].type === LineType.Solid,
        linesCollector[1].type === LineType.Solid,
        linesCollector[2].type === LineType.Solid,
      ];
      const upperLinesBoolean: [boolean, boolean, boolean] = [
        linesCollector[3].type === LineType.Solid,
        linesCollector[4].type === LineType.Solid,
        linesCollector[5].type === LineType.Solid,
      ];

      const foundLower = findTrigramByLines(lowerLinesBoolean);
      const foundUpper = findTrigramByLines(upperLinesBoolean);

      if (foundLower && foundUpper) {
        setLowerTrigram(foundLower);
        setUpperTrigram(foundUpper);
        if (ai && API_KEY) {
            fetchHexagramMeaning(foundLower, foundUpper);
        } else if (!API_KEY) {
            setHexagramMeaningError("La clave API no está configurada (revisa tu archivo .env). El significado del hexagrama no se puede generar.");
        } else {
             setHexagramMeaningError("El servicio de IA no está disponible. El significado del hexagrama no se puede generar.");
        }
      } else {
        setError("Error al determinar los trigramas. Inténtalo de nuevo.");
        console.error("Could not find trigrams for lines:", lowerLinesBoolean, upperLinesBoolean);
      }
      setIsTossing(false);
    }).catch(err => {
        setError("Ocurrió un error durante el lanzamiento. Inténtalo de nuevo.");
        console.error("Error in Promise.all for coin tosses:", err);
        setIsTossing(false);
    });
  }, [fetchHexagramMeaning, ai]);

  const handleOpenModal = (trigram: Trigram) => {
    setSelectedTrigramForModal(trigram);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrigramForModal(null); 
  };

  const handleOpenHexagramModal = () => {
    if (lowerTrigram && upperTrigram) {
      setIsHexagramModalOpen(true);
      if (!hexagramMeaning && !isHexagramMeaningLoading && !hexagramMeaningError && ai && API_KEY) {
        fetchHexagramMeaning(lowerTrigram, upperTrigram);
      }
    }
  };

  const handleCloseHexagramModal = () => {
    setIsHexagramModalOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 md:p-8 selection:bg-yellow-500 selection:text-yellow-900">
      <header className="text-center my-8">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">Compositor Musical I Ching</h1>
        <p className="text-lg text-sky-300 mt-2">Genera ideas para SuperCollider basadas en los trigramas del I Ching.</p>
      </header>

      <CoinTossControls onToss={handleCoinToss} tossedLinesResult={tossedLinesResult} isTossing={isTossing} />

      {error && (
        <div className="my-4 p-4 bg-red-700 text-white rounded-lg shadow-md text-center">
          {error}
        </div>
      )}

      {lowerTrigram && upperTrigram && (
        <HexagramDisplay 
          lowerTrigram={lowerTrigram} 
          upperTrigram={upperTrigram} 
          onClick={handleOpenHexagramModal} 
        />
      )}
      
      <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {lowerTrigram && (
          <TrigramDetailCard trigram={lowerTrigram} title="Trigrama Inferior" />
        )}
        {upperTrigram && (
          <TrigramDetailCard trigram={upperTrigram} title="Trigrama Superior" />
        )}
      </div>
      
      {!lowerTrigram && !upperTrigram && !isTossing && tossedLinesResult.length === 0 && (
         <div className="mt-8 text-center text-gray-400">
            <p>Lanza las monedas para generar un hexagrama y descubrir tus trigramas musicales.</p>
            <p className="mt-2">O haz clic en cualquiera de los ocho trigramas de abajo para ver ideas de código SuperCollider.</p>
         </div>
      )}

      <section className="my-12 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-center text-sky-300 mb-8">Los Ocho Trigramas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
          {TRIGRAM_DATA.map(trigram => (
            <TrigramDisplay key={trigram.id} trigram={trigram} onClick={handleOpenModal} />
          ))}
        </div>
      </section>
      
      <footer className="text-center text-gray-500 py-8 mt-auto">
        <p>&copy; {new Date().getFullYear()} I Ching Music Composer Helper. Inspirado en la sabiduría ancestral.</p>
         {!API_KEY && <p className="text-red-500 text-xs mt-1">Advertencia: Funcionalidad de IA deshabilitada (VITE_API_KEY no configurada en .env).</p>}
      </footer>

      {selectedTrigramForModal && (
        <SuperColliderCodeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trigram={selectedTrigramForModal}
        />
      )}

      {isHexagramModalOpen && lowerTrigram && upperTrigram && (
        <HexagramDetailModal
          isOpen={isHexagramModalOpen}
          onClose={handleCloseHexagramModal}
          lowerTrigram={lowerTrigram}
          upperTrigram={upperTrigram}
          hexagramMeaning={hexagramMeaning}
          isLoadingMeaning={isHexagramMeaningLoading}
          meaningError={hexagramMeaningError}
        />
      )}
    </div>
  );
};

export default App;