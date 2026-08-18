import { motion } from 'framer-motion';

const dots = Array.from({ length: 42 }, (_, i) => ({
  left: `${8 + ((i * 37) % 84)}%`,
  top: `${10 + ((i * 23) % 78)}%`,
  delay: (i % 8) * 0.24,
}));

export function Globe({ className = '' }: { className?: string }) {
  return (
    <div className={`globe-orbit relative aspect-square w-full ${className}`} aria-label="An animated global developer network">
      <motion.div className="absolute inset-[5%] overflow-hidden rounded-full border border-blue-300 bg-[radial-gradient(circle_at_33%_26%,#eff6ff_0%,#bfdbfe_25%,#60a5fa_55%,#1d4ed8_100%)] shadow-[inset_-48px_-44px_90px_rgba(30,64,175,.55),inset_24px_20px_50px_rgba(255,255,255,.62),0_32px_70px_rgba(37,99,235,.28)]" animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,transparent_53%,rgba(15,23,42,.20)_100%)]" />
        {dots.map((dot, i) => <motion.i key={i} className="absolute h-1.5 w-1.5 rounded-full bg-blue-700 shadow-[0_0_8px_#2563eb]" style={{ left: dot.left, top: dot.top }} animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.3, 0.8] }} transition={{ delay: dot.delay, duration: 2.6, repeat: Infinity }} />)}
      </motion.div>
      <div className="absolute inset-[1%] rounded-full border border-blue-200/90 shadow-[0_0_55px_rgba(96,165,250,.28)]" />
    </div>
  );
}
