'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { TEAM_MEMBERS } from '@/lib/catalogs/team';
import './team-roster.css';

export function TeamRoster({ headingLevel }: { headingLevel: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  const carouselId = useId();
  const track = useRef<HTMLUListElement>(null);
  const [{ atStart, atEnd }, setEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const list = track.current;
    if (!list) return;

    function updateEdges() {
      if (!list) return;
      const position = Math.abs(list.scrollLeft);
      setEdges({ atStart: position < 1, atEnd: position >= list.scrollWidth - list.clientWidth - 1 });
    }

    const observer = new ResizeObserver(updateEdges);
    observer.observe(list);
    list.addEventListener('scroll', updateEdges, { passive: true });
    updateEdges();
    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', updateEdges);
    };
  }, []);

  function move(direction: -1 | 1) {
    const list = track.current;
    const firstCard = list?.firstElementChild;
    const secondCard = firstCard?.nextElementSibling;
    if (!list || !firstCard || !secondCard) return;

    const step = Math.abs(firstCard.getBoundingClientRect().left - secondCard.getBoundingClientRect().left);
    list.scrollBy({ left: -direction * step });
  }

  return (
    <div className="team-carousel">
      <ul className="team-roster" id={carouselId} ref={track} tabIndex={0} aria-label="أعضاء الفريق" dir="rtl">
        {TEAM_MEMBERS.map((member) => (
          <li key={member.id} className="team-card">
            <div className="team-card-portrait" aria-hidden={!member.portrait || undefined}>
              {member.portrait && (
                <Image src={member.portrait} alt={`صورة ${member.name}`} fill
                  sizes="(max-width: 520px) 82vw, (max-width: 760px) 45vw, (max-width: 1100px) 29vw, 18vw" unoptimized />
              )}
            </div>
            <div className="team-card-caption">
              <Heading>{member.name}</Heading>
              <p>{member.role}</p>
              <p className="team-card-specialization">{member.specialization}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="team-carousel-controls" dir="rtl">
        <button type="button" aria-label="الأعضاء السابقون" aria-controls={carouselId} disabled={atStart} onClick={() => move(-1)}>
          <ChevronRight aria-hidden="true" />
        </button>
        <button type="button" aria-label="الأعضاء التاليون" aria-controls={carouselId} disabled={atEnd} onClick={() => move(1)}>
          <ChevronLeft aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
