import { useState } from 'react';

/**
 * Appends Supabase Storage image transform params to a URL.
 * Only applied to Supabase storage URLs — other URLs are returned as-is.
 * Docs: https://supabase.com/docs/guides/storage/serving/image-transformations
 */
function withTransform(src: string, width: number, quality = 75): string {
  if (!src || !src.includes('/storage/v1/object/')) return src;
  try {
    const url = new URL(src);
    url.searchParams.set('width', String(width));
    url.searchParams.set('quality', String(quality));
    url.searchParams.set('resize', 'cover');
    return url.toString();
  } catch {
    return src;
  }
}

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * Hint for Supabase image transform — request a resized version.
   * Use the largest rendered pixel width this image will appear at.
   * Omit for lightbox/full-size views.
   */
  renderWidth?: number;
}

export function GalleryImage({
  src,
  alt,
  className,
  priority = false,
  sizes,
  renderWidth,
}: GalleryImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Request a smaller image from Supabase when we know the render size
  const resolvedSrc = renderWidth ? withTransform(src, renderWidth) : src;

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_40%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.92))]" />
          <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-[gallery-sheen_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.9))] px-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
          Image unavailable
        </div>
      )}
      <img
        src={resolvedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        draggable={false}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className ?? ''} transition-[opacity] duration-300 ease-out motion-reduce:transition-none ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
