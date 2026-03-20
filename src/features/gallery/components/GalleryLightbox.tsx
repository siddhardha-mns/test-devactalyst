import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryEvent, GalleryImage as GalleryImageType } from '../model';
import { GalleryImage } from './GalleryImage';

interface GalleryLightboxProps {
  lightbox: { event: GalleryEvent; index: number } | null;
  currentImage: GalleryImageType | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  totalImages: number;
}

export function GalleryLightbox({
  lightbox,
  currentImage,
  onClose,
  onPrevious,
  onNext,
  totalImages,
}: GalleryLightboxProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    const velocityThreshold = 500;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onPrevious();
    }
  };

  return (
    <AnimatePresence>
      {lightbox && currentImage && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/92 p-2 backdrop-blur-lg sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.18 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="relative flex h-[92dvh] w-full max-w-7xl items-center justify-center sm:h-[90dvh]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Top Bar for Status */}
            <div className="absolute left-0 right-0 top-4 z-20 flex items-center justify-between px-6">
              <div className="rounded-full bg-slate-950/60 px-4 py-1.5 backdrop-blur-md border border-white/5">
                <span className="text-white/70 text-sm font-medium">
                  {lightbox.index + 1} <span className="mx-1 text-white/30">/</span> {totalImages}
                </span>
              </div>
              
              <button
                type="button"
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] rounded-full border border-white/10 bg-slate-950/80 p-3 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-slate-900 active:translate-y-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none flex items-center justify-center"
                aria-label="Close photo viewer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onPrevious}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/72 p-3 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-[calc(50%+2px)] hover:border-white/25 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:left-5 sm:p-3.5"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-slate-950/72 p-3 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-[calc(50%+2px)] hover:border-white/25 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:right-5 sm:p-3.5"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <motion.div 
              className="flex h-full w-full items-center justify-center px-4 py-20 sm:px-20 sm:py-14"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
            >
              <GalleryImage
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-h-full w-full rounded-[1.5rem] object-contain sm:rounded-[2rem] pointer-events-none"
                priority
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
