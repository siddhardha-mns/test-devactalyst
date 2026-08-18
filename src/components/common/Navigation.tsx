import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const items = [
  { name: 'Network', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Workshops', path: '#workshops' },
  { name: 'Gallery', path: '#gallery' },
  { name: 'Team', path: '#team' },
];

const Navigation = ({ demoMode: _demoMode = false }: { demoMode?: boolean }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const linkClass = (path: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${location.hash === path
      ? 'bg-blue-50 text-blue-700'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-slate-200/90 bg-white/85 px-3 py-2 shadow-[0_10px_35px_rgba(30,64,175,0.08)] backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 px-2" aria-label="DevCatalyst home">
          <img src="/devcatalyst-logo.svg" alt="" className="h-9 w-9 rounded-lg" />
          <span className="text-sm font-bold tracking-tight text-slate-950">DevCatalyst</span>
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => <a key={item.path} href={item.path} className={linkClass(item.path)}>{item.name}</a>)}
        </div>
        <a href="https://beacons.ai/devcatalyst" target="_blank" rel="noreferrer" className="hidden rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 md:block">Join us</a>
        <button type="button" onClick={() => setOpen(!open)} className="rounded-xl p-2 text-slate-700 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
      {open && <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden">
        {items.map((item) => <a key={item.path} href={item.path} onClick={() => setOpen(false)} className={`block ${linkClass(item.path)}`}>{item.name}</a>)}
        <a href="https://beacons.ai/devcatalyst" target="_blank" rel="noreferrer" className="mt-2 block rounded-xl bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white">Join us</a>
      </div>}
    </header>
  );
};

export default Navigation;
