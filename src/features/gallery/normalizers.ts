import type { GalleryConfig, GalleryEvent, GalleryImage, RawGalleryEvent, RawGalleryImage } from './model';

export function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

export function stripLeadingSlash(value: string): string {
  return value.replace(/^\/+/, '');
}

export function slugifyGalleryLabel(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function isAbsoluteGalleryUrl(value: string): boolean {
  return /^(https?:)?\/\//.test(value) || value.startsWith('data:') || value.startsWith('blob:');
}

export function getGalleryConfig(overrides: Partial<GalleryConfig> = {}): GalleryConfig {
  return {
    manifestUrl: overrides.manifestUrl ?? import.meta.env.VITE_GALLERY_MANIFEST_URL?.trim(),
    storageBaseUrl:
      overrides.storageBaseUrl ?? import.meta.env.VITE_GALLERY_STORAGE_BASE_URL?.trim(),
  };
}

export function hasRemoteGallerySourceConfigured(configOverrides: Partial<GalleryConfig> = {}) {
  const config = getGalleryConfig(configOverrides);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  return Boolean(config.manifestUrl || (supabaseUrl && supabaseKey));
}

export function resolveGalleryAssetUrl(
  value: string,
  config: Partial<GalleryConfig> = {},
): string {
  const trimmed = value.trim();

  if (!trimmed || isAbsoluteGalleryUrl(trimmed) || trimmed.startsWith('/')) {
    return trimmed;
  }

  const mergedConfig = getGalleryConfig(config);
  const storageBaseUrl = mergedConfig.storageBaseUrl?.trim();

  if (storageBaseUrl) {
    return `${stripTrailingSlash(storageBaseUrl)}/${stripLeadingSlash(trimmed)}`;
  }

  return trimmed;
}

function normalizeGalleryImage(
  image: RawGalleryImage,
  eventId: string,
  index: number,
  config: Partial<GalleryConfig> = {},
): GalleryImage {
  const source = image.src ?? image.path ?? '';
  const src = resolveGalleryAssetUrl(source, config);

  return {
    id: image.id ?? `${eventId}-${index + 1}`,
    src,
    alt: image.alt ?? `Gallery image ${index + 1}`,
    caption: image.caption ?? undefined,
    featured: image.featured,
  };
}

export function normalizeGalleryEvent(
  event: RawGalleryEvent,
  config: Partial<GalleryConfig> = {},
): GalleryEvent {
  const eventId = event.id ?? slugifyGalleryLabel(event.name);
  const images = event.images.map((image, index) =>
    normalizeGalleryImage(image, eventId, index, config),
  );
  const featuredImage = images.find((image) => image.featured) ?? images[0];
  const thumbnail = resolveGalleryAssetUrl(event.thumbnail ?? featuredImage.src, config);
  const heroImage = resolveGalleryAssetUrl(event.heroImage ?? featuredImage.src, config);

  return {
    id: eventId,
    name: event.name,
    date: event.date,
    location: event.location ?? undefined,
    description: event.description ?? undefined,
    thumbnail,
    heroImage,
    accent: event.accent ?? undefined,
    images,
  };
}

export function normalizeGalleryEvents(
  events: readonly RawGalleryEvent[],
  config: Partial<GalleryConfig> = {},
): GalleryEvent[] {
  return events.map((event) => normalizeGalleryEvent(event, config));
}
