import Link from 'next/link';
import { NextStep, PageIntro } from '@/components/editorial';
import { EditorialPhoto } from '@/components/editorial-photo';
import { serviceImages } from '@/lib/service-media';
import { SERVICE_GROUPS } from '@/lib/catalogs/services';
import { serviceGroupLines } from '@/lib/editorial-content';

export const metadata = { title: 'خدماتنا' };

export default function ServicesPage() {
  return (
    <main className="inner-page">
      <PageIntro image={{ asset: 'concrete-stairs' }} label="خدماتنا" title="ابدأ بما يحتاجه عملك." description="أربع مجموعات من الخدمات تربط هدفك التجاري بالخطة والتنفيذ والقياس." />
      <div className="directory cliks-container">
        <nav className="editorial-directory-index" aria-label="مجموعات الخدمات">
          {SERVICE_GROUPS.map((group) => <Link className="text-link" key={group.id} href={`#${group.id}`}>{group.title}</Link>)}
        </nav>
        {SERVICE_GROUPS.map((group) => <section className="directory-group editorial-split" key={group.id} id={group.id}>
          <div className="service-directory-spread">
            <div data-editorial-reveal="side"><h2>{group.title}</h2><p>{serviceGroupLines[group.id]}</p></div>
            <div data-editorial-reveal="photo"><EditorialPhoto image={serviceImages[group.id]} sizes="(max-width: 760px) 90vw, 42vw" /></div>
          </div>
          <div className="editorial-rows" data-editorial-reveal>{group.items.map((item) => <Link className="editorial-row" href={`/services/${item.slug}`} key={item.slug}>
            <div><h3>{item.title}</h3><p>{item.shortDescription}</p></div><span>التفاصيل</span>
          </Link>)}</div>
        </section>)}
      </div>
      <NextStep />
    </main>
  );
}
