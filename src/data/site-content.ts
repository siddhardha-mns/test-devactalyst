export type EventCategory = 'Workshop' | 'Hackathon' | 'Talk / Meetup' | 'Community';
export type EventStatus = 'draft' | 'active' | 'completed';

export interface CommunityEvent {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time?: string;
  location: string;
  description: string;
  outcome: string;
  facilitator?: string;
  status: EventStatus;
  registrationUrl?: string;
  heroImage?: string;
  images?: { url: string; alt: string; caption?: string }[];
}

export interface CommunityProject {
  id: string;
  title: string;
  description: string;
  creators: string;
  area: string;
  githubUrl: string;
  liveUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  contribution: string;
  portraitUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export const siteSettings = {
  whatsappUrl: 'https://chat.whatsapp.com/FOvrV1kCx2y1t534qrNEEP',
  contactEmail: 'devcatalyst.2025@gmail.com',
  stats: [
    ['2,500+', 'Members'], ['15+', 'Events'], ['8,000', 'Students reached'], ['4', 'Hackathons'], ['50', 'Projects'],
  ],
  partners: ['GLUG', 'Swecha', 'Viswam.ai', 'Centle', 'Beacon', 'AWS SBG'],
} as const;

export const events: CommunityEvent[] = [
  { id: 'aws-iam', title: 'AWS IAM: Hands-on Security Session', category: 'Workshop', date: 'March 2026', location: 'Matrusri Engineering College', description: 'A practical deep-dive into AWS Identity and Access Management, focused on identities, access, and permissions through live execution.', outcome: 'Full hands-on session on cloud security foundations.', facilitator: 'Aric Pandya', status: 'completed' },
  { id: 'aws-101', title: 'AWS 101: Intro to Cloud', category: 'Workshop', date: '13 December 2025', time: '10:00 AM – 1:00 PM', location: 'KVR Seminar Hall, Matrusri Engineering College', description: 'An accessible introduction to cloud computing, core AWS services, and real-world applications led by a practising Cloud Engineer.', outcome: '100+ participants at the AWS Cloud Club inaugural session.', facilitator: 'Rudramadhaba Mishra', status: 'completed' },
  { id: 'sih-internal', title: 'SIH Internal Hackathon', category: 'Hackathon', date: '25 September 2024', location: 'Matrusri Engineering College', description: 'DevCatalyst organised the Smart India Hackathon internal round across nine evaluation panels.', outcome: '100+ teams participated; the top 50 advanced to the SIH finale.', status: 'completed' },
  { id: 'agentic-ai', title: 'Agentic AI Workshop', category: 'Workshop', date: '24 September 2024', location: 'Matrusri Engineering College', description: 'An immersive build session exploring autonomous AI agents through a working PDF document assistant.', outcome: 'Participants built a document assistant with FastAPI, Gemini, Pinecone, MySQL, and Streamlit.', facilitator: 'Vijender P', status: 'completed' },
  { id: 'youth-speak', title: 'Youth Speak Ideathon', category: 'Hackathon', date: '23 September 2024', location: 'Matrusri Engineering College → IIT Hyderabad', description: 'An AIESEC initiative for young innovators to design solutions addressing the UN Sustainable Development Goals.', outcome: 'Top 10 teams advanced to a 24-hour finale at IIT Hyderabad.', status: 'completed' },
  { id: 'algorand', title: 'Algorand Builders Workshop – Hyderabad Edition', category: 'Workshop', date: '22 August 2024', location: 'KV Seminar Hall, Matrusri Engineering College', description: 'A hands-on blockchain development workshop with Rise In and the Algorand Foundation.', outcome: 'Students built their first smart contract.', facilitator: 'Srujan Vuyyuru', status: 'completed' },
  { id: 'git-dify', title: 'Git Basics & Dify AI Workflow', category: 'Workshop', date: '18 August 2024', location: 'Matrusri Engineering College', description: 'The DevCatalyst inauguration session introduced version control and practical chatbot workflows.', outcome: '60 students explored Git collaboration and custom AI chatbots.', facilitator: 'Nikhil Sai Siddhardha Madagala', status: 'completed' },
];

export const projects: CommunityProject[] = [
  { id: 'telugu-rag', title: 'Telugu Agentic RAG', description: 'An agentic retrieval system for Telugu language story generation and information queries.', creators: 'Divyansh Teja Edla', area: 'AI / Language', githubUrl: 'https://github.com/DIVYANSH-TEJA-09/telugu-agentic-rag', liveUrl: 'https://telugu-story-generator-agent.streamlit.app' },
  { id: 'chandassu', title: 'Telugu Chandassu Identifier', description: 'A tool for identifying metre and rhythmic structures in Telugu poetry.', creators: 'Divyansh Teja Edla', area: 'AI / Language', githubUrl: 'https://github.com/DIVYANSH-TEJA-09/telugu-chandassu-identifier', liveUrl: 'https://telugu-chandas-identifier.streamlit.app/' },
  { id: 'pulse-ai', title: 'PulseAI', description: 'A personal portfolio frontend showcasing development skills and projects.', creators: 'J Raj Likhit', area: 'Web', githubUrl: 'https://github.com/Raj-Likhit/pulseai', liveUrl: 'https://pulse-ai-ui.vercel.app/' },
  { id: 'medvault', title: 'MedVault', description: 'An AI-powered medical record management system for securely storing and processing patient information.', creators: 'Girish Panchariya', area: 'Health / AI', githubUrl: 'https://github.com/Girishp12113/MEDVAULT-Health-Care-and-Digital-Vault', liveUrl: 'https://medvault-fawn.vercel.app/' },
  { id: 'manakatha', title: 'MANAKATHA', description: 'An interactive application supporting regional storytelling and literature.', creators: 'Dhruv Gannaram', area: 'Culture / Web', githubUrl: 'https://github.com/Dhruv-git-tech/ManaKatha-.git', liveUrl: 'https://wyecxwv95uuajpvydoqf6e.streamlit.app/' },
  { id: 'kaathabook', title: 'KAATHABOOK', description: 'A digital ledger platform to track day-to-day transactions.', creators: 'Dhruv Gannaram', area: 'Web', githubUrl: 'https://github.com/Dhruv-git-tech/KaathaBook.git', liveUrl: 'https://kaatha-book.vercel.app/' },
  { id: 'brain-tumor', title: 'Brain Tumor AI Suite', description: 'A federated-learning pipeline for secure and precise brain tumour analysis.', creators: 'Divyansh Teja Edla', area: 'Health / AI', githubUrl: 'https://github.com/DIVYANSH-TEJA-09/BrainTumor-FL-Pipeline', liveUrl: 'https://huggingface.co/spaces/Divs0910/Brain-Tumor-AI-Suite' },
  { id: 'certificates', title: 'Certificate Generator', description: 'An automated utility for distributing event participation certificates.', creators: 'MNS Siddhardha', area: 'Automation', githubUrl: 'https://github.com/siddhardha-mns/certificate-generator/blob/main/app.py', liveUrl: 'https://awscc-mecs-certgen.streamlit.app' },
];

export const teamMembers: TeamMember[] = [];
export const activeEvents = events.filter((event) => event.status === 'active');
export const hasActiveEvents = activeEvents.length > 0;
