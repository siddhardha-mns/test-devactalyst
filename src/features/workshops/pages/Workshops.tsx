import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/common/Layout';
import PageIntro from '@/components/common/PageIntro';
import { events, type EventCategory } from '@/data/site-content';

const filters: Array<EventCategory | 'All'> = ['All', 'Workshop', 'Hackathon', 'Talk / Meetup', 'Community'];

export default function Events() {
  const [filter, setFilter] = useState<EventCategory | 'All'>('All');
  const [openId, setOpenId] = useState<string | null>(events[0]?.id ?? null);
  const visibleEvents = useMemo(() => filter === 'All' ? events : events.filter((event) => event.category === filter), [filter]);
  return <Layout><Helmet><title>Events — DevCatalyst</title></Helmet><PageIntro eyebrow="Events" title={<>Learning gets more useful<br />when you leave with something built.</>}>From practical workshops to hackathons and community sessions, every event is designed to make room for doing.</PageIntro><section className="px-5 py-12 sm:px-8 sm:py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-[#dedcd5] pb-5">{filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`text-xs font-extrabold uppercase tracking-[.1em] ${filter === item ? 'text-[#2455c9]' : 'text-[#5c616a]'}`}>{item === 'All' ? 'All events' : item}</button>)}</div><div className="border-b border-[#dedcd5]">{visibleEvents.map((event) => <article key={event.id} className="border-t border-[#dedcd5] first:border-t-0"><button type="button" className="grid w-full gap-4 py-7 text-left sm:grid-cols-[1.2fr_.75fr_.45fr_auto] sm:items-center" onClick={() => setOpenId(openId === event.id ? null : event.id)} aria-expanded={openId === event.id}><h2 className="editorial-serif text-3xl tracking-[-.04em]">{event.title}</h2><p className="text-sm leading-6 text-[#5c616a]">{event.outcome}</p><p className="text-sm font-bold text-[#5c616a]">{event.category}<br />{event.date}</p><ChevronDown className={`justify-self-end transition-transform ${openId === event.id ? 'rotate-180' : ''}`} size={18} /></button>{openId === event.id && <div className="grid gap-6 border-t border-[#dedcd5] pb-8 pt-6 sm:grid-cols-[1.2fr_.8fr]"><p className="max-w-2xl leading-7 text-[#5c616a]">{event.description}</p><dl className="grid grid-cols-2 gap-5 text-sm"><div><dt className="eyebrow">Location</dt><dd className="mt-1 font-bold">{event.location}</dd></div>{event.time && <div><dt className="eyebrow">Time</dt><dd className="mt-1 font-bold">{event.time}</dd></div>}{event.facilitator && <div><dt className="eyebrow">Facilitator</dt><dd className="mt-1 font-bold">{event.facilitator}</dd></div>}</dl></div>}</article>)}</div></div></section></Layout>;
}
