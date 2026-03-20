import siteConfigJson from '../../site.config.json';

interface SiteConfig {
  siteName: string;
  defaultTitle: string;
  titleSeparator: string;
  defaultDescription: string;
  twitterCard: string;
  routes: string[];
}

const LOCAL_SITE_URL = 'http://localhost:5173';

export const siteConfig = siteConfigJson as SiteConfig;

export function normalizeSiteUrl(siteUrl?: string): string {
  const trimmed = siteUrl?.trim();
  const normalized = trimmed && trimmed.length > 0 ? trimmed : LOCAL_SITE_URL;
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized;
}

export function getSiteUrl(siteUrl?: string): string {
  return normalizeSiteUrl(siteUrl ?? import.meta.env.VITE_SITE_URL);
}

export function buildAbsoluteUrl(path = '/', siteUrl?: string): string {
  const normalizedBase = getSiteUrl(siteUrl);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, `${normalizedBase}/`).toString();
}

export function buildRouteUrls(siteUrl?: string): string[] {
  return siteConfig.routes.map((route) => buildAbsoluteUrl(route, siteUrl));
}

export interface PageMetadataInput {
  title?: string;
  description?: string;
  path?: string;
}

export function buildPageMetadata({
  title,
  description,
  path = '/',
}: PageMetadataInput) {
  const resolvedTitle = title ?? siteConfig.defaultTitle;
  const resolvedDescription = description ?? siteConfig.defaultDescription;
  const canonicalUrl = buildAbsoluteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonicalUrl,
    siteName: siteConfig.siteName,
    twitterCard: siteConfig.twitterCard,
  };
}
