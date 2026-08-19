import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import PageIntro from '@/components/common/PageIntro';
import { events as fallbackEvents } from '@/data/site-content';
import { loadPublishedEvents } from '@/lib/apps-script';

export default function WhatsOn() {
  const [remoteEvents, setRemoteEvents] = useState<typeof fallbackEvents | null>(null);
  const eventList = remoteEvents ?? fallbackEvents;
  const activeEvents = useMemo(() => eventList.filter((event) => event.status === 'active'), [eventList]);
  useEffect(() => { loadPublishedEvents().then(setRemoteEvents).catch(() => setRemoteEvents(null)); }, []);

  return <Layout><Helmet><title>What’s On — DevCatalyst</title></Helmet><PageIntro eyebrow="What’s on" title={<>Something worth<br />showing up for.</>}>Current and upcoming DevCatalyst events.</PageIntro><section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto max-w-7xl">{activeEvents.length === 0 ? <div className="border-y border-[#dedcd5] py-16"><p className="editorial-serif text-4xl tracking-[-.045em]">There is nothing scheduled right now.</p><p className="mt-4 max-w-xl leading-7 text-[#5c616a]">Explore the event archive to see what the community has been building.</p><Link className="text-link mt-7" to="/events">View the archive <ArrowUpRight size={16} /></Link></div> : <div className="divide-y divide-[#dedcd5] border-y border-[#dedcd5]">{activeEvents.map((event) => <article key={event.id} className="grid gap-7 py-10 lg:grid-cols-[1.2fr_.8fr]"><div><p className="eyebrow">Upcoming · {event.category}</p><h2 className="editorial-serif mt-4 text-5xl tracking-[-.055em]">{event.title}</h2><p className="mt-6 max-w-xl text-lg leading-8 text-[#5c616a]">{event.description}</p></div><div className="self-end"><p className="text-sm font-bold">{event.date}{event.time ? ` · ${event.time}` : ''}<br />{event.location}</p>{event.registrationUrl && <a href={event.registrationUrl} target="_blank" rel="noreferrer" className="solid-action mt-7">Register now <ArrowUpRight size={16} /></a>}</div></article>)}</div>}</div></section></Layout>;
}
