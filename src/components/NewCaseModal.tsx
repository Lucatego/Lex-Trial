import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Scale, Swords, CheckCircle, BrainCircuit, ChevronDown, Check } from 'lucide-react';
import { Case } from '../types';
import { useModalA11y } from '../hooks/useModalA11y';

interface NewCaseModalProps {
  onClose: () => void;
  onCaseGenerated: (newCase: Case) => void;
}

export default function NewCaseModal({ onClose, onCaseGenerated }: NewCaseModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'Penal' | 'Civil' | 'Laboral'>('Penal');
  const [difficulty, setDifficulty] = useState<'Principiante' | 'Intermedia' | 'Avanzada'>('Intermedia');
  const [skill, setSkill] = useState('Contrainterrogatorio');
  const [summary, setSummary] = useState('');
  const [generating, setGenerating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [shake, setShake] = useState(false);

  // Play the exit animation before actually unmounting the modal
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 180);
  };

  const containerRef = useModalA11y<HTMLDivElement>(handleClose);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
      setShake(false);
      requestAnimationFrame(() => setShake(true));
      return;
    }

    setGenerating(true);

    // Simulate elite AI generation with a classy loader
    setTimeout(() => {
      const generatedTitle = title.trim() || `Caso de Práctica: ${type}`;
      const randomExp = `Exp: ${Math.floor(100 + Math.random() * 900)}-2026`;
      const generatedSummary = summary.trim() || `Causa judicial para simular estrategias de ${skill}. El imputado defiende su inocencia civil o penal basándose en pruebas contradictorias del expediente.`;

      const newCase: Case = {
        id: `custom-case-${Date.now()}`,
        exp: randomExp,
        title: generatedTitle,
        type,
        difficulty,
        skill,
        image: type === 'Civil' 
          ? 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800' 
          : 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800',
        summary: generatedSummary,
        facts: [
          'El conflicto o presunto hecho punible ocurrió hace pocas semanas bajo circunstancias inciertas.',
          'Existen múltiples declaraciones testimoniales que presentan claras ambigüedades técnicas.',
          'La defensa técnica procesal requiere desestimar o ratificar la veracidad científica de las pruebas.'
        ],
        evidence: [
          { name: 'Dictamen Pericial de Oficio', description: 'Documento técnico que detalla la descripción de sucesos físicos de la causa.' },
          { name: 'Acta de Inspección Ocular', description: 'Registro gráfico y escrito de las coordenadas geográficas de los hechos.' }
        ],
        testimony: {
          witnessName: 'Lic. Armando Guerra',
          witnessRole: 'Testigo Clave del Proceso',
          statement: 'Yo estuve a escasos metros del lugar del incidente y presencié todo con claridad fidedigna.'
        },
        simulationScenario: {
          witnessName: 'Lic. Armando Guerra (Testigo Clave)',
          initialMessage: `Buenas tardes Abogado. El tribunal me ha citado para dar testimonio sobre ${generatedTitle}. ¿Listo para el debate judicial?`,
          questions: [
            {
              id: 'cq1',
              text: 'Licenciado, ¿podría explicar cómo es posible que recuerde con tanta precisión dadas las malas condiciones de iluminación nocturna?',
              response: 'Bueno... reconozco que la noche estaba oscura y lluviosa, pero la luz del poste público incidía de lleno en el rostro del acusado.',
              impact: { efficacy: 90, legalTech: 85, oratory: 80 },
              feedback: 'Excelente inicio. Sifonas credibilidad basándote en un factor ambiental directo.'
            },
            {
              id: 'cq2',
              text: 'Si la visibilidad estaba obstaculizada por árboles, ¿no le resulta imposible haber visto las manos del acusado?',
              response: 'Quizás... vi un bulto y un destello. Supuse que era un arma por los gritos, pero admito que no puedo jurar la forma exacta.',
              impact: { efficacy: 95, legalTech: 95, oratory: 90 },
              feedback: 'Perfecto. Lograste desarticular el testimonio asertivo convirtiéndolo en una suposición.'
            }
          ]
        }
      };

      onCaseGenerated(newCase);
      setGenerating(false);
      onClose();
    }, 1500);
  };

  return (
    <div id="new-case-modal" className={`fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-200'}`}>
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-case-modal-title"
        className={`bg-white rounded-3xl max-w-lg w-full overflow-hidden flex flex-col shadow-2xl ${isClosing ? 'animate-out fade-out zoom-out-95 duration-200' : 'animate-in fade-in zoom-in-95 duration-200'}`}
      >

        {/* Modal Header */}
        <div className="bg-[#0A1128] text-white p-6 relative">
          <button
            id="btn-close-new-case"
            onClick={handleClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 p-1.5 hover:bg-white/10 rounded-full transition-all text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 text-indigo-400 mb-1">
            <BrainCircuit className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Motor IA LexTrial</span>
          </div>
          <h4 id="new-case-modal-title" className="font-sans font-black text-lg text-white">Diseñar Nueva Simulación de Causa</h4>
          <p className="text-[11px] text-gray-400 mt-1 font-medium">Especifica los parámetros de tu caso legal para que nuestra IA ensamble el dossier procesal de manera inmediata.</p>
        </div>

        {generating ? (
          <div className="p-12 text-center space-y-4 flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <h5 className="font-sans font-bold text-sm text-gray-800 flex items-center justify-center space-x-1">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>Estructurando Dossier Judicial...</span>
              </h5>
              <p className="text-xs text-gray-400 font-medium max-w-xs mx-auto">Construyendo cronología fáctica, redactando testimonio jurado y calibrando ramificaciones de objeciones con IA.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleGenerate} className="p-6 space-y-5">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Título de la Causa o Expediente</label>
              <input
                id="new-case-title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError && e.target.value.trim()) setTitleError(false);
                }}
                placeholder="Ej. Despido Intempestivo #84 o Tránsito con Lesiones"
                aria-invalid={titleError}
                aria-describedby={titleError ? 'new-case-title-error' : undefined}
                onAnimationEnd={() => setShake(false)}
                className={`w-full bg-gray-50 border rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                  titleError
                    ? 'border-red-300 focus:bg-white focus:ring-red-400'
                    : 'border-gray-200 focus:bg-white focus:ring-blue-500'
                } ${shake ? 'animate-shake' : ''}`}
              />
              {titleError && (
                <p id="new-case-title-error" className="text-[11px] text-red-500 font-semibold animate-in fade-in slide-in-from-top-1 duration-150">
                  Indica un título para la causa antes de generarla.
                </p>
              )}
            </div>

            {/* Specialty & Difficulty Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Materia Jurídica</label>
                <CustomSelect
                  id="new-case-type"
                  label="Materia Jurídica"
                  value={type}
                  onChange={(v) => setType(v as typeof type)}
                  options={[
                    { value: 'Penal', label: 'Derecho Penal' },
                    { value: 'Civil', label: 'Derecho Civil' },
                    { value: 'Laboral', label: 'Derecho Laboral' }
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Dificultad de Práctica</label>
                <CustomSelect
                  id="new-case-difficulty"
                  label="Dificultad de Práctica"
                  value={difficulty}
                  onChange={(v) => setDifficulty(v as typeof difficulty)}
                  options={[
                    { value: 'Principiante', label: 'Principiante (1 estrella)' },
                    { value: 'Intermedia', label: 'Intermedia (2 estrellas)' },
                    { value: 'Avanzada', label: 'Avanzada (3 estrellas)' }
                  ]}
                />
              </div>
            </div>

            {/* Target Skill */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Habilidad a Perfeccionar</label>
              <CustomSelect
                id="new-case-skill"
                label="Habilidad a Perfeccionar"
                value={skill}
                onChange={setSkill}
                options={[
                  { value: 'Contrainterrogatorio', label: 'Contrainterrogatorio (Causa Penal)' },
                  { value: 'Interrogatorio Directo', label: 'Interrogatorio Directo (Testigo Propio)' },
                  { value: 'Alegato de Apertura', label: 'Alegato de Apertura (Teoría del Caso)' },
                  { value: 'Responder Objeciones', label: 'Responder Objeciones de Fiscalía' }
                ]}
              />
            </div>

            {/* Facts summary */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Sinopsis de Hechos (Opcional)</label>
              <textarea
                id="new-case-summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                placeholder="Indica un resumen básico o palabras clave de lo sucedido..."
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-100 pt-4 flex justify-end space-x-3">
              <button
                type="button"
                id="btn-new-case-cancel"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-xs font-bold text-gray-700 transition-colors"
              >
                Cancelar
              </button>

              <button
                type="submit"
                id="btn-new-case-submit"
                className="flex items-center space-x-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>GENERAR CON IA</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

function CustomSelect({ id, label, value, options, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 150);
  };

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      close();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        className="w-full flex items-center justify-between gap-2 bg-gray-50 border border-gray-200 hover:border-gray-300 rounded-xl py-2.5 px-3.5 text-xs font-semibold text-gray-800 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          ref={menuRef}
          role="listbox"
          aria-label={label}
          className={`absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-10 duration-150 ${
            closing ? 'animate-out fade-out slide-out-to-top-1' : 'animate-in fade-in slide-in-from-top-1'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  if (!isSelected) onChange(opt.value);
                  close();
                }}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2 text-left text-xs transition-colors ${
                  isSelected ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-50 font-semibold'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
