import { 
  Zap, 
  Play, 
  BookOpen, 
  Swords, 
  TrendingUp, 
  Clock, 
  Linkedin, 
  Eye, 
  Briefcase,
  ChevronRight,
  Scale,
  Award,
  Sparkles
} from 'lucide-react';
import { Case, RecentCase, UserProgress } from '../types';

interface DashboardProps {
  cases: Case[];
  recentCases: RecentCase[];
  userProgress: UserProgress;
  onSelectCase: (caseId: string, action: 'study' | 'arena') => void;
  onViewChange: (view: string) => void;
  onShareCertificate: (caseTitle: string) => void;
  onViewFeedback: (caseId: string) => void;
}

export default function Dashboard({
  cases,
  recentCases,
  userProgress,
  onSelectCase,
  onViewChange,
  onShareCertificate,
  onViewFeedback
}: DashboardProps) {
  // We'll suggest the first case for the "Tu Despacho Virtual" main slot (Homicidio Calificado)
  const suggestedCase = cases.find(c => c.id === 'homicidio-calificado') || cases[0];

  return (
    <div className="space-y-8 pb-12 select-none animate-in fade-in duration-300">
      
      {/* 1. Acceso Rápido Bar */}
      <div id="acc-rapido-container" className="bg-white rounded-2xl p-4 border border-gray-200/70 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <Zap className="w-6 h-6 fill-blue-500 text-blue-500" />
          </div>
          <div>
            <h4 className="font-sans font-bold text-base text-gray-900">Acceso Rápido</h4>
            <p className="text-xs text-gray-500 font-medium">Continúa tu entrenamiento donde lo dejaste</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button 
            id="btn-acc-repasar-expediente"
            onClick={() => onSelectCase(suggestedCase.id, 'study')}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 text-xs font-bold transition-all duration-150 flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span>Repasar Expediente</span>
          </button>
          <button 
            id="btn-acc-simulacion-rapida"
            onClick={() => onSelectCase(suggestedCase.id, 'arena')}
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0A1128] hover:bg-[#1D2D44] text-white text-xs font-bold transition-all duration-150 flex items-center justify-center space-x-2 shadow-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Simulación Rápida</span>
          </button>
        </div>
      </div>

      {/* 2. Main Hero Card (Banner) */}
      <div 
        id="hero-banner-card"
        className="relative overflow-hidden bg-gradient-to-br from-[#121E38] via-[#1D2D44] to-[#0A1128] rounded-3xl p-8 sm:p-10 border border-[#1D2D44]/40 shadow-xl flex items-center justify-between"
      >
        {/* Subtle Decorative Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

        <div className="max-w-xl relative z-10 space-y-6">
          <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-white leading-tight tracking-tight">
            ¿Listo para tu próxima audiencia?
          </h3>
          <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed">
            Entrena tus destrezas de litigio hoy con nuestro motor de simulación de IA avanzado. 
            Perfecciona tus contrainterrogatorios y responde objeciones en tiempo real.
          </p>
          <button 
            id="btn-hero-start-sim"
            onClick={() => onSelectCase(suggestedCase.id, 'arena')}
            className="flex items-center justify-center sm:justify-start space-x-2.5 bg-[#5B85F9] hover:bg-[#4971E3] text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-150 shadow-md shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Iniciar Simulación Rápida</span>
          </button>
        </div>

        {/* Scaled Law Graphic Graphic inside a Circular Outline (replicates image right side) */}
        <div className="hidden md:flex relative items-center justify-center w-52 h-52 shrink-0 border border-white/10 rounded-full bg-white/[0.02]">
          <div className="absolute inset-4 border border-white/5 rounded-full" />
          <div className="absolute inset-10 border border-white/10 rounded-full flex items-center justify-center bg-white/[0.03]">
            <Scale className="w-16 h-16 text-blue-300/80 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* 3. Three-Column Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Column A: Tu Despacho Virtual (Suggested Case Card) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <h4 className="font-sans font-bold text-lg text-gray-900">Tu Despacho Virtual</h4>
            <span className="text-[10px] font-mono tracking-widest text-gray-400 font-bold uppercase ml-2 bg-gray-100 px-2 py-0.5 rounded">
              Casos Sugeridos
            </span>
          </div>

          <div id="suggested-case-card" className="bg-white rounded-2xl border border-gray-200/80 shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between h-auto lg:h-[450px]">
            {/* Courtroom Image with Dark Overlay and text inside */}
            <div className="relative h-48 w-full bg-gray-900 shrink-0">
              <img 
                src={suggestedCase.image} 
                alt={suggestedCase.title}
                className="w-full h-full object-cover opacity-60"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 space-y-1">
                <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider">
                  {suggestedCase.exp}
                </span>
                <h5 className="font-sans font-bold text-lg sm:text-xl text-white leading-tight">
                  {suggestedCase.title}
                </h5>
              </div>
            </div>

            {/* Badges & Description */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                    Dificultad: {suggestedCase.difficulty}
                  </span>
                  <span className="text-[11px] font-bold text-[#3B82F6] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                    Habilidad: {suggestedCase.skill}
                  </span>
                </div>
                
                {/* Description */}
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  {suggestedCase.summary}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  id="btn-case-estudiar"
                  onClick={() => onSelectCase(suggestedCase.id, 'study')}
                  className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span>ESTUDIAR EXPEDIENTE</span>
                </button>
                
                <button 
                  id="btn-case-entrar-arena"
                  onClick={() => onSelectCase(suggestedCase.id, 'arena')}
                  className="flex items-center justify-center space-x-1.5 py-3 px-4 rounded-xl bg-[#0A1128] hover:bg-[#1D2D44] text-xs font-bold text-white transition-colors"
                >
                  <Swords className="w-4 h-4 text-gray-300" />
                  <span>ENTRAR A LA ARENA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Column B: Tu Progreso */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-sans font-bold text-lg text-gray-900">Tu Progreso</h4>
          </div>

          <div id="progress-card" className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-md flex flex-col justify-between h-auto lg:h-[450px]">
            {/* Circular Gauge */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    stroke="#E2E8F0" 
                    strokeWidth="8" 
                    fill="transparent" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="42" 
                    stroke="#1A56DB" 
                    strokeWidth="8" 
                    fill="transparent" 
                    strokeDasharray="263.89"
                    strokeDashoffset={263.89 - (263.89 * userProgress.litigationScore) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
                {/* Score numbers inside */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center">
                    <span className="font-sans font-extrabold text-3xl text-gray-900">{userProgress.litigationScore}</span>
                    <span className="text-xs text-gray-400 font-bold">/100</span>
                  </div>
                  <span className="text-[9px] font-mono tracking-widest text-gray-400 font-bold block mt-1">
                    SCORE DE LITIGIO
                  </span>
                </div>
              </div>
            </div>

            {/* Individual Progress Bars */}
            <div className="space-y-4 shrink-0 border-t border-gray-100 pt-4">
              {/* Eficacia */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Eficacia</span>
                  <span className="font-mono">{userProgress.efficacy}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${userProgress.efficacy}%` }}
                  />
                </div>
              </div>

              {/* Técnica Legal */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Técnica Legal</span>
                  <span className="font-mono">{userProgress.legalTech}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${userProgress.legalTech}%` }}
                  />
                </div>
              </div>

              {/* Oratoria */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700">
                  <span>Oratoria</span>
                  <span className="font-mono">{userProgress.oratory}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${userProgress.oratory}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column C: Casos Recientes */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h4 className="font-sans font-bold text-lg text-gray-900">Casos Recientes</h4>
          </div>

          <div id="recent-cases-card" className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-md flex flex-col justify-between h-auto lg:h-[450px]">
            {/* Recent Cases list */}
            <div className="space-y-4 overflow-y-auto max-h-[340px] pr-1">
              {recentCases.map((rc) => (
                <div 
                  key={rc.id} 
                  id={`recent-case-row-${rc.id}`}
                  className="bg-gray-50 border border-gray-100 rounded-xl p-4 space-y-3.5 transition-all hover:bg-gray-100/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider uppercase">
                        {rc.date}
                      </span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                      rc.status === 'Absolución' 
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : rc.status === 'Apelación'
                        ? 'bg-amber-50 text-amber-600 border border-amber-100'
                        : 'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {rc.status}
                    </span>
                  </div>

                  <div>
                    <h5 className="font-sans font-bold text-sm text-gray-900">{rc.title}</h5>
                    <div className="flex items-center space-x-1.5 mt-1.5">
                      <span className="text-xs text-gray-500 font-bold font-mono">Score: {rc.score}/100</span>
                      <div className="flex space-x-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < rc.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions depending on case status */}
                  {rc.status === 'Absolución' ? (
                    <button 
                      id={`btn-share-cert-${rc.id}`}
                      onClick={() => onShareCertificate(rc.title)}
                      className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-[#D1E2FF] hover:bg-[#BBD6FF] text-[#002B7A] rounded-lg font-bold text-xs transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 fill-[#002B7A] stroke-none" />
                      <span>Compartir Certificado</span>
                    </button>
                  ) : (
                    <button 
                      id={`btn-view-feedback-${rc.id}`}
                      onClick={() => onViewFeedback(rc.id)}
                      className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-bold text-xs transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>Ver Retroalimentación</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom link */}
            <div className="text-center pt-3 border-t border-gray-100">
              <button 
                id="btn-view-all-history"
                onClick={() => onViewChange('locker')}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center justify-center space-x-1 w-full"
              >
                <span>Ver todo el historial</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
