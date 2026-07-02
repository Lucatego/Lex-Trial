import {
  Briefcase,
  Swords,
  Lock,
  User,
  Plus,
  Star
} from 'lucide-react';
import { UserProgress } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userProgress: UserProgress;
  onOpenNewCase: () => void;
  onLeaveSimulationPending?: () => void;
}

export default function Sidebar({
  currentView,
  onViewChange,
  userProgress,
  onOpenNewCase,
  onLeaveSimulationPending
}: SidebarProps) {
  const menuItems = [
    { id: 'despacho', label: 'Despacho Virtual', icon: Briefcase },
    { id: 'arena', label: 'La Arena', icon: Swords },
    { id: 'locker', label: 'Locker de Resultados', icon: Lock },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <aside id="sidebar-container" className="fixed bottom-4 left-4 right-4 rounded-2xl md:bottom-auto md:left-auto md:right-auto md:rounded-none h-16 md:h-screen md:sticky md:top-0 md:w-[17rem] bg-[#0A1128] text-gray-300 flex flex-row md:flex-col justify-around md:justify-start border md:border-t-0 md:border-r border-[#1D2D44]/50 md:border-[#1D2D44]/30 select-none z-50 shadow-xl shadow-blue-900/20 md:shadow-none overflow-hidden md:overflow-visible">
      {/* Brand Logo & Header */}
      <div className="hidden md:block p-6 pb-0">
        <button
          id="sidebar-logo-home"
          onClick={() => onViewChange('despacho')}
          className="flex items-center space-x-3 mb-8 hover:opacity-80 transition-opacity text-left"
        >
          <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md shrink-0" xmlns="http://www.w3.org/2000/svg">
            <polygon 
              points="50,6 88,28 88,72 50,94 12,72 12,28" 
              stroke="#F8FAFC" 
              strokeWidth="7" 
              fill="none" 
              strokeLinejoin="round" 
            />
            <line 
              x1="50" 
              y1="22" 
              x2="50" 
              y2="34" 
              stroke="#F8FAFC" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="50" 
              y1="66" 
              x2="50" 
              y2="78" 
              stroke="#F8FAFC" 
              strokeWidth="4.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="22" 
              y1="43" 
              x2="78" 
              y2="43" 
              stroke="#3B82F6" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
            />
            <line 
              x1="22" 
              y1="57" 
              x2="78" 
              y2="57" 
              stroke="#3B82F6" 
              strokeWidth="5.5" 
              strokeLinecap="round" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="14" 
              fill="#F8FAFC" 
            />
          </svg>
          <div>
            <h1 className="font-sans font-bold text-lg tracking-tight text-white flex items-center space-x-1">
              <span>LexTrial</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-blue-400 font-semibold">
              Elite Counsel
            </p>
          </div>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-row md:flex-col items-center justify-around md:justify-start w-full md:w-auto md:space-y-1.5 px-2 py-0 md:p-6 md:pt-0 h-full md:h-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`sidebar-nav-${item.id}`}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start space-y-1 md:space-y-0 md:space-x-3 w-16 md:w-full px-1 md:px-4 py-2 md:py-3 rounded-xl transition-all duration-200 font-sans text-sm font-medium h-full md:h-auto ${isActive
                  ? 'bg-white/5 md:bg-transparent md:bg-gradient-to-r md:from-blue-900/40 md:to-indigo-900/20 text-blue-400 md:border-l-4 md:border-blue-500 md:pl-3'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              title={item.label}
            >
              <Icon className={`w-6 h-6 md:w-5 md:h-5 shrink-0 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
              <span className="hidden md:inline-block md:flex-1 md:whitespace-nowrap md:text-left">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer Section */}
      <div className="hidden md:block p-4 space-y-4 md:mt-auto">
        {/* New Simulation Button */}
        <button
          id="btn-sidebar-new-simulation"
          onClick={onOpenNewCase}
          className="w-full flex items-center justify-center space-x-2 bg-[#D1E2FF] hover:bg-[#BBD6FF] text-[#002B7A] py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Simulación</span>
        </button>

        {/* User Card */}
        <div
          id="user-profile-card"
          onClick={() => onViewChange('perfil')}
          className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200"
        >
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150"
              alt="Angela Avatar"
              className="w-10 h-10 rounded-xl object-cover border border-blue-400/30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -top-1 -right-1 bg-yellow-500 text-black rounded-full p-0.5 shadow">
              <Star className="w-2.5 h-2.5 fill-black" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-sm text-white truncate">{userProgress.name}</h3>
            <span className="inline-flex items-center space-x-1 text-[10px] text-yellow-400 font-semibold font-mono bg-yellow-400/10 px-1.5 py-0.5 rounded-md mt-0.5">
              <Star className="w-2.5 h-2.5 fill-yellow-400" />
              <span>{userProgress.plan}</span>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
