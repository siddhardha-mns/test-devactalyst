'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  'aria-label'?: string;
}

export function FlowSection({ className, style = {}, children, 'aria-label': ariaLabel }: FlowSectionProps) {
  return <section data-flow-section aria-label={ariaLabel} className={cx('relative min-h-screen w-full overflow-hidden', className)}><div data-flow-inner className="flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pb-[4vw] pt-[clamp(2rem,8vw,4vw)] shadow-[-18px_24px_44px_rgba(0,0,0,.28)] will-change-transform" style={{ transformOrigin: 'bottom left', ...style }}>{children}</div></section>;
}

export interface FlowArtProps {
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export default function FlowArt({ children, className, 'aria-label': ariaLabel = 'DevCatalyst story' }: FlowArtProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(containerRef.current);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current || reducedMotion) return;
    const sections = Array.from(containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'));
    const triggers: ScrollTrigger[] = [];

    sections.forEach((section, index) => {
      gsap.set(section, { zIndex: index + 1 });
      const inner = section.querySelector<HTMLElement>('.flow-art-container');
      if (!inner) return;
      if (index > 0) {
        gsap.set(inner, { rotation: 30, transformOrigin: 'bottom left' });
        const tween = gsap.to(inner, { rotation: 0, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'top 25%', scrub: true } });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
      if (index < sections.length - 1) triggers.push(ScrollTrigger.create({ trigger: section, start: 'bottom bottom', end: 'bottom top', pin: true, pinSpacing: false }));
    });
    ScrollTrigger.refresh();
    return () => triggers.forEach((trigger) => trigger.kill());
  }, { scope: containerRef, dependencies: [reducedMotion, children] });

  return <main ref={containerRef} aria-label={ariaLabel} className={cx('w-full overflow-x-hidden bg-[#15171b]', className)}>{children}</main>;
}
