'use client';

import Image from 'next/image';
import { useId, useRef } from 'react';
import type { ProjectConcept } from '@/lib/homepage-content';

export function ProjectConceptCard({ project }: { project: ProjectConcept }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();

  return (
    <>
      <button className="cinema-project cinema-project-trigger" type="button" aria-haspopup="dialog"
        onClick={() => dialog.current?.showModal()}>
        <span className={`cinema-project-photo cinema-project-${project.slug}`}>
          <Image src={`/assets/editorial/${project.image}.webp`} alt="" fill sizes="(max-width: 899px) 83vw, 51vw" unoptimized />
        </span>
        <span className="cinema-project-copy">
          <span>
            <span className="cinema-kicker">{project.name} · {project.sector}</span>
            <strong>{project.title}</strong>
            <span className="cinema-project-summary">{project.summary}</span>
          </span>
          <span className="cinema-link">عرض التصوّر</span>
        </span>
      </button>

      <dialog className="cinema-project-dialog" ref={dialog} aria-labelledby={heading}>
        <div className="cinema-dialog-top">
          <p className="cinema-kicker">تصوّر إبداعي · {project.sector}</p>
          <form method="dialog"><button type="submit" className="cinema-button" autoFocus>إغلاق</button></form>
        </div>
        <h3 id={heading}>{project.name}</h3>
        <p>{project.summary}</p>
        <dl>
          <div><dt>التحدي</dt><dd>{project.challenge}</dd></div>
          <div><dt>دور كليكس</dt><dd>{project.approach}</dd></div>
          <div><dt>المخرجات</dt><dd>{project.deliverables}</dd></div>
          <div><dt>خطة القياس</dt><dd>{project.measurement}</dd></div>
        </dl>
      </dialog>
    </>
  );
}
