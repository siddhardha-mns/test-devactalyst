import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Sparkles, Mouse, Zap, Eye, Play, Navigation as NavigationIcon } from 'lucide-react';
import Layout from '../../../components/common/Layout';
import { StarsDemo } from '../../../components/ui/stars-demo';
import { TubeLightNavBarDemo } from '../../../components/ui/tubelight-navbar-demo';
import { LiquidButton } from '../../../components/ui/liquid-glass-button';
import { Modal } from '@/components/ui/modal';
import { CtaButton } from '@/components/ui/cta-button';
import { StarBorder } from '@/components/ui/star-border';
import DemoOne from '../../../components/ui/demo';
import DemoTwo from '../../../components/ui/demo2';
import { GradientButton } from '../../../components/ui/gradient-button';
import { ScrollProgress, ScrollToTop } from '../../../components/ui/scroll-progress';
import { Helmet } from 'react-helmet-async';

const Components = () => {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);

  const componentCategories = [
    {
      id: 'backgrounds',
      name: 'Background Effects',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-slate-900 to-slate-800',
    },
    {
      id: 'interactive',
      name: 'Interactive Elements',
      icon: <Mouse className="w-5 h-5" />,
      color: 'from-slate-900 to-slate-800',
    },
    {
      id: 'buttons',
      name: 'Buttons & Controls',
      icon: <Zap className="w-5 h-5" />,
      color: 'from-slate-900 to-slate-800',
    },
    {
      id: 'navigation',
      name: 'Navigation',
      icon: <NavigationIcon className="w-5 h-5" />,
      color: 'from-slate-900 to-slate-800',
    },
  ];

  const components = [
    {
      id: 'stars-canvas',
      name: 'Stars Canvas',
      category: 'backgrounds',
      description:
        'Animated starfield background with customizable colors, speed, and twinkle effects',
      features: [
        '1200+ animated stars',
        'Customizable colors',
        'Twinkling effects',
        'Responsive design',
      ],
      demo: 'stars-demo',
      color: 'from-slate-900 to-slate-800',
      icon: <Sparkles className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'liquid-button',
      name: 'Liquid Glass Button',
      category: 'buttons',
      description: 'Modern glass-morphism buttons with liquid animations and hover effects',
      features: [
        'Glass morphism design',
        'Liquid animations',
        'Multiple variants',
        'Smooth hover effects',
      ],
      demo: 'button-demo',
      color: 'from-slate-900 to-slate-800',
      icon: <Zap className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'tubelight-navbar',
      name: 'TubeLight Navigation',
      category: 'navigation',
      description: 'Animated navigation bar with tube light effect that follows active selection',
      features: ['Tube light animation', 'Responsive design', 'Icon support', 'Smooth transitions'],
      demo: 'tubelight-demo',
      color: 'from-slate-900 to-slate-800',
      icon: <NavigationIcon className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'gradient-button',
      name: 'Gradient Button',
      category: 'buttons',
      description: 'Dynamic gradient button with animated border and hover sweep',
      features: ['CSS properties', 'Animated border', 'Hover sweep', 'Accessible'],
      demo: 'gradient-button',
      color: 'from-slate-900 to-slate-800',
      icon: <Zap className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'star-border',
      name: 'Star Border',
      category: 'interactive',
      description: 'Animated border and spotlight effect that follows the cursor',
      features: ['Animated border', 'Spotlight hover', 'Particle stars', 'Customizable'],
      demo: 'star-border',
      color: 'from-slate-900 to-slate-800',
      icon: <Sparkles className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'scroll-progress',
      name: 'Scroll Progress',
      category: 'navigation',
      description: 'Container-scoped scroll progress bar and scroll-to-top helper',
      features: ['Container scoped', 'Progress bar', 'Scroll to top', 'Smooth animations'],
      demo: 'scroll-progress',
      color: 'from-slate-900 to-slate-800',
      icon: <NavigationIcon className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'shader-lines',
      name: 'Shader Lines',
      category: 'backgrounds',
      description: 'Animated WebGL shader background powered by Three.js',
      features: ['Three.js integration', 'Custom shader', 'Responsive layout'],
      demo: 'shader-lines-demo',
      color: 'from-slate-900 to-slate-800',
      icon: <Sparkles className="w-12 h-12 text-cyan-300" />,
    },
    {
      id: 'crystal-shader',
      name: 'Crystal Synthesis',
      category: 'backgrounds',
      description: 'Interactive Voronoi crystal shader responsive to mouse movements',
      features: ['Raw WebGL implementation', 'Interactive controls', 'Fluid animations'],
      demo: 'crystal-shader-demo',
      color: 'from-slate-900 to-slate-800',
      icon: <Sparkles className="w-12 h-12 text-purple-400" />,
    },
  ];

  const demoComponents = {
    'stars-demo': <StarsDemoWithText />,
    'button-demo': <ButtonDemo />,
    'tubelight-demo': <TubeLightNavBarWithText />,
    'gradient-button': <GradientButtonDemo />,
    'star-border': <StarBorderDemo />,
    'scroll-progress': <ScrollProgressDemo />,
    'shader-lines-demo': <ShaderLinesDemoWrapper />,
    'crystal-shader-demo': <CrystalShaderDemoWrapper />,
  };

  React.useEffect(() => {
    const handler = (_e: Event) => {
      const section = document.getElementById('components-grid');
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('dc_open_components', handler);
    return () => window.removeEventListener('dc_open_components', handler);
  }, []);

  return (
    <Layout stars={{ transparent: false, maxStars: 400, hue: 240, brightness: 0.4, speedMultiplier: 0.5, twinkleIntensity: 40 }}>
      <div className="select-none">
      <Helmet>
        <title>DevCatalyst | Components</title>
        <meta name="description" content="Browse DevCatalyst’s React components: stars background, liquid buttons, and animated navigation." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          className="max-w-6xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-cyan-500/30 rounded-full text-slate-200 text-base font-medium backdrop-blur">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              UI Components
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{ textShadow: '0 0 30px rgba(255,255,255,0.3)' }}
          >
            Component Library
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent block">
              Beautiful & Interactive
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-200 mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            Explore our collection of modern, animated UI components built with React, Tailwind CSS,
            and Framer Motion. Each component is designed for performance and visual appeal.
          </motion.p>

          {/* Component Categories */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {componentCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className={`flex items-center space-x-3 px-6 py-3 bg-gradient-to-r ${category.color} rounded-full text-white font-medium shadow-lg backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {category.icon}
                <span>{category.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Components Grid */}
      <section className="relative py-20 px-6" id="components-grid">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Available Components</h2>
            <p className="text-xl text-slate-200">Click on any component to see it in action</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {components.map((component, index) => {
              const hideOnMobile = component.id === 'tubelight-navbar';
              return (
              <motion.div
                key={component.id}
                role="button"
                tabIndex={0}
                className={`group relative dc-card overflow-hidden hover:border-slate-600 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 ${hideOnMobile ? 'hidden md:block' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }}
                onClick={() => { setSelectedDemo(component.demo); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { setSelectedDemo(component.demo); } }}
              >

                {/* Component Header */}
                <div
                  className={`h-40 bg-gradient-to-r ${component.color} relative overflow-hidden flex items-center justify-center`}
                >
                  <motion.div
                    className="flex items-center justify-center leading-none"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="block">{component.icon}</span>
                  </motion.div>

                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 40% 20%, white 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Component Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                    {component.name}
                  </h3>

                  <p className="text-slate-300 text-sm mb-4">{component.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {component.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-2 text-xs text-slate-400"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + featureIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Demo Button */}
                  <div className="mt-2">
                    <CtaButton
                      className="w-full"
                      size="md"
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDemo(component.demo);
                      }}
                    >
                      <Play className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
                      <span>View Demo</span>
                    </CtaButton>
                  </div>
                </div>

                {/* Hover overlay */}
                <motion.div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" />
              </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold mb-4 text-white">Ready to Use These Components?</h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                All components are open source and ready to integrate into your projects. Join our
                community to access the full library and contribute new components.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <LiquidButton
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-4 flex items-center gap-3 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 motion-safe:hover:scale-105 motion-reduce:hover:scale-100 motion-reduce:transition-none"
                  onClick={() => window.open('https://github.com/devcatalyst', '_blank')}
                >
                  <Code className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>View on GitHub</span>
                </LiquidButton>
                <LiquidButton
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-8 py-4 flex items-center gap-3 min-h-[56px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900 motion-safe:hover:scale-105 motion-reduce:hover:scale-100 motion-reduce:transition-none"
                >
                  <Eye className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <span>Browse Documentation</span>
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Full Screen Demo Modal */}
      <Modal isOpen={!!selectedDemo} onClose={() => setSelectedDemo(null)} title="Component Demo" nonSelectable>
        {selectedDemo && (demoComponents as Record<string, React.ReactNode>)[selectedDemo]}
      </Modal>
      </div>
    </Layout>
  );
};

// Button Demo Component
const ButtonDemo = () => {
  const [buttonStates, setButtonStates] = useState({
    loading: false,
    success: false,
  });

  const handleAsyncAction = async () => {
    setButtonStates({ loading: true, success: false });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setButtonStates({ loading: false, success: true });
    setTimeout(() => setButtonStates({ loading: false, success: false }), 2000);
  };

  return (
    <div className="relative min-h-[60vh] p-6">
      <div className="max-w-4xl mx-auto text-center space-y-12 dc-card p-8">
        <h1 className="text-5xl font-bold text-white mb-4">Liquid Glass Buttons</h1>
        <p className="text-slate-300 max-w-2xl mx-auto">
          A small showcase of our liquid glass button variants and states. The examples below help
          you understand sizing, styles, and interactions in context rather than as floating buttons.
        </p>

        {/* Size Variants */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Size Variants</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <LiquidButton size="sm">Small Button</LiquidButton>
            <LiquidButton size="default">Medium Button</LiquidButton>
            <LiquidButton size="lg">Large Button</LiquidButton>
          </div>
        </div>

        {/* Style Variants */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Style Variants</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <LiquidButton className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              Primary
            </LiquidButton>
            <LiquidButton variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
              Secondary
            </LiquidButton>
            <LiquidButton
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10"
            >
              Outline
            </LiquidButton>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-white">Interactive Examples</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <LiquidButton
              size="lg"
              onClick={handleAsyncAction}
              disabled={buttonStates.loading}
              className={`${buttonStates.loading ? 'opacity-70' : ''} ${buttonStates.success ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-red-600'} text-white transition-all`}
            >
              {buttonStates.loading
                ? 'Loading...'
                : buttonStates.success
                  ? '✅ Success!'
                  : 'Async Action'}
            </LiquidButton>

            <LiquidButton
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              With Icon
            </LiquidButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// Additional demo wrappers
const StarsDemoWithText = () => (
  <div className="relative min-h-[70vh] p-6">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Stars Canvas</h2>
        <p className="text-slate-300 mt-2">Interactive starfield built on Canvas. Tweak count, hue, speed, and brightness to learn animation loops and gradients.</p>
      </div>
      <div className="dc-card p-0 overflow-hidden h-[50vh]">
        <StarsDemo />
      </div>
    </div>
  </div>
);

const TubeLightNavBarWithText = () => (
  <div className="p-6">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">TubeLight Navigation</h2>
        <p className="text-slate-300 mt-2">A playful nav where a glowing indicator follows your selection. Great for teaching layout, transforms, and motion.</p>
      </div>
      <div className="dc-card p-6">
        <TubeLightNavBarDemo />
      </div>
    </div>
  </div>
);

const GradientButtonDemo = () => (
  <div className="p-8 space-y-6">
    <div className="text-center">
      <h2 className="text-3xl font-bold">Gradient Button</h2>
      <p className="text-slate-300 mt-2">CSS-powered dynamic gradient with animated border and shine sweep. Useful to learn custom properties and stateful hover effects.</p>
    </div>
    <div className="flex flex-wrap justify-center gap-4">
      <GradientButton>Default</GradientButton>
      <GradientButton variant="variant">Variant</GradientButton>
      <CtaButton variant="primary">CTA Style</CtaButton>
    </div>
  </div>
);

const StarBorderDemo = () => (
  <div className="min-h-[60vh] grid md:grid-cols-2 gap-6 p-6">
    {[1,2].map((i) => (
      <StarBorder key={i} className="p-6">
        <h3 className="text-xl font-semibold mb-2">Card {i}</h3>
        <p className="text-slate-300">Hover to see the animated border and spotlight.</p>
      </StarBorder>
    ))}
  </div>
);

const ScrollProgressDemo = () => {
  const containerRef = React.useRef(null);
  return (
    <div ref={containerRef} className="relative h-[70dvh] sm:h-[70vh] overflow-y-auto border border-slate-800 rounded-xl">
      <div className="sticky top-0 z-20">
        <ScrollProgress targetRef={containerRef} withinContainer />
      </div>
      <div className="p-6 space-y-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold">Container Scroll Progress</h2>
          <p className="text-slate-300 mt-1">This progress bar tracks scroll within this card, not the whole page.</p>
        </div>
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-slate-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.
          </p>
        ))}
        <div className="h-20" />
        <div className="flex">
          <ScrollToTop targetRef={containerRef} withinContainer />
        </div>
      </div>
    </div>
  );
};

const ShaderLinesDemoWrapper = () => (
  <div className="relative min-h-[70vh] p-6">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Shader Lines</h2>
        <p className="text-slate-300 mt-2">Custom GLSL fragment shader background built with Three.js.</p>
      </div>
      <div className="dc-card p-0 overflow-hidden">
        <DemoOne />
      </div>
    </div>
  </div>
);

const CrystalShaderDemoWrapper = () => (
  <div className="relative min-h-[80vh] p-6 lg:ml-12 lg:mr-12">
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Crystal Synthesis Base</h2>
        <p className="text-slate-300 mt-2">Voronoi math driven WebGL shader with customizable parameter sliders.</p>
      </div>
      <div className="dc-card p-0 overflow-hidden" style={{ minHeight: '650px' }}>
        <DemoTwo />
      </div>
    </div>
  </div>
);

export default Components;
