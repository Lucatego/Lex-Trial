import React, { useState, useEffect, useRef } from 'react';
import {
  Swords,
  ArrowLeft,
  MessageSquare,
  TrendingUp,
  ShieldAlert,
  HelpCircle,
  Scale,
  Sparkles,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Check,
  Award,
  AlertTriangle,
  Send,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  FolderPlus,
  FileText,
  Plus
} from 'lucide-react';
import { Case, SimulationQuestion, RecentCase } from '../types';
import { useModalA11y } from '../hooks/useModalA11y';

interface ArenaProps {
  cases: Case[];
  activeCaseId: string | null;
  onBackToDashboard: () => void;
  onSimulationComplete: (score: number, status: 'Absolución' | 'Condena' | 'Apelación', efficacy: number, legalTech: number, oratory: number, caseId: string) => void;
  onSimulationActiveChange?: (active: boolean) => void;
  onOpenNewCase?: () => void;
}

export default function Arena({ cases, activeCaseId, onBackToDashboard, onSimulationComplete, onSimulationActiveChange, onOpenNewCase }: ArenaProps) {
  // Select initial case
  const [selectedCase, setSelectedCase] = useState<Case>(
    cases.find(c => c.id === activeCaseId) || cases[0]
  );

  // View mode inside Arena: 'list' | 'briefing'
  const [viewMode, setViewMode] = useState<'list' | 'briefing'>(
    activeCaseId ? 'briefing' : 'list'
  );

  // Sync viewMode and selectedCase with activeCaseId prop changes
  useEffect(() => {
    if (activeCaseId) {
      const match = cases.find(c => c.id === activeCaseId);
      if (match) {
        setSelectedCase(match);
        setViewMode('briefing');
        setGameStarted(false);
      }
    } else {
      setViewMode('list');
      setGameStarted(false);
    }
  }, [activeCaseId, cases]);

  // Simulation Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<{ sender: 'user' | 'witness' | 'judge' | 'system'; text: string; feedback?: string }[]>([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({ efficacy: 70, legalTech: 70, oratory: 70 });
  const [showObjectionModal, setShowObjectionModal] = useState(false);
  const [objectionFeedback, setObjectionFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [isWitnessTyping, setIsWitnessTyping] = useState(false);

  // Custom Typed Input
  const [customInput, setCustomInput] = useState('');

  // TTS and STT state
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isTtsSupported, setIsTtsSupported] = useState(false);
  const [isSttSupported, setIsSttSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        setIsTtsSupported(true);
      }
      
      const SpeechLib = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechLib) {
        setIsSttSupported(true);
        const rec = new SpeechLib();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'es-ES';
        
        rec.onstart = () => {
          setIsListening(true);
        };
        
        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setCustomInput(prev => prev + (prev ? ' ' : '') + transcript);
        };
        
        rec.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
        
        rec.onend = () => {
          setIsListening(false);
        };
        
        recognitionRef.current = rec;
      }
    }
  }, []);

  // Cleanup synthesis on change or unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text: string, force = false) => {
    if ((!isTtsEnabled && !force) || !('speechSynthesis' in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es-') || v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    } else {
      utterance.lang = 'es-ES';
    }
    
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  // Custom case selector dropdown
  const [caseMenuOpen, setCaseMenuOpen] = useState(false);
  const [caseMenuClosing, setCaseMenuClosing] = useState(false);
  const caseTriggerRef = useRef<HTMLButtonElement>(null);
  const caseMenuRef = useRef<HTMLDivElement>(null);

  const closeCaseMenu = () => {
    setCaseMenuClosing(true);
    setTimeout(() => {
      setCaseMenuOpen(false);
      setCaseMenuClosing(false);
    }, 150);
  };

  // Close the case dropdown on outside click or Escape
  useEffect(() => {
    if (!caseMenuOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (caseMenuRef.current?.contains(target) || caseTriggerRef.current?.contains(target)) return;
      closeCaseMenu();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCaseMenu();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseMenuOpen]);

  // Auto-scroll the courtroom transcript to the latest message
  const conversationEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [conversationHistory, objectionFeedback, isWitnessTyping]);

  // Score bars start at 0 and grow to their real value right when the sim console mounts
  const [scorePanelMounted, setScorePanelMounted] = useState(false);
  useEffect(() => {
    if (!gameStarted) {
      setScorePanelMounted(false);
      return;
    }
    const t = setTimeout(() => setScorePanelMounted(true), 50);
    return () => clearTimeout(t);
  }, [gameStarted]);

  // Let the parent know a simulation is in progress, so it can warn before navigating away
  useEffect(() => {
    onSimulationActiveChange?.(gameStarted && !gameOver);
    return () => onSimulationActiveChange?.(false);
  }, [gameStarted, gameOver]);

  // Handle case selection change
  const handleCaseChange = (c: Case) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSelectedCase(c);
    setGameStarted(false);
    setCurrentStep(0);
    setConversationHistory([]);
    setAnsweredQuestionIds([]);
    setCurrentMetrics({ efficacy: 70, legalTech: 70, oratory: 70 });
    setGameOver(false);
  };

  // Start the actual game simulation
  const handleStartSimulation = () => {
    setGameStarted(true);
    const initialText = selectedCase.simulationScenario.initialMessage;
    setConversationHistory([
      { sender: 'system', text: `⚖️ Simulación Iniciada: ${selectedCase.title}. Estás actuando como Abogado Defensor Principal.` },
      { sender: 'witness', text: initialText }
    ]);
    setCurrentStep(1);

    setTimeout(() => {
      speakText(initialText);
    }, 100);
  };

  // User selects an interrogation option
  const handleSelectOption = (q: SimulationQuestion) => {
    // 1. Add user message
    const updatedHistory = [
      ...conversationHistory,
      { sender: 'user', text: q.text }
    ];

    setConversationHistory(updatedHistory);
    setAnsweredQuestionIds([...answeredQuestionIds, q.id]);

    // Update real-time metrics incrementally
    const newMetrics = {
      efficacy: Math.min(100, Math.round((currentMetrics.efficacy + q.impact.efficacy) / 2)),
      legalTech: Math.min(100, Math.round((currentMetrics.legalTech + q.impact.legalTech) / 2)),
      oratory: Math.min(100, Math.round((currentMetrics.oratory + q.impact.oratory) / 2))
    };
    setCurrentMetrics(newMetrics);

    // 2. Add witness response after a small cinematic delay
    setIsWitnessTyping(true);
    setTimeout(() => {
      setIsWitnessTyping(false);
      setConversationHistory(prev => [
        ...prev,
        {
          sender: 'witness',
          text: q.response,
          feedback: q.feedback
        }
      ]);

      speakText(q.response);

      // Check if all questions are answered or we reached max steps (3)
      if (answeredQuestionIds.length + 1 >= Math.min(selectedCase.simulationScenario.questions.length, 3)) {
        setTimeout(() => {
          setGameOver(true);
        }, 1200);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 800);
  };

  // Custom User Argument Text Submission
  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const text = customInput;
    setCustomInput('');

    // Add user typed text
    setConversationHistory(prev => [
      ...prev,
      { sender: 'user', text }
    ]);

    // Simulate an AI response analyzing their custom prompt
    setIsWitnessTyping(true);
    setTimeout(() => {
      setIsWitnessTyping(false);
      let aiResponse = '';
      let aiFeedback = '';
      let addedMetrics = { efficacy: 5, legalTech: 5, oratory: 5 };

      // Simple keywords router in Spanish to make it feel responsive to what they write!
      const textLower = text.toLowerCase();
      if (textLower.includes('arma') || textLower.includes('cuchillo') || textLower.includes('forense')) {
        aiResponse = 'El peritaje científico se circunscribe a las marcas de transferencia de tejido. Si bien había un cuchillo cerca del deceso, la posición escapular no sugiere forcejeo previo de cara.';
        aiFeedback = '¡Gran análisis técnico! Mencionar el arma secundaria añade presión procesal.';
        addedMetrics = { efficacy: 15, legalTech: 10, oratory: 12 };
      } else if (textLower.includes('miente') || textLower.includes('falso') || textLower.includes('contradice')) {
        aiResponse = '¡Objeción del fiscal! El abogado está acosando al perito sin fundamentos.';
        aiFeedback = 'Cuidado con el tono beligerante. Sostener contradicciones requiere sustentar con folios específicos del expediente.';
        addedMetrics = { efficacy: -5, legalTech: -10, oratory: 15 };
      } else {
        aiResponse = 'Abogado, considero que mi metodología en la necropsia se apegó estrictamente a los protocolos oficiales de medicina legal.';
        aiFeedback = 'Pregunta legalmente válida. Te aconsejo enfocar el interrogatorio en el plano físico-espacial para desgastar la teoría fiscal.';
        addedMetrics = { efficacy: 8, legalTech: 8, oratory: 10 };
      }

      setConversationHistory(prev => [
        ...prev,
        { 
          sender: 'witness', 
          text: aiResponse,
          feedback: aiFeedback
        }
      ]);

      speakText(aiResponse);

      // Update metrics
      setCurrentMetrics(prev => ({
        efficacy: Math.min(100, prev.efficacy + Math.round(addedMetrics.efficacy / 2)),
        legalTech: Math.min(100, prev.legalTech + Math.round(addedMetrics.legalTech / 2)),
        oratory: Math.min(100, prev.oratory + Math.round(addedMetrics.oratory / 2))
      }));

      if (answeredQuestionIds.length >= 2) {
        setTimeout(() => setGameOver(true), 1200);
      }
    }, 800);
  };

  // Objections triggers
  const handleTriggerObjection = (type: string) => {
    setShowObjectionModal(false);
    
    // Evaluate if objection was appropriate
    let isCorrect = false;
    let explanation = '';
    
    if (type === 'Impertinente' && selectedCase.id === 'homicidio-calificado') {
      isCorrect = true;
      explanation = '¡Sustentada! El perito intentó divagar sobre la supuesta mala reputación anterior del imputado. Eso es irrelevante para calificar la trayectoria física de la bala.';
    } else if (type === 'Especulativa') {
      isCorrect = true;
      explanation = '¡Sustentada! El testigo civil o perito no puede opinar sobre las intenciones mentales de los involucrados en la riña sin base fáctica.';
    } else {
      explanation = 'Declara lugar la objeción, pero con apercibimiento. El juez te insta a encauzar el interrogatorio por la técnica formal.';
    }

    const judgeResponse = isCorrect ? `Sustentada Abogado. El testigo se abstendrá de responder y se ordenará testar esa parte del acta.` : `No ha lugar, Abogado. Continúe con el interrogatorio.`;
    setConversationHistory(prev => [
      ...prev,
      { sender: 'system', text: `🛡️ Formulaste una Objeción por ser "${type}".` },
      { sender: 'judge', text: judgeResponse }
    ]);

    speakText(judgeResponse);

    // Adjust metrics based on correctness
    setCurrentMetrics(prev => ({
      efficacy: Math.min(100, prev.efficacy + (isCorrect ? 8 : -3)),
      legalTech: Math.min(100, prev.legalTech + (isCorrect ? 12 : -5)),
      oratory: Math.min(100, prev.oratory + (isCorrect ? 5 : 2))
    }));

    setObjectionFeedback(explanation);
    setTimeout(() => setObjectionFeedback(null), 5000);
  };

  // Complete game and submit scores to parent
  const handleFinishGame = () => {
    // Calculate overall score
    const finalScore = Math.round((currentMetrics.efficacy + currentMetrics.legalTech + currentMetrics.oratory) / 3);
    
    // Determine status outcome
    let status: 'Absolución' | 'Condena' | 'Apelación' = 'Apelación';
    if (finalScore >= 85) status = 'Absolución';
    else if (finalScore < 65) status = 'Condena';

    onSimulationComplete(
      finalScore,
      status,
      currentMetrics.efficacy,
      currentMetrics.legalTech,
      currentMetrics.oratory,
      selectedCase.id
    );
  };

  // Filter out questions already asked
  const availableQuestions = selectedCase.simulationScenario.questions.filter(
    q => !answeredQuestionIds.includes(q.id)
  );

  // BEFORE SIMULATION OR DURING BRIEFING: Case Selection Catalog (Lobby)
  if (viewMode === 'list') {
    return (
      <div className="space-y-6 pb-12 select-none animate-in fade-in duration-300">
        
        {/* Upper Navigation & Title */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Swords className="w-5 h-5 text-indigo-600 animate-in spin-in-12 duration-500" />
              <h3 className="font-sans font-bold text-xl text-gray-950">La Arena de Litigio</h3>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Selecciona un expediente judicial de la lista para iniciar tu simulación.</p>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card to create new case */}
          <button
            type="button"
            id="btn-arena-new-case"
            onClick={onOpenNewCase}
            className="border-2 border-dashed border-gray-200 hover:border-indigo-500 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-white hover:bg-indigo-50/10 transition-all duration-300 min-h-[320px] group"
          >
            <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center transition-colors mb-4">
              <FolderPlus className="w-6 h-6" />
            </div>
            <h4 className="font-sans font-bold text-sm text-gray-800 group-hover:text-indigo-700 transition-colors">Diseñar Nuevo Caso</h4>
            <p className="text-[11px] text-gray-400 font-medium max-w-xs mt-1.5 leading-relaxed">
              Carga tu propio expediente judicial o indícale temas a nuestra Inteligencia Artificial para generar una causa inmersiva.
            </p>
          </button>

          {/* Render cases */}
          {cases.map((c) => {
            const isPenal = c.type === 'Penal';
            const isCivil = c.type === 'Civil';
            return (
              <div
                key={c.id}
                className="bg-white border border-gray-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Thumbnail Image */}
                <div className="h-40 w-full relative bg-gray-950">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                        isPenal 
                          ? 'bg-red-500/20 border-red-500/30 text-red-300' 
                          : isCivil
                          ? 'bg-blue-500/20 border-blue-500/30 text-blue-300'
                          : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                      }`}>
                        {c.type}
                      </span>
                      <span className="text-[9px] font-bold text-gray-300 bg-black/40 px-2 py-0.5 rounded">
                        {c.difficulty}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-300 font-mono font-bold block mb-0.5">{c.exp}</span>
                      <h4 className="font-sans font-black text-sm leading-tight text-white">{c.title}</h4>
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-3">
                      {c.summary}
                    </p>
                    <div className="flex items-center space-x-1 text-[10px] text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded-lg w-fit">
                      <Sparkles className="w-3 h-3" />
                      <span>Foco: {c.skill}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCase(c);
                      setViewMode('briefing');
                    }}
                    className="w-full py-2.5 bg-gray-950 hover:bg-gray-800 text-white font-bold text-xs rounded-xl transition-colors text-center cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>PREPARAR AUDIENCIA</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 select-none animate-in fade-in duration-300">
      
      {/* Upper Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center space-x-3">
          <button 
            id="btn-arena-back"
            onClick={() => {
              if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              if (viewMode === 'briefing') {
                setViewMode('list');
              } else {
                onBackToDashboard();
              }
            }}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-all cursor-pointer"
            title={viewMode === 'briefing' ? 'Volver al Catálogo' : 'Volver al Despacho'}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <Swords className="w-5 h-5 text-indigo-600" />
              <h3 className="font-sans font-bold text-xl text-gray-950">La Arena de Litigio</h3>
            </div>
            <p className="text-xs text-gray-500 font-medium mt-0.5">Entrenamiento procesal inmersivo con simulador adaptativo.</p>
          </div>
        </div>

        {/* Case selector dropdown */}
        <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
          <button
            ref={caseTriggerRef}
            id="btn-arena-case-selector"
            type="button"
            onClick={() => (caseMenuOpen ? closeCaseMenu() : setCaseMenuOpen(true))}
            aria-haspopup="listbox"
            aria-expanded={caseMenuOpen}
            className="flex items-center space-x-2.5 bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-2 pr-3.5 shadow-sm w-full sm:w-auto text-left transition-all"
          >
            <span className="text-xs font-bold text-gray-400 pl-2 uppercase font-mono shrink-0">Caso:</span>
            <span className="text-xs font-bold text-gray-800 truncate max-w-[220px] sm:max-w-[240px]">
              {selectedCase.title} <span className="text-gray-400 font-medium">({selectedCase.exp})</span>
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${caseMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {caseMenuOpen && (
            <div
              ref={caseMenuRef}
              id="arena-case-menu"
              role="listbox"
              aria-label="Selecciona un caso"
              className={`absolute left-0 right-0 sm:right-0 sm:left-auto top-full mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-40 duration-150 ${
                caseMenuClosing ? 'animate-out fade-out slide-out-to-top-2' : 'animate-in fade-in slide-in-from-top-2'
              }`}
            >
              {cases.map((c) => {
                const isSelected = c.id === selectedCase.id;
                return (
                  <button
                    key={c.id}
                    id={`arena-case-option-${c.id}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      if (!isSelected) handleCaseChange(c);
                      closeCaseMenu();
                    }}
                    className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-left text-xs transition-colors ${
                      isSelected ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-50 font-semibold'
                    }`}
                  >
                    <span className="truncate">
                      {c.title} <span className="text-gray-400 font-medium">({c.exp})</span>
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* BEFORE SIMULATION: Case Presentation Briefing */}
      {!gameStarted ? (
        <div id="briefing-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Briefing Card */}
          <div className="lg:col-span-8 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-500 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  {selectedCase.exp}
                </span>
                <h4 className="font-sans font-black text-2xl text-gray-950 mt-1">{selectedCase.title}</h4>
              </div>
              <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-xl">
                Dificultad: {selectedCase.difficulty}
              </span>
            </div>

            {/* Banner of case */}
            <div className="h-44 w-full rounded-2xl overflow-hidden relative">
              <img 
                src={selectedCase.image} 
                alt="Case Thumbnail" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-6">
                <div className="max-w-md text-white space-y-1">
                  <h5 className="font-bold text-sm text-blue-300">HABILIDAD REQUERIDA</h5>
                  <p className="font-sans font-extrabold text-lg">{selectedCase.skill}</p>
                </div>
              </div>
            </div>

            {/* Case Dossier Facts */}
            <div className="space-y-4">
              <h5 className="font-sans font-bold text-sm text-gray-900 border-b border-gray-100 pb-2">Hechos de Relevancia Procesal</h5>
              <ul className="space-y-2.5">
                {selectedCase.facts.map((fact, index) => (
                  <li key={index} className="flex items-start space-x-3 text-xs text-gray-600 font-medium leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[10px] font-bold mt-0.5 shrink-0">
                      {index + 1}
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Options before starting */}
            <div className="pt-6 border-t border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {isTtsSupported ? (
                <div className="flex items-center space-x-3 bg-indigo-50/70 border border-indigo-150 rounded-2xl p-3 px-4 max-w-sm">
                  <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl animate-in fade-in duration-300">
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="toggle-tts-briefing" className="text-xs font-bold text-gray-800 cursor-pointer select-none">
                        Activar Texto a Voz (TTS)
                      </label>
                      <input 
                        type="checkbox" 
                        id="toggle-tts-briefing"
                        checked={isTtsEnabled}
                        onChange={(e) => setIsTtsEnabled(e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer accent-indigo-600"
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 font-medium">Escucha las declaraciones del testigo y del juez automáticamente.</p>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-gray-400 font-semibold italic">
                  Lector de voz no compatible con este navegador
                </div>
              )}
              
              <button
                id="btn-arena-launch"
                onClick={handleStartSimulation}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/15 self-end sm:self-center cursor-pointer"
              >
                <Swords className="w-4 h-4 text-white" />
                <span>INICIAR SIMULACIÓN AHORA</span>
              </button>
            </div>
          </div>

          {/* Right Briefing Card (Testimony focus) */}
          <div className="lg:col-span-4 bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-6">
            <h5 className="font-sans font-bold text-sm text-gray-900 flex items-center space-x-1.5 border-b border-gray-200 pb-2.5">
              <MessageSquare className="w-4.5 h-4.5 text-indigo-500" />
              <span>Objetivo del Testigo</span>
            </h5>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-2">
                <p className="text-[10px] font-bold text-gray-400 font-mono">TESTIGO A INTERROGAR</p>
                <h6 className="font-sans font-bold text-sm text-gray-800">{selectedCase.testimony.witnessName}</h6>
                <span className="inline-block text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-md border border-red-100">
                  {selectedCase.testimony.witnessRole}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500">Extracto de la Declaración Inicial:</p>
                <div className="bg-amber-50/50 border border-amber-100/50 p-4 rounded-2xl italic text-xs text-gray-600 leading-relaxed font-medium">
                  "{selectedCase.testimony.statement}"
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* DURING SIMULATION: Courtroom Simulator Console */
        <div id="sim-console" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[500px]">
          
          {/* Left Console: Dialogue Screen & Options */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white border border-gray-200/80 rounded-3xl shadow-md overflow-hidden">
            {/* Header of Console */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                <span className="text-xs font-mono font-bold text-gray-600">SALA DE JUICIO EN VIVO</span>
              </div>
              
              <div className="flex items-center space-x-3">
                {isTtsSupported && (
                  <button
                    type="button"
                    onClick={() => {
                      const newTtsVal = !isTtsEnabled;
                      setIsTtsEnabled(newTtsVal);
                      if (!newTtsVal && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                    }}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isTtsEnabled 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    title={isTtsEnabled ? 'Desactivar Texto a Voz' : 'Activar Texto a Voz'}
                  >
                    {isTtsEnabled ? <Volume2 className="w-3.5 h-3.5 text-indigo-600 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5 text-gray-400" />}
                    <span className="hidden sm:inline">Texto a Voz</span>
                  </button>
                )}
                <span className="text-xs text-gray-500 font-bold font-mono bg-white border border-gray-100 px-2.5 py-1 rounded-xl">
                  Preguntas Formuladas: {answeredQuestionIds.length}
                </span>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-6 flex-1 overflow-y-auto space-y-5 max-h-[400px] min-h-[300px]">
              {conversationHistory.map((msg, index) => {
                const isUser = msg.sender === 'user';
                const isWitness = msg.sender === 'witness';
                const isJudge = msg.sender === 'judge';
                const isSys = msg.sender === 'system';

                return (
                  <div key={index} className="space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] md:max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium ${
                        isUser 
                          ? 'bg-blue-600 text-white rounded-br-none font-semibold'
                          : isWitness
                          ? 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200/60'
                          : isJudge
                          ? 'bg-amber-50 text-amber-900 rounded-bl-none border border-amber-200'
                          : 'bg-indigo-50/50 text-indigo-800 border border-indigo-100 font-mono text-center w-full py-2'
                      }`}>
                        {/* Sender Label & TTS Player */}
                        {!isSys && (
                          <div className="flex items-center justify-between gap-4 opacity-75 mb-1.5 border-b border-current/10 pb-0.5">
                            <span className="text-[9px] font-bold uppercase tracking-wider font-sans">
                              {isUser ? 'Tú (Defensor)' : isWitness ? selectedCase.testimony.witnessName : 'Su Señoría (Juez)'}
                            </span>
                            {isTtsSupported && (
                              <button
                                type="button"
                                onClick={() => speakText(msg.text, true)}
                                className="hover:opacity-100 transition-opacity p-0.5 cursor-pointer flex items-center justify-center rounded hover:bg-current/10"
                                title="Escuchar mensaje"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                        <p>{msg.text}</p>
                      </div>
                    </div>

                    {/* Feedback block specifically for witness answer (educational assistance) */}
                    {!isUser && msg.feedback && (
                      <div className="ml-2 pl-4 border-l-2 border-emerald-500 py-1 max-w-lg">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider">RETROALIMENTACIÓN TÁCTICA</span>
                        </div>
                        <p className="text-[11px] text-gray-500 font-medium leading-relaxed">{msg.feedback}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator: shown while the witness "thinks" before responding */}
              {isWitnessTyping && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-gray-100 rounded-2xl rounded-bl-none border border-gray-200/60 px-4 py-3.5 flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  </div>
                </div>
              )}

              {/* Instant objection pop feedback */}
              {objectionFeedback && (
                <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs leading-relaxed font-bold animate-pulse">
                  <div className="flex items-center space-x-1.5 mb-1 text-amber-700">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Resolución de Objeción</span>
                  </div>
                  <p>{objectionFeedback}</p>
                </div>
              )}

              {/* Scroll anchor: keeps the latest message in view */}
              <div ref={conversationEndRef} />
            </div>

            {/* Input / Control Area */}
            <div className="border-t border-gray-100 p-5 bg-gray-50 space-y-4">
              
              {/* If game is over, show Finish button */}
              {gameOver ? (
                <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-inner text-center space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h5 className="font-sans font-bold text-base text-gray-900">¡Simulación de Juicio Finalizada!</h5>
                    <p className="text-xs text-gray-500 font-medium mt-1">El tribunal ha deliberado. Tus puntajes procesales han sido computados.</p>
                  </div>
                  <button 
                    id="btn-finish-simulation"
                    onClick={handleFinishGame}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 px-6 rounded-xl transition-colors shadow"
                  >
                    VER DICTAMEN Y COMPUTAR PUNTOS
                  </button>
                </div>
              ) : (
                <>
                  {/* Objection Button and Options */}
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-bold text-gray-400 font-mono uppercase">Selecciona tu línea argumentativa:</p>
                    <button
                      id="btn-arena-objection"
                      onClick={() => setShowObjectionModal(true)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl text-xs font-bold transition-all"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>¡OBJECIÓN!</span>
                    </button>
                  </div>

                  {/* Branching Dialogue Questions */}
                  <div className="space-y-2">
                    {availableQuestions.length > 0 ? (
                      availableQuestions.map((q) => (
                        <button
                          key={q.id}
                          id={`dialog-option-${q.id}`}
                          onClick={() => handleSelectOption(q)}
                          className="w-full text-left p-3.5 bg-white hover:bg-indigo-50/50 border border-gray-200 hover:border-indigo-200 text-xs text-gray-700 font-semibold rounded-2xl shadow-sm transition-all flex items-start space-x-2.5 leading-relaxed group"
                        >
                          <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            ?
                          </span>
                          <span className="flex-1">{q.text}</span>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 shrink-0 self-center" />
                        </button>
                      ))
                    ) : (
                      <p className="text-xs text-gray-400 font-medium text-center py-4 italic">No quedan preguntas sugeridas. Puedes escribir un argumento libre abajo.</p>
                    )}
                  </div>

                  {/* Custom typed text bar */}
                  <form onSubmit={handleCustomSubmit} className="relative mt-2">
                    <input 
                      id="custom-argument-input"
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      placeholder="Escribe tu propio argumento legal o pregunta al perito..."
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-4 pr-24 text-xs text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all animate-in fade-in duration-350"
                    />
                    <div className="absolute right-2 top-2 flex items-center space-x-1.5">
                      {isSttSupported && (
                        <button
                          type="button"
                          onClick={toggleListening}
                          className={`p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center ${
                            isListening 
                              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                              : 'bg-gray-150 hover:bg-gray-200 text-gray-600'
                          }`}
                          title={isListening ? 'Detener grabación' : 'Dictar por voz (Voz a Texto)'}
                        >
                          {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                        </button>
                      )}
                      <button 
                        type="submit"
                        id="btn-send-custom-argument"
                        className="p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Right Console: Live Scoring Dashboard */}
          <div className="lg:col-span-4 bg-gray-900 text-white border border-gray-800 rounded-3xl p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-800 pb-4">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
                <h5 className="font-sans font-bold text-base text-white">Tablero Analítico</h5>
              </div>

              {/* Real-time score meter */}
              <div className="text-center bg-white/5 border border-white/10 p-5 rounded-2xl">
                <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-widest block uppercase mb-1">PUNTAJE ESTIMADO</span>
                <div className="flex items-baseline justify-center">
                  <span className="font-sans font-extrabold text-4xl text-white">
                    {Math.round((currentMetrics.efficacy + currentMetrics.legalTech + currentMetrics.oratory) / 3)}
                  </span>
                  <span className="text-sm text-gray-500 font-bold">/100</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium mt-1">Evoluciona en vivo según la calidad de tus interrogantes.</p>
              </div>

              {/* Sub-metrics bars */}
              <div className="space-y-5">
                <span className="text-[10px] font-bold text-gray-400 font-mono tracking-widest block uppercase">CRITERIOS PROCESALES</span>

                {/* Eficacia */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span>Eficacia</span>
                    <span className="font-mono text-indigo-400">{currentMetrics.efficacy}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: scorePanelMounted ? `${currentMetrics.efficacy}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Técnica Legal */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span>Técnica Legal</span>
                    <span className="font-mono text-indigo-400">{currentMetrics.legalTech}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: scorePanelMounted ? `${currentMetrics.legalTech}%` : '0%' }}
                    />
                  </div>
                </div>

                {/* Oratoria */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span>Oratoria</span>
                    <span className="font-mono text-indigo-400">{currentMetrics.oratory}%</span>
                  </div>
                  <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                      style={{ width: scorePanelMounted ? `${currentMetrics.oratory}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Hint Box */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mt-6">
              <div className="flex items-start space-x-2 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-gray-200">Tip de Litigio</p>
                  <p className="text-gray-400 leading-relaxed text-[11px] font-medium">
                    Evita preguntas directas capciosas al testigo o perito de la contraparte. Usa preguntas cerradas que fuercen contradicciones fácticas fidedignas.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* OBJECTION SELECTION POPUP MODAL */}
      {showObjectionModal && (
        <ObjectionModal
          onSelect={handleTriggerObjection}
          onClose={() => setShowObjectionModal(false)}
        />
      )}

    </div>
  );
}

interface ObjectionModalProps {
  onSelect: (type: string) => void;
  onClose: () => void;
}

function ObjectionModal({ onSelect, onClose }: ObjectionModalProps) {
  const containerRef = useModalA11y<HTMLDivElement>(onClose);

  return (
    <div id="objection-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="objection-modal-title"
        className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center space-x-2.5 text-red-600 border-b border-gray-100 pb-3">
          <ShieldAlert className="w-6 h-6" />
          <h5 id="objection-modal-title" className="font-sans font-black text-lg">Formular Objeción de Litigio</h5>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed font-medium">
          Sustenta el recurso de objeción de manera técnica. Elige el fundamento idóneo para evitar que la contraparte desvíe la validez de la prueba:
        </p>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            id="btn-objection-especulativa"
            onClick={() => onSelect('Especulativa')}
            className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
          >
            <span>Especulativa</span>
            <span className="text-[9px] text-gray-400 font-medium">Asunciones de opinión</span>
          </button>

          <button
            id="btn-objection-impertinente"
            onClick={() => onSelect('Impertinente')}
            className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
          >
            <span>Impertinente</span>
            <span className="text-[9px] text-gray-400 font-medium">Fuera de pertinencia</span>
          </button>

          <button
            id="btn-objection-argumentativa"
            onClick={() => onSelect('Argumentativa')}
            className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
          >
            <span>Argumentativa</span>
            <span className="text-[9px] text-gray-400 font-medium">Intenta debatir con testigo</span>
          </button>

          <button
            id="btn-objection-inadmisible"
            onClick={() => onSelect('Inadmisible')}
            className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
          >
            <span>Inadmisible</span>
            <span className="text-[9px] text-gray-400 font-medium">Prueba ilícita u omitida</span>
          </button>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-100">
          <button
            id="btn-objection-cancel"
            onClick={onClose}
            className="text-xs font-bold text-gray-500 hover:text-gray-800"
          >
            Desestimar Objeción
          </button>
        </div>
      </div>
    </div>
  );
}
