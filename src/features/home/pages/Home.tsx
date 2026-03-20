import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Users, Rocket, Sparkles, ArrowRight } from 'lucide-react';
import Layout from '../../../components/common/Layout';
import { StarsCanvas } from '../../../components/ui/stars-canvas';
import { GradientButton } from '../../../components/ui/gradient-button';
import { GradientText } from '../../../components/ui/animated-hero';
import { CtaButton } from '@/components/ui/cta-button';
import { Helmet } from 'react-helmet-async';
import anime from 'animejs';

// Stable blob positions — computed once at module level, never on render
const BLOBS = [
  { left: '15%',  top: '20%',  dx: 40,  dy: -30, dur: 18 },
  { left: '70%',  top: '10%',  dx: -50, dy: 40,  dur: 22 },
  { left: '40%',  top: '60%',  dx: 30,  dy: 50,  dur: 20 },
  { left: '80%',  top: '70%',  dx: -40, dy: -20, dur: 16 },
] as const;

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const alreadyShown =
      typeof window !== 'undefined' && sessionStorage.getItem('dc_loading_shown') === '1';

    if (alreadyShown) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    if (!anime) {
      setIsLoading(false);
      setShowContent(true);
      return;
    }

    anime
      .timeline()
      .add({
        targets: '.loading-logo',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 700,
        easing: 'easeOutElastic(1, .6)',
      })
      .add(
        {
          targets: '.loading-logo',
          rotate: [0, 360],
          duration: 900,
          easing: 'easeInOutQuad',
        },
        '-=300',
      )
      .add({
        targets: '.loading-text span',
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: anime.stagger(60),
        easing: 'easeOutExpo',
      })
      .add({
        targets: '.loading-screen',
        opacity: [1, 0],
        duration: 500,
        delay: 600,
        easing: 'easeInExpo',
        complete: () => {
          setIsLoading(false);
          setShowContent(true);
          try {
            sessionStorage.setItem('dc_loading_shown', '1');
          } catch {
            // ignore
          }
        },
      });
  }, []);

  const features = useMemo(
    () => [
      {
        icon: <Code className="w-6 h-6" />,
        title: 'Real Projects',
        description: 'Build portfolio-worthy projects that solve real problems',
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: 'Expert Mentorship',
        description: 'Get guidance from peers and industry professionals',
      },
      {
        icon: <Rocket className="w-6 h-6" />,
        title: 'Career Growth',
        description: 'Access to internships, referrals, and networking opportunities',
      },
    ],
    [],
  );

  return (
    <>
      <Helmet>
        <title>DevCatalyst | Learn, Build, and Grow as a Developer</title>
        <meta
          name="description"
          content="DevCatalyst is a student-led developer community focused on building real-world projects, expert mentorship, and career growth for aspiring engineers."
        />
      </Helmet>

      {isLoading && (
        <div className="loading-screen fixed inset-0 z-[100] bg-[#060e1a] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none z-0">
            <StarsCanvas
              transparent
              withinContainer
              maxStars={400}
              speedMultiplier={0.6}
              twinkleIntensity={30}
              className="z-0"
            />
          </div>
          <div className="relative flex flex-col items-center justify-center z-10">
            <motion.div
              className="loading-logo mb-12 opacity-0 relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, type: 'spring' }}
            >
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-56 h-56 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-cyan-400/25 via-blue-500/20 to-purple-600/25 blur-3xl" />
              </div>
              <img
                src="/devcatalyst-logo.svg"
                alt="DevCatalyst Logo"
                decoding="async"
                width={256}
                height={256}
                className="w-44 h-44 md:w-64 md:h-64 mx-auto rounded-2xl ring-2 ring-white/20 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              />
            </motion.div>

            <div className="loading-text text-5xl md:text-8xl font-bold flex relative z-10 tracking-tight">
              {'DevCatalyst'.split('').map((char, i) => (
                <span
                  key={i}
                  className="opacity-0 inline-block"
                  style={{
                    background:
                      'linear-gradient(135deg, #e8e8e8 0%, #ffffff 25%, #d4d4d4 50%, #ffffff 75%, #e8e8e8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <Layout>
        <div
          className={`relative ${!showContent ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          style={{ zIndex: 10, position: 'relative' }}
        >
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 safe-top overflow-hidden">
            <motion.div
              className="max-w-5xl mx-auto text-center relative z-10"
              style={{ y: y1 }}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#07121f]/50 to-[#060e1a]/50 border border-cyan-500/30 rounded-full text-white text-sm font-medium backdrop-blur-md shadow-lg shadow-cyan-500/10">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent font-semibold">
                    Student-Led Developer Community
                  </span>
                </div>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight balance hyphens-auto"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedHeadline />
              </motion.h1>

              <motion.p
                className="text-base md:text-2xl leading-relaxed text-slate-200 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
              >
                Join DevCatalyst—where curious minds become industry-ready developers through
                hands-on projects, mentorship, and real-world experience.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
              >
                <a href="https://beacons.ai/devcatalyst" target="_blank" rel="noopener noreferrer" className="group">
                  <CtaButton size="lg" variant="primary">
                    <span className="pr-2">Join Us</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </CtaButton>
                </a>
                <Link to="/contact">
                  <GradientButton variant="default">Contact Us</GradientButton>
                </Link>
              </motion.div>
            </motion.div>

            {/* Ambient background blobs — GPU-composited, stable positions */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: y2 }}>
              {BLOBS.map((blob, i) => (
                <motion.div
                  key={i}
                  className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-3xl will-change-transform"
                  style={{ left: blob.left, top: blob.top }}
                  animate={{
                    x: [0, blob.dx, 0],
                    y: [0, blob.dy, 0],
                    opacity: [0.25, 0.45, 0.25],
                  }}
                  transition={{
                    duration: blob.dur,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 3,
                  }}
                />
              ))}
            </motion.div>
          </section>

          {/* Main Description Section (Replacing Tablet Animation) */}
          <section className="relative py-20 px-6 max-w-4xl mx-auto text-slate-300 text-lg md:text-xl leading-relaxed space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <GradientText>Where Student Innovators Build the Future</GradientText>
              </h2>
              <p>
                Welcome to DevCatalyst, the premier student-led community for India's next generation of tech talent. We are the launchpad for aspiring developers, creators, and entrepreneurs ready to make their mark on the industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-cyan-300 mt-12 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> Our Mission: To Transform Passion into Profession.
              </h3>
              <p>
                We exist to bridge the gap between academic theory and industry reality. We empower students with the practical, in-demand skills and the powerful professional network needed to not just enter the tech world, but to lead it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Your Catalyst for Growth:</h3>
              <ul className="space-y-6 text-slate-300">
                <li className="flex gap-4">
                  <div className="text-cyan-400 mt-1"><Code className="w-6 h-6" /></div>
                  <div>
                    <strong className="text-white">Master In-Demand Skills:</strong> Go beyond the textbook with immersive workshops and competitive challenges designed to make you industry-ready from day one.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-cyan-400 mt-1"><Users className="w-6 h-6" /></div>
                  <div>
                    <strong className="text-white">Gain an Insider's Edge:</strong> Access exclusive talks and direct mentorship from leaders at top tech companies, giving you invaluable guidance for your career.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-cyan-400 mt-1"><Rocket className="w-6 h-6" /></div>
                  <div>
                    <strong className="text-white">Transform Ideas into Impact:</strong> Our project showcases and ideation hubs are your sandbox for innovation. Collaborate, build an impressive portfolio, and create solutions that matter.
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="text-cyan-400 mt-1"><Sparkles className="w-6 h-6" /></div>
                  <div>
                    <strong className="text-white">Unlock Your Dream Career:</strong> Tap into our curated network for exclusive internship and job opportunities. We connect you directly with the companies shaping the future.
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="border-t border-slate-800 pt-10 mt-12"
            >
              <p className="mb-6 font-medium text-white text-xl">
                DevCatalyst is more than a community; it’s a commitment to your success. Whether you're writing your first line of code or planning your first startup, you belong here.
              </p>
              <p className="mb-8">Ready to accelerate your journey?</p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <a href="https://beacons.ai/devcatalyst" target="_blank" rel="noopener noreferrer">
                  <CtaButton size="lg" variant="primary">
                    <span className="pr-2">Join Us Today</span>
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </CtaButton>
                </a>
                <div className="text-sm text-slate-400">
                  Connect with us:<br/>
                  <a href="mailto:devcatalyst.2025@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">devcatalyst.2025@gmail.com</a>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Features Preview */}
          <section className="relative py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-80px' }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="text-white">Why Choose </span>
                  <GradientText>DevCatalyst?</GradientText>
                </h2>
                <p className="text-xl text-slate-300">Accelerate your development journey with us</p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group dc-card p-6 transition-all duration-300"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.04, y: -4 }}
                    viewport={{ once: true, margin: '-60px' }}
                  >
                    <motion.div
                      className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-4 will-change-transform"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-cyan-400">{feature.icon}</div>
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">
                      <GradientText gradient="from-white via-cyan-100 to-blue-200">
                        {feature.title}
                      </GradientText>
                    </h3>
                    <p className="text-slate-300 leading-relaxed clamp-3">{feature.description}</p>
                  </motion.div>
                ))}
              </div>


            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

// Headline — word-level spring, no per-character motion nodes (reduces Framer overhead)
const AnimatedHeadline = () => {
  const words = [
    { text: 'Build.', gradient: 'from-slate-100 via-white to-slate-100' },
    { text: 'Learn.', gradient: 'from-slate-100 via-white to-slate-100' },
    { text: 'Grow.',  gradient: 'from-cyan-400 via-blue-500 to-purple-500' },
  ];

  return (
    <span className="inline-flex w-full justify-center text-center flex-wrap items-baseline gap-x-3">
      {words.map((w, wi) => (
        <motion.span
          key={wi}
          className="relative inline-block will-change-transform"
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 130,
            damping: 20,
            delay: 0.25 + wi * 0.12,
          }}
        >
          <span
            className={`relative bg-gradient-to-r ${w.gradient} bg-clip-text text-transparent inline-block px-1`}
            style={{ textShadow: '0 0 40px rgba(255,255,255,0.15)' }}
          >
            {w.text}
          </span>
        </motion.span>
      ))}
    </span>
  );
};

export default Home;
