import { useEffect, useState } from 'react';
import type { GalleryEvent, GallerySource } from './model';
import { hasRemoteGallerySourceConfigured } from './normalizers';
import { fallbackGalleryEvents, loadGalleryContent } from './service';

export function useGalleryData() {
  const [events, setEvents] = useState<GalleryEvent[]>(
    hasRemoteGallerySourceConfigured() ? [] : fallbackGalleryEvents,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadMessage, setLoadMessage] = useState<string | null>(null);
  const [gallerySource, setGallerySource] = useState<GallerySource>('fallback');

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function init() {
      try {
        const result = await loadGalleryContent(controller.signal);

        if (!mounted) {
          return;
        }

        setEvents(result.events);
        setGallerySource(result.source);
        setLoadMessage(result.error ?? null);
      } catch (error) {
        if (!mounted || (error instanceof DOMException && error.name === 'AbortError')) {
          return;
        }

        setEvents([]);
        setGallerySource('error');
        setLoadMessage(
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred while loading the gallery.',
        );
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    init();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  return { events, isLoading, loadMessage, gallerySource };
}
