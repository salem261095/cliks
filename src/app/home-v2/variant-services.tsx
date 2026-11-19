'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useId, useRef, useState, type KeyboardEvent } from 'react';

type Service = { id: string; title: string; label: string; description: string; image: string };

export function VariantServices({ services }: { services: readonly Service[] }) {
  const id = useId();
  const tabs = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onArrow(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = services.length;
    const next = event.key === 'ArrowLeft' ? (index + 1) % count
      : event.key === 'ArrowRight' ? (index + count - 1) % count
      : event.key === 'Home' ? 0
      : event.key === 'End' ? count - 1
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current?.querySelectorAll('button')[next]?.focus();
  }

  return (
    <div className="variant-service-explorer">
      <div className="variant-service-tabs" role="tablist" aria-label="مجموعات الخدمات" ref={tabs}>
        {services.map((service, index) => (
          <button key={service.id} id={`${id}-tab-${index}`} type="button" role="tab" tabIndex={index === active ? 0 : -1}
            aria-selected={index === active} aria-controls={`${id}-panel-${index}`}
            onClick={() => setActive(index)} onKeyDown={(event) => onArrow(event, index)}>{service.label}</button>
        ))}
      </div>
      {services.map((service, index) => (
        <article key={service.id} className="variant-service-panel" id={`${id}-panel-${index}`}
          role="tabpanel" aria-labelledby={`${id}-tab-${index}`} hidden={index !== active}>
          <div className="variant-service-copy">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <Link className="cinema-link" href={`/services#${service.id}`}>استكشف الخدمة</Link>
          </div>
          {index === active && <div className="variant-service-photo">
            <Image src={`/assets/editorial/${service.image}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 53vw" />
          </div>}
        </article>
      ))}
    </div>
  );
}
