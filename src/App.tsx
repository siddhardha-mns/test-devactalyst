import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const Home = lazy(() => import('./features/home/pages/Home'));
const Events = lazy(() => import('./features/workshops/pages/Workshops'));
const Projects = lazy(() => import('./features/projects/pages/Projects'));
const Gallery = lazy(() => import('./features/gallery/pages/Gallery'));
const Team = lazy(() => import('./features/team/pages/Team'));
const Contact = lazy(() => import('./features/contact/pages/Contact'));
const WhatsOn = lazy(() => import('./features/whats-on/pages/WhatsOn'));
const Admin = lazy(() => import('./features/admin/pages/Admin'));

const Loading = () => <div className="min-h-screen bg-[#f7f6f2]" aria-label="Loading page" />;

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/whats-on" element={<WhatsOn />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
