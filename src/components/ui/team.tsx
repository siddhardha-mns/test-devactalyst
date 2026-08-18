import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const highlights = [
  ['Leadership', 'A student-led core team that sets the pace.'],
  ['Builders', 'Developers who learn by making and sharing.'],
  ['Community', 'People who show up with generous feedback.'],
];

const TeamHighlight = () => (
  <section className="py-24 sm:py-32">
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      <div className="theme-inverse rounded-[2rem] bg-blue-700 px-7 py-10 text-white shadow-[0_28px_80px_rgba(29,78,216,.25)] sm:px-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15"><Users size={22} /></div><p className="text-xs font-bold uppercase tracking-[.15em] text-blue-100">The people behind the momentum</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em] sm:text-5xl">A community built by builders.</h2><Link to="/team" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-blue-300 underline-offset-4 hover:text-blue-100">Meet our team <ArrowRight size={17} /></Link></div>
          <div className="grid gap-3 sm:grid-cols-3">{highlights.map(([title, body], index) => <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .09 }} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"><p className="text-lg font-semibold">{title}</p><p className="mt-2 text-sm leading-6 text-blue-100">{body}</p></motion.div>)}</div>
        </div>
      </div>
    </div>
  </section>
);

export default TeamHighlight;
