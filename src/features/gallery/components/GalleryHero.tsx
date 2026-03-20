import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CtaButton } from '@/components/ui/cta-button';
import type { GalleryHighlight } from '../model';
import { GalleryImage } from './GalleryImage';

type GalleryHeroStatus = 'ready' | 'loading' | 'error';

interface GalleryHeroProps {
  status: GalleryHeroStatus;
  currentHighlight?: GalleryHighlight;
  highlights: GalleryHighlight[];
  activeHighlight: number;
  onSelectHighlight: (_index: number) => void;
  onPrimaryAction: () => void;
}

export function GalleryHero({
  status,
  currentHighlight,
  highlights,
  activeHighlight,
  onSelectHighlight,
  onPrimaryAction,
}: GalleryHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const title =
    status === 'error'
      ? 'Gallery Unavailable'
      : currentHighlight?.eventName ?? 'Loading Event Gallery';
  const meta =
    status === 'error'
      ? 'Live content could not be loaded'
      : currentHighlight?.eventDate ?? 'Preparing live event photos';
  const subMeta =
    status === 'error'
      ? 'Check your gallery data source configuration'
      : currentHighlight?.image.caption || '';
  const description =
    status === 'error'
      ? 'The gallery is configured for a live remote source, but that source could not be loaded. Update the gallery configuration or restore the upstream data source.'
      : currentHighlight?.eventDescription ??
        'We are fetching the latest event photos so the gallery opens directly on your live collection without flashing preview content first.';

  return (
    <section className="relative px-4 pt-20 pb-8 sm:px-4 sm:pt-24 sm:pb-14 lg:px-6">
      <div className="mx-auto max-w-[1600px]">
        <div className="relative h-[36rem] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:h-[40rem] sm:rounded-[2.5rem] sm:shadow-[0_40px_100px_rgba(0,0,0,0.6)] lg:h-[85vh]">
          <div className="absolute inset-0">
            {currentHighlight ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHighlight}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <GalleryImage
                    src={currentHighlight.image.src}
                    alt={currentHighlight.image.alt}
                    className="h-full w-full object-cover"
                    priority
                    sizes="100vw"
                    renderWidth={1200}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_30%),linear-gradient(135deg,rgba(2,6,23,0.98),rgba(15,23,42,0.92),rgba(8,47,73,0.8))]" />
            )}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-black/20" />
          </div>

          <div className="relative flex h-full items-end px-5 pb-16 pt-6 sm:px-12 sm:pb-20 sm:pt-12 lg:px-20 lg:pb-24 lg:pt-20">
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-6 shadow-[0_14px_36px_rgba(0,0,0,0.24)] backdrop-blur-md sm:space-y-6 sm:rounded-[2rem] sm:p-8 sm:shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/20 px-3 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.26em] text-cyan-100 backdrop-blur-md sm:text-xs sm:tracking-widest">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                    {status === 'error' ? 'Gallery Error' : 'Featured Event'}
                  </div>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <h1 className="text-[2.2rem] font-black uppercase tracking-[-0.06em] text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
                    {title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-300 sm:gap-3 sm:text-sm">
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-cyan-300 ring-1 ring-cyan-400/20">
                      {meta}
                    </span>
                    {subMeta ? (
                      <>
                        <span className="hidden opacity-40 select-none sm:inline">&bull;</span>
                        <span className="max-w-full truncate rounded-full bg-white/5 px-3 py-1 text-slate-200 sm:max-w-none">
                          {subMeta}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>

                <p className="max-w-xl text-sm font-medium leading-7 text-slate-200/90 sm:text-lg sm:leading-relaxed">
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">
                  <CtaButton
                    size="lg"
                    className="group h-12 w-full rounded-xl bg-white px-5 text-sm font-bold text-slate-950 shadow-xl transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-slate-200 hover:shadow-[0_18px_40px_rgba(255,255,255,0.16)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:h-14 sm:min-w-[14rem] sm:w-auto sm:text-base"
                    onClick={onPrimaryAction}
                  >
                    <span className="flex items-center gap-2">
                      {status === 'error' ? 'View Status' : 'Watch Gallery'}
                      <span className="text-slate-500 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none">
                        &rarr;
                      </span>
                    </span>
                  </CtaButton>
                </div>
              </div>
            </div>

            {highlights.length > 0 && (
              <>
                <div className="absolute inset-x-4 bottom-10 z-10 sm:hidden">
                  <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/30 p-2 backdrop-blur-md">
                    {highlights.map((highlight, index) => (
                      <button
                        key={`${highlight.id}-mobile`}
                        type="button"
                        onClick={() => onSelectHighlight(index)}
                        className={`min-w-[9.5rem] rounded-xl border px-3 py-2 text-left transition-colors duration-200 motion-reduce:transition-none ${
                          activeHighlight === index
                            ? 'border-cyan-300/70 bg-white/10'
                            : 'border-white/10 bg-white/5 hover:border-white/25'
                        }`}
                        aria-label={`Show mobile highlight ${index + 1}: ${highlight.eventName}`}
                      >
                        <p className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cyan-300">
                          {highlight.eventDate}
                        </p>
                        <p className="mt-1 truncate text-sm font-semibold text-white">
                          {highlight.eventName}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 hidden items-center gap-4 sm:bottom-12 sm:right-12 lg:bottom-16 lg:right-20 lg:flex">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-2 shadow-[0_18px_36px_rgba(0,0,0,0.28)] backdrop-blur-md lg:flex lg:gap-3">
                    {highlights.map((highlight, index) => (
                      <button
                        key={highlight.id}
                        type="button"
                        onClick={() => onSelectHighlight(index)}
                        className={`group relative h-20 w-36 overflow-hidden rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none ${
                          activeHighlight === index
                            ? 'z-10 -translate-y-1 border-cyan-300/70 shadow-[0_20px_40px_rgba(0,0,0,0.35)]'
                            : 'border-white/15 opacity-75 hover:-translate-y-0.5 hover:border-white/40 hover:opacity-100'
                        }`}
                        aria-label={`Show highlight ${index + 1}: ${highlight.eventName}`}
                      >
                        <GalleryImage
                          src={highlight.image.src}
                          alt={highlight.eventName}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
                          sizes="(min-width: 1024px) 9rem, 7rem"
                          renderWidth={300}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-white/5" />
                        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none" />
                        <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                          <p className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
                            {highlight.eventDate}
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-white">
                            {highlight.eventName}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-12 lg:inset-x-20">
                  <div className="flex gap-2">
                    {highlights.map((highlight, index) => (
                      <div
                        key={`${highlight.id}-indicator`}
                        className="h-1 flex-1 overflow-hidden rounded-full bg-white/10"
                      >
                        {index === activeHighlight && (
                          <motion.div
                            key={`${highlight.id}-${activeHighlight}`}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-cyan-200"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: prefersReducedMotion ? 0 : 6.8, ease: 'linear' }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
