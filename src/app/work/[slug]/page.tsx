import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailBlocks, NextStep, PageIntro, TextList } from '@/components/editorial';
import { EditorialPhoto } from '@/components/editorial-photo';
import { featuredProjects } from '@/lib/editorial-content';
import { projectConcepts } from '@/lib/homepage-content';
import { workIndex } from '@/lib/work-index';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workIndex.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = workIndex.find((item) => item.slug === slug);
  return { title: project?.name ?? 'دراسة مشروع', robots: { index: false } };
}

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const summary = workIndex.find((item) => item.slug === slug);
  const project = featuredProjects.find((item) => item.slug === slug);
  const concept = projectConcepts.find((item) => item.slug === slug);
  if (!summary || (!project && !concept)) notFound();

  const details = project ? [
    { title: 'التحدي', body: <p>{project.challenge}</p> },
    { title: 'دور كلكس', body: <p>{project.role}</p> },
    { title: 'التنفيذ المقترح', body: <TextList items={project.execution} /> },
    { title: 'المخرجات', body: <TextList items={project.outputs} /> },
    { title: 'النتائج والفترة', body: <dl className="case-metrics">{project.metrics.map((metric) => <div key={metric}><dt>{metric}</dt><dd>القيمة وفترة القياس قيد الاعتماد</dd></div>)}</dl> },
  ] : concept ? [
    { title: 'التحدي', body: <p>{concept.challenge}</p> },
    { title: 'التوجّه الإبداعي', body: <p>{concept.approach}</p> },
    { title: 'المخرجات', body: <p>{concept.deliverables}</p> },
    { title: 'خطة القياس', body: <p>{concept.measurement}</p> },
  ] : [];

  const contactHref = project ? `/contact?sector=${project.sector}&project=${project.slug}` : `/contact?sector=${summary.sector}`;

  return (
    <main className="inner-page">
      <PageIntro label={`${summary.name} · ${project ? 'مسودة دراسة' : summary.label}`} title={summary.title} description={summary.summary}>
        <Link className="text-link" href="/work">كل الأعمال</Link>
      </PageIntro>
      <div className="cliks-container editorial-plate" data-editorial-reveal="photo">
        <EditorialPhoto image={summary.image} sizes="(max-width: 760px) 90vw, 90vw" label="تصوير تحريري" />
      </div>
      <DetailBlocks entries={details} />
      <NextStep title="هل تعمل على تحدٍّ مشابه؟" href={contactHref} />
    </main>
  );
}
