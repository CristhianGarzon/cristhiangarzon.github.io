// All portfolio content lives here — edit this file to update the site.
// Every piece of text exists in English (`en`) and Spanish (`es`). The `es` object
// is typed against `en`, so TypeScript will tell you if a field is missing in one language.

export type Lang = 'en' | 'es';

/** Language-independent details. */
export const profile = {
  name: 'Cristhian Garzón',
  firstName: 'Cristhian',
  email: 'cristhianf.garzon@gmail.com',
  linkedin: 'https://www.linkedin.com/in/cristhian-garzon',
  github: 'https://github.com/CristhianGarzon',
  photo: `${import.meta.env.BASE_URL}profile.jpg`,
};

/** A heading with one word set in italic serif: [before, emphasised, after]. */
export type Title = [string, string, string];

export type Job = {
  role: string;
  company: string;
  url?: string;
  period: string;
  location: string;
  summary: string;
  tags: string[];
};

export type Project = {
  title: string;
  kind: string;
  year: string;
  description: string;
  url?: string;
};

const AI_ENGINEERING_ITEMS = [
  'Claude API',
  'OpenAI API',
  'Gemini API',
  'Model Context Protocol (MCP)',
  'RAG',
  'Embeddings',
  'pgvector',
  'Vercel AI SDK',
  'LangChain',
];
const AI_CODING_ITEMS = ['Claude Code', 'Codex', 'Vercel v0', 'GitHub Copilot', 'OpenAI Codex', 'Gemini CLI', 'Windsurf', 'v0', 'ChatGPT', 'Claude'];

/* ------------------------------------------------------------------ */
/* English                                                             */
/* ------------------------------------------------------------------ */

