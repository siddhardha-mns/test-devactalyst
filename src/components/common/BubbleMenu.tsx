import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface HoverStyles {
  bgColor: string;
  textColor: string;
}

interface BubbleMenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: HoverStyles;
}

interface BubbleMenuProps {
  logo?: React.ReactNode;
  items: BubbleMenuItem[];
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  direction?: 'up' | 'down';
}

const BubbleMenu = ({
  logo,
  items,
  menuAriaLabel = 'Toggle navigation',
  menuBg = '#ffffff',
  menuContentColor = '#111111',
  useFixedPosition = false,
  animationDuration = 0.5,
  staggerDelay = 0.12,
  direction = 'up',
}: BubbleMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    open: { transition: { staggerChildren: staggerDelay } },
    closed: { transition: { staggerChildren: staggerDelay, staggerDirection: -1 as const } },
  };

  const itemVariants = {
    open: {
      y: 0, opacity: 1, scale: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20, duration: animationDuration },
    },
    closed: { 
      y: direction === 'up' ? -50 : 50, 
      opacity: 0, 
      scale: 0.3, 
      transition: { duration: 0.2 } 
    },
  };

  return (
    <div className={`${useFixedPosition ? 'fixed bottom-8 right-8' : 'relative'} z-[60]`}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop — closes menu on outside tap */}
            <motion.div
              className="fixed inset-0 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={containerVariants}
              className={`absolute right-0 flex flex-col items-end gap-2.5 ${
                direction === 'up' ? 'bottom-16' : 'top-16'
              }`}
            >
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{ rotate: item.rotation }}
                  whileHover={{ scale: 1.08, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    aria-label={item.ariaLabel}
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 rounded-full shadow-lg text-sm font-bold block whitespace-nowrap min-h-[44px] flex items-center"
                    style={{ backgroundColor: menuBg, color: menuContentColor }}
                    onMouseEnter={(e) => {
                      if (item.hoverStyles) {
                        e.currentTarget.style.backgroundColor = item.hoverStyles.bgColor;
                        e.currentTarget.style.color = item.hoverStyles.textColor;
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = menuBg;
                      e.currentTarget.style.color = menuContentColor;
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <button
        type="button"
        aria-label={menuAriaLabel}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-[transform,filter] duration-150 hover:scale-105 active:scale-95"
        style={{ backgroundColor: menuBg, color: menuContentColor }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {logo || <div className="font-bold text-xl">M</div>}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default BubbleMenu;
