import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailBlocks, NextStep, PageIntro, TextList } from '@/components/editorial';
import { ALL_SERVICES, SERVICE_GROUPS } from '@/lib/catalogs/services';
import { featuredProjects } from '@/lib/editorial-content';
import { serviceImages } from '@/lib/service-media';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ALL_SERVICES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: ALL_SERVICES.find((item) => item.slug === slug)?.title ?? 'خدماتنا' };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = ALL_SERVICES.find((item) => item.slug === slug);
  if (!service) notFound();
  const group = SERVICE_GROUPS.find((item) => item.id === service.group);
  const related = featuredProjects.filter((project) => service.relatedCaseSlugs?.includes(project.slug));
  const isLocal = slug === 'google-maps-local';

  return (
    <main className="inner-page">
      <PageIntro format="reading" image={isLocal ? { asset: 'jeddah-alley' } : serviceImages[service.group]} label={group?.title} title={service.title} description={isLocal
        ? 'نساعدك في إدارة ملف النشاط التجاري على Google وتحسين معلومات الفروع وتفاعل العملاء.'
        : service.fullDescription}>
        <Link className="text-link" href={`/services#${service.group}`}>خدمات المجموعة</Link>
      </PageIntro>
      <DetailBlocks entries={[
        { title: 'نطاق العمل', body: <p>{isLocal ? 'مراجعة بيانات الفروع وساعات العمل والصور وطرق التواصل، وتنظيم متابعة التقييمات والرد عليها.' : service.shortDescription}</p> },
        { title: 'المخرجات', body: <TextList items={isLocal ? ['بيانات فروع محدثة', 'آلية للرد على التقييمات', 'تقرير بمؤشرات التفاعل مثل الاتصالات وطلبات الاتجاهات'] : service.scopeDeliverables} /> },
        { title: 'أعمال مرتبطة', body: related.length ? <div className="inline-links">{related.map((project) => <Link className="text-link" href={`/work/${project.slug}`} key={project.slug}>{project.client}</Link>)}</div> : <Link className="text-link" href="/work">تصفّح معرض الأعمال</Link> },
      ]} />
      <NextStep href={`/contact?service=${service.slug}`} />
    </main>
  );
}
