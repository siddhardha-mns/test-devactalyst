import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const SiteFooter = () => (
  <footer className="site-footer relative isolate mt-0 overflow-hidden bg-slate-950 px-6 py-14 text-white sm:px-10 sm:py-16 lg:px-16">
    <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
      <motion.div className="absolute -right-28 -top-40 h-[34rem] w-[34rem] rounded-full border border-blue-400/20" animate={{ rotate: 360, scale: [1, 1.07, 1] }} transition={{ rotate: { duration: 36, repeat: Infinity, ease: 'linear' }, scale: { duration: 8, repeat: Infinity } }} />
      <motion.div className="absolute -bottom-40 -left-28 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-3xl" animate={{ x: [0, 45, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="footer-grid absolute inset-0" />
    </div>
    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-3 text-xs font-semibold uppercase tracking-[.16em] text-blue-300">A community in motion</p><h2 className="max-w-xl text-3xl font-semibold tracking-[-.045em] sm:text-4xl">Build with people who care about the details.</h2></div>
        <a href="mailto:devcatalyst.2025@gmail.com" className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500">Start a conversation <ArrowUpRight size={16} /></a>
      </div>
      <div className="grid gap-9 py-10 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <div><p className="text-lg font-bold tracking-tight text-white">DEV<span className="text-blue-400">/</span>CATALYST</p><p className="mt-4 max-w-xs leading-6">A student-led community turning curious ideas into working software.</p></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-white">Explore</p><div className="grid gap-3">{[['Projects','/projects'],['Workshops','/workshops'],['Gallery','/gallery']].map(([label,path]) => <Link key={path} to={path} className="hover:text-blue-300">{label}</Link>)}</div></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-white">Community</p><div className="grid gap-3"><Link to="/team" className="hover:text-blue-300">Our team</Link><Link to="/contact" className="hover:text-blue-300">Contact</Link><a href="https://beacons.ai/devcatalyst" target="_blank" rel="noreferrer" className="hover:text-blue-300">Join DevCatalyst</a></div></div>
        <div><p className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-white">Contact</p><a href="mailto:devcatalyst.2025@gmail.com" className="flex items-center gap-2 hover:text-blue-300"><Mail size={15} /> devcatalyst.2025@gmail.com</a></div>
      </div>
      <motion.div aria-hidden="true" className="pointer-events-none my-3 flex w-full justify-center overflow-hidden py-2 text-center" animate={{ opacity: [.65, 1, .65] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}><p className="whitespace-nowrap text-[clamp(3rem,10vw,9rem)] font-black leading-none tracking-[-.1em] text-blue-200/25">DEVCATALYST</p></motion.div>
      <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} DevCatalyst. All rights reserved.</p><div className="flex gap-4"><a href="https://github.com" aria-label="GitHub"><Github size={17} /></a><a href="https://www.instagram.com" aria-label="Instagram"><Instagram size={17} /></a><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
    </div>
  </footer>
);

export default SiteFooter;
