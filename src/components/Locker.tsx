import { useState } from 'react';
import { 
  Lock, 
  Award, 
  Calendar, 
  ChevronRight, 
  Share2, 
  Linkedin, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Download, 
  Scale, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UserProgress, RecentCase } from '../types';

interface LockerProps {
  userProgress: UserProgress;
  recentCases: RecentCase[];
  onShareCertificate: (caseTitle: string) => void;
}

export default function Locker({ userProgress, recentCases, onShareCertificate }: LockerProps) {
  const [selectedCaseForCert, setSelectedCaseForCert] = useState<RecentCase | null>(
    recentCases.find(rc => rc.status === 'Absolución') || null
  );
  
  const [showCertificateView, setShowCertificateView] = useState(false);
  const [isCertClosing, setIsCertClosing] = useState(false);

  // Play the exit animation before actually swapping the certificate view away
  const handleCloseCertificate = () => {
    setIsCertClosing(true);
    setTimeout(() => {
      setShowCertificateView(false);
      setIsCertClosing(false);
    }, 180);
  };

  // Parse chart data from user recent scores
  const chartData = userProgress.recentScores.map(rs => ({
    date: rs.date,
    Puntaje: rs.score,
    Caso: rs.caseTitle
  }));

  const handleOpenCertificate = (rc: RecentCase) => {
    setSelectedCaseForCert(rc);
    setShowCertificateView(true);
  };

  return (
    <div className="space-y-8 pb-12 select-none animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-5">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-indigo-600" />
          <h3 className="font-sans font-bold text-xl text-gray-950">Locker de Resultados</h3>
        </div>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Consulta tus dictámenes, récords procesales e insignias de litigio.</p>
      </div>

      {/* KPI Stats Suite */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Total Score */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">SCORE DE LITIGIO GLOBAL</span>
          <div className="flex items-baseline space-x-1">
            <span className="font-sans font-black text-3xl text-gray-950">{userProgress.litigationScore}</span>
            <span className="text-sm text-gray-400 font-bold">/100</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">Rango: Elite Abogado Procesal</p>
        </div>

        {/* Completed Cases */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">CASOS EJECUTADOS</span>
          <span className="font-sans font-black text-3xl text-gray-950 block">{userProgress.casesCompleted}</span>
          <p className="text-[10px] text-gray-500 font-medium">Equivale a 12 horas de simulación.</p>
        </div>

        {/* Absoluciones Rate */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">TASA DE ABSOLUCIÓN</span>
          <span className="font-sans font-black text-3xl text-gray-950 block">
            {Math.round((recentCases.filter(c => c.status === 'Absolución').length / (recentCases.length || 1)) * 100)}%
          </span>
          <p className="text-[10px] text-indigo-600 font-bold">Excelente desempeño defensivo.</p>
        </div>

        {/* Insignias Obtenidas */}
        <div className="bg-white border border-gray-200/80 p-5 rounded-2xl shadow-sm space-y-2">
          <span className="text-[10px] text-gray-400 font-mono font-bold uppercase block">INSIGNIAS MÉRITO</span>
          <span className="font-sans font-black text-3xl text-yellow-500 block">3</span>
          <p className="text-[10px] text-gray-500 font-medium">Balanza de Plata, Escudo de Objetor, etc.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Score progress chart */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-gray-200/80 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <h4 className="font-sans font-bold text-sm text-gray-900">Curva de Desempeño Procesal</h4>
              </div>
              <span className="text-[10px] font-mono text-gray-400 font-bold">ÚLTIMAS SIMULACIONES</span>
            </div>

            {/* Recharts responsive container */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis domain={[50, 100]} stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#fff' }} 
                    labelStyle={{ fontSize: '11px', fontWeight: 'bold', color: '#38BDF8' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Puntaje" 
                    stroke="#4F46E5" 
                    strokeWidth={3} 
                    activeDot={{ r: 6 }} 
                    dot={{ strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Historical detailed table */}
          <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h4 className="font-sans font-bold text-sm text-gray-900 border-b border-gray-100 pb-3">Historial de Dictámenes Registrados</h4>
            
            <div className="divide-y divide-gray-100">
              {recentCases.map((rc) => (
                <div key={rc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono font-bold text-gray-400 uppercase">{rc.date} • {rc.type}</span>
                    <h5 className="font-sans font-bold text-sm text-gray-900">{rc.title}</h5>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-gray-900 block">Score: {rc.score}/100</span>
                      <span className={`text-[10px] font-bold ${
                        rc.status === 'Absolución' ? 'text-emerald-600' : rc.status === 'Apelación' ? 'text-amber-600' : 'text-red-600'
                      }`}>{rc.status}</span>
                    </div>

                    {rc.status === 'Absolución' ? (
                      <button
                        id={`btn-locker-view-cert-${rc.id}`}
                        onClick={() => handleOpenCertificate(rc)}
                        className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1.5"
                      >
                        <Award className="w-4 h-4" />
                        <span>Ver Certificado</span>
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-semibold px-3 py-2 bg-gray-50 rounded-xl">Sin Diploma</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Certificate Viewer Panel */}
        <div className="lg:col-span-4 space-y-6">
          {showCertificateView && selectedCaseForCert ? (
            <div id="diploma-frame" className={`bg-[#0A1128] border border-[#1D2D44] text-white p-6 rounded-3xl shadow-xl space-y-6 ${isCertClosing ? 'animate-out fade-out zoom-out-95 duration-200' : 'animate-in fade-in zoom-in-95 duration-200'}`}>
              <div className="text-center border-b border-white/10 pb-4 space-y-1">
                <Scale className="w-8 h-8 text-yellow-400 mx-auto" />
                <h5 className="font-sans font-bold text-sm text-white">Certificación Profesional de Litigio</h5>
                <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">LexTrial Elite Counsel</p>
              </div>

              {/* Certificate Inner Card representing elegant physical credential */}
              <div className="bg-white text-gray-900 p-6 rounded-2xl border-4 border-double border-yellow-500 relative overflow-hidden space-y-4">
                {/* Subtle seal watermark */}
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-yellow-500/10 flex items-center justify-center transform rotate-12">
                  <Scale className="w-12 h-12 text-yellow-600/20" />
                </div>

                <div className="text-center space-y-2">
                  <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-gray-400">CERTIFICADO DE MÉRITO</span>
                  <p className="text-xs font-medium leading-relaxed">Se otorga con el carácter de Absolución a:</p>
                  <h6 className="font-sans font-black text-base text-[#002B7A] border-b border-gray-100 pb-2">{userProgress.name}</h6>
                </div>

                <div className="space-y-1.5 text-center">
                  <p className="text-[10px] text-gray-500">Por haber acreditado un Score aprobatorio de <strong className="text-gray-900">{selectedCaseForCert.score}/100</strong> en el simulador procesal de la causa de:</p>
                  <p className="font-sans font-extrabold text-xs text-gray-800">{selectedCaseForCert.title}</p>
                </div>

                <div className="flex items-center justify-between text-[8px] text-gray-400 font-mono pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span>REGISTRO</span>
                    <span className="font-bold text-gray-600">LEX-782-2026</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span>FECHA EMISIÓN</span>
                    <span className="font-bold text-gray-600">{selectedCaseForCert.date}</span>
                  </div>
                </div>
              </div>

              {/* Sharing utilities */}
              <div className="space-y-3">
                <button
                  id="btn-diploma-linkedin"
                  onClick={() => onShareCertificate(selectedCaseForCert.title)}
                  className="w-full py-3 bg-[#0077B5] hover:bg-[#005B8C] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center space-x-2 shadow-md shadow-[#0077B5]/10"
                >
                  <Linkedin className="w-4 h-4 fill-white stroke-none" />
                  <span>Publicar Logro en LinkedIn</span>
                </button>
                
                <button
                  id="btn-diploma-close"
                  onClick={handleCloseCertificate}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold transition-colors text-center"
                >
                  Cerrar Visualizador
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h5 className="font-sans font-bold text-sm text-gray-900">Emisor de Certificados</h5>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">Completa cualquier simulación con veredicto de <strong>Absolución</strong> (score mayor a 85) para emitir tu diploma legal.</p>
              </div>
              {recentCases.some(rc => rc.status === 'Absolución') && (
                <button 
                  onClick={() => {
                    const absCase = recentCases.find(rc => rc.status === 'Absolución');
                    if (absCase) handleOpenCertificate(absCase);
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                >
                  Ver último certificado disponible
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
