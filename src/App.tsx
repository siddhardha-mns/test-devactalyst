import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Route-level code splitting — each page is its own chunk, loaded on demand.
// This keeps the initial JS payload minimal so the first paint is fast even
// when dozens of people hit the site simultaneously at an event.
const Home       = lazy(() => import('./features/home/pages/Home'));
const Projects   = lazy(() => import('./features/projects/pages/Projects'));
const Workshops  = lazy(() => import('./features/workshops/pages/Workshops'));
const Gallery    = lazy(() => import('./features/gallery/pages/Gallery'));
const Contact    = lazy(() => import('./features/contact/pages/Contact'));
const Components = lazy(() => import('./features/dev/pages/Components'));
const Team       = lazy(() => import('./features/team/pages/Team'));

// Minimal inline fallback — no extra component to load
const PageShell = () => (
  <div className="min-h-screen bg-[#060e1a]" aria-hidden="true" />
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<PageShell />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/projects"   element={<Projects />} />
              <Route path="/workshops"  element={<Workshops />} />
              <Route path="/gallery"    element={<Gallery />} />
              <Route path="/team"       element={<Team />} />
              <Route path="/contact"    element={<Contact />} />
              <Route path="/components" element={<Components />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
