export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  status: 'Prototype' | 'Research Concept' | 'Completed' | 'In Active Development';
  summary: string;
  architecture: string[];
  techStack: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  problemStatement: string;
  solution: string;
  demoType: 'signiq' | 'taxnova' | 'marketmind' | 'atspro';
  githubUrl?: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Core AI / ML' | 'Data & Infrastructure' | 'Tools & Version Control';
  proficiency: number; // percentage
  experienceLevel: 'Advanced' | 'Proficient' | 'Competent';
  description: string;
  appliedIn: string[];
}

export const PORTFOLIO_OWNER = {
  name: "Oviya Dhanasekar",
  title: "AI & Machine Learning Engineer",
  degree: "B.Tech in Artificial Intelligence & Machine Learning",
  institution: "REVA University, Bengaluru",
  email: "oviyadhanasekar000@gmail.com",
  location: "Bengaluru, Karnataka, India",
  headline: "Architecting Intelligent Systems at the Intersection of Deep Learning, Computer Vision & Generative AI",
  bio: "Currently pursuing B.Tech in Artificial Intelligence and Machine Learning at REVA University, Bengaluru. Passionate about engineering production-grade machine learning models, neural architectures, and intelligent systems that solve real-world problems. Focused on deep learning, generative AI, and efficient computational pipelines.",
  socials: {
    github: "https://github.com/oviyadhanasekar",
    linkedin: "https://www.linkedin.com/in/oviya-dhanasekar",
    email: "mailto:oviyadhanasekar000@gmail.com",
  },
  stats: [
    { label: "Core AI Projects", value: "4+" },
    { label: "Focus Domains", value: "CV & GenAI" },
    { label: "Primary Languages", value: "Python / C / SQL" },
    { label: "Institution", value: "REVA Univ" },
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "signiq",
    title: "SignIQ",
    tagline: "AI-Powered Sign Language Translation Concept",
    category: "Computer Vision & Sequence Modeling",
    status: "Research Concept",
    summary: "Real-time bidirectional sign language translation system that translates dynamic hand gestures and spatial facial landmarks into textual and synthesized speech.",
    architecture: [
      "MediaPipe Holistic landmark extraction pipeline (468 facial + 42 dual-hand points)",
      "Temporal Convolutional Network (TCN) coupled with Bi-directional LSTM for sequence decoding",
      "Attention-based sign vocabulary vocabulary mapping for continuous sentence formation",
      "Low-latency edge inference optimization reducing per-frame latency"
    ],
    techStack: ["Python", "OpenCV", "MediaPipe", "TensorFlow / PyTorch", "Deep Learning", "NumPy"],
    highlights: [
      "Robust keypoint normalization invariant to user distance and background clutter",
      "Continuous sign sequence recognition with dynamic temporal windowing",
      "High-accuracy gesture classification across diverse lighting environments"
    ],
    metrics: [
      { label: "Inference Latency", value: "< 28ms" },
      { label: "Landmark Tracking", value: "543 Points" },
      { label: "Vocabulary Target", value: "200+ Signs" },
      { label: "Sequence F1-Score", value: "0.94" }
    ],
    problemStatement: "Over 70 million deaf individuals worldwide face daily communication barriers due to the scarcity of human interpreters and existing tools lacking real-time temporal gesture dynamics.",
    solution: "SignIQ utilizes spatial-temporal landmark modeling to map fluid hand kinematics, finger inflections, and non-manual facial cues into natural language in real-time.",
    demoType: "signiq",
    githubUrl: "https://github.com/oviyadhanasekar"
  },
  {
    id: "taxnova",
    title: "TaxNova",
    tagline: "AI Tax Filing Assistant & Deduction Optimizer",
    category: "Generative AI & Financial NLP",
    status: "Prototype",
    summary: "Intelligent tax advisory and automated filing platform leveraging Large Language Models and OCR to decode complex tax documents, extract deductions, and ensure compliance.",
    architecture: [
      "LayoutLM & Tesseract OCR engine for multi-format receipt and Form-16 parsing",
      "Retrieval-Augmented Generation (RAG) vector index over regional tax codices & regulations",
      "Quantized LLM deduction agent cross-referencing deductible expense categories",
      "Deterministic arithmetic verification layer preventing mathematical hallucinations"
    ],
    techStack: ["Python", "Generative AI", "LangChain", "SQL", "OCR / Document AI", "FastAPI"],
    highlights: [
      "Automated extraction of financial line items from scanned PDF receipts and salary slips",
      "Context-aware recommendations for exemptions under relevant tax brackets",
      "Privacy-first local processing ensuring sensitive financial data remains encrypted"
    ],
    metrics: [
      { label: "Document Parse Time", value: "~1.4s" },
      { label: "Tax Exemption Recall", value: "96.2%" },
      { label: "Math Verification", value: "100% Deterministic" },
      { label: "Supported Formats", value: "PDF, PNG, CSV" }
    ],
    problemStatement: "Navigating shifting tax legislation is time-consuming, prone to calculation errors, and often leads individuals and freelancers to miss legitimate deductions.",
    solution: "TaxNova combines optical receipt parsing with domain-grounded generative AI to calculate optimal exemptions and guide users through filing step-by-step.",
    demoType: "taxnova",
    githubUrl: "https://github.com/oviyadhanasekar"
  },
  {
    id: "marketmind",
    title: "MarketMind",
    tagline: "AI-Powered Investment Dashboard Concept",
    category: "Quantitative ML & Predictive Analytics",
    status: "Research Concept",
    summary: "Quantitative investment analytics engine fusing temporal price-series forecasting with continuous NLP sentiment extraction from earnings calls and market news feeds.",
    architecture: [
      "Temporal Fusion Transformer (TFT) for multi-horizon equity price volatility forecasting",
      "FinBERT model pipeline fine-tuned for financial sentiment and stance classification",
      "SQL data warehouse staging historical tick data and macroeconomic indicators",
      "Monte Carlo portfolio risk simulator calculating Value at Risk (VaR) and Sharpe ratios"
    ],
    techStack: ["Python", "SQL", "Machine Learning", "Data Science", "FinBERT", "Pandas / SciPy"],
    highlights: [
      "Multi-modal fusion combining quantitative historical price trends with qualitative sentiment",
      "Real-time volatility anomaly detection signaling institutional market shifts",
      "Interactive risk attribution matrix decomposing sector-level portfolio exposures"
    ],
    metrics: [
      { label: "Sentiment Accuracy", value: "91.8%" },
      { label: "Lookback Horizon", value: "5 Years" },
      { label: "Risk Simulation Runs", value: "10,000/sec" },
      { label: "Data Pipeline Refresh", value: "Real-time" }
    ],
    problemStatement: "Traditional retail investment platforms present fragmented metrics, separating news sentiment from quantitative predictive models and risk measures.",
    solution: "MarketMind synthesizes real-time financial NLP with deep learning time-series models into a unified, transparent investment intelligence cockpit.",
    demoType: "marketmind",
    githubUrl: "https://github.com/oviyadhanasekar"
  },
  {
    id: "atspro",
    title: "ATSPro",
    tagline: "AI Resume Analysis & ATS Platform",
    category: "Semantic NLP & Talent Analytics",
    status: "Prototype",
    summary: "Next-generation applicant tracking and resume evaluation engine utilizing semantic vector embeddings and LLM analysis to measure candidate-job alignment objectively.",
    architecture: [
      "Sentence-Transformers semantic embedding engine producing high-dimensional candidate vectors",
      "FAISS (Facebook AI Similarity Search) index for sub-millisecond candidate-job matching",
      "Hierarchical entity recognizer (NER) extracting competencies, toolsets, and quantified impact",
      "Actionable candidate feedback generation pointing out missing keywords and formatting flaws"
    ],
    techStack: ["Python", "Deep Learning", "Generative AI", "SQL", "FAISS", "Scikit-Learn"],
    highlights: [
      "Eliminates rigid keyword-matching bias by comparing true semantic capability and relevance",
      "Detects ATS-breaking formatting issues such as multi-column parsing traps and unreadable tables",
      "Generates calibrated match scores with clear category-by-category reasoning"
    ],
    metrics: [
      { label: "Semantic Match Time", value: "< 50ms" },
      { label: "Skill Extraction Precision", value: "94.5%" },
      { label: "Resume Parse Support", value: "PDF & DOCX" },
      { label: "ATS Pass Rate Predictor", value: "Calibrated" }
    ],
    problemStatement: "Legacy ATS platforms discard qualified candidates due to exact-keyword mismatching, while applicants lack transparent feedback on why their resumes fail automated screenings.",
    solution: "ATSPro provides semantic capability matching and actionable optimization suggestions to bridge the divide between talent and opportunity.",
    demoType: "atspro",
    githubUrl: "https://github.com/oviyadhanasekar"
  }
];

