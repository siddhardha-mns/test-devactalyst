"use client";

import { useEffect, useRef } from "react";

const BALL_SIZE = 380;

export default function AboutBallTrack() {
  const trackRef = useRef<HTMLElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const main = track.closest("main");
    const previousOverflow = main?.style.overflow;
    if (main) main.style.overflow = "clip";

    let frame = 0;
    const update = () => {
      frame = 0;
      const clip = clipRef.current;
      if (!clip) return;
      const viewportHeight = clip.clientHeight;
      const viewportWidth = clip.clientWidth;
      const isMobile = viewportWidth < 768;
      const ballSize = isMobile ? Math.min(220, Math.max(180, Math.round(viewportWidth * 0.54))) : BALL_SIZE;
      const scrollDistance = Math.max(1, track.offsetHeight - viewportHeight);
      const progress = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / scrollDistance));
      const centerProgress = Math.min(1, progress * 2);
      const expandProgress = Math.max(0, (progress - 0.5) * 2);
      const yOffset = (1 - centerProgress * centerProgress) * (viewportHeight / 2 + ballSize / 2);
      const size = ballSize + expandProgress * expandProgress * (Math.max(viewportWidth, viewportHeight) * 2.8 - ballSize);

      // Keep the dark surface and light text inside one shared circular edge.
      clip.style.clipPath = `circle(${size / 2}px at ${viewportWidth / 2}px ${viewportHeight / 2 + yOffset}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (main) main.style.overflow = previousOverflow ?? "";
    };
  }, []);

  return (
    <section
      ref={trackRef}
      id="about"
      aria-labelledby="about-title"
      className="relative h-[300vh] bg-catalyst-paper motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-catalyst-paper text-center motion-reduce:relative motion-reduce:h-[100svh]">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-catalyst-forest">
          <h2 id="about-title" className="max-w-4xl text-balance text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[.98] tracking-[-.04em]">
            Students connect. Community takes shape.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-catalyst-muted sm:text-lg">
            DevCatalyst brings students together through shared learning, events, and collaboration.
          </p>
        </div>
        <div
          ref={clipRef}
          aria-hidden="true"
          data-nav-theme="dark"
          style={{ clipPath: "circle(0px at 50% 100%)" }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-catalyst-forest px-6 text-catalyst-white motion-reduce:hidden"
        >
          <p className="max-w-4xl text-balance text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[.98] tracking-[-.04em]">
            Students connect. Community takes shape.
          </p>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
            DevCatalyst brings students together through shared learning, events, and collaboration.
          </p>
        </div>
      </div>
    </section>
  );
}
