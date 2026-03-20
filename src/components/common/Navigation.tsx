import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import BubbleMenu from './BubbleMenu';

interface NavItem {
  name: string;
  path: string;
}

interface NavigationProps {
  demoMode?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Team', path: '/team' },
  { name: 'Contact', path: '/contact' },
];

const Navigation = ({ demoMode = false }: NavigationProps) => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [demoPath, setDemoPath] = useState(location.pathname);
  const [isMobile, setIsMobile] = useState(false);
  const [overflowOpen, setOverflowOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);



  useEffect(() => {
    const isMobileViewport = window.innerWidth < 768;
    if (!isMobileViewport) return;
    if (overflowOpen) {
      closeRef.current?.focus?.();
    } else {
      hamburgerRef.current?.focus?.();
    }
  }, [overflowOpen]);

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => setScrolled(latest > 50));
    return () => unsub();
  }, [scrollY]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleItems = isMobile ? navItems.slice(0, 4) : navItems;
  const overflowItems = isMobile ? navItems.slice(4) : [];
  const currentPath = demoMode ? demoPath : location.pathname;

  return (
    <>
      {/* Desktop tubelight navbar */}
      <motion.nav
        className="hidden md:flex fixed inset-x-0 justify-center px-2 sm:px-4 z-50"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 0.5rem)' }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 140 }}
      >
        <motion.div
          className="relative mx-auto w-[calc(100vw-1rem)] sm:w-auto overflow-visible sm:overflow-x-auto no-scrollbar group rounded-full border border-slate-400/25 backdrop-blur-xl px-3 sm:px-7 py-2"
          animate={{ backgroundColor: scrolled ? 'rgba(2, 6, 23, 0.7)' : 'rgba(2, 6, 23, 0.4)' }}
          transition={{ duration: 0.2 }}
          style={{ boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.45)' : '0 6px 18px rgba(0,0,0,0.35)' }}
        >
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
          </div>

          <div className="flex items-center justify-center gap-1 sm:gap-4 relative z-10 flex-wrap sm:flex-nowrap sm:min-w-max">
            <div className="flex items-center gap-1 sm:gap-2">
              {visibleItems.slice(0, isMobile ? 2 : 3).map((item) => (
                <NavLink key={item.name} item={item} currentPath={currentPath} demoMode={demoMode} onActivate={setDemoPath} />
              ))}
            </div>

            <Link to={demoMode ? '#' : '/'} className="mx-2 sm:mx-4" onClick={(e) => { if (demoMode) e.preventDefault(); }}>
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center relative shrink-0 overflow-hidden rounded-xl"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                style={{ background: 'rgba(6, 14, 26, 0.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(100, 100, 100, 0.2)' }}
              >
                <motion.div className="absolute inset-0 bg-cyan-500/15 blur-md opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.2 }} />
                <img
                  src="/devcatalyst-logo.svg"
                  alt="DevCatalyst Logo"
                  decoding="async"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain relative z-10 rounded-lg"
                />
              </motion.div>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              {visibleItems.slice(isMobile ? 2 : 3).map((item) => (
                <NavLink key={item.name} item={item} currentPath={currentPath} demoMode={demoMode} onActivate={setDemoPath} />
              ))}
            </div>

            {isMobile && overflowItems.length > 0 && (
              <div className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={overflowOpen}
                  onClick={() => setOverflowOpen((v) => !v)}
                  className="px-3 py-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
                  title="More"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
                {overflowOpen && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-white/15 rounded-xl backdrop-blur-xl p-2 shadow-xl min-w-[160px]">
                    {overflowItems.map((item) => (
                      <Link
                        key={item.name}
                        to={demoMode ? '#' : item.path}
                        onClick={(e) => {
                          if (demoMode) { e.preventDefault(); setDemoPath(item.path); }
                          setOverflowOpen(false);
                        }}
                        className="block px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Top Navigation Bar */}
      <motion.nav
        className="md:hidden fixed inset-x-0 top-0 z-50 px-4 pt-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Mobile navigation"
      >
        <motion.div
          className="mx-auto w-[92%] rounded-2xl border border-white/20 backdrop-blur-xl px-4 py-2 flex items-center justify-between shadow-2xl"
          animate={{ backgroundColor: scrolled ? 'rgba(6, 14, 26, 0.9)' : 'rgba(6, 14, 26, 0.6)' }}
          transition={{ duration: 0.2 }}
        >
          <Link to={demoMode ? '#' : '/'} onClick={(e) => { if (demoMode) e.preventDefault(); }} aria-label="Home">
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl border border-white/20 overflow-hidden shadow-lg">
              <img src="/devcatalyst-logo.svg" alt="DevCatalyst Logo" className="w-8 h-8 object-contain" />
            </div>
          </Link>

          <motion.div
            className="text-base font-black tracking-[0.25em] uppercase text-white"
            style={{ textShadow: '0 0 10px rgba(52, 211, 153, 0.6), 0 0 20px rgba(34, 211, 238, 0.4)' }}
          >
            DevCatalyst
          </motion.div>

          <BubbleMenu
            direction="down"
            logo={
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" aria-hidden="true">
                <path d="M4 7h16M4 12h16M8 17h12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            }
            items={navItems.map((item, i) => ({
              label: item.name,
              href: demoMode ? '#' : item.path,
              ariaLabel: item.name,
              rotation: i % 2 === 0 ? -8 : 8,
              hoverStyles: {
                bgColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'][i % 6],
                textColor: '#ffffff',
              },
            }))}
            menuBg="rgba(255, 255, 255, 0.15)"
            menuContentColor="#ffffff"
            useFixedPosition={false}
            animationDuration={0.4}
            staggerDelay={0.08}
            menuAriaLabel="Open navigation menu"
          />
        </motion.div>
      </motion.nav>
    </>
  );
};

interface NavLinkProps {
  item: NavItem;
  currentPath: string;
  demoMode?: boolean;
  onActivate?: (_path: string) => void;
}

const NavLink = ({ item, currentPath, demoMode = false, onActivate }: NavLinkProps) => {
  const isActive = currentPath === item.path;

  return (
    <Link
      to={demoMode ? '#' : item.path}
      aria-current={isActive ? 'page' : undefined}
      onClick={(e) => {
        if (demoMode) { e.preventDefault(); onActivate?.(item.path); }
      }}
    >
      <motion.span
        className="relative text-xs sm:text-sm font-bold transition-colors block px-3 py-2 whitespace-nowrap shrink-0"
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className={`relative z-10 tracking-wide ${isActive ? 'text-gradient-accent' : 'text-slate-200 hover:text-white'}`}>
          {item.name}
        </span>

        {isActive && (
          <motion.div
            className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
            layoutId="activeTabUnderline"
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{ background: 'linear-gradient(90deg, var(--accent-start), var(--accent-end))' }}
          />
        )}

        {isActive && (
          <motion.div
            layoutId="tubelight"
            className="absolute inset-0 w-full rounded-full -z-10"
            initial={false}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="absolute inset-0 bg-white/10 rounded-full" />
            <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-1 sm:h-1.5 bg-blue-400 rounded-t-full shadow-lg">
              <div className="absolute w-12 sm:w-16 h-6 sm:h-8 bg-blue-400/30 rounded-full blur-lg -top-2 sm:-top-3 -left-2" />
              <div className="absolute w-8 sm:w-12 h-4 sm:h-6 bg-blue-400/40 rounded-full blur-md -top-1 sm:-top-2 left-0" />
              <div className="absolute w-6 sm:w-8 h-3 sm:h-4 bg-blue-400/60 rounded-full blur-sm -top-0.5 sm:-top-1 left-1 sm:left-2" />
              <div className="absolute w-3 sm:w-4 h-1.5 sm:h-2 bg-blue-300/80 rounded-full top-0 left-2.5 sm:left-4" />
            </div>
          </motion.div>
        )}
      </motion.span>
    </Link>
  );
};

export default Navigation;
