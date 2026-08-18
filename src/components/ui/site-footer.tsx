import { ArrowUpRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteSettings } from '@/data/site-content';

export default function SiteFooter() {
  return <footer className="border-t border-[#dedcd5] px-5 py-14 sm:px-8 lg:px-10"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr]"><div><p className="eyebrow">DevCatalyst</p><p className="editorial-serif mt-4 max-w-xl text-4xl leading-[.92] tracking-[-.055em] sm:text-5xl">A student community creating real opportunities.</p></div><div className="grid content-start gap-3 text-sm font-semibold text-[#5c616a]"><Link to="/events">Events</Link><Link to="/projects">Projects</Link><Link to="/gallery">Gallery</Link><Link to="/team">Team</Link><Link to="/contact">Contact</Link></div><div><a className="text-link" href={`mailto:${siteSettings.contactEmail}`}><Mail size={15} /> {siteSettings.contactEmail}</a><a className="solid-action mt-6" href={siteSettings.whatsappUrl} target="_blank" rel="noreferrer">Join the community <ArrowUpRight size={16} /></a></div></div><div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-[#dedcd5] pt-5 text-xs text-[#5c616a] sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} DevCatalyst.</p><p>Matrusri Engineering College · Hyderabad</p></div></footer>;
}
