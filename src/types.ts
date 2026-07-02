export interface Evidence {
  name: string;
  description: string;
}

export interface Testimony {
  witnessName: string;
  witnessRole: string;
  statement: string;
}

export interface SimulationQuestion {
  id: string;
  text: string;
  response: string;
  impact: {
    efficacy: number;
    legalTech: number;
    oratory: number;
  };
  feedback: string;
}

export interface SimulationScenario {
  witnessName: string;
  initialMessage: string;
  questions: SimulationQuestion[];
}

export interface Case {
  id: string;
  exp: string;
  title: string;
  type: 'Penal' | 'Civil' | 'Laboral';
  difficulty: 'Principiante' | 'Intermedia' | 'Avanzada';
  skill: string;
  image: string;
  summary: string;
  facts: string[];
  evidence: Evidence[];
  testimony: Testimony;
  simulationScenario: SimulationScenario;
}

export interface RecentCase {
  id: string;
  title: string;
  score: number;
  stars: number;
  status: 'Absolución' | 'Condena' | 'Apelación' | 'En Progreso';
  date: string;
  type: string;
}

export interface UserProgress {
  name: string;
  plan: 'Premium Plan' | 'Basic Plan';
  litigationScore: number;
  efficacy: number;
  legalTech: number;
  oratory: number;
  casesCompleted: number;
  recentScores: { date: string; score: number; caseTitle: string }[];
}
