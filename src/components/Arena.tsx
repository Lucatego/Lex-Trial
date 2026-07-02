import React, { useState, useEffect } from 'react';
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
  Award,
  AlertTriangle,
  Send
} from 'lucide-react';
import { Case, SimulationQuestion, RecentCase } from '../types';

interface ArenaProps {
  cases: Case[];
  activeCaseId: string | null;
  onBackToDashboard: () => void;
  onSimulationComplete: (score: number, status: 'Absolución' | 'Condena' | 'Apelación', efficacy: number, legalTech: number, oratory: number, caseId: string) => void;
}

export default function Arena({ cases, activeCaseId, onBackToDashboard, onSimulationComplete }: ArenaProps) {
  // Select initial case
  const [selectedCase, setSelectedCase] = useState<Case>(
    cases.find(c => c.id === activeCaseId) || cases[0]
  );

  // Simulation Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<{ sender: 'user' | 'witness' | 'judge' | 'system'; text: string; feedback?: string }[]>([]);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState<string[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({ efficacy: 70, legalTech: 70, oratory: 70 });
  const [showObjectionModal, setShowObjectionModal] = useState(false);
  const [objectionFeedback, setObjectionFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Custom Typed Input
  const [customInput, setCustomInput] = useState('');

  // Handle case selection change
  const handleCaseChange = (c: Case) => {
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
    setConversationHistory([
      { sender: 'system', text: `⚖️ Simulación Iniciada: ${selectedCase.title}. Estás actuando como Abogado Defensor Principal.` },
      { sender: 'witness', text: selectedCase.simulationScenario.initialMessage }
    ]);
    setCurrentStep(1);
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
    setTimeout(() => {
      setConversationHistory(prev => [
        ...prev,
        { 
          sender: 'witness', 
          text: q.response,
          feedback: q.feedback
        }
      ]);

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
    setTimeout(() => {
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

    setConversationHistory(prev => [
      ...prev,
      { sender: 'system', text: `🛡️ Formulaste una Objeción por ser "${type}".` },
      { sender: 'judge', text: isCorrect ? `Sustentada Abogado. El testigo se abstendrá de responder y se ordenará testar esa parte del acta.` : `No ha lugar, Abogado. Continúe con el interrogatorio.` }
    ]);

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

  return (
    <div className="space-y-6 pb-12 select-none animate-in fade-in duration-300">
      
      {/* Upper Navigation & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center space-x-3">
          <button 
            id="btn-arena-back"
            onClick={onBackToDashboard}
            className="p-2 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl transition-all"
            title="Volver al Despacho"
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
        <div className="flex items-center space-x-2.5 bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
          <span className="text-xs font-bold text-gray-400 pl-2 uppercase font-mono">Caso:</span>
          <select 
            id="select-arena-case"
            value={selectedCase.id}
            onChange={(e) => {
              const c = cases.find(item => item.id === e.target.value);
              if (c) handleCaseChange(c);
            }}
            className="text-xs font-bold text-gray-800 focus:outline-none bg-transparent cursor-pointer pr-3"
          >
            {cases.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.exp})
              </option>
            ))}
          </select>
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

            {/* Launch arena button */}
            <div className="pt-4 flex justify-end">
              <button
                id="btn-arena-launch"
                onClick={handleStartSimulation}
                className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shadow-indigo-600/15"
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
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500 font-bold font-mono">Preguntas Formuladas: {answeredQuestionIds.length}</span>
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
                  <div key={index} className="space-y-1">
                    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium ${
                        isUser 
                          ? 'bg-blue-600 text-white rounded-br-none font-semibold'
                          : isWitness
                          ? 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200/60'
                          : isJudge
                          ? 'bg-amber-50 text-amber-900 rounded-bl-none border border-amber-200'
                          : 'bg-indigo-50/50 text-indigo-800 border border-indigo-100 font-mono text-center w-full py-2'
                      }`}>
                        {/* Sender Label */}
                        {!isSys && (
                          <p className="text-[9px] font-bold uppercase tracking-wider opacity-60 mb-1">
                            {isUser ? 'Tú (Defensor)' : isWitness ? selectedCase.testimony.witnessName : 'Su Señoría (Juez)'}
                          </p>
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
                      className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-4 pr-12 text-xs text-gray-800 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button 
                      type="submit"
                      id="btn-send-custom-argument"
                      className="absolute right-2 top-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
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
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${currentMetrics.efficacy}%` }}
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
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${currentMetrics.legalTech}%` }}
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
                      className="bg-indigo-500 h-full rounded-full transition-all duration-300" 
                      style={{ width: `${currentMetrics.oratory}%` }}
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
        <div id="objection-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center space-x-2.5 text-red-600 border-b border-gray-100 pb-3">
              <ShieldAlert className="w-6 h-6" />
              <h5 className="font-sans font-black text-lg">Formular Objeción de Litigio</h5>
            </div>
            
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Sustenta el recurso de objeción de manera técnica. Elige el fundamento idóneo para evitar que la contraparte desvíe la validez de la prueba:
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-objection-especulativa"
                onClick={() => handleTriggerObjection('Especulativa')}
                className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
              >
                <span>Especulativa</span>
                <span className="text-[9px] text-gray-400 font-medium">Asunciones de opinión</span>
              </button>
              
              <button
                id="btn-objection-impertinente"
                onClick={() => handleTriggerObjection('Impertinente')}
                className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
              >
                <span>Impertinente</span>
                <span className="text-[9px] text-gray-400 font-medium">Fuera de pertinencia</span>
              </button>

              <button
                id="btn-objection-argumentativa"
                onClick={() => handleTriggerObjection('Argumentativa')}
                className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
              >
                <span>Argumentativa</span>
                <span className="text-[9px] text-gray-400 font-medium">Intenta debatir con testigo</span>
              </button>

              <button
                id="btn-objection-inadmisible"
                onClick={() => handleTriggerObjection('Inadmisible')}
                className="p-3 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-2xl text-left text-xs font-bold text-gray-700 hover:text-red-700 transition-all flex flex-col space-y-1"
              >
                <span>Inadmisible</span>
                <span className="text-[9px] text-gray-400 font-medium">Prueba ilícita u omitida</span>
              </button>
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-100">
              <button 
                id="btn-objection-cancel"
                onClick={() => setShowObjectionModal(false)}
                className="text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Desestimar Objeción
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
