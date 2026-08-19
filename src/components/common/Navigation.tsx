import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { hasActiveEvents } from '@/data/site-content';
import { loadPublishedEvents } from '@/lib/apps-script';

const links = [
  { label: 'Events', to: '/events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
];

export default function Navigation({ demoMode: _demoMode = false }: { demoMode?: boolean }) {
  const [open, setOpen] = useState(false);
  const [hasRemoteActiveEvents, setHasRemoteActiveEvents] = useState<boolean | null>(null);
  const { pathname } = useLocation();
  const hasUpcomingEvents = hasRemoteActiveEvents ?? hasActiveEvents;
  const visibleLinks = hasUpcomingEvents ? [{ label: 'What’s on', to: '/whats-on' }, ...links] : links;

  useEffect(() => { loadPublishedEvents().then((loadedEvents) => setHasRemoteActiveEvents(loadedEvents.some((event) => event.status === 'active'))).catch(() => setHasRemoteActiveEvents(null)); }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dedcd5] bg-[#f7f6f2]/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-[4.6rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" className="text-lg font-extrabold tracking-[-.07em]" aria-label="DevCatalyst home">DEV<span className="text-[#2455c9]">/</span>CATALYST</Link>
        <div className="hidden items-center gap-6 lg:flex">{visibleLinks.map((link) => <Link key={link.to} className="nav-link" to={link.to} aria-current={pathname === link.to ? 'page' : undefined}>{link.label}</Link>)}</div>
        <button type="button" className="p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      </nav>
      {open && <div className="border-t border-[#dedcd5] bg-[#f7f6f2] px-5 py-6 lg:hidden"><div className="mx-auto grid max-w-7xl gap-4">{visibleLinks.map((link) => <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="editorial-serif text-3xl tracking-[-.04em]">{link.label}</Link>)}</div></div>}
    </header>
  );
}
