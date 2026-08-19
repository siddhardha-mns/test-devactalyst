import type { ReactNode } from 'react';

export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <section className="relative overflow-hidden border-b border-[#dedcd5] px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><span className="figure figure-float -right-8 top-12 h-28 w-28 rounded-full" /><span className="figure figure-drift left-[12%] top-16 h-3 w-3" /><span className="figure figure-float right-[24%] top-[70%] h-2 w-14" /><span className="figure-dot figure-pulse left-[32%] top-[74%]" /><div className="relative z-10 mx-auto max-w-7xl"><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-6 max-w-5xl">{title}</h1>{children && <div className="mt-7 max-w-2xl text-base leading-7 text-[#5c616a]">{children}</div>}</div></section>;
}
