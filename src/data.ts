import { Github, Linkedin, Mail, Terminal, Cpu, Database, Cloud, Code, Brain, Shield, TrendingUp } from "lucide-react";

export const PROFILE = {
  name: "Ayush Raj",
  title: "AI/ML Engineer • LLM & MLOps Developer",
  tagline: "Building scalable, production-grade AI systems and autonomous agents.",
  location: "Bhubaneswar, India",
  email: "ayushraj2005.muz@gmail.com",
  phone: "+91 7992494188",
  social: {
    github: "https://github.com/Ayushhgit",
    linkedin: "https://www.linkedin.com/in/ayush-raj-29nov/",
  },
  roles: ["AI/ML Engineer", "LLM & RAG Developer", "MLOps & Backend Engineer"],
};

export const ABOUT = {
  description:  "B.Tech Computer Science student at KIIT University (CGPA 9.58/10) focused on building real-world AI/ML and LLM systems. I work across the stack—data pipelines, model training, evaluation, and deployment—using modern MLOps practices on AWS. My interests include RAG systems, autonomous agents, and network security models that are not only accurate in notebooks but robust, observable, and scalable in production.",
};

export const EXPERIENCE = [
  {
    id: 1,
    company: "Ama Earth Group",
    role: "AI-Native Software Engineering Intern",
    period: "Oct 2025 – Nov 2025",
    type: "Remote",
    achievements: [
      "Designed a centralized prompting + schema-validation framework for all LLM API calls, improving output consistency by ~60%.",
      "Built hallucination-mitigation safety pipeline reducing malformed/unsafe LLM responses by ~90%.",
      "Engineered a self-learning module comparing AI-generated vs consultant-edited reports.",
      "Implemented reliability/security workflows (SQL injection mitigation, rollback versioning), cutting critical failures by ~80%."
    ]
  },
  {
    id: 2,
    company: "Daya Consultancy Services",
    role: "Software Developer Intern",
    period: "Jul 2025 – Oct 2025",
    type: "Hybrid",
    achievements: [
      "Built a full-stack application for a bike showroom using React, Node/Express, and MongoDB; developed 10+ REST APIs for catalog management, customer inquiries, and admin workflows.",
      "Automated inquiry responses via SMTP/Nodemailer; modularized React components to improve UI load speed and frontend performance.",
      "Deployed a scalable web service on Render; implemented JWT authentication, bcrypt hashing, and input validation with rate limiting for enhanced security and reliability."
    ]
  }
];

export const PROJECTS = [
  {
    id: 1,
    title: "KwixLab",
    subtitle: "LLM-powered AI Productivity Platform",
    description: "Full-stack RAG & tools platform with 12+ utilities, serving 200+ users. Features auth, payments, and async processing.",
    tags: ["React.js", "Python", "GPT-4", "LangChain", "AWS", "Docker"],
    links: {
      live: "https://kwixlab.com",
      github: null // Private or not listed
    },
    icon: Brain
  },
  {
    id: 2,
    title: "Network Threat Detection",
    subtitle: "MLOps Pipeline on AWS",
    description: "End-to-end MLOps pipeline using XGBoost with ~92% accuracy on NSL-KDD. Deployed via Docker/ECR on AWS.",
    tags: ["Python", "XGBoost", "MLflow", "Docker", "AWS", "GitHub Actions"],
    links: {
      live: null,
      github: "https://github.com/Ayushhgit/NetworkSecurity"
    },
    icon: Shield
  },
  {
    id: 3,
    title: "Nexus.ai",
    subtitle: "Autonomous Multi-Agent System",
    description: "Multi-agent document AI with shared memory and tool routing. ~95%+ classification accuracy across complex formats.",
    tags: ["LangChain", "FastAPI", "Groq", "Redis", "Multi-Agent"],
    links: {
      live: null,
      github: "https://github.com/Ayushhgit/Multi-Format-Autonomous-AI-System"
    },
    icon: Terminal
  },
  {
    id: 4,
    title: "Amazon ML Challenge 2025",
    subtitle: "Multimodal Product Price Prediction",
    description: "End-to-end multimodal ML pipeline fusing text (TF-IDF) and image features (EfficientNet-B0) to predict product prices. Achieved ~49.40% SMAPE using LightGBM with advanced feature engineering.",
    tags: ["Python", "LightGBM", "EfficientNet", "Pandas", "Computer Vision"],
    links: {
      live: null,
      github: "https://github.com/Ayushhgit/price-prediction-multimodal"
    },
    icon: TrendingUp
  }
];

export const SKILLS = [
  {
    category: "Languages",
    items: ["Python", "SQL", "Bash", "Java", "JavaScript", "C/C++"],
    icon: Code
  },
  {
    category: "ML & GenAI",
    items: ["LLM Apps (LangChain)", "RAG", "Transformers", "NLP", "XGBoost", "Whisper", "PyTorch", "TensorFlow"],
    icon: Brain
  },
  {
    category: "MLOps & Infra",
    items: ["Docker", "MLflow", "GitHub Actions", "AWS (EC2, S3, ECR)", "Linux", "Redis", "Nginx"],
    icon: Cloud
  },
  {
    category: "Data & Storage",
    items: ["PostgreSQL", "MySQL", "MongoDB", "FAISS", "Weaviate"],
    icon: Database
  },
  {
    category: "Full Stack",
    items: ["FastAPI", "Node.js", "React.js", "Firebase", "REST APIs"],
    icon: Cpu
  }
];

export const EDUCATION = [
  {
    institution: "Kalinga Institute of Industrial Technology (KIIT)",
    degree: "B.Tech in Computer Science Engineering",
    score: "CGPA: 9.58/10",
    coursework: "DSA, OS, DBMS, Machine Learning, Data Mining, Probability & Statistics."
  }
];

export const CERTIFICATIONS = [
  "Complete Data Science, Machine Learning, Deep Learning & NLP Bootcamp – Udemy",
  "AWS Academy Graduate – Machine Learning"
];
