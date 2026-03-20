import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  User,
  Star,
  ChevronRight,
  Code,
  Brain,
  Target,
  Rocket,
  Zap,
  Trophy,
  Globe,
  Cloud,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../../../components/common/Layout';
import { GradientButton } from '../../../components/ui/gradient-button';
import { CtaButton } from '@/components/ui/cta-button';
import { Helmet } from 'react-helmet-async';

const Workshops = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredWorkshop, setHoveredWorkshop] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Events', icon: <Star className="w-5 h-5" /> },
    { id: 'ai', name: 'AI/ML', icon: <Brain className="w-5 h-5" /> },
    { id: 'web3', name: 'Web3', icon: <Globe className="w-5 h-5" /> },
    { id: 'hackathon', name: 'Hackathons', icon: <Trophy className="w-5 h-5" /> },
    { id: 'cloud', name: 'Cloud', icon: <Cloud className="w-5 h-5" /> },
  ];

  const workshops = [
    {
      id: 1,
      title: 'Agentic AI Workshop',
      category: 'ai',
      level: 'Intermediate',
      duration: '1 day',
      participants: 50,
      date: 'Sep 24, 2024',
      time: 'Full Day Session',
      instructor: 'Vijender P',
      venue: 'Matrusri Engineering College',
      description:
        'An immersive session exploring how AI agents act autonomously to solve complex problems. Participants built a fully functional PDF document assistant using FastAPI, Google Gemini AI, Pinecone vector database, MySQL, and Streamlit.',
      tags: ['Agentic AI', 'RAG', 'FastAPI', 'Gemini AI', 'Pinecone', 'Vector Embeddings'],
      icon: Brain,
      highlight: 'Hands-on build: PDF Document Assistant',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Algorand Builders Workshop – Hyderabad Edition',
      category: 'web3',
      level: 'Beginner',
      duration: '1 day',
      participants: 75,
      date: 'Aug 22, 2024',
      time: 'Full Day Session',
      instructor: 'Srujan Vuyyuru (Rise In)',
      venue: 'KV Seminar Hall, Matrusri Engineering College',
      description:
        'A hands-on blockchain development workshop in partnership with Rise In and Algorand Foundation. Covered the evolution from Web1 to Web3, transparency, immutability, and smart contracts — participants built their very first smart contract.',
      tags: ['Web3', 'Algorand', 'Smart Contracts', 'Blockchain', 'Python', 'TypeScript'],
      icon: Zap,
      highlight: 'Build your first smart contract on Algorand',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Git Basics & Dify AI Workflow',
      category: 'ai',
      level: 'Beginner',
      duration: '2 hours',
      participants: 60,
      date: 'Aug 18, 2024',
      time: 'Inauguration Day Session',
      instructor: 'Nikhil Sai Siddhardha Madagala',
      venue: 'Matrusri Engineering College',
      description:
        'Conducted at the official inauguration of DevCatalyst, this session introduced students to essential Git commands and collaboration workflows, followed by a walkthrough on building custom AI chatbots using the Dify AI platform.',
      tags: ['Git', 'Version Control', 'Dify AI', 'Chatbots', 'Collaboration'],
      icon: Code,
      highlight: 'DevCatalyst Club Inauguration Session',
      status: 'completed',
    },
    {
      id: 4,
      title: 'SIH Internal Hackathon',
      category: 'hackathon',
      level: 'Advanced',
      duration: '1 day',
      participants: 300,
      date: 'Sep 25, 2024',
      time: 'Full Day Event',
      instructor: 'Mrs. Samatha (SPOC for SIH)',
      venue: 'Matrusri Engineering College',
      description:
        'DevCatalyst organized the Smart India Hackathon internal round, managing 100+ teams across 9 evaluation panels. Each panel had 2 student coordinators, 1 faculty coordinator, and 2 jury members. Top 50 teams advanced to the SIH finale.',
      tags: ['SIH', 'Hackathon', 'Innovation', 'Problem Solving', 'Teamwork'],
      icon: Trophy,
      highlight: '100+ teams · 9 panels · Top 50 advance to finale',
      status: 'completed',
    },
    {
      id: 5,
      title: 'Youth Speak Ideathon',
      category: 'hackathon',
      level: 'Intermediate',
      duration: '1 day + 24hr finale',
      participants: 80,
      date: 'Sep 23, 2024',
      time: 'Full Day Event',
      instructor: 'AIESEC in India',
      venue: 'Matrusri Engineering College → IIT Hyderabad (Finale)',
      description:
        'An AIESEC initiative for young innovators to design solutions addressing the UN Sustainable Development Goals. DevCatalyst organized the first round, with the top 10 teams advancing to a 24-hour hackathon finale at IIT Hyderabad.',
      tags: ['SDGs', 'AIESEC', 'Innovation', 'Social Impact', 'IIT Hyderabad'],
      icon: Lightbulb,
      highlight: 'Top 10 teams → 24hr finale at IIT Hyderabad',
      status: 'completed',
    },
    {
      id: 6,
      title: 'AWS 101: Intro to Cloud',
      category: 'cloud',
      level: 'Beginner',
      duration: '3 hours',
      participants: 100,
      date: 'Dec 13, 2025',
      time: '10:00 AM – 1:00 PM',
      instructor: 'Rudramadhaba Mishra (Cloud Engineer, AWS)',
      venue: 'KVR Seminar Hall, Matrusri Engineering College',
      description:
        'The inaugural session of AWS Cloud Club MECS, designed for beginners to understand what cloud computing really is — beyond the buzzwords. Covered core AWS services, real-world cloud applications, and hands-on fundamentals led by a practicing AWS Cloud Engineer.',
      tags: ['AWS', 'Cloud Computing', 'Beginner', 'DevOps', 'AWS Cloud Club'],
      icon: Cloud,
      highlight: '100+ participants · AWS Cloud Club inaugural event',
      status: 'completed',
    },
    {
      id: 7,
      title: 'AWS IAM: Hands-on Security Session',
      category: 'cloud',
      level: 'Intermediate',
      duration: 'Half Day',
      participants: 20,
      date: 'Mar 2026',
      time: 'Hands-on Session',
      instructor: 'Aric Pandya',
      venue: 'Matrusri Engineering College',
      description:
        'A practical deep-dive into AWS Identity and Access Management — the foundation of cloud security. Participants learned to control access, secure identities, and configure permissions correctly. No theory-only slides; every concept was executed live.',
      tags: ['AWS', 'IAM', 'Cloud Security', 'Access Control', 'AWS Cloud Club'],
      icon: Shield,
      highlight: 'Execute, don\'t just listen — full hands-on',
      status: 'completed',
    },
  ];

  const filteredWorkshops =
    selectedCategory === 'all'
      ? workshops
      : workshops.filter((workshop) => workshop.category === selectedCategory);

  const getLevelColor = (level: string): string => {
    switch (level) {
      case 'Beginner':
        return 'text-green-400 bg-green-400/20';
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Advanced':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>DevCatalyst | Workshops & Events</title>
        <meta
          name="description"
          content="Real workshops and events by DevCatalyst — from Agentic AI and Web3 to hackathons and community meetups at Matrusri Engineering College, Hyderabad."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-cyan-500/30 rounded-full backdrop-blur">
              <Target className="w-5 h-5 text-cyan-300" />
              <span className="text-slate-200 font-medium text-base">Learn by Doing</span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-7xl font-bold mb-6 text-slate-100 leading-tight balance hyphens-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Workshops & Events
            <span className="block mt-2 text-cyan-300">Built by DevCatalyst</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-xl leading-relaxed text-slate-300 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            From AI agents and blockchain to hackathons and community meetups — every event we run
            is hands-on, impact-driven, and open to all builders.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 gap-x-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              { number: '8+', label: 'Events Hosted' },
              { number: '500+', label: 'Students Reached' },
              { number: '4', label: 'Global Partners' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.15 }}
              >
                <div className="text-2xl md:text-3xl font-bold mb-1 neon-counter">
                  {stat.number}
                </div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronRight className="w-6 h-6 text-slate-400 rotate-90" />
          </motion.div>
        </motion.div>
      </section>

      {/* Workshops Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full font-medium border select-none
                  transition-[background-color,border-color,box-shadow,transform] duration-200
                  active:scale-[0.97]
                  ${selectedCategory === category.id
                    ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/40 shadow-[0_0_12px_rgba(0,198,255,0.15)]'
                    : 'bg-white/5 text-slate-200 hover:bg-white/10 hover:-translate-y-0.5 border-slate-800'
                  }`}
                onClick={() => setSelectedCategory(category.id)}
                whileTap={{ scale: 0.97 }}
                layout
              >
                {selectedCategory === category.id && (
                  <motion.span
                    layoutId="pill-active-dot"
                    className="absolute left-3 w-1.5 h-1.5 rounded-full bg-cyan-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className={selectedCategory === category.id ? 'ml-3' : ''}>{category.icon}</span>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Workshops Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredWorkshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  className="group relative dc-card overflow-hidden transition-all duration-300 cursor-pointer scale-[0.9] md:scale-100 flex flex-col"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setHoveredWorkshop(workshop.id)}
                  onHoverEnd={() => setHoveredWorkshop(null)}
                >
                  {/* Workshop Header */}
                  <div className="h-28 bg-gradient-to-r from-slate-900 to-slate-800 relative flex items-center justify-center">
                    <motion.div
                      className="flex items-center justify-center"
                      animate={hoveredWorkshop === workshop.id ? { scale: 1.08 } : {}}
                      transition={{ duration: 0.25 }}
                    >
                      {(() => {
                        const Icon = workshop.icon;
                        return <Icon className="w-10 h-10 text-cyan-300" />;
                      })()}
                    </motion.div>
                    {/* Completed badge */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-xs font-medium">
                      Completed
                    </div>
                  </div>

                  {/* Workshop Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(workshop.level)}`}
                      >
                        {workshop.level}
                      </span>
                      <div className="flex items-center space-x-1 text-slate-400 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{workshop.participants}+</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {workshop.title}
                    </h3>

                    {/* Highlight pill */}
                    <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                      <Rocket className="w-3 h-3 text-cyan-400" />
                      <span className="text-cyan-300 text-xs font-medium">{workshop.highlight}</span>
                    </div>

                    <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                      {workshop.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {workshop.tags.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-900 text-slate-300 text-xs rounded-md border border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                      {workshop.tags.length > 4 && (
                        <span className="px-2 py-1 bg-slate-900 text-slate-500 text-xs rounded-md border border-slate-800">
                          +{workshop.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Workshop Details */}
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>
                          {workshop.time} · {workshop.duration}
                        </span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <User className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{workshop.instructor}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link to="/gallery" className="block mt-auto pt-6 group">
                      <CtaButton className="w-full" size="md" variant="primary">
                        <span className="pr-2">View Recap</span>
                        <ChevronRight className="w-5 h-5" aria-hidden="true" />
                      </CtaButton>
                    </Link>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-slate-800 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-semibold mb-4 text-slate-100">
                Want to Host or{' '}
                <span className="text-cyan-300">Suggest a Workshop?</span>
              </h3>
              <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                We're always looking for industry experts, community leaders, and passionate
                builders to collaborate with. Reach out and let's make it happen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <CtaButton size="lg" variant="primary">
                    Get in Touch
                  </CtaButton>
                </Link>
                <Link to="/gallery">
                  <GradientButton variant="variant">
                    View Past Events
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Workshops;