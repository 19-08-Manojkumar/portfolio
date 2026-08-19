export const profile = {
  name: "Manojkumar",
  initials: "MK",
  location: "Chennai, India",
  email: "manojkumarfullstackdev@gmail.com",
  phone: "+91 9361332167",
  github: "https://github.com/19-08-Manojkumar",
  linkedin: "https://www.linkedin.com/in/manojkumar-m-357728265/",
  resume: "/manojkumar_software_engineer.pdf",
  roles: [
    "Full Stack Developer",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "NestJS Developer",
    "Software Engineer",
    "Backend Engineer",
  ],
  summary:
    "Full Stack Developer with 2.5+ years of experience building ERP, commerce, and CRM applications with React.js, Next.js, Node.js, NestJS, and TypeScript. Shipped 7+ production projects supporting 2K+ merchants and managing 6M+ customer records.",
};

export const stackLogos = [
  { name: "React", src: "/stack/react.svg" },
  { name: "Next.js", src: "/stack/nextjs.svg" },
  { name: "TypeScript", src: "/stack/typescript.svg" },
  { name: "Node.js", src: "/stack/nodejs.svg" },
  { name: "NestJS", src: "/stack/nestjs.svg" },
  { name: "MongoDB", src: "/stack/mongodb.svg" },
  { name: "AWS", src: "/stack/aws.svg" },
  { name: "Git", src: "/stack/git.svg" },
];

export const stats = [
  { label: "Years Experience", value: 2.5, suffix: "+", icon: "calendar", decimals: 1 },
  { label: "Major Projects Shipped", value: 7, suffix: "+", icon: "rocket", decimals: 0 },
  { label: "Monthly Active Users Served", value: 2, suffix: "M+", icon: "users", decimals: 0 },
  { label: "Customer Records Managed", value: 6, suffix: "M+", icon: "database", decimals: 0 },
  { label: "Manual Effort Automated", value: 70, suffix: "%", icon: "zap", decimals: 0 },
  { label: "Onboarding Time Reduced", value: 40, suffix: "%", icon: "gauge", decimals: 0 },
] as const;

export const stackOverview = {
  totalProjects: 30,
  totalProjectsLabel: "30+",
} as const;

export const careerTimeline = [
  {
    year: "2019",
    title: "Started B.E. in Electrical & Electronics",
    detail: "Anjalai Ammal Mahalingam Engineering College, where my interest in systems and problem solving really took shape.",
    icon: "graduation",
  },
  {
    year: "2022",
    title: "Frontend foundations and core programming",
    detail:
      "Focused first on React, Bootstrap, JavaScript, and C programming, while also exploring a little Node.js and Express through small practice builds.",
    icon: "code",
  },
  {
    year: "2023",
    title: "Completed B.E. EEE with 8.02 CGPA",
    detail:
      "Completed my B.E. in Electrical and Electronics Engineering with 8.02 CGPA, then joined the EduBridge full-stack developer course to learn Java, Spring Boot, Angular, Node.js, Express.js, Next.js, and NestJS.",
    icon: "award",
  },
  {
    year: "2024",
    title: "Joined Bytize Technology Solutions",
    detail:
      "Started shipping production ERP, commerce, CLM, CRM, billing, and ordering systems used by merchants at scale.",
    icon: "briefcase",
  },
  {
    year: "Now",
    title: "Full Stack Developer, 2.5+ years in",
    detail:
      "Working primarily in TypeScript across React, Next.js, Node.js, and NestJS, with a strong focus on production reliability and scalable business workflows.",
    icon: "rocket",
  },
] as const;

