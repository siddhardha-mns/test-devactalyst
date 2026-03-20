'use client';
import { useEffect, useRef } from 'react';

interface StarsCanvasProps {
  transparent?: boolean; // Background transparency
  maxStars?: number; // Total number of stars
  hue?: number; // Base hue for the stars (0-360)
  brightness?: number; // Overall star brightness (0.1-2)
  speedMultiplier?: number; // Global animation speed multiplier
  twinkleIntensity?: number; // How often stars twinkle
  className?: string; // Custom class for the canvas
  paused?: boolean; // Pause animation toggle
  withinContainer?: boolean; // Render sized and positioned within its parent instead of fixed viewport
}

export function StarsCanvas({
  transparent = false,
  maxStars = 1200,
  hue = 217,
  brightness = 0.8,
  speedMultiplier = 1,
  twinkleIntensity = 20,
  className = '',
  paused = false,
  withinContainer = false,
}: StarsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: false })!;
    const doResize = () => {
      if (withinContainer) {
        const rect = canvas.getBoundingClientRect();
        w = canvas.width = Math.max(1, Math.floor(rect.width));
        h = canvas.height = Math.max(1, Math.floor(rect.height));
      } else {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
      }
    };
    let w = 0;
    let h = 0;
    doResize();

    const stars: Star[] = [];
    let count = 0;

    // --- Single cached gradient texture (mono-color) ---
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d')!;
    canvas2.width = 100;
    canvas2.height = 100;
    const half = canvas2.width / 2;
    const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    // Pure white star sprite (no hue tint)
    gradient2.addColorStop(0.02, '#ffffff');
    gradient2.addColorStop(0.15, '#ffffff');
    gradient2.addColorStop(0.35, 'rgba(255, 255, 255, 0.15)');
    gradient2.addColorStop(1, 'transparent');
    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // --- Utility functions ---
    const random = (min: number, max?: number) => {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      if (min > max) [min, max] = [max, min];
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const maxOrbit = (x: number, y: number) => {
      const max = Math.max(x, y);
      const diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    };

    // --- Motion/visibility guards ---
    let inViewport = true;
    let isPageHidden = typeof document !== 'undefined' ? document.hidden : false;
    const prefersReduced = typeof window !== 'undefined' &&
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(
      ([entry]) => (inViewport = entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(canvas);

    const onVisibility = () => { isPageHidden = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    // --- Star class ---
    class Star {
      orbitRadius: number;
      radius: number;
      orbitX: number;
      orbitY: number;
      timePassed: number;
      speed: number;
      alpha: number;

      constructor() {
        this.orbitRadius = random(maxOrbit(w, h));
        this.radius = random(60, this.orbitRadius) / 12;
        this.orbitX = w / 2;
        this.orbitY = h / 2;
        this.timePassed = random(0, maxStars);
        this.speed = (random(this.orbitRadius) / 50000) * speedMultiplier;
        this.alpha = Math.min(1, (random(2, 10) / 10) * brightness);
        count++;
        stars[count] = this;
      }

      draw() {
        const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX;
        const y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY;
        const twinkle = random(twinkleIntensity);

        if (twinkle === 1 && this.alpha > 0) {
          this.alpha -= 0.05;
        } else if (twinkle === 2 && this.alpha < 1) {
          this.alpha += 0.05;
        }

        ctx.globalAlpha = this.alpha;
        ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
        this.timePassed += this.speed;
      }
    }


    for (let i = 0; i < maxStars; i++) new Star();

    // --- Meteor class (rare shooting stars) ---
    class Meteor {
      x = 0;
      y = 0;
      length = 0;
      speed = 0;
      angle = 0;
      opacity = 0.9;
      active = false;

      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * w;
        this.y = -50;
        this.length = Math.random() * 70 + 40;
        this.speed = Math.random() * 6 + 3;
        this.angle = Math.PI / 4 + Math.random() * 0.4;
        this.opacity = 0.9;
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.008;
        if (this.opacity <= 0 || this.y > h + 60) this.active = false;
      }

      draw() {
        if (!this.active) return;
        const grad = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
        );
        grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        grad.addColorStop(0.5, `rgba(147,197,253,${this.opacity * 0.6})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(
          this.x - Math.cos(this.angle) * this.length,
          this.y - Math.sin(this.angle) * this.length,
        );
        ctx.stroke();
      }
    }

    const meteors: Meteor[] = [];
    let meteorTimer = 0;

    // One-time initial meteor (gentle), skip on reduced motion
    const meteorKick = setTimeout(() => {
      if (!prefersReduced && inViewport && !isPageHidden) {
        meteors.push(new Meteor());
      }
    }, 1200);

    // --- Animation loop ---
    const animate = () => {
      const shouldPause = paused || prefersReduced || isPageHidden || !inViewport;

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      // Subtle radial gradient background when not transparent
      if (!transparent) {
        const bg = ctx.createRadialGradient(
          w * 0.4,
          h * 0.35,
          0,
          w * 0.5,
          h * 0.6,
          Math.max(w, h),
        );
        bg.addColorStop(0, 'rgba(10, 14, 23, 1)');
        bg.addColorStop(1, 'rgba(1, 8, 20, 1)');
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, w, h);
      } else {
        // For transparent canvases, fully clear previous frame to avoid trails
        ctx.clearRect(0, 0, w, h);
      }

      if (!shouldPause) {
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 1; i < stars.length; i++) {
          stars[i].draw();
        }

        // Meteors (rare)
        meteorTimer++;
        if (meteorTimer > 200 && Math.random() < 0.01) {
          meteors.push(new Meteor());
          meteorTimer = 0;
        }
        for (let i = meteors.length - 1; i >= 0; i--) {
          meteors[i].update();
          meteors[i].draw();
          if (!meteors[i].active) meteors.splice(i, 1);
        }

      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // --- Resize handling ---
    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // ResizeObserver for container mode
    let ro: ResizeObserver | undefined;
    if (withinContainer && 'ResizeObserver' in window) {
      ro = new ResizeObserver(() => doResize());
      ro.observe(canvas.parentElement || canvas);
    }

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
      clearTimeout(meteorKick);
      ro?.disconnect();
    };
  }, [transparent, maxStars, hue, brightness, speedMultiplier, twinkleIntensity, paused, withinContainer]);

  return (
    <canvas
      ref={canvasRef}
      className={`${withinContainer ? 'absolute inset-0' : 'fixed top-0 left-0'} w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block', zIndex: 0 }}
    />
  );
}
