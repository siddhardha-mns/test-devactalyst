import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import SiteFooter from '../ui/site-footer';

interface LayoutProps {
  children: ReactNode;
  /** Retained while legacy component demos are migrated to the editorial shell. */
  stars?: Record<string, unknown>;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Use the broadly supported overload. `behavior: "instant"` is not a
    // standard ScrollToOptions value and can break route effects in browsers.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <div className="site-shell bg-[#f7f6f2] text-[#15171b]"><Navigation /><main>{children}</main><SiteFooter /></div>;
}
