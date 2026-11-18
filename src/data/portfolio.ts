export const profile = {
  name: "Jisna P J",
  firstName: "Jisna",
  email: "helenjisna@gmail.com",
  github: "https://github.com/Leora143",
  githubLabel: "github.com/Leora143",
  location: "Ernakulam, Kerala, India",
  photo: "/profile.svg",
  photoAlt: "Portrait of Jisna",
  resume: "/Jisna_P_J_React_Developer_Resume.pdf",
} as const;

export interface SkillGroup {
  title: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "JavaScript (ES6+)",
      "TypeScript (basics)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Vite",
      "React Hooks",
      "React Router",
      "TanStack Router",
      "TanStack Query",
      "TanStack Form",
      "Context API",
      "Responsive design",
    ],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "Hono", "Bun", "REST APIs", "Axios", "Fetch API", "JWT auth", "Postman"],
  },
  {
    title: "Databases",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "MySQL", "SQL", "Prisma", "Redis"],
  },
  {
    title: "Languages",
    items: ["JavaScript", "TypeScript (basics)", "Python", "PHP", "SQL"],
  },
  {
    title: "AI & Security",
    items: [
      "OpenAI API",
      "AI-assisted development",
      "SIEM monitoring",
      "Log analysis",
      "Penetration testing",
      "Ethical hacking",
    ],
  },
  {
    title: "Workflow",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "npm",
      "Linux (basics)",
      "Debugging",
      "Testing",
      "Deployment",
      "Agile",
      "Technical documentation",
    ],
  },
];

export interface Episode {
  no: string;
  title: string;
  text: string;
}

export const experience = {
  role: "Full Stack Developer Intern",
  company: "Varsha Info Services Inc.",
  period: "Apr 2026 – Sep 2026",
  highlights: [
    "Built reusable React components and responsive interfaces across multiple product features.",
    "Integrated REST APIs between the frontend and backend and implemented CRUD functionality.",
    "Debugged, tested and improved performance while collaborating through Git and GitHub.",
  ],
  episodes: [
    {
      no: "01",
      title: "Dictation Race",
      text: "Built the frontend and backend, including API development, backend integration and OpenAI API functionality.",
    },
    {
      no: "02",
      title: "Writing",
      text: "Contributed to the frontend and integrated AI-assisted evaluation that shows users an AI-generated score and review.",
    },
    {
      no: "03",
      title: "Listening",
      text: "Implemented the frontend and contributed to UI and design work.",
    },
    {
      no: "04",
      title: "Fill the Form",
      text: "Worked on both the frontend and backend implementation.",
    },
  ] as Episode[],
  stack: [
    "React.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Hono",
    "Prisma",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Bun",
    "TanStack Router",
    "TanStack Query",
    "TanStack Form",
    "OpenAI API",
  ],
};

export const earlierExperience = {
  role: "Cybersecurity Intern",
  company: "Elevance Skills",
  text: "Practical exposure to SIEM monitoring, log analysis and cybersecurity fundamentals.",
};

export interface Project {
  title: string;
  text: string;
  tags: string[];
  demo?: string;
  code?: string;
}

export const projects: Project[] = [
  {
    title: "Dress Shopping Web App",
    text: "A full-stack e-commerce app for browsing and managing dress products, with responsive interfaces, REST API integration and CRUD workflows.",
    tags: ["React.js", "Node.js", "Express.js"],
  },
  {
    title: "Event Management System (MERN)",
    text: "A full-stack event management app with database operations and frontend and backend API integration, deployed for real-world access and testing.",
    tags: ["MongoDB", "Express.js", "React.js", "Node.js"],
  },
  {
    title: "Event Management System (PHP)",
    text: "A web-based app for managing events and user interactions, with MySQL database operations.",
    tags: ["JavaScript", "PHP", "MySQL"],
  },
  {
    title: "Organ Donation Management System",
    text: "An application for managing donor and recipient information, with record keeping that improves data accessibility.",
    tags: ["Python"],
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  school: "MES T.O. Abdulla Memorial College, Kunukara, Aluva",
  period: "2022 – 2025",
  grade: "CGPA 7.18",
  coursework: [
    "Data Structures",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Web Development",
  ],
};

export const certifications = [
  { title: "MERN Stack Development", issuer: "Avodha" },
  { title: "Ethical Hacking", issuer: "Avodha" },
  { title: "Certified Penetration Tester", issuer: "Red Team Academy" },
  { title: "Microsoft Office Suite Certification", issuer: "G-Tec Educational Institution" },
];
