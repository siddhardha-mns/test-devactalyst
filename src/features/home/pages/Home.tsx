import { ArrowUpRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { events, projects, siteSettings } from '@/data/site-content';

const rule = 'my-6 border-0 border-t border-current opacity-30 sm:my-8';

export default function Home() {
  const selectedEvents = events.slice(0, 3);
  const selectedProjects = projects.slice(0, 3);
  return <Layout><Helmet><title>DevCatalyst — Learn, build, meet your people</title><meta name="description" content="DevCatalyst is a student community for learning together, building useful things, and finding opportunities." /></Helmet><FlowArt>
    <FlowSection aria-label="DevCatalyst introduction" style={{ backgroundColor: '#2455c9', color: '#f7f6f2' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em]">01 — Student-led · Hyderabad</p><hr className={rule} />
      <div><h1 className="flex items-center gap-[.13em] whitespace-nowrap text-[clamp(1.8rem,7.7vw,7.5rem)] font-extrabold leading-none tracking-[-.08em]"><img src="/devcatalyst-mark.svg" alt="" className="h-[1.45em] w-auto shrink-0 brightness-0 invert" />DEVCATALYST</h1></div><hr className={rule} />
      <div className="grid gap-7 md:grid-cols-[1.15fr_.85fr] md:items-end"><p className="max-w-xl text-xl font-semibold leading-tight sm:text-3xl">A community for students who like making things happen.</p><p className="max-w-md text-base leading-7 text-white/75">Learn together, build useful things, and meet people who can help you go further.</p></div>
    </FlowSection>

    <FlowSection aria-label="What DevCatalyst does" style={{ backgroundColor: '#f7f6f2', color: '#15171b' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2455c9]">02 — Why we exist</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Find your people.<br />Build what matters.</h2></div><hr className={rule} />
      <div className="grid gap-7 md:grid-cols-3"><p className="text-lg leading-7 text-[#5c616a]">Practical workshops, helpful talks, and the kind of learning that sticks because you actually use it.</p><p className="text-lg leading-7 text-[#5c616a]">Projects, hackathons, and room to try an idea before it feels fully figured out.</p><p className="text-lg leading-7 text-[#5c616a]">Peers, mentors, and opportunities that are easier to find when you are not doing it alone.</p></div>
    </FlowSection>

    <FlowSection aria-label="Ways to get involved" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em]">03 — Pick a starting point</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Learn. Build.<br />Find what’s next.</h2></div><hr className={rule} />
      <div className="grid gap-7 md:grid-cols-3"><div><p className="text-sm font-extrabold uppercase tracking-[.12em]">01 — Learn together</p><p className="mt-3 text-lg leading-7 text-white/80">Hands-on workshops and talks that leave you with something useful.</p></div><div><p className="text-sm font-extrabold uppercase tracking-[.12em]">02 — Build in public</p><p className="mt-3 text-lg leading-7 text-white/80">Projects, hackathons, and practical collaboration with people who care about the work.</p></div><div><p className="text-sm font-extrabold uppercase tracking-[.12em]">03 — Find opportunity</p><p className="mt-3 text-lg leading-7 text-white/80">Peers, partners, mentors, and doors worth opening.</p></div></div>
    </FlowSection>

    <FlowSection aria-label="DevCatalyst community impact" style={{ backgroundColor: '#fd5200', color: '#fff' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em]">04 — In motion</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Good things<br />compound.</h2></div><hr className={rule} />
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-5">{siteSettings.stats.map(([value, label]) => <div key={label}><p className="text-3xl font-extrabold tracking-[-.06em] sm:text-5xl">{value}</p><p className="mt-2 text-xs font-bold uppercase tracking-[.12em] text-white/60">{label}</p></div>)}</div>
      <p className="max-w-xl text-lg leading-7 text-white/70">Every session can lead to a teammate, a project, a skill, or a new direction. That is the point.</p>
    </FlowSection>

    <FlowSection aria-label="Recent DevCatalyst events" style={{ backgroundColor: '#15171b', color: '#f7f6f2' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#9bb7ff]">05 — Recent moments</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Work that brought<br />people together.</h2></div><hr className={rule} />
      <div className="divide-y divide-white/20 border-y border-white/20">{selectedEvents.map((event) => <Link key={event.id} to="/events" className="grid gap-2 py-4 transition hover:pl-2 sm:grid-cols-[1.2fr_.8fr_.45fr]"><p className="text-xl font-bold tracking-[-.04em]">{event.title}</p><p className="text-sm leading-6 text-white/65">{event.outcome}</p><p className="text-sm font-bold text-white/70">{event.category}<br />{event.date}</p></Link>)}</div>
      <Link className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.08em] text-[#9bb7ff]" to="/events">All events <ArrowUpRight size={16} /></Link>
    </FlowSection>

    <FlowSection aria-label="Community projects" style={{ backgroundColor: '#15171b', color: '#f7f6f2' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#9bb7ff]">06 — Selected projects</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Ideas made real.</h2></div><hr className={rule} />
      <div className="grid gap-6 md:grid-cols-3">{selectedProjects.map((project) => <article key={project.id} className="border-t border-white/25 pt-4"><p className="text-xs font-extrabold uppercase tracking-[.12em] text-[#9bb7ff]">{project.area}</p><h3 className="mt-3 text-2xl font-bold tracking-[-.05em]">{project.title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{project.description}</p><p className="mt-4 text-sm font-bold text-white/80">Built by {project.creators}</p></article>)}</div>
      <Link className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[.08em] text-[#9bb7ff]" to="/projects">All projects <ArrowUpRight size={16} /></Link>
    </FlowSection>

    <FlowSection aria-label="DevCatalyst partners" style={{ backgroundColor: '#e7eeff', color: '#15171b' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2455c9]">07 — Alongside</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">More happens<br />together.</h2></div><hr className={rule} />
      <p className="max-w-2xl text-xl font-semibold leading-tight sm:text-3xl">People and communities who believe students should have access to more.</p>
      <div className="flex flex-wrap gap-x-9 gap-y-4 border-y border-[#15171b]/20 py-6 text-xl font-extrabold tracking-[-.04em] sm:text-2xl">{siteSettings.partners.map((partner) => <span key={partner}>{partner}</span>)}</div>
    </FlowSection>

    <FlowSection aria-label="Join DevCatalyst" style={{ backgroundColor: '#e7eeff', color: '#15171b' }}>
      <p className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2455c9]">08 — Come build with us</p><hr className={rule} />
      <div><h2 className="max-w-5xl text-[clamp(3.25rem,8vw,8rem)] font-extrabold leading-[.84] tracking-[-.07em]">Show up.<br />Try things.<br />Keep going.</h2></div><hr className={rule} />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><p className="max-w-xl text-xl font-semibold leading-tight sm:text-3xl">Your next idea does not have to start alone.</p><div className="flex flex-wrap gap-5"><Link className="inline-flex items-center gap-2 border border-[#15171b] px-5 py-3 text-sm font-extrabold uppercase tracking-[.08em] transition hover:bg-[#15171b] hover:text-white" to="/events">See events <ArrowUpRight size={16} /></Link><a className="inline-flex items-center gap-2 bg-[#2455c9] px-5 py-3 text-sm font-extrabold uppercase tracking-[.08em] text-white transition hover:bg-[#15171b]" href={siteSettings.whatsappUrl} target="_blank" rel="noreferrer">Join WhatsApp <ArrowUpRight size={16} /></a></div></div>
    </FlowSection>
  </FlowArt></Layout>;
}