export const techProjectFootprint = {
  React: {
    projects: 6,
    label: "6+",
    note: "Used across ERP, commerce, CRM, billing, and ordering products.",
  },
  "Next.js": {
    projects: 8,
    label: "8+",
    note: "Applied in SSR storefronts, dashboards, and production-facing web apps.",
  },
  "Tailwind CSS": {
    projects: 10,
    label: "10+",
    note: "Used across 10+ projects to build responsive UI systems and production-ready components.",
  },
  TypeScript: {
    projects: 10,
    label: "10+",
    note: "Primary language across company builds and service-layer development.",
  },
  Angular: {
    projects: 5,
    label: "5+",
    note: "Used in company work and personal projects, including my tutorial platform.",
  },
  "Node.js": {
    projects: 8,
    label: "8+",
    note: "Used for APIs, business logic, integrations, and automation workflows.",
  },
  "Express.js": {
    projects: 8,
    label: "8+",
    note: "Part of my backend foundation before and alongside NestJS-based services.",
  },
  NestJS: {
    projects: 6,
    label: "6+",
    note: "Used for structured TypeScript backends, auth, and modular service design.",
  },
  MongoDB: {
    projects: 12,
    label: "12+",
    note: "Handled merchant, catalog, CRM, and loyalty data across production systems.",
  },
  MySQL: {
    projects: 10,
    label: "10+",
    note: "Used for reporting, transactional flows, and structured relational data.",
  },
  "AWS SQS": {
    projects: 5,
    label: "5+",
    note: "Used in 5+ projects for background jobs, async processing, and retry-based workflows.",
  },
  "XML Processing": {
    projects: 10,
    label: "10+",
    note: "Used across 10+ projects for import/export flows, structured document handling, and automation.",
  },
  Git: {
    projects: 50,
    label: "50+",
    note: "Used across 50+ company and personal projects for version control and collaboration.",
  },
  "Spring Boot": {
    projects: 5,
    label: "5+",
    note: "Used during full-stack training and project-based backend development.",
  },
  "Hibernate ORM": {
    projects: 5,
    label: "5+",
    note: "Used alongside Spring Boot to model relational data and CRUD workflows.",
  },
  "REST APIs": {
    projects: 10,
    label: "10+",
    note: "A constant across my work, from merchant systems to customer-facing products.",
  },
  "Google Maps API": {
    projects: 5,
    label: "5+",
    note: "Used in 5+ projects for address validation, geolocation workflows, and map-based business features.",
  },
  "JWT Auth": {
    projects: 8,
    label: "8+",
    note: "Implemented in both frontend and backend flows for secure business systems.",
  },
} as const;

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "JWT Auth"],
  },
  {
    id: "database",
    label: "Databases",
    skills: ["MongoDB", "MySQL", "Hibernate ORM"],
  },
  {
    id: "cloud",
    label: "Cloud & Tools",
    skills: ["AWS SQS", "XML Processing", "Git"],
  },
  {
    id: "other",
    label: "Also worked with",
    skills: ["Angular", "Spring Boot", "i18n", "Google Maps API"],
  },
];

export type ExperienceProject = {
  name: string;
  description: string;
  bullets: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
  images?: string[];
};

export const heroImages = [
  "/hero/bg-1.avif",
  "/hero/bg-3.avif",
  "/hero/bg-2.avif",
  "/hero/bg-4.avif",
  "/hero/bg-5.avif",
  "/hero/bg-6.avif",
];

