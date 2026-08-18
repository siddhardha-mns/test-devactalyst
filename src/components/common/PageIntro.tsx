import type { ReactNode } from 'react';

export default function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return <section className="relative overflow-hidden border-b border-[#dedcd5] px-5 py-20 sm:px-8 sm:py-28 lg:px-10"><span className="figure -right-8 top-12 h-28 w-28 rounded-full" /><span className="figure left-[12%] top-16 h-3 w-3" /><div className="relative mx-auto max-w-7xl"><p className="eyebrow">{eyebrow}</p><h1 className="page-title mt-6 max-w-5xl">{title}</h1>{children && <div className="mt-8 max-w-2xl text-base leading-7 text-[#5c616a] sm:text-lg">{children}</div>}</div></section>;
}
