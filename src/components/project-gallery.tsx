'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { WorkSummary } from '@/lib/work-index';
import { EditorialPhoto } from './editorial-photo';

type FilterOption = { value: string; label: string };

export function ProjectGallery({ entries, sectors, services }: {
  entries: readonly WorkSummary[]; sectors: FilterOption[]; services: FilterOption[];
}) {
  const [sector, setSector] = useState('');
  const [service, setService] = useState('');
  const projects = entries.filter((project) => (!sector || project.sector === sector) && (!service || project.group === service));

  return (
    <>
      <div className="filter-bar">
        <label>القطاع<select value={sector} onChange={(event) => setSector(event.target.value)}>
          <option value="">كل القطاعات</option>
          {sectors.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
        </select></label>
        <label>الخدمة<select value={service} onChange={(event) => setService(event.target.value)}>
          <option value="">كل الخدمات</option>
          {services.map((item) => <option value={item.value} key={item.value}>{item.label}</option>)}
        </select></label>
        {(sector || service) && <button className="text-link" type="button" onClick={() => { setSector(''); setService(''); }}>إعادة ضبط الفلاتر</button>}
      </div>
      <p className="filter-status" role="status">{projects.length ? `${new Intl.NumberFormat('ar-SA').format(projects.length)} من الأعمال` : 'لا توجد أعمال تطابق الفلاتر الحالية.'}</p>
      <div className="editorial-work-list">
        {projects.map((project) => (
          <Link className="editorial-work-card" href={`/work/${project.slug}`} key={project.slug}>
            <div data-editorial-reveal="photo"><EditorialPhoto image={project.image} sizes="(max-width: 760px) 90vw, 52vw" /></div>
            <div className="editorial-work-copy">
              <p className="editorial-label">{project.name} · {project.label}</p>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <span className="text-link">اقرأ القصة</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
