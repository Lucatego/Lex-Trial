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
  },
  {
    id: 'lavado-activos',
    exp: 'Exp: 521-2026',
    title: 'Lavado de Activos y Corrupción (Penal)',
    type: 'Penal',
    difficulty: 'Avanzada',
    skill: 'Contrainterrogatorio',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800',
    summary: 'Contrainterroga al colaborador eficaz clave de la Fiscalía en un caso de alta corrupción pública. Tu objetivo es destruir su credibilidad demostrando contradicciones en las fechas y montos de los supuestos sobornos.',
    facts: [
      'Al investigado, un exfuncionario regional, se le acusa de recibir un soborno de USD $200,000.',
      'El colaborador eficaz, un empresario constructor, afirma haber entregado el dinero en efectivo en el despacho del funcionario el 14 de marzo de 2025.',
      'La defensa sostiene que en esa fecha exacta el investigado se encontraba en una sesión de consejo descentralizada e incomunicada en otra provincia.',
      'El Ministerio Público basa toda su acusación en este testimonio y en un desbalance patrimonial no justificado.'
    ],
    evidence: [
      {
        name: 'Registro de Visitas de la Entidad Pública',
        description: 'Muestra que el empresario constructor no registró ningún ingreso formal las semanas de marzo de 2025.'
      },
      {
        name: 'Acta de Sesión de Consejo Descentralizada',
        description: 'Documento oficial que ubica al investigado en la provincia de Yauyos desde las 08:00 hasta las 20:00 horas del 14 de marzo de 2025.'
      }
    ],
    testimony: {
      witnessName: 'Jorge Barnechea',
      witnessRole: 'Colaborador Eficaz / Empresario',
      statement: 'Yo mismo llevé el maletín con los USD $200,000 a su oficina a mitad del mes de marzo, específicamente el día 14 en la tarde. Él me recibió personalmente y me aseguró la adjudicación de la obra de la carretera.'
    },
    simulationScenario: {
      witnessName: 'Juicio Oral - Sala de Crimen Organizado',
      initialMessage: '[JUEZ PRESIDENTE]: "Se da inicio al examen del colaborador eficaz, Sr. Jorge Barnechea. La defensa técnica del acusado puede iniciar su contrainterrogatorio. Mantengan el debido respeto a las reglas del proceso." \n\n[COLABORADOR JORGE BARNECHEA]: "Buenas tardes. Solo estoy aquí para ratificar que le entregué cada dólar de esa coima en su propia mano el 14 de marzo. No tengo por qué mentir, ya me acogí a los beneficios."',
      questions: [
        {
          id: 'q1',
          text: 'Señor Barnechea, usted afirma bajo juramento que la entrega del dinero fue el día 14 de marzo de 2025 por la tarde en el despacho regional. ¿Podría precisar la hora exacta y con qué personal de seguridad o secretaría se anunció usted?',
          response: '[FISCAL]: "¡Objeción Señor Juez! La pregunta es capciosa e irrelevante, ha pasado más de un año y exigir precisión de minutos es un intento de confundir al colaborador." \n\n[JUEZ PRESIDENTE]: "Infundada la objeción, Señor Fiscal. Al tratarse de una imputación directa de entrega física de dinero, la precisión espaciotemporal es un elemento clave de control para la defensa. El testigo debe responder si recuerda los detalles." \n\n[COLABORADOR JORGE BARNECHEA]: "(Duda, mira de reojo al Fiscal) Fue... entre las 3 y las 4 de la tarde. No me anuncié con ninguna secretaria porque él ya me estaba esperando; entré por la puerta lateral de cocheras que siempre paraba abierta."',
          impact: { efficacy: 90, legalTech: 95, oratory: 90 },
          feedback: 'Excelente. Soportaste la presión del Fiscal y obligaste al testigo a fijar una hora específica (15:00 - 16:00) y una ruta de acceso irregular. Has preparado la trampa procesal perfecta.'
        },
        {
          id: 'q2',
          text: 'Señor Barnechea, si usted estuvo con mi patrocinado en su despacho en Lima entre las 15:00 y 16:00 horas de ese día, ¿cómo explica que el Acta Oficial N° 044 de la Sesión Descentralizada demuestre que mi cliente estuvo firmando acuerdos en vivo a 250 kilómetros de distancia a esa misma hora?',
          response: '[FISCAL]: "¡Objeción! El abogado está haciendo una valoración de un documento que el testigo no ha suscrito." \n\n[JUEZ PRESIDENTE]: "Señor Fiscal, el documento es una prueba documental admitida en este juicio. La defensa está confrontando la veracidad del dicho del testigo con un documento público oficial. Señor Barnechea, responda a la flagrante contradicción." \n\n[COLABORADOR JORGE BARNECHEA]: "(Evidentemente nervioso, empieza a titubear) Bueno... yo... puede ser que me haya equivocado de día... quizás no fue el 14... fue a mitad de mes... yo recuerdo el maletín, pero las fechas las maneja mi administrador... (Mira al Juez con tono de súplica)"',
          impact: { efficacy: 100, legalTech: 98, oratory: 95 },
          feedback: '¡Soberbio, destruiste el caso de la Fiscalía! Forzar al colaborador eficaz a desdecirse de la fecha exacta y admitir que "pudo equivocarse" quita todo el sustento de certeza a la acusación por lavado de activos. Esta transcripción vale oro.'
        }
      ]
    }
  },
  {
    id: 'despido-incausado',
    exp: 'Exp: 044-2025',
    title: 'Despido Incausado y Beneficios (Laboral Oral)',
    type: 'Laboral',
    difficulty: 'Principiante',
    skill: 'Examen Directo',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800',
    summary: 'Defiende los intereses de un trabajador del sector retail. Interroga directamente al excompañero de trabajo del demandante para probar que el cese laboral fue un despido intempestivo y no una "renuncia voluntaria" como alega la multinacional.',
    facts: [
      'El demandante, Luis Castro, trabajó como cajero principal en "Supermercados Alfa" durante 5 años.',
      'La empresa alega que el trabajador firmó una carta de renuncia voluntaria y mutuo disenso el 10 de diciembre de 2025.',
      'El trabajador sostiene que fue encerrado en la oficina de Recursos Humanos y coaccionado a firmar bajo amenaza de denuncia penal infundada por un cuadre de caja.',
      'La Nueva Ley Procesal del Trabajo (NLPT) en Perú exige la oralidad y la inmediación directa en la audiencia de juzgamiento.'
    ],
    evidence: [
      {
        name: 'Reporte de Auditoría Interna de Caja',
        description: 'Muestra que el supuesto "faltante de dinero" imputado al trabajador era un error de sistema que se corrigió automáticamente a las 18:00 horas del mismo día.'
      }
    ],
    testimony: {
      witnessName: 'Mariana Ríos',
      witnessRole: 'Testigo / Ex-Cajera de la Tienda',
      statement: 'Yo estuve afuera de la oficina de Recursos Humanos ese día. Escuché los gritos del gerente amenazando a Luis con meterlo preso si no firmaba ese papel. Luis salió llorando de la oficina. A mí me despidieron un mes después por reclamar.'
    },
    simulationScenario: {
      witnessName: 'Juzgado Especializado de Trabajo',
      initialMessage: '[JUEZ LABORAL]: "Se da inicio a la actuación de la prueba testimonial de la parte demandante. Abogado de la defensa del trabajador, proceda con el examen directo de la Sra. Mariana Ríos. Abogado de la empresa demandada, controle sus intervenciones de acuerdo a ley." \n\n[TESTIGO MARIANA RÍOS]: "Buenos días, doctor. Vengo a contar la verdad de lo que le hicieron a Luis esa tarde en la tienda."',
      questions: [
        {
          id: 'q1',
          text: 'Señora Ríos, por favor describa de manera cronológica qué observó y qué escuchó en los exteriores de la oficina de Recursos Humanos la tarde del 10 de diciembre de 2025.',
          response: '[ABOGADO DE LA EMPRESA]: "¡Objeción Magistrado! La pregunta es impertinente y busca generar un sesgo sentimental sobre hechos que la testigo no ha presenciado directamente en el interior de la oficina." \n\n[JUEZ LABORAL]: "Infundada la objeción. La testigo está siendo examinada sobre sus propias percepciones sensoriales externas de un hecho relevante. Responda la testigo." \n\n[TESTIGO MARIANA RÍOS]: "Eran más o menos las 4 de la tarde. Yo estaba cuadrando mi bandeja técnica a un lado del pasillo, justo afuera de la oficina. Se escuchaban clarito los gritos del gerente de tienda, el señor Gómez. Le decía a Luis: \'Firma esto ahorita o llamo a la policía que está abajo y te vas a la cárcel de inmediato por ratero\'. Estuvieron así casi una hora. Luis suplicaba diciendo que el cuadre estaba bien, pero no lo dejaban salir de la oficina."',
          impact: { efficacy: 95, legalTech: 90, oratory: 85 },
          feedback: 'Excelente técnica en examen directo. Formulaste una pregunta abierta perfecta que permitió a la testigo narrar el contexto de violencia psicológica, desbaratando la tesis corporativa del "mutuo disenso".'
        },
        {
          id: 'q2',
          text: '¿Cómo era el estado físico y emocional de Luis Castro al momento de salir de dicha oficina tras firmar el documento?',
          response: '[TESTIGO MARIANA RÍOS]: "Salió pálido, temblando, con los ojos rojos de tanto llorar. Ni siquiera pudo recoger sus cosas personales de su casillero. El personal de seguridad privada de la tienda lo tomó del brazo por orden del gerente y lo sacó arrastrando por la puerta trasera como si fuera un delincuente. Fue denigrante." \n\n[ABOGADO DE LA EMPRESA]: "(Toma la palabra con tono irónico) Magistrado, dejamos constancia de que la testigo denota una evidente animadversión hacia mi representada debido a su propio cese." \n\n[JUEZ LABORAL]: "Su observación queda registrada para la etapa de alegatos finales, Abogado corporativo. Continúe la defensa con su última pregunta."',
          impact: { efficacy: 92, legalTech: 95, oratory: 90 },
          feedback: 'Magnífico cierre. Lograste pintar de forma clara y nítida los elementos de la coacción laboral. Ante un juez laboral, este grado de detalle fáctico asegura la nulidad del acto jurídico y la victoria de la indemnización.'
        }
      ]
    }
  },
  {
    id: 'violencia-familiar',
    exp: 'Exp: 894-2025',
    title: 'Violencia Familiar y Tenencia (Familia/Civil Oral)',
    type: 'Civil',
    difficulty: 'Avanzada',
    skill: 'Contrainterrogatorio de Peritos',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=800',
    summary: 'Audiencia civil de violencia familiar y custodia de menores. Debes contrainterrogar a la psicóloga del Centro Emergencia Mujer (CEM) para demostrar que su informe psicológico no siguió los protocolos del Ministerio de la Mujer y está sesgado.',
    facts: [
      'La demandante solicita la tenencia exclusiva argumentando violencia psicológica sistemática por parte del padre.',
      'El informe del CEM concluye que la madre presenta "daño emocional severo e irreversible compatible con violencia ejercida por su cónyuge".',
      'La defensa del padre sostiene que el informe se basó en una única entrevista de 30 minutos, omitiendo el historial de conflicto patrimonial por la separación de bienes y un divorcio en curso.',
      'El Poder Judicial exige la oralización y debate de las pericias bajo los módulos de violencia familiar.'
    ],
    evidence: [
      {
        name: 'Protocolo del Ministerio de la Mujer (MIMP) para Pericias',
        description: 'Normativa oficial que exige un mínimo de tres sesiones diferenciadas y la aplicación de pruebas psicométricas validadas antes de emitir un diagnóstico de daño irreversible.'
      }
    ],
    testimony: {
      witnessName: 'Dra. Elena Vizcarra',
      witnessRole: 'Psicóloga del Centro Emergencia Mujer (CEM)',
      statement: 'Evalué a la señora y es evidente el cuadro de afectación psicológica y sometimiento. El demandado ejerce un perfil de control coercitivo que pone en riesgo la estabilidad emocional del núcleo familiar y de los menores de edad.'
    },
    simulationScenario: {
      witnessName: 'Juzgado de Familia / Violencia de Género',
      initialMessage: '[JUEZ DE FAMILIA]: "Se da inicio a la etapa de contradicción de la pericia psicológica. El abogado de la parte demandada tiene el uso de la palabra para examinar a la Dra. Vizcarra. Proceda." \n\n[DRE. ELENA VIZCARRA]: "Buenas tardes. Mi informe es técnico y ratifico cada una de las conclusiones respecto al daño emocional causado por el demandado a mi paciente."',
      questions: [
        {
          id: 'q1',
          text: 'Dra. Vizcarra, para dejar constancia en el registro de audio: ¿cuántas sesiones de evaluación presencial realizó con la demandante y qué pruebas psicométricas estandarizadas aplicó exactamente antes de firmar su diagnóstico de daño irreversible?',
          response: '[ABOGADO DE LA MADRE]: "¡Objeción Señor Juez! El colega pretende cuestionar los métodos de una servidora pública del Estado con amplia experiencia en temas de violencia de género." \n\n[JUEZ DE FAMILIA]: "La objeción es infundada. El método científico e idoneidad de la pericia es el objeto exacto de este debate. Responda la perito." \n\n[DRA. ELENA VIZCARRA]: "(Inquieta, cambia su tono) Bueno... debido a la carga procesal y la urgencia de las medidas de protección del CEM, tuvimos una sesión de entrevista clínica en profundidad de aproximadamente 45 minutos. No se aplicaron reactivos de láminas ni test de personalidad psicométricos porque la narrativa de la víctima era de alto nivel de coherencia externa."',
          impact: { efficacy: 95, legalTech: 95, oratory: 90 },
          feedback: '¡Excelente golpe técnico! Lograste que la perito estatal admitiera que emitió un diagnóstico gravísimo de "daño irreversible" tras una única entrevista corta y sin un solo test de control científico.'
        },
        {
          id: 'q2',
          text: 'Doctora, la Guía oficial de Evaluación Psicológica Forense del MIMP exige explícitamente un mínimo de 3 sesiones y la aplicación obligatoria de escalas de control para descartar simulación o manipulación por procesos de divorcio en curso. Al omitir esto, ¿puede usted garantizar al 100% que su dictamen no está sesgado por la disputa de tenencia en curso?',
          response: '[DRA. ELENA VIZCARRA]: "Nuestras guías son referenciales, nosotros priorizamos la protección de las víctimas... Pero... bueno, científicamente y bajo estricto rigor metodológico forense... sí existe un margen de error si el peritado se encuentra bajo una contingencia legal por la tenencia de sus hijos. Un solo examen clínico no puede blindar el diagnóstico frente a una simulación sofisticada." \n\n[JUEZ DE FAMILIA]: "Tomamos nota de la precisión metodológica del informe. Concluido el debate de la pericia técnica."',
          impact: { efficacy: 98, legalTech: 90, oratory: 95 },
          feedback: 'Magistral cierre en materia civil-familia. Al demostrar la falta de rigor científico y la violación del propio protocolo gubernamental, neutralizaste el peso de la pericia en contra de tu cliente. Esto cambia por completo la decisión del Juez sobre las medidas de protección y la tenencia de los niños.'
        }
      ]
    }
  }

];