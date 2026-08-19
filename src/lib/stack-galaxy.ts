import {
  experience,
  ownProjects,
  skillGroups,
  techProjectFootprint,
  type ExperienceProject,
} from "@/lib/data";

type ProjectLike = ExperienceProject | (typeof ownProjects)[number];

export type StackGalaxyTool = {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  accent: string;
  orbit: number;
  size: number;
  projectCount: number;
  projectCountLabel: string;
  projects: string[];
  area: string;
  experienceNote?: string;
};

export type StackGalaxyGroup = {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  accent: string;
  glow: string;
  tools: StackGalaxyTool[];
  projectCount: number;
  projectCountLabel: string;
};

const TOOL_LOGOS: Record<string, string> = {
  Angular: "/stack/angular.png",
  "React.js": "/stack/react.svg",
  React: "/stack/react.svg",
  "Next.js": "/stack/nextjs.svg",
  "Tailwind CSS": "/stack/tailwindcss.png",
  TypeScript: "/stack/typescript.svg",
  "Node.js": "/stack/nodejs.svg",
  NestJS: "/stack/nestjs.svg",
  "Express.js": "/stack/express.png",
  "REST APIs": "/stack/restapi.png",
  "JWT Auth": "/stack/jwtauth.jpeg",
  MongoDB: "/stack/mongodb.svg",
  MySQL: "/stack/mysql.png",
  "Hibernate ORM": "/stack/hybernateorm.png",
  "AWS SQS": "/stack/aws.svg",
  "XML Processing": "/stack/xmlprocessing.jpeg",
  Git: "/stack/git.svg",
  "Spring Boot": "/stack/springboot.png",
  i18n: "/stack/i18n.jpeg",
  "Google Maps API": "/stack/googlemapapi.jpeg",
};

const GROUP_META: Record<
  string,
  {
    eyebrow: string;
    description: string;
    accent: string;
    glow: string;
  }
> = {
  frontend: {
    eyebrow: "UI constellation",
    description:
      "Interactive interfaces, typed components, and product polish orbit around this system.",
    accent: "#d98a4b",
    glow: "#f0b184",
  },
  backend: {
    eyebrow: "Service core",
    description:
      "APIs, auth, and application logic stay in motion here as the engine behind the frontend.",
    accent: "#7fdcc0",
    glow: "#b6f1dd",
  },
  database: {
    eyebrow: "Data gravity",
    description:
      "Schemas, query design, and persistence layers hold the rest of the stack together.",
    accent: "#a599e9",
    glow: "#c8bff6",
  },
  cloud: {
    eyebrow: "Infra orbit",
    description:
      "Queues, tooling, and deployment-minded utilities keep delivery stable at scale.",
    accent: "#74b8ff",
    glow: "#a8d3ff",
  },
  other: {
    eyebrow: "Adjacent systems",
    description:
      "The extra tools and ecosystems I have already shipped with beyond my main daily stack.",
    accent: "#f07f99",
    glow: "#f7adc1",
  },
};

function normalizeTech(value: string) {
  return value.toLowerCase().replace(/\.?js\b/g, "").replace(/[^a-z0-9]/g, "");
}

function isMatchingTech(skill: string, technology: string) {
  const left = normalizeTech(skill);
  const right = normalizeTech(technology);
  return left === right || left.startsWith(right) || right.startsWith(left);
}

function makeId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function shortName(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/\b(Authentication|Processing|Management)\b/gi, "")
    .trim();
}

function relatedProjects(skill: string, projects: ProjectLike[]) {
  return projects.filter((project) => project.tech.some((technology) => isMatchingTech(skill, technology)));
}

const allProjects = [...experience.projects, ...ownProjects];
const FOOTPRINT_OVERRIDES = new Map(
  Object.entries(techProjectFootprint).map(([name, value]) => [normalizeTech(name), value])
);

export const stackGalaxyGroups: StackGalaxyGroup[] = skillGroups.map((group, groupIndex) => {
  const meta = GROUP_META[group.id] ?? GROUP_META.frontend;
  const tools = group.skills.map((skill, skillIndex) => {
    const matches = relatedProjects(skill, allProjects);
    const override = FOOTPRINT_OVERRIDES.get(normalizeTech(skill));
    const projectCount = override?.projects ?? matches.length;

    return {
      id: makeId(`${group.id}-${skill}`),
      name: skill,
      shortName: shortName(skill),
      logo: TOOL_LOGOS[skill],
      accent: meta.accent,
      orbit: 1.4 + Math.floor(skillIndex / 3) * 0.7 + (skillIndex % 3) * 0.16,
      size: 0.22 + ((skillIndex + groupIndex) % 3) * 0.05,
      projectCount,
      projectCountLabel: override?.label ?? `${matches.length}`,
      projects: matches.map((project) => project.name),
      area: group.label,
      experienceNote: override?.note,
    };
  });

  const dominantTool = tools.reduce<(typeof tools)[number] | null>(
    (current, tool) => (current === null || tool.projectCount > current.projectCount ? tool : current),
    null
  );
  const projectCount = dominantTool?.projectCount ?? 0;

  return {
    id: group.id,
    label: group.label,
    eyebrow: meta.eyebrow,
    description: meta.description,
    accent: meta.accent,
    glow: meta.glow,
    tools,
    projectCount,
    projectCountLabel: dominantTool?.projectCountLabel ?? "0",
  };
});
