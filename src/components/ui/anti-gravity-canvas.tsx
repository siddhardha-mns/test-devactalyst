import { useEffect, useRef, useCallback } from 'react';

const PARTICLE_DENSITY = 0.00010;
const BG_PARTICLE_DENSITY = 0.000035;
const MOUSE_RADIUS = 160;
const RETURN_SPEED = 0.07;
const DAMPING = 0.88;
const REPULSION_STRENGTH = 1.1;
const MAX_PARTICLES = 180;
const MAX_BG_PARTICLES = 60;

interface Particle {
  x: number; y: number;
  originX: number; originY: number;
  vx: number; vy: number;
  size: number; color: string;
}

interface BgParticle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number; phase: number;
}

interface MouseState { x: number; y: number; isActive: boolean; }

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

interface AntiGravityCanvasProps { className?: string; }

export const AntiGravityCanvas = ({ className = '' }: AntiGravityCanvasProps) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const bgParticlesRef = useRef<BgParticle[]>([]);
  const mouseRef     = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef   = useRef<number>(0);
  const pausedRef    = useRef<boolean>(false);

  const initParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor(width * height * PARTICLE_DENSITY), MAX_PARTICLES);
    const ps: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ps.push({ x, y, originX: x, originY: y, vx: 0, vy: 0,
        size: randomRange(1, 2.5),
        color: Math.random() > 0.9 ? '#4285F4' : '#ffffff' });
    }
    particlesRef.current = ps;

    const bgCount = Math.min(Math.floor(width * height * BG_PARTICLE_DENSITY), MAX_BG_PARTICLES);
    const bgs: BgParticle[] = [];
    for (let i = 0; i < bgCount; i++) {
      bgs.push({ x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        size: randomRange(0.5, 1.5), alpha: randomRange(0.1, 0.4),
        phase: Math.random() * Math.PI * 2 });
    }
    bgParticlesRef.current = bgs;
  }, []);

  const animate = useCallback((time: number) => {
    frameIdRef.current = requestAnimationFrame(animate);
    if (pausedRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const pulseOpacity = Math.sin(time * 0.0007) * 0.03 + 0.07;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(canvas.width, canvas.height) * 0.65);
    grad.addColorStop(0, `rgba(66,133,244,${pulseOpacity})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const bgs = bgParticlesRef.current;
    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < bgs.length; i++) {
      const p = bgs[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width; else if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; else if (p.y > canvas.height) p.y = 0;
      const twinkle = Math.sin(time * 0.0018 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.3 + 0.7 * twinkle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (mouse.isActive) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx -= (dx / dist) * force * REPULSION_STRENGTH * 5;
          p.vy -= (dy / dist) * force * REPULSION_STRENGTH * 5;
        }
      }
      p.vx += (p.originX - p.x) * RETURN_SPEED;
      p.vy += (p.originY - p.y) * RETURN_SPEED;
      p.vx *= DAMPING; p.vy *= DAMPING;
      p.x += p.vx; p.y += p.vy;

      const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      ctx.globalAlpha = Math.min(0.3 + vel * 0.1, 1);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      initParticles(width, height);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  useEffect(() => {
    const onVisibility = () => { pausedRef.current = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);
    const io = new IntersectionObserver(
      ([entry]) => { pausedRef.current = !entry.isIntersecting; },
      { threshold: 0.05 },
    );
    if (canvasRef.current) io.observe(canvasRef.current);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isActive: true };
    };
    const onLeave = () => { mouseRef.current.isActive = false; };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
