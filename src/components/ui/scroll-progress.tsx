import React from 'react';
import { motion } from 'framer-motion';

type ScrollProgressProps = {
  targetRef?: React.RefObject<HTMLElement>;
  withinContainer?: boolean; // If true, render a sticky bar inside the container instead of page-top fixed
};

const useElementScrollProgress = (targetRef?: React.RefObject<HTMLElement>) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const el = targetRef?.current;

    const update = () => {
      if (el) {
        const scrollTop = el.scrollTop;
        const max = el.scrollHeight - el.clientHeight;
        setProgress(max > 0 ? (scrollTop / max) * 100 : 0);
      } else {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx =
          document.documentElement.scrollHeight - document.documentElement.clientHeight;
        setProgress(winHeightPx > 0 ? (scrollPx / winHeightPx) * 100 : 0);
      }
    };

    const target: Window | HTMLElement = (el ?? window) as Window | HTMLElement;
    const onScroll = () => update();
    target.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions);
    update();
    return () => target.removeEventListener('scroll', onScroll);
  }, [targetRef]);

  return progress;
};

export const ScrollProgress: React.FC<ScrollProgressProps> = ({ targetRef, withinContainer }) => {
  const scrollProgress = useElementScrollProgress(targetRef);

  const baseClasses = withinContainer
    ? 'sticky top-0 left-0 right-0 h-1 z-10'
    : 'fixed top-0 left-0 right-0 h-1 z-50';

  return (
    <motion.div
      className={`${baseClasses} bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left`}
      style={{
        scaleX: scrollProgress / 100,
        transformOrigin: '0%',
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 blur-sm opacity-75" />
    </motion.div>
  );
};

// Scroll to top button (works with page or container)
export const ScrollToTop: React.FC<{ targetRef?: React.RefObject<HTMLElement>; withinContainer?: boolean }> = ({
  targetRef,
  withinContainer,
}) => {
  const scrollProgress = useElementScrollProgress(targetRef);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(scrollProgress > 20);
  }, [scrollProgress]);

  const scrollToTop = () => {
    const el = targetRef?.current;
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  const btnClasses = withinContainer
    ? 'sticky bottom-6 ml-auto mr-6 z-20'
    : 'fixed bottom-5 right-5 md:bottom-8 md:right-8 z-40';

  return (
    <motion.button
      onClick={scrollToTop}
      className={`${btnClasses} w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 flex items-center justify-center backdrop-blur-sm border border-white/20 relative`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      aria-label="Scroll to top"
    >
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-cyan-400/60 pointer-events-none"
        animate={{ scale: [1, 1.55], opacity: [0.55, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="w-6 h-6 relative z-10"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </motion.button>
  );
};
