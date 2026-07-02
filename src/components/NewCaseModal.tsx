import React, { useState } from 'react';
import { X, Sparkles, Scale, Swords, CheckCircle, BrainCircuit } from 'lucide-react';
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

  // Play the exit animation before actually unmounting the modal
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 180);
  };

  const containerRef = useModalA11y<HTMLDivElement>(handleClose);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Despido Intempestivo #84 o Tránsito con Lesiones"
                required
                className="w-full bg-gray-50 border border-gray-200 focus:bg-white rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Specialty & Difficulty Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Materia Jurídica</label>
                <select
                  id="new-case-type"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Penal">Derecho Penal</option>
                  <option value="Civil">Derecho Civil</option>
                  <option value="Laboral">Derecho Laboral</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase">Dificultad de Práctica</label>
                <select
                  id="new-case-difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="Principiante">Principiante (1 estrella)</option>
                  <option value="Intermedia">Intermedia (2 estrellas)</option>
                  <option value="Avanzada">Avanzada (3 estrellas)</option>
                </select>
              </div>
            </div>

            {/* Target Skill */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase">Habilidad a Perfeccionar</label>
              <select
                id="new-case-skill"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="Contrainterrogatorio">Contrainterrogatorio (Causa Penal)</option>
                <option value="Interrogatorio Directo">Interrogatorio Directo (Testigo Propio)</option>
                <option value="Alegato de Apertura">Alegato de Apertura (Teoría del Caso)</option>
                <option value="Responder Objeciones">Responder Objeciones de Fiscalía</option>
              </select>
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
