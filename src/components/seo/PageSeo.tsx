import { Helmet } from 'react-helmet-async';
import { buildPageMetadata } from '@/lib/site';

interface PageSeoProps {
  title?: string;
  description?: string;
  path?: string;
}

export function PageSeo({ title, description, path = '/' }: PageSeoProps) {
  const metadata = buildPageMetadata({ title, description, path });

  return (
    <Helmet>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="canonical" href={metadata.canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={metadata.siteName} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={metadata.canonicalUrl} />
      <meta name="twitter:card" content={metadata.twitterCard} />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
    </Helmet>
  );
}
