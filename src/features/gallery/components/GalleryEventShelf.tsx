import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { GalleryEvent } from '../model';
import { getEventPhotoCountLabel } from '../helpers';
import { GalleryImage } from './GalleryImage';

interface GalleryEventShelfProps {
  events: GalleryEvent[];
  expandedEventId: string | null;
  errorMessage?: string | null;
  onToggleEvent: (_eventId: string) => void;
  onOpenImage: (_event: GalleryEvent, _index: number) => void;
}

export function GalleryEventShelf({
  events,
  expandedEventId,
  errorMessage,
  onToggleEvent,
  onOpenImage,
}: GalleryEventShelfProps) {
  const prefersReducedMotion = useReducedMotion();

  const scrollBy = (offset: number) => {
    document.getElementById('event-scroll-container')?.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="event-gallery-list"
      className="relative z-10 -mt-2 overflow-hidden px-4 pb-12 sm:mt-0 sm:px-6 sm:pb-14 lg:px-8"
    >
      <div className="mx-auto max-w-[1600px] space-y-10 sm:space-y-16">
        {events.length === 0 ? (
          <div className="rounded-[2rem] border border-amber-400/20 bg-amber-500/10 px-6 py-8 text-center text-amber-100 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Gallery content is unavailable</h2>
            <p className="mt-3 text-sm leading-7 text-amber-100/90">
              {errorMessage ??
                'No event data could be loaded. Verify the remote gallery configuration and try again.'}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-5 sm:space-y-8">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  Event Categories
                </h2>
                <div className="hidden gap-2 sm:flex">
                  <button
                    type="button"
                    onClick={() => scrollBy(-400)}
                    className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollBy(400)}
                    className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none"
                    aria-label="Scroll right"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div
                id="event-scroll-container"
                className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 sm:gap-6 sm:pb-8"
                style={{ scrollbarWidth: 'none' }}
              >
                {events.map((event) => {
                  const isExpanded = expandedEventId === event.id;

                  return (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onToggleEvent(event.id)}
                      aria-expanded={isExpanded}
                      aria-controls={isExpanded ? `event-content-${event.id}` : undefined}
                      className={`group relative aspect-[16/9] w-[15.5rem] flex-shrink-0 snap-start overflow-hidden rounded-[1.25rem] border sm:w-[22rem] sm:rounded-[1.5rem] ${
                        isExpanded
                          ? 'border-cyan-400/70 shadow-[0_22px_55px_rgba(0,0,0,0.35)] ring-4 ring-cyan-400/15'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <GalleryImage
                        src={event.thumbnail}
                        alt={event.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                        sizes="(min-width: 640px) 22rem, 15.5rem"
                        renderWidth={440}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_35%,rgba(255,255,255,0.16)_52%,transparent_72%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none" />
                      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3 sm:p-4">
                        <span className="rounded-full border border-white/10 bg-slate-950/55 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-slate-200 backdrop-blur-sm sm:px-3 sm:text-[0.62rem]">
                          {isExpanded ? 'Open set' : 'Event reel'}
                        </span>
                        <span className="rounded-full border border-white/10 bg-slate-950/55 p-2 text-white/80 backdrop-blur-sm transition-transform duration-200 group-hover:rotate-[-8deg] motion-reduce:transition-none">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                              isExpanded ? 'rotate-180 text-cyan-300' : ''
                            }`}
                          />
                        </span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-6">
                        <p className="mb-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-cyan-400 sm:text-[0.65rem]">
                          {event.date}
                        </p>
                        <h3 className="truncate text-lg font-black uppercase text-white sm:text-xl">
                          {event.name}
                        </h3>
                        <p className="mt-2 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-300/85 sm:text-xs sm:tracking-[0.2em]">
                          <span>{event.location || 'Virtual'}</span>
                          <span className="opacity-40">&bull;</span>
                          <span>{event.images.length} frames</span>
                        </p>
                        <div
                          className={`mt-4 h-0.5 rounded-full bg-white/15 transition-all duration-200 motion-reduce:transition-none ${
                            isExpanded ? 'w-full bg-cyan-300/90' : 'w-10 group-hover:w-20'
                          }`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {expandedEventId &&
                (() => {
                  const event = events.find((item) => item.id === expandedEventId);

                  if (!event) {
                    return null;
                  }

                  return (
                    <motion.div
                      key={expandedEventId}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: 'easeOut' }}
                      id={`event-content-${expandedEventId}`}
                      role="region"
                      aria-labelledby={`event-heading-${expandedEventId}`}
                      className="space-y-7 border-t border-white/5 pt-6 sm:space-y-10 sm:pt-8"
                      style={{ contentVisibility: 'auto', containIntrinsicSize: '960px' }}
                    >
                      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div className="space-y-3 sm:space-y-4">
                          <h2 
                            id={`event-heading-${event.id}`}
                            className="text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl"
                          >
                            {event.name}
                          </h2>
                          <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-400 sm:gap-4 sm:text-sm">
                            <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 sm:px-4">
                              <MapPin className="h-4 w-4" />
                              {event.location || 'Virtual'}
                            </span>
                            <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 sm:px-4">
                              &bull; {event.date}
                            </span>
                            <span className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 sm:px-4">
                              &bull; {getEventPhotoCountLabel(event.images.length)}
                            </span>
                          </div>
                          {event.description && (
                            <p className="max-w-4xl text-sm font-medium leading-7 text-slate-300/90 sm:text-lg sm:leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div 
                        role="grid"
                        className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-6 xl:grid-cols-6"
                      >
                        {event.images.map((image, imageIndex) => (
                          <button
                            key={image.id}
                            type="button"
                            onClick={() => onOpenImage(event, imageIndex)}
                            className="group relative flex flex-col gap-3 text-left focus-visible:outline-none"
                          >
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 p-1 shadow-lg transition-[transform,border-color,background-color,box-shadow] duration-200 group-hover:-translate-y-0.5 group-hover:border-white/30 group-hover:bg-slate-800/60 group-hover:shadow-[0_16px_36px_rgba(0,0,0,0.28)] group-focus-visible:ring-2 group-focus-visible:ring-cyan-300 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-950 motion-reduce:transition-none">
                              <GalleryImage
                                src={image.src}
                                alt={image.alt}
                                className="h-full w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
                                sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 18vw, (min-width: 768px) 23vw, (min-width: 640px) 31vw, 48vw"
                                renderWidth={400}
                              />
                              <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-slate-100 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none">
                                <span>Open photo</span>
                                <span>{String(imageIndex + 1).padStart(2, '0')}</span>
                              </div>
                            </div>
                            <span className="truncate px-1 text-center text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors duration-200 group-hover:text-white motion-reduce:transition-none">
                              {image.caption || `Photo ${imageIndex + 1}`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  );
                })()}
            </AnimatePresence>
          </>
        )}
      </div>
    </section>
  );
}
