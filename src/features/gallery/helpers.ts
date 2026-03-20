import type { GalleryEvent, GalleryHighlight } from './model';

export function buildGalleryHighlights(events: GalleryEvent[], limit = 5): GalleryHighlight[] {
  const primaryHighlights = events.flatMap((event) => {
    const featuredImages = event.images.filter((image) => image.featured);
    const images = featuredImages.length > 0 ? featuredImages : event.images.slice(0, 1);

    return images.map((image) => ({
      id: `${event.id}-${image.id}`,
      eventId: event.id,
      eventName: event.name,
      eventDate: event.date,
      eventDescription: event.description,
      image,
      thumbnail: event.thumbnail,
    }));
  });

  if (primaryHighlights.length >= limit) {
    return primaryHighlights.slice(0, limit);
  }

  const seen = new Set(primaryHighlights.map((highlight) => highlight.image.id));
  const secondaryHighlights = events.flatMap((event) =>
    event.images
      .filter((image) => !seen.has(image.id))
      .map((image) => ({
        id: `${event.id}-${image.id}`,
        eventId: event.id,
        eventName: event.name,
        eventDate: event.date,
        eventDescription: event.description,
        image,
        thumbnail: event.thumbnail,
      })),
  );

  return [...primaryHighlights, ...secondaryHighlights].slice(0, limit);
}

export function toggleExpandedEvent(current: string | null, next: string): string | null {
  return current === next ? null : next;
}

export function getEventPhotoCountLabel(imageCount: number): string {
  return `${imageCount} photo${imageCount === 1 ? '' : 's'}`;
}
