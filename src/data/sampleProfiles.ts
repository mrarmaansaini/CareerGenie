import { UserResumeProfile } from '../types/career';

export const SAMPLE_PROFILES: UserResumeProfile[] = [
  {
    id: 'profile-aarav',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma26@gmail.com',
    phone: '+91 98765 43210',
    college: 'Vellore Institute of Technology (VIT Vellore)',
    degree: 'B.Tech in Computer Science & Engineering',
    graduationYear: '2026',
    cgpa: '8.85 / 10.0',
    targetRoles: ['Frontend Developer Intern', 'React Engineer', 'Full Stack Trainee'],
    locationPreference: 'Bengaluru / Hyderabad / Remote India',
    skills: {
      technical: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Redux Toolkit', 'TailwindCSS', 'REST APIs', 'HTML5/CSS3', 'Git'],
      soft: ['Clear Technical Communication', 'Agile Teamwork', 'Fast Conceptual Learning', 'Problem Solving'],
      tools: ['VS Code', 'GitHub', 'Figma', 'Postman', 'Vercel', 'Chrome DevTools'],
      frameworks: ['React', 'Next.js (Basics)', 'Express.js', 'TailwindCSS']
    },
    projects: [
      {
        title: 'DevPulse - Real-time Collaborative Workspace',
        techStack: ['React', 'TypeScript', 'TailwindCSS', 'Firebase', 'Zustand'],
        description: 'Engineered a multi-user kanban board and markdown document editor with optimistic state updates, reducing sync delay to <120ms.',
        githubUrl: 'https://github.com/aarav-sharma/devpulse',
        liveUrl: 'https://devpulse-demo.vercel.app'
      },
      {
        title: 'FinMetrics - Indian Stock & Crypto Analytics Web App',
        techStack: ['React', 'Chart.js', 'REST APIs', 'TailwindCSS'],
        description: 'Built financial portfolio tracking dashboard with real-time price alerts, interactive candlestick charts, and PnL calculation.',
        githubUrl: 'https://github.com/aarav-sharma/finmetrics'
      }
    ],
    experience: [
      {
        company: 'CodeCraft Innovation Lab',
        role: 'Frontend Engineering Intern',
        duration: 'June 2025 - August 2025 (3 months)',
        highlights: [
          'Developed 8 responsive web pages using React and TailwindCSS, reducing bounce rate by 24%',
          'Refactored legacy state management with Redux Toolkit, decreasing bundle load time by 18%',
          'Collaborated in daily standups and code reviews with senior engineering mentors'
        ]
      }
    ],
    certifications: [
      'Meta Front-End Developer Professional Certificate (Coursera)',
      'HackerRank Problem Solving (Intermediate) Gold Badge'
    ],
    summary: 'Driven 3rd-year CS student passionate about building silky-smooth, responsive user interfaces and scalable web applications. Strong foundations in React, TypeScript, and modern state architectures.',
    rawText: `Aarav Sharma
aarav.sharma26@gmail.com | +91 98765 43210 | Bengaluru, India | github.com/aarav-sharma

EDUCATION
Vellore Institute of Technology (VIT Vellore)
B.Tech in Computer Science & Engineering (2022 - 2026) | CGPA: 8.85 / 10.0

SKILLS
Technical: JavaScript (ES6+), TypeScript, React.js, Redux Toolkit, TailwindCSS, REST APIs, HTML5/CSS3, Git
Frameworks: React, Next.js (Basics), Express.js
Tools: VS Code, GitHub, Postman, Figma, Vercel

PROJECTS
DevPulse - Real-time Collaborative Workspace (React, TypeScript, TailwindCSS, Firebase)
- Engineered real-time kanban board and collaborative notes with optimistic state updates.
- Integrated WebSocket sync and responsive mobile layouts with 98+ Lighthouse score.

FinMetrics - Indian Stock & Crypto Analytics (React, Chart.js, REST APIs)
- Built live dashboard tracking NSE/BSE tickers with candlestick charts and portfolio calculations.

EXPERIENCE
CodeCraft Innovation Lab — Frontend Engineering Intern (June 2025 - August 2025)
- Developed 8 responsive web modules, reducing user bounce rate by 24%.
- Collaborated with senior engineers to optimize frontend bundle sizes by 18%.`
  },
  {
    id: 'profile-priya',
    fullName: 'Priya Patel',
    email: 'priya.patel.ai@gmail.com',
    phone: '+91 98111 22334',
    college: 'Indian Institute of Information Technology (IIIT Hyderabad)',
    degree: 'B.Tech in Computer Science & Artificial Intelligence',
    graduationYear: '2026',
    cgpa: '9.1 / 10.0',
    targetRoles: ['AI/ML Intern', 'Data Science Trainee', 'GenAI Engineer Intern'],
    locationPreference: 'Bengaluru / Hyderabad / Remote India',
    skills: {
      technical: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'OpenAI/Gemini APIs', 'SQL', 'FastAPI', 'Pandas', 'NumPy'],
      soft: ['Research Aptitude', 'Critical Analysis', 'Technical Paper Reading', 'Experimentation'],
      tools: ['Jupyter Notebooks', 'Git', 'Docker', 'Weights & Biases', 'Hugging Face', 'Linux'],
      frameworks: ['PyTorch', 'FastAPI', 'LangChain', 'Streamlit']
    },
    projects: [
      {
        title: 'LegalGenie - Indian Legal Document Summarizer with RAG',
        techStack: ['Python', 'LangChain', 'ChromaDB', 'Gemini API', 'FastAPI'],
        description: 'Implemented retrieval-augmented generation (RAG) over 500+ Indian Supreme Court judgments with semantic citations and cosine ranking.',
        githubUrl: 'https://github.com/priya-patel/legalgenie'
      },
      {
        title: 'MedVision - Pneumonia Detection from Chest X-Rays',
        techStack: ['PyTorch', 'CNN', 'Transfer Learning', 'Flask'],
        description: 'Trained ResNet-50 model achieving 94.6% F1-score on public medical imaging dataset with Grad-CAM visual heatmaps.',
        githubUrl: 'https://github.com/priya-patel/medvision'
      }
    ],
    experience: [
      {
        company: 'AI Centre of Excellence, IIIT',
        role: 'Undergraduate Research Assistant',
        duration: 'Jan 2025 - Present',
        highlights: [
          'Evaluated LLM reasoning benchmarks across low-resource Indic languages',
          'Authored comprehensive evaluation notebooks and co-authored workshop paper draft'
        ]
      }
    ],
    certifications: [
      'DeepLearning.AI - Deep Learning Specialization (Andrew Ng)',
      'Google Cloud Certified Associate Cloud Engineer'
    ],
    summary: 'AI/ML enthusiast focused on agentic LLM systems, multimodal architectures, and production retrieval pipelines. Committed to building practical AI tools for Indian students and communities.',
    rawText: `Priya Patel
priya.patel.ai@gmail.com | +91 98111 22334 | Hyderabad, India

EDUCATION
IIIT Hyderabad — B.Tech in Computer Science & AI (2022 - 2026) | CGPA: 9.1 / 10.0

SKILLS
Languages: Python, SQL, C++
AI & ML: PyTorch, TensorFlow, Scikit-learn, LangChain, Gemini API, RAG, Vector DBs
Backend & Tools: FastAPI, Docker, Git, Hugging Face, Linux

PROJECTS
LegalGenie - Indian Legal Document Summarizer (LangChain, ChromaDB, Gemini, FastAPI)
- Built high-accuracy RAG pipeline with semantic chunking and source grounding.
MedVision - Chest X-Ray Diagnosis with Deep Learning (PyTorch, ResNet-50, 94.6% F1-Score)`
  }
];
