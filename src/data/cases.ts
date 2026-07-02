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
    summary: 'El acusado sostiene legítima defensa. Deberás contrainterrogar al perito forense en pleno juicio oral, enfrentando las objeciones del Fiscal y las presiones del Juez para desacreditar la trayectoria de la bala.',
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
      witnessName: 'Juicio Oral - Sala Penal N° 3',
      initialMessage: '[JUEZ PRESIDENTE]: "Se reanuda la sesión. Defensa, proceda con el contrainterrogatorio del perito forense de la Fiscalía, Dr. Alarcón. Señor Fiscal, guarde el orden. Abogado, el testigo es suyo." \n\n[PERITO DR. ALARCÓN]: "Buenas tardes. Reitero las conclusiones de mi protocolo de necropsia: la bala ingresó por la espalda, destruyendo la teoría de un ataque frontal. Estoy listo para sus preguntas."',
      questions: [
        {
          id: 'q1',
          text: 'Doctor Alarcón, en la página 4 de su informe describe excoriaciones y heridas de defensa en los nudillos y palmas de la víctima. ¿Cómo explica usted heridas de pelea frontal si sostiene que el ataque fue puramente por la espalda?',
          response: '[FISCAL]: "¡Objeción Señor Juez! Pregunta impertinente y repetitiva. Las lesiones menores en las extremidades ya fueron explicadas por el médico legista en la sesión de ayer." \n\n[JUEZ PRESIDENTE]: "Infundada la objeción del Ministerio Público. La defensa está atacando la premisa de la trayectoria científica del perito. Dr. Alarcón, responda a la defensa." \n\n[PERITO DR. ALARCÓN]: "(Se acomoda los lentes) A ver... las excoriaciones en las manos pueden ser de naturaleza polimorfa. Científicamente es probable que se deban a una caída posterior al impacto, donde la víctima, al desplomarse, golpeó sus manos bruscamente contra el mobiliario de madera de la sala. No necesariamente prueban un forcejeo previo."',
          impact: { efficacy: 85, legalTech: 95, oratory: 85 },
          feedback: 'Excelente inicio. Soportaste la interrupción del Fiscal y obligaste al perito a dar una explicación alternativa. Has instalado la duda sobre el origen de las heridas.'
        },
        {
          id: 'q2',
          text: 'Si mi patrocinado se encontraba sentado en el suelo, lesionado, y la víctima se abalanzaba sobre él inclinada hacia adelante con un cuchillo, ¿biomecánicamente no se generaría exactamente la misma trayectoria de atrás hacia adelante al impactar la bala en una espalda encorvada?',
          response: '[FISCAL]: "¡Objeción! El abogado de la defensa está induciendo al testigo a especular sobre escenarios ficticios que no constan en la carpeta fiscal." \n\n[JUEZ PRESIDENTE]: "Señor Fiscal, estamos en un contrainterrogatorio. La defensa tiene derecho a plantear hipótesis alternativas basadas en su teoría del caso para testear la rigurosidad del perito. Se permite la pregunta." \n\n[PERITO DR. ALARCÓN]: "(Duda, revisa sus papeles) Biomecánicamente... mmm... si un cuerpo se encuentra en una flexión extrema hacia adelante, en una posición de embestida casi horizontal... la zona subescapular alta (la espalda) quedaría expuesta directamente hacia un tirador ubicado al frente y abajo. En ese caso estrictamente geométrico... sí, la bala ingresaría por la espalda y saldría por el pecho. Pero es una posición muy específica." \n\n[ACUSADO JUAN PÉREZ]: "(Desde el banquillo de la defensa) ¡Exacto! ¡Así es como me atacó!" \n\n[JUEZ PRESIDENTE]: "¡Silencio en la sala! Señor imputado, controle sus intervenciones o pediré que lo retiren."',
          impact: { efficacy: 100, legalTech: 100, oratory: 95 },
          feedback: '¡Magistral! Esta es la jugada dorada del caso. Lograste que el perito oficial de la Fiscalía admitiera en el acta del juicio oral que la teoría de la legítima defensa es físicamente viable.'
        },
        {
          id: 'q3',
          text: 'Doctor, hablemos del examen químico. El informe toxicológico dio positivo para 1.8 gramos de alcohol por litro de sangre y restos de anfetaminas. ¿Puede precisar al tribunal los efectos clínicos de esta combinación en el comportamiento agresivo de una persona?',
          response: '[FISCAL]: "¡Objeción! El doctor Alarcón fue acreditado como perito balístico y médico forense anatómico, no como perito toxicólogo. No tiene competencia." \n\n[JUEZ PRESIDENTE]: "Abogado de la defensa, el Fiscal tiene razón. El perito puede dar fe de los resultados que anexó a la necropsia, pero no realizar un análisis clínico psiquiátrico de la conducta de la víctima. Reformule."',
          impact: { efficacy: 70, legalTech: 80, oratory: 85 },
          feedback: 'Te frenó el Juez por un error técnico de competencias. El Fiscal estuvo rápido. Debes reformular la pregunta enfocándote únicamente en si el estado físico general de la víctima influye en la tolerancia al dolor tras recibir un disparo.'
        },
        {
          id: 'q4',
          text: 'Reformulo, Señor Juez. Doctor Alarcón, con 1.8 g/L de alcohol y estimulantes en el cuerpo, ¿se altera la respuesta del sistema nervioso ante un dolor físico violento? ¿Pudo la víctima seguir avanzando hacia mi cliente una fracción de segundo después del disparo antes de caer?',
          response: '[PERITO DR. ALARCÓN]: "Desde una perspectiva estrictamente médica, sí. Los niveles altos de alcohol combinados con estimulantes bloquean los receptores de dolor inmediato y generan un shock de adrenalina. Un sujeto en ese estado no cae fulminado al instante; puede continuar un movimiento de ataque o inercia por fracciones de segundo antes de que el colapso hemodinámico lo detenga." \n\n[JUEZ PRESIDENTE]: "Señor Fiscal, ¿alguna pregunta adicional en el redireccionamiento? ¿No? Muy bien, queda concluido el examen del perito forense."',
          impact: { efficacy: 95, legalTech: 90, oratory: 95 },
          feedback: 'Brillante rectificación. Al demostrar que la víctima no cayó de inmediato, justificas por qué el acusado sintió la necesidad de disparar y cómo el cuerpo pudo girar o colapsar en posiciones complejas. Cerraste el caso sembrando una duda razonable insuperable.'
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
    summary: 'Ejecuta un interrogatorio directo a tu testigo clave. Debes interrogar a la supervisora del acusado de forma limpia, evitando que el Fiscal te objete por realizar preguntas sugestivas.',
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
      witnessName: 'Sala de Audiencias - Juicio Oral Sede Central',
      initialMessage: '[JUEZ UNIPERSONAL]: "Pasamos al examen directo de los testigos de la defensa. Sra. Sofía Valenzuela, acérquese al estrado. Abogado de la defensa, puede iniciar el interrogatorio. Le recuerdo que al ser su testigo, están prohibidas las preguntas que sugieran la respuesta. Señor Fiscal, atento a las objeciones." \n\n[TESTIGO SOFÍA VALENZUELA]: "Buenas tardes con todos. Prometo decir la verdad de lo que vi ese día en el almacén."',
      questions: [
        {
          id: 'q1',
          text: 'Señora Valenzuela, para conocimiento del tribunal, explique detalladamente los mecanismos de seguridad del reloj biométrico de Logística Sur y si un trabajador podría burlarlo o registrar la entrada de un compañero.',
          response: '[FISCAL]: "¡Objeción! Pregunta capciosa y especulativa. La testigo no es ingeniera de sistemas ni auditora informática para validar la inviolabilidad de un software." \n\n[JUEZ UNIPERSONAL]: "Señor Fiscal, la testigo es la supervisora del área y la encargada directa de controlar el personal mediante ese sistema. La objeción es infundada. Responda la testigo." \n\n[TESTIGO SOFÍA VALENZUELA]: "Gracias. Miren, el reloj biométrico de la empresa no es una simple tarjeta. Pide huella dactilar viva con lectura térmica y genera una alerta si el pulso no coincide. Además, la central de monitoreo tiene una cámara domo PTZ apuntando fijamente al reloj las 24 horas. Yo misma firmo el reporte digital. Nadie, absolutamente nadie, puede marcar la entrada de otro compañero sin que quede registrado en las cámaras de seguridad."',
          impact: { efficacy: 90, legalTech: 85, oratory: 80 },
          feedback: 'Sólido manejo técnico. A pesar del intento del Fiscal por desacreditar la prueba, la respuesta de tu testigo blindó el valor probatorio de la coartada horaria.'
        },
        {
          id: 'q2',
          text: 'Centrémonos en la noche del 5 de enero de 2026. Describa al juzgado qué actividades realizó usted y si tuvo contacto visual o directo con Mateo Torres alrededor de las 19:45 horas.',
          response: '[TESTIGO SOFÍA VALENZUELA]: "Sí, lo recuerdo perfectamente porque tuvimos una emergencia en el pasillo 4. A las 19:35 se soltó la banda de un palé de carga pesada y corríamos el riesgo de que la mercadería se rompiera. Yo llamé por radio al operador del montacargas de turno, que era Mateo. Él llegó al pasillo a las 19:40 con la máquina. Estuvimos trabajando juntos, hombro a hombro, sosteniendo la estructura y reacomodando las cajas hasta pasadas las 19:55 de la noche. Estaba a menos de dos metros de mí." \n\n[FISCAL]: "(Interrumpiendo con frustración) Señor Juez, solicitamos que la testigo precise si vio el reloj de pared o está calculando el tiempo al azar." \n\n[JUEZ UNIPERSONAL]: "Señor Fiscal, no interrumpa el examen directo de la defensa. Su momento para interrogar llegará en el contrainterrogatorio. Continúe, Abogado de la defensa."',
          impact: { efficacy: 98, legalTech: 95, oratory: 90 },
          feedback: 'Formulación impecable de pregunta abierta. Sostuviste las reglas del examen directo a la perfección. Ubicar a tu cliente con la supervisora a las 19:45 (hora exacta del asalto en la joyería del centro) fulmina la tesis fiscal por imposibilidad física de ubicuidad.'
        }
      ]
    }
  },
  {
    id: 'danos-perjuicios',
    exp: 'Exp: 312-2025',
    title: 'Daños y Perjuicios (Civil Oral)',
    type: 'Civil',
    difficulty: 'Avanzada',
    skill: 'Examen de Peritos',
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
      statement: 'El estudio de mecánica de suelos empleado por la constructora databa de hace 8 años y omitió la subida del caudal subterráneo. Al excavar, drenaron el agua de la cimentación vecina, causando un colapso del suelo por succión. Es una negligence de manual.'
    },
    simulationScenario: {
      witnessName: 'Módulo Corporativo de Oralidad Civil',
      initialMessage: '[JUEZ CIVIL]: "Nos encontramos en la audiencia de pruebas del proceso de indemnización por daños y perjuicios. Se da inicio a la actuación del peritaje técnico presentado por la parte demandante. Abogado de los vecinos afectados, proceda a interrogar al Ing. Eduardo Novoa. Abogado de la Constructora Megavía, recuerde las reglas de la oralidad civil para formular sus oposiciones."',
      questions: [
        {
          id: 'q1',
          text: 'Ingeniero Novoa, para ilustrar técnicamente al despacho, explique bajo qué bases científicas determinó usted de manera concluyente que el asentamiento de 8 centímetros fue causado por la excavación de Megavía y no por deficiencias de construcción estructural previas del edificio de mis clientes.',
          response: '[ABOGADO DE MEGAVÍA]: "¡Objeción, Magistrado! El colega está utilizando términos concluyentes como \'inequívoco\' para validar un informe pericial que carece de calicatas profundas y que ha sido debidamente tachado por nuestra parte en la etapa escrita." \n\n[JUEZ CIVIL]: "Se desestima la oposición de la constructora. La tacha será resuelta en la sentencia general; en este momento procesal el perito está facultado para defender el nivel de certeza y metodología de su estudio. Responda, Ingeniero." \n\n[ING. EDUARDO NOVOA]: "Gracias, Señor Juez. Mire, para descartar fallas previas, no usamos simples estimaciones de campo; aplicamos análisis de deformación histórica satelital mediante tecnología de radar InSAR. Evaluamos los datos de los últimos 15 años: el edificio residencial se mantuvo en un plano perfectamente estable, con variaciones menores a 2 milímetros por año. La deformación violenta de 8 centímetros comenzó exactamente a los tres días de que Megavía inició el movimiento de tierras pesadas y la excavación profunda sin muros pantalla impermeables. El nexo causal es matemático e irrefutable."',
          impact: { efficacy: 95, legalTech: 95, oratory: 90 },
          feedback: 'Soberbia conducción del interrogatorio. No te amedrentaste ante la tacha legal del abogado corporativo y lograste introducir evidencia satelital científica que sella el caso civil.'
        },
        {
          id: 'q2',
          text: 'Ingeniero, tomando en cuenta las características arcillosas del suelo de la zona, explique qué medidas de ingeniería civil debió implementar obligatoriamente la constructora para mitigar este riesgo y evitar el colapso del terreno colindante.',
          response: '[ING. EDUARDO NOVOA]: "En un suelo altamente deformable con nivel freático alto, la buena práctica de ingeniería civil exige la instalación obligatoria de una pantalla de pilotes continuos de concreto impermeables, acompañada de un sistema de pozos de recarga artificial para mantener la presión del agua bajo el edificio vecino. Megavía omitió todo esto; para abaratar costos en un 40%, decidieron usar simples tablestacas metálicas ligeras que filtraron el agua subterránea por succión, drenando la base del edificio colindante y causando el hundimiento." \n\n[ABOGADO DE MEGAVÍA]: "(Interrumpiendo de pie) ¡Señor Juez, solicitamos que se censure la respuesta! El perito está haciendo valoraciones económicas sobre costos de la empresa que escapan a su conocimiento técnico de suelos." \n\n[JUEZ CIVIL]: "Se acepta la precisión de la demandada. Ingeniero Novoa, limítese al aspecto técnico estructural. Abogado de la parte demandante, el perjuicio técnico y la omisión de medidas preventivas ya han quedado acreditados en el registro. Pasemos a sus conclusiones sobre la habitabilidad."',
          impact: { efficacy: 90, legalTech: 92, oratory: 88 },
          feedback: 'Estupendo cierre. Aunque la contraparte logró frenar la alusión a los costos financieros, lograste que el perito expusiera la negligencia técnica pura de Megavía (tablestacas en lugar de pilotes de concreto). Con esto demuestras la culpa de la empresa y aseguras el derecho a la indemnización millonaria.'
        }
      ]
    }
  }
];