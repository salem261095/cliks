'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollReveals() {
  const path = usePathname();

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0 });

    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    for (const target of targets) {
      if (target.getBoundingClientRect().top <= window.innerHeight) continue;
      target.classList.add('reveal-ready');
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      targets.forEach((target) => target.classList.remove('reveal-ready', 'reveal-in'));
    };
  }, [path]);

  return null;
}
