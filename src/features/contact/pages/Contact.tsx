import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/common/Layout';
import PageIntro from '@/components/common/PageIntro';
import { siteSettings } from '@/data/site-content';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) });
      if (!response.ok) throw new Error('Unable to submit right now. Please email us instead.');
      setSent(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit right now.');
    } finally { setIsSending(false); }
  };
  return <Layout><Helmet><title>Contact — DevCatalyst</title></Helmet><PageIntro eyebrow="Contact" title={<>Let’s make something<br />useful happen.</>}>For collaborations, speakers, partnerships, event ideas, or anything that could create a real opportunity for students.</PageIntro><section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10"><div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[.8fr_1.2fr]"><div className="space-y-12"><div><p className="eyebrow">Collaborate</p><h2 className="editorial-serif mt-4 text-4xl tracking-[-.045em]">Bring an idea, a session, or a partnership.</h2><p className="mt-4 max-w-md leading-7 text-[#5c616a]">For events, workshops, collaborations, and conversations that could help the community move forward.</p></div><div><p className="eyebrow">Community</p><h2 className="editorial-serif mt-4 text-4xl tracking-[-.045em]">Stay close to what’s next.</h2><a className="text-link mt-5" href={siteSettings.whatsappUrl} target="_blank" rel="noreferrer">Join WhatsApp <ArrowUpRight size={16} /></a></div><a className="text-link" href={`mailto:${siteSettings.contactEmail}`}><Mail size={16} /> {siteSettings.contactEmail}</a></div><form onSubmit={submit} className="border-t border-[#dedcd5] pt-7"><p className="eyebrow">Send a message</p>{sent ? <div className="mt-8 border-l-2 border-[#2455c9] pl-5"><h2 className="editorial-serif text-4xl tracking-[-.045em]">Thanks. We’ll be in touch.</h2><p className="mt-3 leading-7 text-[#5c616a]">For now, you can also reach us directly at {siteSettings.contactEmail}.</p></div> : <div className="mt-8 grid gap-6"><label className="grid gap-2 text-sm font-bold">Name<input required name="name" className="border-b border-[#15171b] bg-transparent px-0 py-3 outline-none focus:border-[#2455c9]" /></label><label className="grid gap-2 text-sm font-bold">Email<input required type="email" name="email" className="border-b border-[#15171b] bg-transparent px-0 py-3 outline-none focus:border-[#2455c9]" /></label><label className="grid gap-2 text-sm font-bold">What would you like to talk about?<input required name="subject" className="border-b border-[#15171b] bg-transparent px-0 py-3 outline-none focus:border-[#2455c9]" /></label><label className="grid gap-2 text-sm font-bold">Message<textarea required name="message" rows={5} className="border-b border-[#15171b] bg-transparent px-0 py-3 outline-none focus:border-[#2455c9]" /></label>{error && <p className="text-sm font-semibold text-red-700">{error}</p>}<button className="solid-action w-fit disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSending}>{isSending ? 'Sending…' : 'Send message'} <ArrowUpRight size={16} /></button></div>}</form></div></section></Layout>;
}
