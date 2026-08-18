import type { CommunityEvent } from '@/data/site-content';

// Public read endpoint only. Admin write credentials must never be shipped to the browser.
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx8CyDgfDU98UvTeqYSKB69Eo9OxxHZth2GzMpIg12-CBTIrZFahZk-MDbQdLLxhDAdLg/exec';

type AppsScriptPayload = { ok?: boolean; events?: Record<string, unknown>[] };

export async function loadPublishedEvents(): Promise<CommunityEvent[]> {
  const response = await fetch(APPS_SCRIPT_URL);
  if (!response.ok) throw new Error('Apps Script content request failed.');
  const payload = (await response.json()) as AppsScriptPayload;
  if (!payload.ok || !Array.isArray(payload.events)) throw new Error('Apps Script returned an invalid event payload.');

  return payload.events.map((event) => ({
    id: String(event.id ?? ''),
    title: String(event.title ?? ''),
    category: String(event.category ?? 'Community') as CommunityEvent['category'],
    date: String(event.date ?? ''),
    time: event.time ? String(event.time) : undefined,
    location: String(event.location ?? ''),
    description: String(event.description ?? ''),
    outcome: String(event.outcome ?? ''),
    facilitator: event.facilitator ? String(event.facilitator) : undefined,
    status: String(event.status ?? 'completed') as CommunityEvent['status'],
    registrationUrl: event.registrationUrl ? String(event.registrationUrl) : undefined,
    heroImage: event.heroImage ? String(event.heroImage) : undefined,
  })).filter((event) => event.id && event.title);
}
