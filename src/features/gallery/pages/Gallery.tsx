import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/common/Layout';
import PageIntro from '@/components/common/PageIntro';
import { events } from '@/data/site-content';
import { loadPublishedEvents } from '@/lib/apps-script';
import type { CommunityEvent } from '@/data/site-content';

export default function Gallery() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [remoteEvents, setRemoteEvents] = useState<CommunityEvent[] | null>(null);
  useEffect(() => { loadPublishedEvents().then(setRemoteEvents).catch(() => setRemoteEvents(null)); }, []);
  const galleryEvents = remoteEvents && remoteEvents.length > 0 ? remoteEvents : events;
  return <Layout><Helmet><title>Gallery — DevCatalyst</title></Helmet><PageIntro eyebrow="Gallery" title={<>The work is only part<br />of the story.</>}>Workshops, hackathons, conversations, and the people who made them happen.</PageIntro><section className="px-5 py-12 sm:px-8 sm:py-20 lg:px-10"><div className="mx-auto max-w-7xl"><div className="border-b border-[#dedcd5] pb-7"><p className="editorial-serif max-w-3xl text-3xl leading-[.98] tracking-[-.045em] sm:text-5xl">Event stories will live here: selected photographs, useful context, and the moments behind the work.</p><p className="mt-5 max-w-xl leading-7 text-[#5c616a]">Browse the archive to see the people and moments behind each DevCatalyst event.</p></div><div className="border-b border-[#dedcd5]">{galleryEvents.map((event) => <article key={event.id} className="border-t border-[#dedcd5] first:border-t-0"><button type="button" onClick={() => setOpenId(openId === event.id ? null : event.id)} className="grid w-full gap-4 py-7 text-left sm:grid-cols-[1fr_.7fr_auto] sm:items-center" aria-expanded={openId === event.id}><h2 className="editorial-serif text-3xl tracking-[-.04em]">{event.title}</h2><p className="text-sm font-bold text-[#5c616a]">{event.category}<br />{event.date}</p><ChevronDown className={`justify-self-end transition-transform ${openId === event.id ? 'rotate-180' : ''}`} size={18} /></button>{openId === event.id && <div className="border-t border-[#dedcd5] pb-8 pt-6"><p className="max-w-2xl leading-7 text-[#5c616a]">{event.description}</p>{event.images && event.images.length > 0 ? <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{event.images.map((image) => <figure key={image.url} className="overflow-hidden bg-[#e7eeff]"><img src={image.url} alt={image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />{image.caption && <figcaption className="px-3 py-3 text-sm text-[#5c616a]">{image.caption}</figcaption>}</figure>)}</div> : <p className="mt-5 text-sm font-bold text-[#5c616a]">Photos from this event will be added soon.</p>}</div>}</article>)}</div></div></section></Layout>;
}
