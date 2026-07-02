import { 
  Briefcase, 
  Swords, 
  Lock, 
  User, 
  Plus, 
  Star,
  Scale
} from 'lucide-react';
import { UserProgress } from '../types';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenNewCase: () => void;
  userProgress: UserProgress;
  isOpen: boolean;
}

export default function Sidebar({ currentView, onViewChange, onOpenNewCase, userProgress, isOpen }: SidebarProps) {
  const menuItems = [
    { id: 'despacho', label: 'Despacho Virtual', icon: Briefcase },
    { id: 'arena', label: 'La Arena', icon: Swords },
    { id: 'locker', label: 'Locker de Resultados', icon: Lock },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <aside id="sidebar-container" className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1128] text-gray-300 flex flex-col justify-between h-screen border-r border-[#1D2D44]/30 select-none transform transition-transform duration-300 ease-in-out md:sticky md:top-0 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Brand Logo & Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-lg tracking-tight text-white flex items-center space-x-1">
              <span>LexTrial</span>
            </h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-blue-400 font-semibold">
              Elite Counsel
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`sidebar-nav-${item.id}`}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-sans text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-900/40 to-indigo-900/20 text-blue-400 border-l-4 border-blue-500 pl-3'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Section */}
      <div className="p-4 space-y-4">
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
              alt="Carlos Avatar"
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
