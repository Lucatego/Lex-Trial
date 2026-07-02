import { useState } from 'react';
import { X, BookOpen, FileText, Scale, User, CheckCircle, Swords } from 'lucide-react';
import { Case } from '../types';

interface CaseDossierModalProps {
  caseItem: Case;
  onClose: () => void;
  onEnterArena: (caseId: string) => void;
}

export default function CaseDossierModal({ caseItem, onClose, onEnterArena }: CaseDossierModalProps) {
  const [activeTab, setActiveTab] = useState<'facts' | 'evidence' | 'testimony'>('facts');
  const [isClosing, setIsClosing] = useState(false);

  // Play the exit animation before actually unmounting the modal
  const handleClose = (after?: () => void) => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      after?.();
    }, 180);
  };

  return (
    <div id="case-dossier-modal" className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-200'}`}>
      <div className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl ${isClosing ? 'animate-out fade-out zoom-out-95 duration-200' : 'animate-in fade-in zoom-in-95 duration-200'}`}>
        
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-[#121E38] via-[#1D2D44] to-[#0A1128] text-white p-6 relative">
          {/* Subtle design scale icon */}
          <div className="absolute right-6 top-6 opacity-10 pointer-events-none">
            <Scale className="w-24 h-24 text-white" />
          </div>

          <button
            id="btn-close-dossier"
            onClick={() => handleClose()}
            className="absolute right-4 top-4 z-10 p-1.5 hover:bg-white/10 rounded-full transition-all text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1 relative z-10">
            <span className="text-[10px] font-mono font-bold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
              {caseItem.exp}
            </span>
            <h4 className="font-sans font-black text-xl text-white leading-tight mt-1">{caseItem.title}</h4>
            <p className="text-xs text-gray-300 font-medium max-w-xl">{caseItem.summary}</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-gray-100 bg-gray-50/50 px-6 pt-2">
          {[
            { id: 'facts', label: 'Hechos del Caso', icon: FileText },
            { id: 'evidence', label: 'Catálogo de Pruebas', icon: Scale },
            { id: 'testimony', label: 'Testimonios', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-dossier-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-4 py-3.5 border-b-2 font-sans text-xs font-bold transition-all -mb-px ${
                  isSel 
                    ? 'border-indigo-600 text-indigo-600 font-extrabold' 
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 max-h-[450px]">
          
          {/* FACTS TAB */}
          {activeTab === 'facts' && (
            <div id="dossier-tab-content-facts" className="space-y-3.5 animate-in fade-in duration-150">
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Cronología Fáctica de la Causa</p>
              <div className="space-y-2.5">
                {caseItem.facts.map((fact, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-[10px] font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EVIDENCE TAB */}
          {activeTab === 'evidence' && (
            <div id="dossier-tab-content-evidence" className="space-y-3.5 animate-in fade-in duration-150">
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Pruebas Materiales Judiciales</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {caseItem.evidence.map((ev, index) => (
                  <div key={index} className="p-4 bg-white border border-gray-200/80 rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center space-x-2">
                      <Scale className="w-4.5 h-4.5 text-indigo-500 shrink-0" />
                      <h5 className="font-sans font-bold text-xs text-gray-900 leading-tight">{ev.name}</h5>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TESTIMONY TAB */}
          {activeTab === 'testimony' && (
            <div id="dossier-tab-content-testimony" className="space-y-3.5 animate-in fade-in duration-150">
              <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Declaración Jurada</p>
              
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                <div className="flex items-center justify-between border-b border-gray-200/60 pb-2.5">
                  <div>
                    <h5 className="font-sans font-bold text-sm text-gray-800">{caseItem.testimony.witnessName}</h5>
                    <span className="text-[10px] font-bold text-gray-400 font-mono">{caseItem.testimony.witnessRole}</span>
                  </div>
                  <span className="text-[10px] bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded border border-red-100">
                    Citado por Fiscalía
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-600">Declaración Anterior:</p>
                  <p className="text-xs text-gray-500 font-medium italic bg-white p-3.5 rounded-xl border border-gray-100/80 leading-relaxed shadow-inner">
                    "{caseItem.testimony.statement}"
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="border-t border-gray-100 p-5 bg-gray-50 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] text-gray-500 font-medium">Estudio preliminar concluido</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              id="btn-dossier-cancel"
              onClick={() => handleClose()}
              className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
            >
              Cerrar Expediente
            </button>

            <button
              id="btn-dossier-arena"
              onClick={() => handleClose(() => onEnterArena(caseItem.id))}
              className="flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow"
            >
              <Swords className="w-4 h-4 text-white" />
              <span>IR A LA ARENA A LITIGAR</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