export const experience = {
  company: "Bytize Technology Solutions",
  role: "Full Stack Developer (React.js / Node.js)",
  period: "Feb 2024 — Present",
  projects: [
    {
      name: "E-Commerce Platform",
      description:
        "A multi-merchant commerce platform built with React / Next.js on the frontend and Node.js / NestJS on the backend, supporting storefront, catalog, and order workflows at ERP scale.",
      bullets: [
        "Designed modular REST API services supporting commerce operations across 2K+ merchant accounts.",
        "Implemented a guest checkout flow, reducing cart abandonment by ~20%.",
        "Integrated Google Maps API for address validation and delivery workflow accuracy.",
        "Improved storefront performance using SSR and optimized API calls, cutting load time by ~30%.",
        "Modeled MongoDB collections with indexing and pagination for large product catalogs.",
      ],
      tech: ["React", "Next.js", "Node.js", "NestJS", "MongoDB", "Google Maps API"],
      metrics: [
        { label: "Merchants supported", value: "2K+" },
        { label: "Load time reduced", value: "30%" },
        { label: "Cart abandonment cut", value: "20%" },
      ],
      images: ["/projects/ecommerce-1.avif", "/projects/ecommerce-2.avif", "/projects/ecommerce-3.avif"],
    },
    {
      name: "CLM — Contract Lifecycle Management",
      description:
        "An enterprise-grade Contract Lifecycle Management system built with React and NestJS, automating document workflows and access control at scale.",
      bullets: [
        "Automated XML import/export workflows, reducing manual processing effort by 70%.",
        "Integrated AWS SQS for asynchronous background processing and retry handling.",
        "Designed workflow automation that reduced onboarding turnaround time by ~40%.",
        "Implemented JWT authentication and role-based access control using NestJS Guards.",
        "Developed type-safe backend services using TypeScript throughout NestJS.",
      ],
      tech: ["React", "NestJS", "AWS SQS", "TypeScript", "JWT / RBAC"],
      metrics: [
        { label: "Manual effort automated", value: "70%" },
        { label: "Onboarding time cut", value: "40%" },
      ],
      images: ["/projects/clm-1.avif", "/projects/clm-2.avif", "/projects/clm-3.avif"],
    },
    {
      name: "CRM System",
      description:
        "ERP-connected CRM and communication platform unifying SMS, Email, and WhatsApp touchpoints, with multi-language campaign and loyalty tooling for merchant growth.",
      bullets: [
        "Engineered customer lifecycle and communication modules (SMS, Email, WhatsApp).",
        "Implemented multi-language support using dynamic i18n configuration.",
        "Built campaign and loyalty workflows managing 6M+ customer records across merchant accounts.",
        "Optimized API response times by restructuring service layers and data access patterns.",
      ],
      tech: ["React", "Node.js", "i18n", "MongoDB"],
      metrics: [{ label: "Customer records handled", value: "6M+" }],
      images: ["/projects/crm-1.avif", "/projects/crm-2.avif", "/projects/crm-3.avif"],
    },
    {
      name: "ERP Merchant Operations Suite",
      description:
        "Merchant-side ERP workflows for onboarding, configuration, operations, and day-to-day account management across a growing business network.",
      bullets: [
        "Built merchant onboarding and configuration workflows used across distributed business accounts.",
        "Streamlined admin operations by structuring reusable React and TypeScript modules.",
        "Connected frontend actions to Node.js services for operational visibility and control.",
        "Supported ERP workflows used daily by teams managing live merchant operations.",
      ],
      tech: ["React", "TypeScript", "Node.js", "MongoDB"],
      metrics: [{ label: "Merchant accounts served", value: "2K+" }],
    },
    {
      name: "Billing & Payments Engine",
      description:
        "Billing and payments feature set for retail and hospitality clients, covering transaction validation, modifiers, and split-payment workflows.",
      bullets: [
        "Integrated Clover payment gateway with success and failure handling for live transactions.",
        "Improved billing module logic for modifiers and split payments, increasing checkout accuracy.",
        "Built reusable service flows for payment validation and downstream order updates.",
        "Worked across React and Node.js layers to keep checkout behavior reliable under production traffic.",
      ],
      tech: ["React", "Node.js", "TypeScript", "Clover API"],
      metrics: [],
    },
    {
      name: "QR & Kiosk Ordering Platform",
      description:
        "Self-service ordering experience for QR and kiosk channels with dynamic theming, menu controls, and smooth customer ordering flows.",
      bullets: [
        "Implemented QR and kiosk ordering journeys tailored to merchant branding needs.",
        "Built configurable theming and menu behavior for multiple merchant use cases.",
        "Connected customer ordering flows to backend services for live menu and cart handling.",
        "Helped ship responsive ordering experiences that fit both web and in-store contexts.",
      ],
      tech: ["React", "Next.js", "Node.js", "TypeScript"],
      metrics: [],
    },
    {
      name: "Tax & Invoice Reporting Automation",
      description:
        "Reporting and invoice generation tooling for finance workflows, giving teams consolidated tax visibility and cleaner billing output.",
      bullets: [
        "Built consolidated tax reporting views for finance and operations teams.",
        "Optimized invoice generation workflows for faster, more reliable billing output.",
        "Mapped reporting logic to business rules across merchant-specific billing cases.",
        "Supported data-heavy workflows where accuracy mattered as much as performance.",
      ],
      tech: ["React", "Node.js", "TypeScript", "MySQL"],
      metrics: [],
    },
  ] satisfies ExperienceProject[],
};

export const ownProjects = [
  {
    name: "Tutorials Management System",
    tagline: "Full-stack tutorial publishing platform",
    description:
      "A full-stack tutorial publishing platform built with Angular and Spring Boot, featuring role-based authentication and admin moderation workflows.",
    bullets: [
      "Developed full-stack tutorial publishing platform using Angular and Spring Boot.",
      "Implemented role-based authentication and admin moderation workflows.",
      "Designed REST APIs and MySQL schema using Hibernate ORM.",
      "Built CRUD operations with optimized query handling.",
    ],
    tech: ["Angular", "Spring Boot", "MySQL", "Hibernate ORM"],
    images: ["/projects/tutorials-1.avif", "/projects/tutorials-2.avif"],
  },
];

export const education = {
  degree: "Bachelor of Engineering — Electrical & Electronics Engineering",
  school: "Anjalai Ammal Mahalingam Engineering College",
  period: "Aug 2019 — Mar 2023",
  detail: "CGPA: 8.02",
};

export const services = [
  {
    title: "Backend Development",
    description: "Node.js & NestJS services with structured REST APIs, JWT/RBAC auth, and production business workflow handling.",
  },
  {
    title: "Frontend Engineering",
    description: "React & Next.js applications with SSR, performant data fetching, and polished ERP-friendly interfaces.",
  },
  {
    title: "API & Architecture",
    description: "Modular REST API design, schema modeling, and service-layer restructuring for merchant-scale systems.",
  },
  {
    title: "Performance Optimization",
    description: "Load-time reduction, query indexing, and pagination strategies for products handling large operational datasets.",
  },
];
