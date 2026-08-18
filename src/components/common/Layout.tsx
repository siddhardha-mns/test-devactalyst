import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SiteFooter from '../ui/site-footer';
import { ScrollProgress, ScrollToTop } from '../ui/scroll-progress';

interface LayoutProps {
  children: React.ReactNode;
  stars?: Record<string, unknown>;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7faff] text-slate-950">
      <ScrollProgress />
      <Navigation />
      <main className="site-main">{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
