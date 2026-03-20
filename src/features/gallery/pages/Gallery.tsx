import { useCallback, useEffect, useMemo, useState } from 'react';
import Layout from '../../../components/common/Layout';
import { PageSeo } from '../../../components/seo/PageSeo';
import { buildGalleryHighlights, toggleExpandedEvent } from '../helpers';
import type { GalleryEvent } from '../model';
import { useGalleryData } from '../use-gallery-data';
import { GalleryEventShelf } from '../components/GalleryEventShelf';
import { GalleryHero } from '../components/GalleryHero';
import { GalleryLightbox } from '../components/GalleryLightbox';

const heroAdvanceMs = 6800;

const Gallery = () => {
  const { events, isLoading, loadMessage, gallerySource } = useGalleryData();
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ event: GalleryEvent; index: number } | null>(null);

  const highlights = useMemo(() => buildGalleryHighlights(events, 5), [events]);
  const currentHighlight = highlights[activeHighlight];
  const heroStatus = gallerySource === 'error' ? 'error' : isLoading ? 'loading' : 'ready';

  useEffect(() => {
    if (highlights.length <= 1) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveHighlight((current) => (current + 1) % highlights.length);
    }, heroAdvanceMs);

    return () => window.clearTimeout(timeoutId);
  }, [activeHighlight, highlights.length]);

  useEffect(() => {
    if (!highlights.length) {
      setActiveHighlight(0);
      return;
    }

    if (activeHighlight >= highlights.length) {
      setActiveHighlight(0);
    }
  }, [activeHighlight, highlights.length]);

  useEffect(() => {
    if (!events.length) {
      setExpandedEventId(null);
      return;
    }

    if (!expandedEventId || !events.some((event) => event.id === expandedEventId)) {
      setExpandedEventId(events[0].id);
    }
  }, [events, expandedEventId]);

  useEffect(() => {
    if (highlights.length <= 1) {
      return;
    }

    const nextIndex = (activeHighlight + 1) % highlights.length;
    const nextSrc = highlights[nextIndex]?.image.src;

    if (nextSrc) {
      const image = new window.Image();
      image.decoding = 'async';
      image.src = nextSrc;
    }
  }, [activeHighlight, highlights]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!lightbox) {
      return;
    }

    if (event.key === 'Escape') {
      setLightbox(null);
    }

    if (event.key === 'ArrowRight') {
      setLightbox((current) =>
        current
          ? { event: current.event, index: (current.index + 1) % current.event.images.length }
          : current,
      );
    }

    if (event.key === 'ArrowLeft') {
      setLightbox((current) =>
        current
          ? {
              event: current.event,
              index:
                (current.index - 1 + current.event.images.length) % current.event.images.length,
            }
          : current,
      );
    }
  }, [lightbox]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const scrollToEvents = () => {
    document.getElementById('event-gallery-list')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const currentLightboxImage =
    lightbox ? lightbox.event.images[lightbox.index] ?? lightbox.event.images[0] : null;

  return (
    <Layout
      stars={{
        transparent: false,
        maxStars: 920,
        hue: 190,
        brightness: 0.8,
        speedMultiplier: 1,
        twinkleIntensity: 18,
      }}
    >
      <PageSeo
        title="Event Gallery | DevCatalyst - Capturing Tech Moments"
        description="Browse through our library of workshop photos and event highlights. Experience the DevCatalyst community in action through our premium gallery."
        path="/gallery"
      />

      <GalleryHero
        status={heroStatus}
        currentHighlight={currentHighlight}
        highlights={highlights}
        activeHighlight={activeHighlight}
        onSelectHighlight={setActiveHighlight}
        onPrimaryAction={scrollToEvents}
      />

      <GalleryEventShelf
        events={events}
        expandedEventId={expandedEventId}
        errorMessage={gallerySource === 'error' ? loadMessage : null}
        onToggleEvent={(eventId) =>
          setExpandedEventId((current) => toggleExpandedEvent(current, eventId))
        }
        onOpenImage={(event, index) => setLightbox({ event, index })}
      />

      <GalleryLightbox
        lightbox={lightbox}
        currentImage={currentLightboxImage}
        totalImages={lightbox?.event.images.length || 0}
        onClose={() => setLightbox(null)}
        onPrevious={() =>
          setLightbox((current) =>
            current
              ? {
                  event: current.event,
                  index:
                    (current.index - 1 + current.event.images.length) %
                    current.event.images.length,
                }
              : current,
          )
        }
        onNext={() =>
          setLightbox((current) =>
            current
              ? { event: current.event, index: (current.index + 1) % current.event.images.length }
              : current,
          )
        }
      />
    </Layout>
  );
};

export default Gallery;
