"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type LoaderPhase = "visible" | "leaving" | "hidden";

export default function SiteLoader() {
  const [phase, setPhase] = useState<LoaderPhase>("visible");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimum = reduce ? 0 : 400;
    const fade = reduce ? 0 : 500;
    let started = false;
    let leaveTimer = 0;
    let removeTimer = 0;

    const begin = () => {
      if (started) return;
      started = true;
      leaveTimer = window.setTimeout(() => {
        setPhase("leaving");
        removeTimer = window.setTimeout(() => setPhase("hidden"), fade);
      }, minimum);
    };

    const fallbackTimer = window.setTimeout(begin, 2500);
    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
    }

    return () => {
      window.removeEventListener("load", begin);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden={phase === "leaving" ? "true" : undefined}
      className={`dc-site-loader fixed inset-0 z-[100] grid place-items-center bg-catalyst-paper transition-opacity duration-500 motion-reduce:transition-none ${phase === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <div role="status" aria-live="polite" className="flex flex-col items-center gap-5">
        <span className="dc-loader">
          <Image src="/logo-mark.svg" alt="" width={44} height={44} priority className="size-11" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.32em] text-catalyst-muted">DevCatalyst</span>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
}
