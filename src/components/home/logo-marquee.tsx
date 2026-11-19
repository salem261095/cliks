'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import './logo-marquee.css';

export function LogoMarquee({ children }: { children: ReactNode }) {
  const viewport = useRef<HTMLDivElement>(null);
  const id = useId();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = viewport.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="brand-logo-marquee" data-paused={paused} data-visible={visible}>
      <div className="brand-logo-viewport" dir="ltr" ref={viewport} id={id}>
        <div className="brand-logo-track">{children}</div>
      </div>
      <button type="button" className="brand-logo-control" aria-controls={id}
        aria-label={paused ? 'تشغيل حركة الشعارات' : 'إيقاف حركة الشعارات'} onClick={() => setPaused((value) => !value)}>
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}
