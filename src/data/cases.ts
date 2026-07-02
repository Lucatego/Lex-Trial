import { Case } from '../types';

export const casesData: Case[] = [
  {
    id: 'homicidio-calificado',
    exp: 'Exp: 142-2026',
    title: 'Homicidio Calificado (Penal)',
    type: 'Penal',
    difficulty: 'Intermedia',
    skill: 'Contrainterrogatorio',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800',
    summary: 'El acusado sostiene legítima defensa. Deberás interrogar al perito forense para encontrar inconsistencias en el ángulo de trayectoria de la bala y desacreditar la teoría fiscal.',
    facts: [
      'El hecho ocurrió el 12 de febrero de 2026 a las 23:30 horas en el domicilio de la víctima.',
      'El acusado, Juan Pérez, alega que la víctima, Carlos Mendoza, ingresó de forma violenta con un arma blanca en la mano.',
      'Juan Pérez efectuó un solo disparo con su arma registrada legalmente, impactando en el tórax de Carlos Mendoza.',
      'La fiscalía sostiene que el disparo se realizó a corta distancia por la espalda, lo que calificaría el acto como homicidio calificado por alevosía.',
      'La defensa sostiene legítima defensa pura: la víctima estaba de frente y atacando.'
    ],
    evidence: [
      {
        name: 'Dictamen de Balística Forense',
        description: 'Indica presencia de pólvora en la ropa de la víctima, sugiriendo un disparo a menos de 1.5 metros.'
      },
      {
        name: 'Informe de Necropsia',
        description: 'Describe la trayectoria del proyectil de arriba hacia abajo y ligeramente de atrás hacia adelante.'
      },
      {
        name: 'Cuchillo de cocina de 25cm',
        description: 'Encontrado a 1 metro del cuerpo de la víctima, con huellas dactilares de la víctima.'
      }
    ],
    testimony: {
      witnessName: 'Dr. Ramiro Alarcón',
      witnessRole: 'Perito Forense de la Fiscalía',
      statement: 'Realicé la autopsia del cuerpo. El proyectil ingresó por la región subescapular izquierda (espalda) y salió por el pecho. El ángulo de trayectoria demuestra que la víctima estaba de espaldas al agresor en el momento del impacto. No hay indicios físicos de un enfrentamiento frontal.'
    },
    simulationScenario: {
      witnessName: 'Dr. Ramiro Alarcón (Perito Forense)',
      initialMessage: 'Buenas tardes, Abogado. He ratificado mi informe forense. La trayectoria de atrás hacia adelante del proyectil es categórica: el disparo ingresó por la espalda. ¿Cuál es su primera línea de interrogatorio?',
      questions: [
        {
          id: 'q1',
          text: 'Doctor, en su informe menciona que la víctima tenía heridas de defensa en las manos. ¿Cómo se condice eso con un ataque exclusivamente por la espalda?',
          response: 'Las excoriaciones en las manos pueden deberse a una caída posterior al disparo, golpeando el mobiliario de madera. No necesariamente indican un forcejeo previo de frente.',
          impact: { efficacy: 85, legalTech: 90, oratory: 80 },
          feedback: 'Excelente señalamiento. Has expuesto una alternativa física verosímil que el informe fiscal omitió convenientemente.'
        },
        {
          id: 'q2',
          text: 'Si el acusado estaba sentado en el suelo defendiéndose de un ataque con cuchillo, ¿no explicaría eso la trayectoria ascendente de atrás hacia adelante si la víctima se abalanzaba inclinada?',
          response: 'Mmm, si la víctima estuviera sumamente inclinada hacia adelante en posición de embestida, físicamente... es posible que la zona escapular quedara expuesta en un plano casi horizontal. Pero el ángulo sigue siendo muy inusual para legítima defensa.',
          impact: { efficacy: 95, legalTech: 95, oratory: 90 },
          feedback: 'Magistral. Has forzado al perito a admitir la viabilidad biomecánica de la teoría de la defensa. Esta es la clave del caso.'
        },
        {
          id: 'q3',
          text: '¿Realizó usted pruebas de toxicología al cuerpo de la víctima para determinar su nivel de agresividad o agitación?',
          response: 'Sí, el examen toxicológico dio positivo para niveles elevados de alcohol (1.8 g/L) y estimulantes. Eso explica un comportamiento errático, mas no altera la trayectoria del disparo.',
          impact: { efficacy: 80, legalTech: 85, oratory: 85 },
          feedback: 'Buen punto. Introducir el estado de intoxicación de la víctima fortalece el argumento de que el acusado actuó ante una amenaza real y descontrolada.'
        },
        {
          id: 'q4',
          text: 'Doctor, ¿puede descartar al 100% que la víctima se giró bruscamente una fracción de segundo antes del disparo al escuchar el rastrillado del arma?',
          response: 'En la ciencia médica no existe el 100% de certeza absoluta, pero los hallazgos apoyan fuertemente mi conclusión inicial. Sin embargo, un giro reflejo ultrarrápido podría exponer ese flanco.',
          impact: { efficacy: 90, legalTech: 90, oratory: 95 },
          feedback: 'Brillante cierre de contrainterrogatorio. Lograste sembrar la duda razonable en el dictamen pericial, que es el estándar requerido para la absolución.'
        }
      ]
    }
  },
  {
    id: 'robo-agravado',
    exp: 'Exp: 089-2026',
    title: 'Robo Agravado #45 (Penal)',
    type: 'Penal',
    difficulty: 'Principiante',
    skill: 'Interrogatorio Directo',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800',
    summary: 'Defiende a un joven acusado de asalto a mano armada cuya coartada es que se encontraba trabajando en un almacén al otro lado de la ciudad en el momento del incidente.',
    facts: [
      'El robo ocurrió el 5 de enero de 2026 a las 19:45 en una joyería céntrica.',
      'El asaltante vestía sudadera negra con capucha y pasamontañas.',
      'El acusado, Mateo Torres, fue detenido a las 20:30 cerca de su domicilio por coincidir con la descripción física.',
      'Mateo Torres trabaja como operario de almacén nocturno en "Logística Sur" de 19:00 a 03:00.'
    ],
    evidence: [
      {
        name: 'Registro de Asistencia Biométrico',
        description: 'Muestra la marca de ingreso de Mateo Torres a las 19:02 mediante huella dactilar.'
      },
      {
        name: 'Grabación de Seguridad del Almacén',
        description: 'Muestra a un operario con contextura similar a Mateo operando una carretilla a las 19:40.'
      }
    ],
    testimony: {
      witnessName: 'Sofía Valenzuela',
      witnessRole: 'Supervisora de Turno de Mateo',
      statement: 'Mateo es un empleado ejemplar. El día del incidente él marcó su entrada a las 19:02 y yo misma le asigné la descarga del contenedor de las 19:30. Estuvimos trabajando en el mismo pasillo hasta las 21:00. Es físicamente imposible que estuviera en el centro de la ciudad a las 19:45.'
    },
    simulationScenario: {
      witnessName: 'Sofía Valenzuela (Supervisora)',
      initialMessage: 'Hola Abogado, estoy lista para declarar. El sistema biométrico no miente y yo estuve allí con Mateo. ¿Cómo estructuramos mi testimonio ante el tribunal?',
      questions: [
        {
          id: 'q1',
          text: 'Señora Valenzuela, explique detalladamente el funcionamiento del reloj biométrico y si es posible falsificar la marca de un compañero.',
          response: 'El lector requiere huella dactilar viva y está conectado directamente al servidor central con cámaras de seguridad apuntando al reloj. Nadie puede marcar por otro.',
          impact: { efficacy: 90, legalTech: 85, oratory: 80 },
          feedback: 'Sólida introducción del elemento técnico clave de la coartada.'
        },
        {
          id: 'q2',
          text: '¿Usted interactuó directamente con Mateo alrededor de las 19:45? ¿Qué estaba haciendo exactamente él en ese momento?',
          response: 'Sí, justo a las 19:40 tuvimos un problema con un palé atascado en el pasillo 4. Mateo operaba el montacargas y me ayudó a despejarlo. Terminamos de acomodarlo cerca de las 19:55.',
          impact: { efficacy: 95, legalTech: 90, oratory: 85 },
          feedback: 'Excelente. Ubicar al acusado con precisión milimétrica en el lugar de trabajo a la hora exacta del crimen destruye por completo el caso de la fiscalía.'
        }
      ]
    }
  },
  {
    id: 'danos-perjuicios',
    exp: 'Exp: 312-2025',
    title: 'Daños y Perjuicios #12 (Civil)',
    type: 'Civil',
    difficulty: 'Avanzada',
    skill: 'Alegato de Apertura',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=800',
    summary: 'Demanda de indemnización contra constructora multinacional por agrietamiento estructural en edificios aledaños debido a excavaciones imprudentes sin estudios de suelo idóneos.',
    facts: [
      'La Constructora "Megavía" realizó excavaciones de 15 metros de profundidad para un rascacielos.',
      'El edificio residencial vecino sufrió asentamientos diferenciales de 8 centímetros.',
      'Aparecieron grietas de hasta 4 centímetros en muros de carga, forzando la evacuación preventiva de 12 familias.'
    ],
    evidence: [
      {
        name: 'Informe Geotécnico de la Universidad Tecnológica',
        description: 'Demuestra que la constructora excavó en una capa arcillosa altamente deformable sin bombear adecuadamente el nivel freático.'
      },
      {
        name: 'Acta Notarial de Daños',
        description: 'Fe de hechos que describe la inhabitabilidad estructural del edificio afectado.'
      }
    ],
    testimony: {
      witnessName: 'Ing. Eduardo Novoa',
      witnessRole: 'Especialista en Estructuras y Suelos',
      statement: 'El estudio de mecánica de suelos empleado por la constructora databa de hace 8 años y omitió la subida del caudal subterráneo. Al excavar, drenaron el agua de la cimentación vecina, causando un colapso del suelo por succión. Es una negligencia de manual.'
    },
    simulationScenario: {
      witnessName: 'Ing. Eduardo Novoa (Perito Civil)',
      initialMessage: 'Abogado, la constructora intenta defenderse diciendo que el edificio residencial ya tenía fallas previas de construcción. Mi peritaje refuta eso por completo. ¿Listo para examinar los datos?',
      questions: [
        {
          id: 'q1',
          text: 'Ingeniero, ¿cómo determinó usted de manera inequívoca que la causa del asentamiento fue la excavación de Megavía y no un vicio previo de construcción?',
          response: 'Realizamos análisis de asentamiento histórico satelital por radar (InSAR). El edificio estuvo perfectamente estable por 15 años. La deformación de 8cm comenzó exactamente a los 3 días de iniciada la excavación colindante.',
          impact: { efficacy: 95, legalTech: 95, oratory: 90 },
          feedback: 'Espectacular uso de evidencia científica irrefutable. El nexo de causalidad ha quedado sellado.'
        },
        {
          id: 'q2',
          text: 'Explique al tribunal qué medidas de mitigación debió tomar la constructora para evitar este colapso de suelo.',
          response: 'Debieron instalar una pantalla de pilotes continuos impermeables y un sistema de recarga artificial de acuíferos. Decidieron ahorrar costos usando simples tablestacas que filtraron el agua.',
          impact: { efficacy: 90, legalTech: 90, oratory: 85 },
          feedback: 'Estupendo. Demuestra la culpa/negligencia y que el daño era perfectamente evitable con buenas prácticas de ingeniería.'
        }
      ]
    }
  }
];