const en = {
  meta: {
    title: 'Cristhian Garzón — Software Engineer & AI Engineer',
  },
  ui: {
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', cta: 'Let’s talk', backToTop: 'Back to top' },
    theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
    language: { label: 'Language', switchTo: 'Ver en español' },
    hero: {
      greeting: 'Hi, I’m',
      tagline: 'I build software that runs businesses.',
      connect: 'Let’s connect',
      seeWork: 'See my work',
      open: 'Open to collaborations',
      photoAlt: 'Portrait of Cristhian Garzón',
      contact: 'Contact',
      copyEmail: 'Copy email address',
      copied: 'Copied',
      nowBuilding: 'Now building',
    },
    sections: {
      about: ['A bit ', 'about', ' me'] as Title,
      languages: 'Languages',
      experience: ['Where I’ve ', 'worked', ''] as Title,
      experienceKicker: 'From ERP consulting in Bogotá to start-ups, Web3 and AI in Australia.',
      at: 'at',
      projects: ['Selected ', 'projects', ''] as Title,
      skills: ['Skills ', '', ''] as Title,
      education: 'Education',
      certifications: 'Certifications',
      aiBadge: 'AI',
    },
    contact: {
      title: ['Let’s build something ', 'together', '.'] as Title,
      intro:
        'Running a rental business, hiring for an engineering role, or have an idea that needs shipping? Send me a note and I’ll get back to you.',
      name: 'Name',
      namePlaceholder: 'Jane Smith',
      email: 'Email',
      emailPlaceholder: 'jane@company.com',
      company: 'Company',
      optional: '(optional)',
      companyPlaceholder: 'Company or project',
      message: 'Message',
      messagePlaceholder: 'Tell me a little about what you have in mind…',
      send: 'Send message',
      sending: 'Sending…',
      sentTitle: 'Thanks — message sent.',
      sentBody: 'I’ll reply to the email you provided as soon as I can.',
      sendAnother: 'Send another',
      errorGeneric: 'Something went wrong.',
      errorFallback: 'You can also email me directly at',
      subject: 'Portfolio: new message from',
    },
    footer: {
      builtWith: 'Australia today · Around the world tomorrow',
    },
  },

  role: 'Full-stack Software Engineer & Founder',
  location: 'Brisbane, QLD, Australia',
  headline:
    'I turn business ideas into production software — from Web3 platforms to start-ups, to financial technology solutions, or custom enterprise software and beyond.',
  about: [
    'I’m an IT professional with a strong academic foundation and over a decade of experience across full-stack development, software architecture, DevOps and project management.',
    'I’ve shipped software for start-ups, government programs and global enterprises across Colombia, Peru, India and Australia. I pair analytical thinking with hands-on leadership, pick up new technology quickly, and enjoy solving hard problems with practical, collaborative teams.',
    'Today I’m building RUVEO from Brisbane, as part of the Queensland Government’s Launching Pad program at The Precinct in Fortitude Valley.',
  ],

  stats: [
    { value: '10+', label: 'years building software' },
    { value: '4', label: 'countries worked in' },
    { value: '1', label: 'SaaS in the making' },
  ],

  current: {
    name: 'RUVEO',
    url: 'https://ruveo.com.au',
    tagline: 'The operating system for campervan, RV and vehicle rental businesses in Australia.',
    status: 'MVP in private preview',
    stack: ['Next.js', 'React', 'TypeScript', 'Go'],
  },

  experience: [
    {
      role: 'Founder',
      company: 'RUVEO',
      url: 'https://ruveo.com.au',
      period: 'Aug 2026 — Present',
      location: 'Brisbane · The Precinct, Fortitude Valley',
      summary:
        'Founded a subscription SaaS that gives campervan, RV and vehicle rental operators one operating system for running their business. Designed and built the MVP end to end — Next.js/React/TypeScript front end and a Go back end — now in private preview. Built AI-first: Claude Code and Codex as coding agents across the Next.js and Go codebases, and LLM features — agents with tool use over MCP designed into the product to automate operators’ day-to-day work. Part of the Queensland Government’s Launching Pad program.',
      tags: ['Next.js', 'React', 'TypeScript', 'Go', 'SaaS', 'Claude API', 'MCP', 'Claude Code'],
    },
    {
      role: 'Software Developer',
      company: 'Origami Finance',
      url: 'https://origami.finance',
      period: 'Feb 2024 — Aug 2026',
      location: 'Remote, Australia',
      summary:
        'Helped to build the Origami Finance Web3 platform: delivering front-end functionality while supporting back-end development and DevOps initiatives. Uses AI coding tools — Claude Code, Codex and GitHub Copilot — day to day to speed up feature delivery, write and review tests for smart-contract tooling, and automate infrastructure changes.',
      tags: ['React', 'TypeScript', 'Pulumi', 'Solidity', 'Forge', 'Web3', 'Claude Code', 'Copilot'],
    },
    {
      role: 'Software Developer',
      company: 'Helix Collective',
      url: 'https://www.helixcollective.com',
      period: 'Feb 2022 — Feb 2024',
      location: 'Remote, Australia',
      summary:
        'Partnered with start-ups to turn business ideas into production-ready web applications using Go, React, Node.js, blockchain technologies, Solidity and Pulumi on AWS.',
      tags: ['React', 'TypeScript', 'Node.js', 'Solidity', 'AWS', 'Pulumi'],
    },
    {
      role: 'Software Developer',
      company: 'Blitzm Systems',
      url: 'https://www.blitzm.com.au',
      period: 'Feb 2019 — Feb 2022',
      location: 'Melbourne, Australia',
      summary:
        'Delivered client-facing web applications for start-ups, translating business requirements into scalable solutions with Go, React, Pulumi/Terraform and Kubernetes.',
      tags: ['Go', 'React', 'TypeScript', 'Django', 'Kubernetes', 'Docker'],
    },
    {
      role: 'Software Integration Developer',
      company: 'I-NEW',
      url: 'https://www.i-new.com',
      period: 'Jun 2016 — Oct 2016',
      location: 'Bogotá, Colombia',
      summary:
        'Coded, tested and integrated web services and APIs for an MVNO using Java and Go, including SOAP/ESB integration management.',
      tags: ['Java', 'Spring Boot', 'Go', 'SoapUI'],
    },
    {
      role: 'Software Architect & Developer',
      company: 'IDARTES — CLAN Program',
      url: 'https://www.idartes.gov.co',
      period: 'Apr 2015 — Dec 2015',
      location: 'Bogotá, Colombia',
      summary: 'Architected and developed software for the city of Bogotá’s CLAN arts-education program.',
      tags: ['LAMP', 'PHP', 'MySQL'],
    },
    {
      role: 'Command Centre Operator',
      company: 'Tata Consultancy Services',
      url: 'https://www.tcs.com',
      period: 'Apr 2014 — Feb 2015',
      location: 'Chennai, India',
      summary:
        'Technical link and interpreter between Telefónica Spain and TCS. Resolved middleware incidents across Unix, PostgreSQL, JBoss and Oracle environments.',
      tags: ['Linux', 'PostgreSQL', 'JBoss', 'Oracle'],
    },
    {
      role: 'JDE Consultant & Developer',
      company: 'Everest Solutions Team',
      period: 'Aug 2012 — Apr 2014',
      location: 'Bogotá, Colombia · Lima, Peru',
      summary:
        'Designed an S&OP module for the oil industry and rolled out StarQuery for Excel. In Lima, implemented contract, service-billing and accounts-receivable modules for a shipbuilder (SIMA) on JD Edwards 9.1.',
      tags: ['JD Edwards 9.1', 'ERP', 'Reporting'],
    },
  ] as Job[],

  projects: [
    {
      title: 'RUVEO',
      kind: 'SaaS · AI · Founder',
      year: '2026',
      description:
        'A subscription operating system for Australian campervan, RV and vehicle rental operators. Next.js + Go, with LLM agents built in and developed AI-first with Claude Code.',
      url: 'https://ruveo.com.au',
    },
    {
      title: 'Origami Finance',
      kind: 'Web3 · Full stack',
      year: '2024 —',
      description:
        'Front-end features, smart-contract tooling and infrastructure-as-code for a DeFi platform, shipped faster with AI coding tools.',
      url: 'https://origami.finance',
    },
    {
      title: 'Start-up launches at Helix',
      kind: 'Full stack · Sydney',
      year: '2022 — 24',
      description: 'Took several start-up ideas from whiteboard to production on AWS with Go, React and Solidity.',
    },
    {
      title: 'Melbourne Zoo dance floor',
      kind: 'Unity 3D · Tekt Industries',
      year: '2017',
      description:
        'Software integration for an interactive dance-floor installation at Melbourne Zoo, plus an AR app for internal PCB research.',
    },
    {
      title: 'Indoor Navigation AR Escape Room',
      kind: 'AR · University of Melbourne',
      year: '2018',
      description: 'An augmented-reality app to navigate an office using Vuforia image tracking and Unity-rendered objects.',
    },
    {
      title: 'Telefónica middleware ops',
      kind: 'Operations · TCS',
      year: '2014',
      description: 'Kept Telefónica Spain’s middleware running from Chennai while bridging the two teams in Spanish and English.',
    },
  ] as Project[],

  skills: [
    { group: 'Languages & frameworks', items: ['Go', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python / Django', 'PHP / Laravel', 'Java', 'Solidity'] },
    { group: 'Cloud & DevOps', items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Pulumi', 'CI/CD', 'Linux'] },
    { group: 'Data & platforms', items: ['PostgreSQL', 'SQL databases', 'Blockchain / Web3', 'Forge', 'JD Edwards'] },
  ],

  aiSkills: [
    {
      group: 'AI engineering',
      blurb: 'Building LLM-powered features into real products — from prompt to production.',
      items: [
        ...AI_ENGINEERING_ITEMS.slice(0, 3),
        'Agents & tool use',
        ...AI_ENGINEERING_ITEMS.slice(3, 7),
        'Prompt engineering',
        'Structured outputs',
        'LLM evals',
        ...AI_ENGINEERING_ITEMS.slice(7),
      ],
    },
    {
      group: 'AI coding tools',
      blurb: 'Shipping faster with AI pair-programmers and coding agents across the whole stack.',
      items: AI_CODING_ITEMS,
    },
  ],

  education: [
    { title: 'Master of IT, Spatial', place: 'The University of Melbourne', year: '2017 — 2018' },
    { title: 'Systems Engineering', place: 'Universidad Distrital Francisco José de Caldas', year: '2007 — 2013' },
  ],

  certifications: [
    { title: 'AWS Cloud Practitioner Essentials', place: 'Amazon Web Services', year: '2020' },
    { title: 'PTE Academic — 78/90', place: 'Pearson', year: '2020' },
    { title: 'ITIL 2011 Foundation', place: 'Tata Consultancy Services', year: '2015' },
    { title: 'Project Formulation & Evaluation', place: 'ESAP, Bogotá', year: '2015' },
  ],

  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Professional · PTE 78' },
  ],
};

export type Content = typeof en;

/* ------------------------------------------------------------------ */
/* Español                                                             */
/* ------------------------------------------------------------------ */

const es: Content = {
  meta: {
    title: 'Cristhian Garzón — Ingeniero de Software y de Inteligencia Artificial',
  },
  ui: {
    nav: { about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', skills: 'Habilidades', cta: 'Hablemos', backToTop: 'Volver arriba' },
    theme: { toLight: 'Cambiar a tema claro', toDark: 'Cambiar a tema oscuro' },
    language: { label: 'Idioma', switchTo: 'View in English' },
    hero: {
      greeting: 'Hola, soy',
      tagline: 'Construyo software que mueve negocios.',
      connect: 'Conectemos',
      seeWork: 'Ver mi trabajo',
      open: 'Abierto a colaboraciones',
      photoAlt: 'Retrato de Cristhian Garzón',
      contact: 'Contacto',
      copyEmail: 'Copiar correo electrónico',
      copied: 'Copiado',
      nowBuilding: 'Construyendo ahora',
    },
    sections: {
      about: ['Un poco ', 'sobre', ' mí'],
      languages: 'Idiomas',
      experience: ['Dónde he ', 'trabajado', ''],
      experienceKicker: 'Desde consultoría ERP en Suramérica a start-ups, Web3 e IA en Australia.',
      at: 'en',
      projects: ['Proyectos ', 'destacados', ''],
      skills: ['Habilidades', '', ''],
      education: 'Formación',
      certifications: 'Certificaciones',
      aiBadge: 'IA',
    },
    contact: {
      title: ['Construyamos algo ', 'juntos', '.'],
      intro:
        '¿Tienes una idea de negocio, buscas a alguien para un rol de ingeniería o tienes un proyecto que necesita salir a producción? Escríbeme y te responderé pronto.',
      name: 'Nombre',
      namePlaceholder: 'Ana Pérez',
      email: 'Correo',
      emailPlaceholder: 'ana@empresa.com',
      company: 'Empresa',
      optional: '(opcional)',
      companyPlaceholder: 'Empresa o proyecto',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame un poco sobre lo que tienes en mente…',
      send: 'Enviar mensaje',
      sending: 'Enviando…',
      sentTitle: 'Gracias — mensaje enviado.',
      sentBody: 'Te responderé al correo que indicaste lo antes posible.',
      sendAnother: 'Enviar otro',
      errorGeneric: 'Algo salió mal.',
      errorFallback: 'También puedes escribirme directamente a',
      subject: 'Portafolio: nuevo mensaje de',
    },
    footer: {
      builtWith: 'Australia hoy · Alrededor del mundo mañana',
    },
  },

  role: 'Ingeniero de Software Full-stack e Ingeniero de Inteligencia Artificial',
  location: 'Brisbane, QLD, Australia',
  headline:
    'Convierto ideas de negocio en software — desde plataformas Web3 y start-ups hasta soluciones de tecnología financiera, software empresarial a la medida y mucho más.',
  about: [
    'Soy un profesional de TI con una sólida base académica y más de una década de experiencia en desarrollo full-stack, arquitectura de software, DevOps y gestión de proyectos.',
    'He entregado software para start-ups, programas de gobierno y empresas globales en Colombia, Perú, India y Australia. Combino el pensamiento analítico con un liderazgo práctico, aprendo nuevas tecnologías rápidamente y disfruto resolver problemas complejos en equipos colaborativos.',
    'Hoy estoy construyendo RUVEO desde Brisbane, como parte del programa Launching Pad del Gobierno de Queensland en The Precinct, Fortitude Valley.',
  ],

  stats: [
    { value: '10+', label: 'años construyendo software' },
    { value: '4', label: 'países donde he trabajado' },
    { value: '1', label: 'SaaS en construcción' },
  ],

  current: {
    name: 'RUVEO',
    url: 'https://ruveo.com.au',
    tagline: 'El sistema operativo para negocios de alquiler de campervans, autocaravanas y vehículos en Australia.',
    status: 'MVP en vista previa privada',
    stack: ['Next.js', 'React', 'TypeScript', 'Go'],
  },

  experience: [
    {
      role: 'Fundador',
      company: 'RUVEO',
      url: 'https://ruveo.com.au',
      period: 'Ago 2026 — Actualidad',
      location: 'Brisbane · The Precinct, Fortitude Valley',
      summary:
        'Fundé un SaaS por suscripción que ofrece a los operadores de alquiler de campervans, autocaravanas y vehículos un único sistema operativo para gestionar su negocio. Diseñé y construí el MVP de punta a punta — front end en Next.js/React/TypeScript y back end en Go — hoy en vista previa privada. Construido con IA desde el inicio: Claude Code y Codex como agentes de programación en los códigos de Next.js y Go, y funcionalidades con LLM — agentes con uso de herramientas vía MCP integradas en el producto para automatizar el trabajo diario de los operadores. Parte del programa Launching Pad del Gobierno de Queensland.',
      tags: ['Next.js', 'React', 'TypeScript', 'Go', 'SaaS', 'Claude API', 'MCP', 'Claude Code'],
    },
    {
      role: 'Desarrollador de Software',
      company: 'Origami Finance',
      url: 'https://origami.finance',
      period: 'Feb 2024 — Ago 2026',
      location: 'Remoto, Australia',
      summary:
        'Ayudé a construir la plataforma Web3 de Origami Finance: desarrollé funcionalidades de front end y apoyé iniciativas de back end y DevOps. Uso a diario herramientas de programación con IA — Claude Code, Codex, Vercel v0 y GitHub Copilot — para acelerar la entrega de funcionalidades, escribir y revisar pruebas para las herramientas de contratos inteligentes y automatizar cambios de infraestructura.',
      tags: ['React', 'TypeScript', 'Pulumi', 'Solidity', 'Forge', 'Web3', 'Claude Code', 'Copilot'],
    },
    {
      role: 'Desarrollador de Software',
      company: 'Helix Collective',
      url: 'https://www.helixcollective.com',
      period: 'Feb 2022 — Feb 2024',
      location: 'Remoto, Australia',
      summary:
        'Trabajé con start-ups para convertir ideas de negocio en aplicaciones web listas para producción con Go, React, Node.js, tecnologías blockchain, Solidity y Pulumi sobre AWS.',
      tags: ['React', 'TypeScript', 'Node.js', 'Solidity', 'AWS', 'Pulumi'],
    },
    {
      role: 'Desarrollador de Software',
      company: 'Blitzm Systems',
      url: 'https://www.blitzm.com.au',
      period: 'Feb 2019 — Feb 2022',
      location: 'Melbourne, Australia',
      summary:
        'Entregué aplicaciones web para clientes start-up, traduciendo requerimientos de negocio en soluciones escalables con Go, React, Pulumi/Terraform y Kubernetes.',
      tags: ['Go', 'React', 'TypeScript', 'Django', 'Kubernetes', 'Docker'],
    },
    {
      role: 'Desarrollador de Integración de Software',
      company: 'I-NEW',
      url: 'https://www.i-new.com',
      period: 'Jun 2016 — Oct 2016',
      location: 'Bogotá, Colombia',
      summary:
        'Programé, probé e integré servicios web y APIs para un operador móvil virtual (OMV) con Java y Go, incluida la gestión de integraciones SOAP/ESB.',
      tags: ['Java', 'Spring Boot', 'Go', 'SoapUI'],
    },
    {
      role: 'Arquitecto y Desarrollador de Software',
      company: 'IDARTES — Programa CLAN',
      url: 'https://www.idartes.gov.co',
      period: 'Abr 2015 — Dic 2015',
      location: 'Bogotá, Colombia',
      summary: 'Diseñé la arquitectura y desarrollé software para el programa de formación artística CLAN de Bogotá.',
      tags: ['LAMP', 'PHP', 'MySQL'],
    },
    {
      role: 'Operador del Centro de Comando',
      company: 'Tata Consultancy Services',
      url: 'https://www.tcs.com',
      period: 'Abr 2014 — Feb 2015',
      location: 'Chennai, India',
      summary:
        'Enlace técnico e intérprete entre Telefónica España y TCS. Resolví incidentes de middleware en entornos Unix, PostgreSQL, JBoss y Oracle.',
      tags: ['Linux', 'PostgreSQL', 'JBoss', 'Oracle'],
    },
    {
      role: 'Consultor y Desarrollador JDE',
      company: 'Everest Solutions Team',
      period: 'Ago 2012 — Abr 2014',
      location: 'Bogotá, Colombia · Lima, Perú',
      summary:
        'Diseñé un módulo de S&OP para la industria petrolera e implementé StarQuery para Excel. En Lima, implementé módulos de contratos, facturación de servicios y cuentas por cobrar para un astillero (SIMA) en JD Edwards 9.1.',
      tags: ['JD Edwards 9.1', 'ERP', 'Reportes'],
    },
  ],

  projects: [
    {
      title: 'RUVEO',
      kind: 'SaaS · IA · Fundador',
      year: '2026',
      description:
        'Un sistema operativo por suscripción para operadores australianos de alquiler de campervans, autocaravanas y vehículos. Next.js + Go, con agentes LLM integrados y desarrollado con IA desde el inicio usando Claude Code.',
      url: 'https://ruveo.com.au',
    },
    {
      title: 'Origami Finance',
      kind: 'Web3 · Full stack',
      year: '2024 —',
      description:
        'Funcionalidades de front end, herramientas para contratos inteligentes e infraestructura como código para una plataforma DeFi, entregadas más rápido con herramientas de programación con IA.',
      url: 'https://origami.finance',
    },
    {
      title: 'Lanzamientos de start-ups en Helix',
      kind: 'Full stack · Sídney',
      year: '2022 — 24',
      description: 'Llevé varias ideas de start-ups de la pizarra a producción en AWS con Go, React y Solidity.',
    },
    {
      title: 'Pista de baile del Zoológico de Melbourne',
      kind: 'Unity 3D · Tekt Industries',
      year: '2017',
      description:
        'Integración de software para una pista de baile interactiva en el Zoológico de Melbourne, además de una app de RA para una investigación interna de PCB.',
    },
    {
      title: 'Escape room de navegación en interiores con RA',
      kind: 'RA · Universidad de Melbourne',
      year: '2018',
      description:
        'Una app de realidad aumentada para navegar una oficina usando reconocimiento de imágenes con Vuforia y objetos renderizados en Unity.',
    },
    {
      title: 'Operación de middleware para Telefónica',
      kind: 'Operaciones · TCS',
      year: '2014',
      description:
        'Mantuve en funcionamiento el middleware de Telefónica España desde Chennai, sirviendo de puente entre ambos equipos en español e inglés.',
    },
  ],

  skills: [
    { group: 'Lenguajes y frameworks', items: ['Go', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python / Django', 'PHP / Laravel', 'Java', 'Solidity'] },
    { group: 'Nube y DevOps', items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Pulumi', 'CI/CD', 'Linux'] },
    { group: 'Datos y plataformas', items: ['PostgreSQL', 'Bases de datos SQL', 'Blockchain / Web3', 'Forge', 'JD Edwards'] },
  ],

  aiSkills: [
    {
      group: 'Ingeniería de IA',
      blurb: 'Integro funcionalidades con LLM en productos reales — del prompt a producción.',
      items: [
        ...AI_ENGINEERING_ITEMS.slice(0, 3),
        'Agentes y uso de herramientas',
        ...AI_ENGINEERING_ITEMS.slice(3, 7),
        'Ingeniería de prompts',
        'Salidas estructuradas',
        'Evaluaciones de LLM',
        ...AI_ENGINEERING_ITEMS.slice(7),
      ],
    },
    {
      group: 'Herramientas de programación con IA',
      blurb: 'Entrego más rápido con asistentes y agentes de programación con IA en todo el stack.',
      items: AI_CODING_ITEMS,
    },
  ],

  education: [
    { title: 'Maestría en TI, Espacial', place: 'Universidad de Melbourne', year: '2017 — 2018' },
    { title: 'Ingeniería de Sistemas', place: 'Universidad Distrital Francisco José de Caldas', year: '2007 — 2013' },
  ],

  certifications: [
    { title: 'AWS Cloud Practitioner Essentials', place: 'Amazon Web Services', year: '2020' },
    { title: 'PTE Academic — 78/90', place: 'Pearson', year: '2020' },
    { title: 'ITIL 2011 Foundation', place: 'Tata Consultancy Services', year: '2015' },
    { title: 'Formulación y Evaluación de Proyectos', place: 'ESAP, Bogotá', year: '2015' },
  ],

  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Profesional · PTE 78' },
  ],
};

export const content: Record<Lang, Content> = { en, es };
