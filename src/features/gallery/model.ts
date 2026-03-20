import { z } from 'zod';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  featured?: boolean;
}

export interface GalleryEvent {
  id: string;
  name: string;
  date: string;
  location?: string;
  description?: string;
  thumbnail: string;
  heroImage: string;
  accent?: string;
  images: GalleryImage[];
}

export interface GalleryHighlight {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  eventDescription?: string;
  image: GalleryImage;
  thumbnail: string;
}

export interface GalleryConfig {
  manifestUrl?: string;
  storageBaseUrl?: string;
}

export type GallerySource = 'remote' | 'fallback' | 'error';

export interface RawGalleryImage {
  id?: string | null;
  src?: string | null;
  path?: string | null;
  alt?: string | null;
  caption?: string | null;
  featured?: boolean;
}

export interface RawGalleryEvent {
  id?: string | null;
  name: string;
  date: string;
  location?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  heroImage?: string | null;
  accent?: string | null;
  images: readonly RawGalleryImage[];
}

export interface RawGalleryManifest {
  events: RawGalleryEvent[];
}

const nullableOptionalString = z.string().nullish().transform((value) => value ?? undefined);

export const rawGalleryImageSchema = z.object({
  id: nullableOptionalString,
  src: nullableOptionalString,
  path: nullableOptionalString,
  alt: nullableOptionalString,
  caption: nullableOptionalString,
  featured: z.boolean().optional(),
});

export const rawGalleryEventSchema = z.object({
  id: nullableOptionalString,
  name: z.string(),
  date: z.string(),
  location: nullableOptionalString,
  description: nullableOptionalString,
  thumbnail: nullableOptionalString,
  heroImage: nullableOptionalString,
  accent: nullableOptionalString,
  images: z.array(rawGalleryImageSchema).min(1),
});

export const rawGalleryManifestSchema = z.object({
  events: z.array(rawGalleryEventSchema).min(1),
});
