import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'md' | 'lg';
}

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = [
      'cta group relative isolate inline-flex items-center justify-center gap-2 rounded-xl',
      'font-semibold select-none',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060e1a]',
      'disabled:opacity-60 disabled:pointer-events-none',
      // GPU-only transitions — no layout properties
      'transition-[filter,box-shadow,transform] duration-200',
      'active:scale-[0.97]',
    ].join(' ');

    const sizes: Record<NonNullable<CtaButtonProps['size']>, string> = {
      md: 'min-h-[48px] px-5 py-3 text-sm',
      lg: 'min-h-[56px] px-8 py-4 text-base',
    };
    const variants: Record<NonNullable<CtaButtonProps['variant']>, string> = {
      primary: [
        'text-white bg-[linear-gradient(90deg,var(--accent-start),var(--accent-end))]',
        'shadow-[0_6px_24px_rgba(30,144,255,0.30)]',
        'hover:shadow-[0_8px_36px_rgba(30,144,255,0.50)] hover:brightness-110',
        'hover:-translate-y-0.5',
      ].join(' '),
      outline: 'text-slate-200 bg-slate-900/40 border border-slate-700 hover:bg-slate-900/60 hover:-translate-y-0.5',
      ghost:   'text-slate-200 bg-transparent hover:bg-white/10',
    };

    return (
      <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
        {/* Ambient glow — fades in on hover via group */}
        <span className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-400/20 via-blue-500/10 to-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Shine sweep — triggered by group-hover */}
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
          <span className="absolute -left-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100 group-hover:translate-x-[350%] transition-[transform,opacity] duration-700 ease-out" />
        </span>
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      </button>
    );
  },
);
CtaButton.displayName = 'CtaButton';