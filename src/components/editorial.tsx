import Link from 'next/link';
import type { ReactNode } from 'react';
import { EditorialPhoto, type EditorialImage } from './editorial-photo';

export const contactLabel = 'ناقش أهدافك معنا';

export function PageIntro({ label, title, description, children, tone = 'ink', image, media, format }: {
  label?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  tone?: 'ink' | 'yellow' | 'paper';
  image?: EditorialImage;
  media?: ReactNode;
  format?: 'reading' | 'compact';
}) {
  return (
    <header className="editorial-masthead" data-tone={tone} data-format={format}>
      <div className="cliks-container editorial-masthead-inner" data-split={Boolean(image || media)}>
        <div className="editorial-masthead-copy">
          {label && <p className="editorial-label">{label}</p>}
          <h1 className="display">{title}</h1>
          {description && <p className="lead">{description}</p>}
          {children && <div className="editorial-masthead-actions">{children}</div>}
        </div>
        {media ?? (image && <EditorialPhoto image={image} sizes="(max-width: 760px) 90vw, 38vw" priority />)}
      </div>
    </header>
  );
}

export function StorySpread({ image, media, label, title, children, reverse = false, id }: {
  image?: EditorialImage; media?: ReactNode; label: string; title: string; children: ReactNode; reverse?: boolean; id?: string;
}) {
  return (
    <article className="editorial-spread" id={id} data-reverse={reverse}>
      <div className="editorial-spread-image" data-editorial-reveal="photo">
        {media ?? (image && <EditorialPhoto image={image} sizes="(max-width: 760px) 90vw, 53vw" />)}
      </div>
      <div className="editorial-spread-copy" data-editorial-reveal="side">
        <p className="editorial-label">{label}</p><h2>{title}</h2>
        {children}
      </div>
    </article>
  );
}

export function NextStep({ title = 'ما الهدف الذي تريد العمل عليه؟', href = '/contact', label = contactLabel }: {
  title?: string; href?: string; label?: string;
}) {
  return (
    <section className="next-step">
      <div className="cliks-container next-step-inner">
        <h2 data-editorial-reveal>{title}</h2>
        <Link className="button button-dark" href={href}>{label}</Link>
      </div>
    </section>
  );
}

export function DetailBlocks({ entries }: { entries: { title: string; body: ReactNode }[] }) {
  return (
    <div className="detail-blocks cliks-container">
      {entries.map(({ title, body }) => (
        <section className="detail-row" key={title}>
          <h2 data-editorial-reveal="side">{title}</h2>
          <div data-editorial-reveal>{body}</div>
        </section>
      ))}
    </div>
  );
}

export function TextList({ items }: { items: readonly string[] }) {
  return <ul className="text-list">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}
