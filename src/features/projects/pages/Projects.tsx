import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Github, ExternalLink, ChevronDown, User } from 'lucide-react';
import Layout from '../../../components/common/Layout';
import { GradientText } from '../../../components/ui/animated-hero';
import { Helmet } from 'react-helmet-async';

import { useState } from 'react';

interface Project {
  title: string;
  creator: string;
  description: string;
  github: string;
  live: string;
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}

// Stable blob positions — computed once at module level
const PROJECT_BLOBS = [
  { left: '8%',  top: '15%', dur: 22 }, { left: '55%', top: '8%',  dur: 18 },
  { left: '80%', top: '30%', dur: 25 }, { left: '20%', top: '55%', dur: 20 },
  { left: '65%', top: '60%', dur: 17 }, { left: '40%', top: '80%', dur: 23 },
  { left: '90%', top: '75%', dur: 19 }, { left: '5%',  top: '85%', dur: 21 },
] as const;

const ProjectCard = ({ project, isExpanded, onToggle }: ProjectCardProps) => {
  return (
    <motion.div
      layout
      className={`dc-card overflow-hidden cursor-pointer ${
        isExpanded ? 'ring-2 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : ''
      }`}
      onClick={onToggle}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isExpanded ? {} : { y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <User className="w-4 h-4 text-blue-400/70" />
              <span>{project.creator}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className={`text-slate-400 ${isExpanded ? 'text-blue-400' : ''}`}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-700 hover:border-slate-500"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-all border border-blue-500/30 hover:border-blue-500/50"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Link</span>
          </a>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-slate-800/50">
                <p className="text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const projects = [
    {
      title: "Telugu Agentic RAG",
      creator: "Divyansh Teja Edla",
      description: "A Telugu-focused Agentic Retrieval-Augmented Generation (RAG) system built to handle complex story generation and informational queries in the Telugu language using advanced AI agents.",
      github: "https://github.com/DIVYANSH-TEJA-09/telugu-agentic-rag",
      live: "https://telugu-story-generator-agent.streamlit.app"
    },
    {
      title: "Telugu Chandassu Identifier",
      creator: "Divyansh Teja Edla",
      description: "An innovative tool designed to identify 'Chandassu' (meter) in Telugu poetry. It helps poets and scholars analyze the rhythmic patterns and structures of Telugu literary works.",
      github: "https://github.com/DIVYANSH-TEJA-09/telugu-chandassu-identifier",
      live: "https://telugu-chandas-identifier.streamlit.app/"
    },
    {
      title: "PulseAI",
      creator: "J Raj Likhit",
      description: "A personal portfolio frontend project showcasing development skills and projects.",
      github: "https://github.com/Raj-Likhit/pulseai",
      live: "https://pulse-ai-ui.vercel.app/"
    },
    {
      title: "MedVault",
      creator: "Girish Panchariya",
      description: "AI-Powered Medical Record Management System designed to securely store and intelligently process patient information.",
      github: "https://github.com/Girishp12113/MEDVAULT-Health-Care-and-Digital-Vault",
      live: "https://medvault-fawn.vercel.app/"
    },
    {
      title: "MANAKATHA",
      creator: "Dhruv Gannaram",
      description: "An interactive application supporting regional storytelling and literature.",
      github: "https://github.com/Dhruv-git-tech/ManaKatha-.git",
      live: "https://wyecxwv95uuajpvydoqf6e.streamlit.app/"
    },
    {
      title: "KAATHABOOK",
      creator: "Dhruv Gannaram",
      description: "A digital ledger platform to track and manage day-to-day transactions effortlessly.",
      github: "https://github.com/Dhruv-git-tech/KaathaBook.git",
      live: "https://kaatha-book.vercel.app/"
    },
    {
      title: "Brain Tumor AI Suite",
      creator: "Divyansh Teja Edla",
      description: "A comprehensive AI suite built using Federated Learning pipelines for precise and secure brain tumor analysis.",
      github: "https://github.com/DIVYANSH-TEJA-09/BrainTumor-FL-Pipeline",
      live: "https://huggingface.co/spaces/Divs0910/Brain-Tumor-AI-Suite"
    },
    {
      title: "Certificate Generator",
      creator: "MNS Siddhardha",
      description: "An automated utility to generate and distribute participation certificates for AWS Cloud Club MECS events.",
      github: "https://github.com/siddhardha-mns/certificate-generator/blob/main/app.py",
      live: "https://awscc-mecs-certgen.streamlit.app"
    }
  ];


  return (
    <Layout>
      <Helmet>
        <title>Projects | DevCatalyst - Innovations by Our Community</title>
        <meta name="description" content="Discover innovative open-source tools and web applications built by DevCatalyst members, including AI RAG systems and Telugu literary tools." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div className="max-w-6xl mx-auto text-center relative z-10" style={{ y: y1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-full backdrop-blur-md shadow-lg">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent font-semibold text-lg">
                Our Projects
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-8 leading-tight balance hyphens-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <span className="text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}>
              Showcasing Our Best
            </span>
            <span className="block mt-2">
              <GradientText gradient="from-blue-400 via-purple-400 to-pink-400">
                Innovations
              </GradientText>
            </span>
          </motion.h1>

          <motion.p
            className="text-base md:text-2xl leading-relaxed text-slate-200 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Discover the projects we've been working on. From open-source tools to 
            innovative web applications, explore the creativity and technical 
            excellence of our community members.
          </motion.p>

        </motion.div>

        {/* Background blobs — stable positions, GPU-composited */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2 }}>
          {PROJECT_BLOBS.map((blob, i) => (
            <motion.div
              key={i}
              className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl will-change-transform"
              style={{ left: blob.left, top: blob.top }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.45, 0.2], rotate: [0, 180, 360] }}
              transition={{ duration: blob.dur, repeat: Infinity, ease: 'linear', delay: i * 2 }}
            />
          ))}
        </motion.div>
      </section>

      {/* Projects Grid Container - Ready for Content */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Featured </span>
              <GradientText>Works</GradientText>
            </h2>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto">
              A collection of our most recent and impactful projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                project={project} 
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(expandedIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
