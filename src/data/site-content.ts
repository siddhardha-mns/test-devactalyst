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
  { id: 'agentic-ai-2024', title: 'Agentic AI Workshop', category: 'Workshop', date: '24 September 2024', time: '1:00 PM - 4:00 PM', location: 'Matrusri Engineering College', description: 'An immersive build session exploring autonomous AI agents through a working PDF document assistant.', outcome: 'The Event was successfully Organized', facilitator: 'Vijender P', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1mpOAq5sYIjVO0GXWsIXXtmuyQkTHEl8B', alt: 'Participants at the Agentic AI Workshop' }] },
  { id: 'algorand-2024', title: 'Algorand Builders Workshop – Hyderabad Edition', category: 'Workshop', date: '22 August 2024', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'A hands-on blockchain development workshop with Rise In and the Algorand Foundation.', outcome: 'The Event was successfully Organized', facilitator: 'Algorand', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1iXAF8XpFpqF89L513rAHOKeerKwKc3ht', alt: 'Participants at the Algorand Builders Workshop' }] },
  { id: 'sih-2024', title: 'SIH Internal Hackathon 2024', category: 'Hackathon', date: '25 September 2024', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'DevCatalyst organised the Smart India Hackathon internal round across nine evaluation panels.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1gXfc7xhWYG4bF3HNl9O28xXHq4aJq9ID', alt: 'Participants at the SIH Internal Hackathon' }] },
  { id: 'youth-speak-2024', title: 'Youth Speak Ideathon 2024', category: 'Hackathon', date: '23 September 2024', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'An AIESEC initiative for young innovators to design solutions addressing the UN Sustainable Development Goals.', outcome: 'The Event was successfully Organized', facilitator: 'AIESEC', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1k3imUa14U-i8zwrFeyT5IFVGHOerYZxn', alt: 'Participants at the Youth Speak Ideathon' }] },
  { id: 'aws-iam-2026', title: 'AWS IAM: Hands-on Security Session 2026', category: 'Workshop', date: 'March 2026', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'A practical deep-dive into AWS Identity and Access Management, focused on identities, access, and permissions through live execution.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed' },
  { id: 'aws-101-2026', title: 'AWS 101: Intro to Cloud 2026', category: 'Workshop', date: '13 December 2025', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'An accessible introduction to cloud computing, core AWS services, and real-world applications led by a practising Cloud Engineer.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed' },
  { id: 'catalyst-days-2026', title: 'Catalyst Days 2026', category: 'Community', date: '16 and 17 April 2026', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'A two-day event: day one consisted of open-source talks and tech games; day two consisted of a project expo.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1eIRH2xxFay6_5Z2v5QXXrRzDqULnNjqa', alt: 'Participants at Catalyst Days 2026' }] },
  { id: 'summer-saas-2026', title: 'Summer SaaS Hackathon 2026', category: 'Hackathon', date: '17 May 2026', time: '9:00 AM - 4:00 PM', location: 'Matrusri Engineering College', description: 'A summer hackathon co-organised by DevCatalyst and Centle India at BITS Pilani Hyderabad.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed', images: [{ url: 'https://drive.google.com/uc?export=view&id=1Q3lTpSebjlhnFl0w8PToso1txGP_Mc1u', alt: 'Participants at the Summer SaaS Hackathon 2026' }] },
  { id: 'beacons-ai-2026', title: 'Beacons AI Foundry Hackathon 2026', category: 'Hackathon', date: '20-21 June 2026', time: '9:00 AM - 4:00 PM', location: 'IIT Hyderabad', description: 'Beacons AI Foundry Hackathon was conducted by DevCatalyst at IIT Hyderabad.', outcome: 'The Event was successfully Organized', facilitator: 'DevCatalyst', status: 'completed' },
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