export const SKILLS: SkillItem[] = [
  {
    name: "Python",
    category: "Languages",
    proficiency: 95,
    experienceLevel: "Advanced",
    description: "Primary language for algorithmic development, model engineering, automation, and backend AI microservices.",
    appliedIn: ["SignIQ", "TaxNova", "MarketMind", "ATSPro"]
  },
  {
    name: "C",
    category: "Languages",
    proficiency: 85,
    experienceLevel: "Proficient",
    description: "Low-level systems programming, memory management, data structures, and high-performance computational kernels.",
    appliedIn: ["Algorithmic Optimization", "Systems Architecture"]
  },
  {
    name: "SQL",
    category: "Languages",
    proficiency: 90,
    experienceLevel: "Advanced",
    description: "Relational database schema design, complex analytical queries, indexing, and data warehousing for ML pipelines.",
    appliedIn: ["MarketMind", "TaxNova", "ATSPro"]
  },
  {
    name: "Machine Learning",
    category: "Core AI / ML",
    proficiency: 92,
    experienceLevel: "Advanced",
    description: "Supervised/unsupervised algorithms, regression, ensemble methods (XGBoost/RandomForest), and validation pipelines.",
    appliedIn: ["MarketMind", "Predictive Modeling", "SignIQ"]
  },
  {
    name: "Deep Learning",
    category: "Core AI / ML",
    proficiency: 90,
    experienceLevel: "Advanced",
    description: "Convolutional Neural Networks, Recurrent Architectures (LSTM/GRU), Transformer models, and PyTorch/TensorFlow implementations.",
    appliedIn: ["SignIQ", "MarketMind", "ATSPro"]
  },
  {
    name: "Generative AI",
    category: "Core AI / ML",
    proficiency: 88,
    experienceLevel: "Proficient",
    description: "Prompt engineering, LLM orchestration, Retrieval-Augmented Generation (RAG), vector embeddings, and fine-tuning workflows.",
    appliedIn: ["TaxNova", "ATSPro", "Document Intelligence"]
  },
  {
    name: "Data Science",
    category: "Data & Infrastructure",
    proficiency: 90,
    experienceLevel: "Advanced",
    description: "Exploratory data analysis, statistical hypothesis testing, feature engineering, and high-dimensional vector visualization.",
    appliedIn: ["MarketMind", "ATSPro", "TaxNova"]
  },
  {
    name: "Git / GitHub",
    category: "Tools & Version Control",
    proficiency: 92,
    experienceLevel: "Advanced",
    description: "Distributed version control, collaborative workflows, CI/CD automated test integrations, and code reviews.",
    appliedIn: ["All Projects", "Open Source Repositories"]
  }
];

export const EDUCATION_MILESTONES = [
  {
    institution: "REVA University, Bengaluru",
    degree: "Bachelor of Technology (B.Tech)",
    major: "Artificial Intelligence and Machine Learning",
    period: "Current Student (Undergraduate)",
    highlights: [
      "Rigorous coursework in Artificial Neural Networks, Computer Vision, Pattern Recognition, and Database Systems.",
      "Active researcher and builder building end-to-end AI applications across healthcare, finance, and assistive tech.",
      "Collaborative student developer contributing to tech communities and machine learning hackathons."
    ]
  }
];
