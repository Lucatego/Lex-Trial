import React, { useState, useRef, useEffect } from 'react';
import { Bell, Settings, Plus, Sparkles, CheckCircle, Scale } from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  userProgress: UserProgress;
  onOpenNewCase: () => void;
  onViewChange: (view: string) => void;
}

export default function Header({ userProgress, onOpenNewCase, onViewChange }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationsClosing, setNotificationsClosing] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const bellRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const notifications = [
    { id: 1, text: '¡Excelente trabajo! Tu oratoria penal subió un 5% tras el caso #45.', type: 'progress', time: 'Hace 2 horas' },
    { id: 2, text: 'Nuevo expediente penal asignado: Homicidio Calificado (Penal).', type: 'case', time: 'Ayer' },
    { id: 3, text: 'Certificado de Absolución emitido para el caso Robo Agravado.', type: 'certificate', time: 'Hace 2 días' },
  ];

  // Play a brief exit animation before actually unmounting the popover
  const closeNotifications = () => {
    setNotificationsClosing(true);
    setTimeout(() => {
      setShowNotifications(false);
      setNotificationsClosing(false);
    }, 150);
  };

  const handleToggleNotifications = () => {
    if (showNotifications) {
      closeNotifications();
    } else {
      setShowNotifications(true);
      setUnreadNotifications(0);
    }
  };

  // Close on outside click or Escape, like the modals do
  useEffect(() => {
    if (!showNotifications) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (popoverRef.current?.contains(target) || bellRef.current?.contains(target)) return;
      closeNotifications();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeNotifications();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showNotifications]);

  return (
    <header className="bg-white border-b border-gray-200/80 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm shadow-gray-100/40">
      {/* Title & Greeting / Mobile Logo */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Mobile Logo Button */}
        <button 
          onClick={() => onViewChange('despacho')}
          className="md:hidden flex items-center space-x-2.5 hover:opacity-80 transition-opacity text-left"
        >
          <svg viewBox="0 0 100 100" className="w-10 h-10 shrink-0" xmlns="http://www.w3.org/2000/svg">
            <polygon 
              points="50,6 88,28 88,72 50,94 12,72 12,28" 
              stroke="#0F172A" 
              strokeWidth="7" 
              fill="none" 
              strokeLinejoin="round" 
            />
            <line 
              x1="50" 
              y1="22" 
              x2="50" 
              y2="34" 
              stroke="#0F172A" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="50" 
              y1="66" 
              x2="50" 
              y2="78" 
              stroke="#0F172A" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="22" 
              y1="43" 
              x2="78" 
              y2="43" 
              stroke="#2563EB" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="22" 
              y1="57" 
              x2="78" 
              y2="57" 
              stroke="#2563EB" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="14" 
              fill="#0F172A" 
            />
          </svg>
          <div className="flex flex-col justify-center">
            <h1 className="font-sans font-bold text-lg tracking-tight text-gray-900 leading-none">LexTrial</h1>
            <p className="font-mono text-[8px] uppercase tracking-widest text-blue-600 font-semibold mt-0.5">Elite Counsel</p>
          </div>
        </button>

        {/* Desktop Greeting */}
        <div className="hidden md:block">
          <h2 id="header-welcome-title" className="font-sans font-bold text-lg sm:text-2xl text-gray-900 tracking-tight flex items-center space-x-2">
            <span className="truncate max-w-[120px] sm:max-w-none">Hola, {userProgress.name}</span>
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 animate-pulse shrink-0" />
          </h2>
          <p className="text-xs text-gray-500 font-medium mt-0.5">Controla tu despacho virtual y afina tus destrezas procesales.</p>
        </div>
      </div>

      {/* Action Suite */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Actions Icons & Buttons */}
        <div className="flex items-center space-x-1 sm:space-x-3 relative">
          {/* Notifications Button */}
          <button
            ref={bellRef}
            id="btn-notifications-toggle"
            onClick={handleToggleNotifications}
            aria-label="Notificaciones"
            aria-haspopup="true"
            aria-expanded={showNotifications}
            className="relative p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-150"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span id="notifications-badge" className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-bounce" />
            )}
          </button>

          {/* Notifications Popover */}
          {showNotifications && (
            <div
              ref={popoverRef}
              id="notifications-popover"
              role="menu"
              className={`absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 duration-150 ${
                notificationsClosing ? 'animate-out fade-out slide-out-to-top-2' : 'animate-in fade-in slide-in-from-top-2'
              }`}
            >
              <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span className="font-sans font-bold text-sm text-gray-800">Notificaciones</span>
                <span className="text-[10px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded-full">Recientes</span>
              </div>
              <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-gray-50 transition-colors flex items-start space-x-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-600 leading-normal">{n.text}</p>
                      <span className="text-[9px] text-gray-400 font-mono mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pt-2 text-center border-t border-gray-100">
                <button
                  onClick={closeNotifications}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                >
                  Entendido
                </button>
              </div>
            </div>
          )}

          {/* Settings Button */}
          <button
            id="btn-settings-header"
            onClick={() => onViewChange('perfil')}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-150"
            title="Configuración de Perfil"
            aria-label="Configuración de Perfil"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Action Button */}
        <button
          id="btn-header-new-case"
          onClick={onOpenNewCase}
          className="flex items-center space-x-1.5 bg-[#0A1128] hover:bg-[#1D2D44] text-white py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-150 shadow-sm"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">Nuevo Caso</span>
        </button>
      </div>
    </header>
  );
}
