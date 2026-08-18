import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';

// Route-level code splitting — each page is its own chunk, loaded on demand.
// This keeps the initial JS payload minimal so the first paint is fast even
// when dozens of people hit the site simultaneously at an event.
const Home       = lazy(() => import('./features/home/pages/Home'));

// Minimal inline fallback — no extra component to load
const PageShell = () => (
  <div className="min-h-screen bg-[#f7faff]" aria-hidden="true" />
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Suspense fallback={<PageShell />}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/projects"   element={<Home />} />
              <Route path="/workshops"  element={<Home />} />
              <Route path="/gallery"    element={<Home />} />
              <Route path="/team"       element={<Home />} />
              <Route path="/contact"    element={<Home />} />
              <Route path="/components" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
