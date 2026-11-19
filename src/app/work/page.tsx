import { NextStep, PageIntro } from '@/components/editorial';
import { ProjectGallery } from '@/components/project-gallery';
import { workIndex } from '@/lib/work-index';
import { SECTORS } from '@/lib/catalogs/sectors';
import { SERVICE_GROUPS } from '@/lib/catalogs/services';

const sectors = SECTORS.map(({ slug, title }) => ({ value: slug, label: title }));
const services = SERVICE_GROUPS.map(({ id, title }) => ({ value: id, label: title }));

export const metadata = { title: 'نتائجنا وأعمالنا' };

export default function WorkPage() {
  return (
    <main className="inner-page">
      <PageIntro tone="yellow" label="نتائجنا وأعمالنا" title="لكل عمل سؤال يبدأ منه."
        description="دراسات مشاريع وتصوّرات إبداعية. استكشف كيف تتحول تحديات التسويق والهوية والتجربة الرقمية إلى قرارات قابلة للتنفيذ والقياس." />
      <section className="directory cliks-container" aria-label="معرض الأعمال"><ProjectGallery entries={workIndex} sectors={sectors} services={services} /></section>
      <NextStep />
    </main>
  );
}
