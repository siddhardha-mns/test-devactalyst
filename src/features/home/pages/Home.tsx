import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from '../../../components/common/Layout';
import { Globe } from '../../../components/ui/globe';

const work = [
  ['01', 'Telugu Agentic RAG', 'AI systems, language, and useful local context.'],
  ['02', 'DevCatalyst Club', 'A home for students who learn by shipping together.'],
  ['03', 'Open project studio', 'Ideas, prototypes, and feedback in public.'],
];

const sessions = [
  ['Agentic AI Workshop', 'Build a working document assistant from the ground up.'],
  ['Algorand Builders', 'Explore smart contracts through a practical first build.'],
  ['Git + AI Workflows', 'Learn the tools that make collaboration feel effortless.'],
];

const Home = () => (
  <Layout>
    <Helmet><title>DevCatalyst — a community of builders</title><meta name="description" content="A living network for people who turn curious ideas into working software." /></Helmet>

    <section id="top" className="relative isolate flex min-h-[820px] items-start justify-center overflow-hidden px-5 pt-32 sm:min-h-[960px] sm:px-8 sm:pt-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62rem] bg-[radial-gradient(ellipse_at_50%_25%,rgba(96,165,250,.22),transparent_42%),radial-gradient(ellipse_at_20%_42%,rgba(191,219,254,.5),transparent_32%)]" />
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-blue-700">A student-led developer community</p>
        <h1 className="mt-5 whitespace-nowrap text-[clamp(2.35rem,11vw,10.5rem)] font-black leading-[.9] tracking-[-.1em] text-slate-950">DEV<span className="text-blue-700">/</span>CATALYST</h1>
        <p className="mt-7 max-w-md text-sm leading-6 text-slate-600 sm:text-base">A living network for people who turn curious ideas into working software.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="https://beacons.ai/devcatalyst" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(29,78,216,.22)] hover:bg-blue-800">Join the network <ArrowUpRight size={17} /></a><a href="#about" className="rounded-xl border border-blue-200 bg-white/70 px-5 py-3 font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-700">Explore the community</a></div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[52.5vw] overflow-hidden"><motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute bottom-[-52.5vw] left-1/2 h-[105vw] w-[105vw] -translate-x-1/2"><Globe className="max-w-none" /><p className="absolute bottom-[57%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-[.16em] text-blue-800 sm:text-[11px]">10,000+ BUILDERS · 60+ COUNTRIES</p></motion.div></div>
    </section>

    <section id="about" className="site-flow-section mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-32"><div className="grid gap-12 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow">The network</p><h2 className="flow-heading">A better kind of developer community.</h2></div><div className="space-y-6 text-lg leading-8 text-slate-600"><p>Bring the rough draft, strange bug, or unfinished idea. DevCatalyst makes room for useful feedback and shared momentum.</p><p>Find collaborators across stacks and disciplines, then turn one good conversation into your next shipped project.</p></div></div><div className="mt-20 grid gap-8 border-t border-blue-200 pt-8 sm:grid-cols-3">{[['10,000+', 'builders reached'], ['100+', 'projects shared'], ['1', 'shared momentum']].map(([value, label]) => <div key={label}><p className="text-4xl font-bold tracking-tight text-blue-700">{value}</p><p className="mt-2 text-sm text-slate-500">{label}</p></div>)}</div></section>

    <section id="projects" className="site-flow-section mx-auto max-w-6xl border-t border-blue-200 px-6 py-24 sm:px-8 sm:py-32"><div className="mb-14 max-w-2xl"><p className="eyebrow">What we build</p><h2 className="flow-heading">Small teams. Useful ideas. Real momentum.</h2></div><div>{work.map(([number, title, description]) => <a key={title} href="https://github.com" target="_blank" rel="noreferrer" className="group grid gap-3 border-t border-blue-100 py-7 transition hover:bg-blue-50/45 sm:grid-cols-[5rem_1fr_1fr] sm:items-center"><span className="text-sm font-semibold text-blue-600">{number}</span><h3 className="text-2xl font-semibold text-slate-950 group-hover:text-blue-700">{title}</h3><p className="text-slate-600">{description}</p></a>)}</div></section>

    <section id="workshops" className="site-flow-section mx-auto max-w-6xl border-t border-blue-200 px-6 py-24 sm:px-8 sm:py-32"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Learn by doing</p><h2 className="flow-heading">Workshops that leave you with something working.</h2><p className="mt-6 leading-7 text-slate-600">Practical sessions for curious people: fewer lectures, more making, sharing, and shipping.</p></div><div>{sessions.map(([title, description]) => <div key={title} className="border-t border-blue-100 py-6"><h3 className="text-xl font-semibold text-slate-950">{title}</h3><p className="mt-2 text-slate-600">{description}</p></div>)}</div></div></section>

    <section id="gallery" className="site-flow-section mx-auto max-w-6xl border-t border-blue-200 px-6 py-24 sm:px-8 sm:py-32"><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="eyebrow">In the room</p><h2 className="flow-heading">The work is only part of the story.</h2></div><a href="#gallery" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">View the event gallery <ArrowUpRight size={17} /></a></div><div className="gallery-ribbon mt-12 flex min-h-52 items-end overflow-hidden rounded-2xl px-6 py-6 sm:px-10"><p className="max-w-md text-xl font-semibold tracking-tight text-slate-950">Workshops, hackathons, late-night builds, and the people who make them memorable.</p></div></section>

    <section id="team" className="site-flow-section mx-auto max-w-6xl border-t border-blue-200 px-6 py-24 sm:px-8 sm:py-32"><div className="grid gap-12 lg:grid-cols-[1fr_1fr]"><div><p className="eyebrow">The people</p><h2 className="flow-heading">A community built by builders.</h2></div><div className="space-y-5 text-lg leading-8 text-slate-600"><p>Students, mentors, designers, and developers moving in the same direction.</p><a href="#team" className="inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">Meet the full team <ArrowRightIcon /></a></div></div></section>

    <section id="contact" className="site-flow-section mx-auto max-w-6xl border-t border-blue-200 px-6 py-24 sm:px-8 sm:py-32"><div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end"><div><p className="eyebrow">Start something</p><h2 className="flow-heading">Have an idea worth building?</h2><p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">Bring it to the network. We’re always open to a thoughtful conversation.</p></div><a href="mailto:devcatalyst.2025@gmail.com" className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"><Mail size={17} /> devcatalyst.2025@gmail.com</a></div></section>
  </Layout>
);

const ArrowRightIcon = () => <ArrowUpRight size={17} />;

export default Home;
