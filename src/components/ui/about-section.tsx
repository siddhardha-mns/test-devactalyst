import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const stats = [['10,000+', 'builders reached'], ['100+', 'projects shared'], ['1', 'community with momentum']];

const AboutSection = () => (
  <section className="relative overflow-hidden border-y border-blue-100 py-24 sm:py-32">
    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
    <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[.14em] text-blue-700"><Sparkles size={14} /> The DevCatalyst network</div>
        <h2 className="max-w-3xl text-4xl font-semibold tracking-[-.055em] text-slate-950 sm:text-6xl">A better kind of developer network.</h2>
        <div className="mt-8 grid gap-6 text-base leading-7 text-slate-600 sm:grid-cols-2"><p>Bring the rough draft, strange bug, or unfinished idea. We make room for useful feedback and projects that grow in public.</p><p>Find thoughtful collaborators across stacks and disciplines—then turn one good conversation into your next shipped project.</p></div>
        <a href="https://beacons.ai/devcatalyst" target="_blank" rel="noreferrer" className="mt-9 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900">Join the network <ArrowRight size={17} /></a>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: .96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, delay: .1 }} className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-7 shadow-[0_20px_60px_rgba(30,64,175,.10)]">
        <p className="text-xs font-bold uppercase tracking-[.15em] text-blue-700">Made for builders with momentum</p>
        <div className="mt-7 space-y-5">{stats.map(([value, label]) => <div key={label} className="border-b border-blue-100 pb-5 last:border-0"><p className="text-4xl font-semibold tracking-tight text-slate-950">{value}</p><p className="mt-1 text-sm text-slate-500">{label}</p></div>)}</div>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
