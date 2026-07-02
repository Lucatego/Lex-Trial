import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Award, 
  Scale, 
  Star, 
  Check, 
  ShieldAlert, 
  Save, 
  Sparkles,
  Zap
} from 'lucide-react';
import { UserProgress } from '../types';

interface ProfileProps {
  userProgress: UserProgress;
  onUpdateProgress: (updates: Partial<UserProgress>) => void;
}

export default function Profile({ userProgress, onUpdateProgress }: ProfileProps) {
  const [name, setName] = useState(userProgress.name);
  const [email, setEmail] = useState('jhonatandavila27@gmail.com'); // Derived from metadata
  const [specialty, setSpecialty] = useState<'Penal' | 'Civil' | 'Laboral'>('Penal');
  const [saved, setSaved] = useState(false);

  const specialties = [
    { id: 'Penal', label: 'Derecho Penal', desc: 'Especialista en interrogatorios, contrainterrogatorios y alegatos de legítima defensa.' },
    { id: 'Civil', label: 'Derecho Civil', desc: 'Enfocado en responsabilidad civil contractual, daños extracontractuales e indemnizaciones.' },
    { id: 'Laboral', label: 'Derecho Laboral', desc: 'Estructuración de despidos procedimentales e indemnizaciones por accidentes.' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgress({ name });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-12 select-none animate-in fade-in duration-300">
      
      {/* Title Header */}
      <div className="border-b border-gray-100 pb-5">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-indigo-600" />
          <h3 className="font-sans font-bold text-xl text-gray-950">Mi Perfil Profesional</h3>
        </div>
        <p className="text-xs text-gray-500 font-medium mt-0.5">Administra tus datos, especialidad jurídica y credenciales de acceso.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Card: Avatar and Premium Status */}
        <div className="lg:col-span-4 bg-[#0A1128] border border-[#1D2D44] text-white p-6 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-4">
            <div className="relative w-28 h-28 mx-auto">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300"
                alt="Carlos Avatar"
                className="w-28 h-28 rounded-3xl object-cover border-2 border-yellow-500 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full p-1 shadow-lg">
                <Star className="w-4 h-4 fill-black" />
              </div>
            </div>

            <div>
              <h4 className="font-sans font-black text-xl text-white">{userProgress.name}</h4>
              <p className="text-xs text-gray-400 font-medium font-mono">{email}</p>
            </div>

            <div className="inline-flex items-center space-x-1.5 bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 font-bold font-mono text-xs px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5 fill-yellow-400" />
              <span>Suscripción Premium Activa</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3 text-xs text-gray-300 font-medium">
            <div className="flex justify-between">
              <span>Suscrito desde:</span>
              <span className="font-mono text-gray-400">Enero 2026</span>
            </div>
            <div className="flex justify-between">
              <span>Especialidad Principal:</span>
              <span className="font-bold text-indigo-400">{specialty}</span>
            </div>
            <div className="flex justify-between">
              <span>Vencimiento Plan:</span>
              <span className="font-mono text-yellow-400">01/01/2027</span>
            </div>
          </div>
        </div>

        {/* Right Card: Configuration Form */}
        <div className="lg:col-span-8 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h4 className="font-sans font-bold text-base text-gray-950 border-b border-gray-100 pb-3">Detalles de la Cuenta</h4>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    id="profile-name-input"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Correo de Enlace</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input 
                    id="profile-email-input"
                    type="email" 
                    value={email}
                    disabled
                    title="El correo no se puede cambiar"
                    className="w-full bg-gray-100 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-xs font-semibold text-gray-400 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* Specialties Picker */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-500 uppercase block">Especialidad de Práctica Recomendada</label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {specialties.map((spec) => {
                  const isSel = specialty === spec.id;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      id={`btn-spec-${spec.id}`}
                      onClick={() => setSpecialty(spec.id as any)}
                      className={`p-4 text-left border rounded-2xl transition-all ${
                        isSel 
                          ? 'border-indigo-500 bg-indigo-50/40 shadow-sm' 
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-xs font-bold ${isSel ? 'text-indigo-700' : 'text-gray-800'}`}>
                          {spec.label}
                        </span>
                        {isSel && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <p className="text-[10px] text-gray-500 leading-normal font-medium">{spec.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions & Saving Toast notifications */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                {saved && (
                  <span id="profile-saved-toast" className="text-xs text-emerald-600 font-bold flex items-center space-x-1 animate-pulse">
                    <Check className="w-4 h-4" />
                    <span>¡Información guardada con éxito!</span>
                  </span>
                )}
              </div>

              <button
                type="submit"
                id="btn-profile-save"
                className="flex items-center space-x-2 bg-[#0A1128] hover:bg-[#1D2D44] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>GUARDAR CONFIGURACIÓN</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
