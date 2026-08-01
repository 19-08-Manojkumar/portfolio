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
    "Full Stack Developer with 2+ years of experience building scalable web applications using React.js and Node.js. Experienced in Next.js (SSR) and NestJS for structured backend architecture. Strong expertise in REST APIs, MongoDB indexing, TypeScript, authentication (JWT/RBAC), and performance optimization.",
};

export const stats = [
  { label: "Years Experience", value: 2, suffix: "+", icon: "calendar" },
  { label: "Major Projects Shipped", value: 4, suffix: "", icon: "rocket" },
  { label: "Monthly Active Users Served", value: 5, suffix: "K+", icon: "users" },
  { label: "Customer Records Managed", value: 10, suffix: "K+", icon: "database" },
  { label: "Manual Effort Automated", value: 70, suffix: "%", icon: "zap" },
  { label: "Onboarding Time Reduced", value: 40, suffix: "%", icon: "gauge" },
] as const;

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
        "A scalable e-commerce platform built with React / Next.js on the frontend and Node.js / NestJS on the backend, serving thousands of active monthly users.",
      bullets: [
        "Designed a modular REST API architecture serving 5K+ monthly active users.",
        "Implemented a guest checkout flow, reducing cart abandonment by ~20%.",
        "Integrated Google Maps API for location validation and optimized delivery routing.",
        "Improved page performance using SSR and optimized API calls, cutting load time by ~30%.",
        "Designed the MongoDB schema with indexing and pagination for efficient product queries.",
      ],
      tech: ["React", "Next.js", "Node.js", "NestJS", "MongoDB", "Google Maps API"],
      metrics: [
        { label: "Monthly active users", value: "5K+" },
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
        "Customer lifecycle and communication platform unifying SMS, Email and WhatsApp touchpoints, with multi-language campaign and loyalty tooling.",
      bullets: [
        "Engineered customer lifecycle and communication modules (SMS, Email, WhatsApp).",
        "Implemented multi-language support using dynamic i18n configuration.",
        "Built campaign and loyalty modules handling 10K+ customer records.",
        "Optimized API response times by restructuring service layers and DB queries.",
      ],
      tech: ["React", "Node.js", "i18n", "MongoDB"],
      metrics: [{ label: "Customer records handled", value: "10K+" }],
      images: ["/projects/crm-1.avif", "/projects/crm-2.avif", "/projects/crm-3.avif"],
    },
    {
      name: "Other Projects — Billing, Payments & Ordering",
      description:
        "A cluster of point-of-sale features spanning payments, ordering and billing accuracy for retail and hospitality clients.",
      bullets: [
        "Integrated Clover payment gateway with success/failure handling and transaction validation.",
        "Implemented QR and Kiosk ordering features with dynamic theming.",
        "Built consolidated tax reports and optimized invoice generation workflows.",
        "Improved billing module logic (modifiers, split payments), enhancing checkout accuracy.",
      ],
      tech: ["React", "Node.js", "Clover API"],
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
    description: "Node.js & NestJS services with structured REST APIs, JWT/RBAC auth and background job processing.",
  },
  {
    title: "Frontend Engineering",
    description: "React & Next.js applications with SSR, performant data fetching, and polished UI.",
  },
  {
    title: "API & Architecture",
    description: "Modular REST API design, schema modeling, and service-layer restructuring for scale.",
  },
  {
    title: "Performance Optimization",
    description: "Load-time reduction, query indexing, and pagination strategies for high-traffic products.",
  },
];
