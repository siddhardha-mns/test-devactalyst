import { fallbackGallerySeed } from '@/data/event-gallery';
import {
  type GalleryConfig,
  type GalleryEvent,
  type GallerySource,
  type RawGalleryEvent,
  type RawGalleryManifest,
  rawGalleryEventSchema,
  rawGalleryManifestSchema,
} from './model';
import {
  getGalleryConfig,
  hasRemoteGallerySourceConfigured,
  normalizeGalleryEvents,
  stripTrailingSlash,
} from './normalizers';

export interface GalleryLoadResult {
  events: GalleryEvent[];
  source: GallerySource;
  error?: string;
}

const rawGalleryEventsSchema = rawGalleryEventSchema.array();

export const fallbackGalleryEvents = normalizeGalleryEvents(fallbackGallerySeed);

function formatGalleryLoadError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error) {
    const hasStructuredValidationIssues =
      'issues' in error && Array.isArray((error as { issues?: unknown[] }).issues);

    if (hasStructuredValidationIssues) {
      return `${fallbackMessage} The live gallery data shape is invalid.`;
    }

    return error.message;
  }

  return fallbackMessage;
}

async function loadFromSupabase(
  signal: AbortSignal | undefined,
  config: Partial<GalleryConfig>,
): Promise<GalleryLoadResult | null> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  const response = await fetch(
    `${stripTrailingSlash(supabaseUrl)}/rest/v1/gallery_events?select=*,images:gallery_images(*)&order=date.desc`,
    {
      signal,
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Supabase gallery request failed with ${response.status}.`);
  }

  const rawEvents = rawGalleryEventsSchema.parse((await response.json()) as RawGalleryEvent[]);

  return {
    events: normalizeGalleryEvents(
      rawEvents.map((event) => ({
        ...event,
        images: event.images || [],
      })),
      config,
    ),
    source: 'remote',
  };
}

async function loadFromManifest(
  signal: AbortSignal | undefined,
  config: Partial<GalleryConfig>,
): Promise<GalleryLoadResult | null> {
  const manifestConfig = getGalleryConfig(config);

  if (!manifestConfig.manifestUrl) {
    return null;
  }

  const response = await fetch(manifestConfig.manifestUrl, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Gallery manifest request failed with ${response.status}.`);
  }

  const payload = rawGalleryManifestSchema.parse((await response.json()) as RawGalleryManifest);

  return {
    events: normalizeGalleryEvents(payload.events, manifestConfig),
    source: 'remote',
  };
}

export async function loadGalleryContent(
  signal?: AbortSignal,
  configOverrides: Partial<GalleryConfig> = {},
): Promise<GalleryLoadResult> {
  const config = getGalleryConfig(configOverrides);
  const remoteConfigured = hasRemoteGallerySourceConfigured(configOverrides);
  const failures: string[] = [];

  try {
    const supabaseResult = await loadFromSupabase(signal, config);

    if (supabaseResult) {
      return supabaseResult;
    }
  } catch (error) {
    failures.push(formatGalleryLoadError(error, 'Supabase gallery request failed.'));
  }

  try {
    const manifestResult = await loadFromManifest(signal, config);

    if (manifestResult) {
      return manifestResult;
    }
  } catch (error) {
    failures.push(formatGalleryLoadError(error, 'Gallery manifest request failed.'));
  }

  if (remoteConfigured) {
    return {
      events: [],
      source: 'error',
      error:
        failures[0] ??
        'Live gallery content is unavailable. Verify your Supabase or manifest configuration.',
    };
  }

  return {
    events: fallbackGalleryEvents,
    source: 'fallback',
  };
}
