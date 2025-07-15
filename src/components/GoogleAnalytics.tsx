'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.gtag) return;
    window.gtag('config', 'G-Q55ST5RDB4', {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}
