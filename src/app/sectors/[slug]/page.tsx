import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailBlocks, NextStep, PageIntro, TextList } from '@/components/editorial';
import { SECTORS } from '@/lib/catalogs/sectors';
import { ALL_SERVICES } from '@/lib/catalogs/services';
import { featuredProjects } from '@/lib/editorial-content';
import { sectorImage } from '@/lib/editorial-media';
import { workIndex } from '@/lib/work-index';

type Props = { params: Promise<{ slug: string }> };
const suggestedServices: Record<string, string[]> = {
  'food-beverage': ['paid-media', 'ad-creative-production'],
  ecommerce: ['ecommerce-cro', 'brand-identity', 'paid-media'],
  restaurants: ['google-maps-local', 'ad-creative-production'],
  education: ['sostac-consulting', 'paid-media'],
};

export function generateStaticParams() {
  return SECTORS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: SECTORS.find((item) => item.slug === slug)?.title ?? 'قطاعاتنا' };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = SECTORS.find((item) => item.slug === slug);
  if (!sector) notFound();
  const projects = featuredProjects.filter((project) => project.sector === slug);
  const concepts = workIndex.filter((entry) => entry.sector === slug && entry.label === 'تصوّر إبداعي');
  const services = ALL_SERVICES.filter((service) => suggestedServices[slug]?.includes(service.slug));

  return (
    <main className="inner-page">
      <PageIntro image={sectorImage(slug)} label={sector.title} title={sector.headline} description={sector.summary}>
        <Link className="text-link" href="/sectors">كل القطاعات</Link>
      </PageIntro>
      <DetailBlocks entries={[
        { title: 'تحديات القطاع', body: <TextList items={sector.challenges} /> },
        { title: 'كيف نساعد', body: <TextList items={sector.cliksSolutions} /> },
        { title: 'خدمات مناسبة', body: <div className="inline-links">{services.map((service) => <Link className="text-link" href={`/services/${service.slug}`} key={service.slug}>{service.title}</Link>)}</div> },
        { title: 'العملاء والأعمال', body: <div className="inline-links">
          {projects.map((project) => <Link className="text-link" href={`/work/${project.slug}`} key={project.slug}>{project.client} · دراسة مشروع</Link>)}
          {concepts.map((concept) => <Link className="text-link" href={`/work/${concept.slug}`} key={concept.slug}>{concept.name} · تصوّر إبداعي</Link>)}
        </div> },
        { title: 'النتائج الموثّقة', body: <p>تُضاف المؤشرات وفترات القياس بعد المراجعة.</p> },
      ]} />
      <NextStep title="ما تحدّيك في هذا القطاع؟" href={`/contact?sector=${sector.slug}`} />
    </main>
  );
}
