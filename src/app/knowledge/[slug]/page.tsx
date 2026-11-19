import Link from 'next/link';
import { notFound } from 'next/navigation';
import { NextStep, PageIntro } from '@/components/editorial';
import { KNOWLEDGE_ITEMS } from '@/lib/catalogs/knowledge';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return KNOWLEDGE_ITEMS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = KNOWLEDGE_ITEMS.find((question) => question.slug === slug);
  return { title: item?.question ?? 'مركز المعرفة' };
}

export default async function KnowledgeArticlePage({ params }: Props) {
  const { slug } = await params;
  const item = KNOWLEDGE_ITEMS.find((question) => question.slug === slug);
  if (!item) notFound();
  const related = KNOWLEDGE_ITEMS.filter((question) => question.id !== item.id &&
    (question.category === item.category || item.relatedQuestionIds?.includes(question.id))).slice(0, 3);

  return (
    <main className="inner-page">
      <article>
        <PageIntro format="reading" label={item.categoryLabel} title={item.question}>
          <Link className="text-link" href={`/knowledge?category=${item.category}`}>أسئلة هذا الموضوع</Link>
        </PageIntro>
        <div className="cliks-container editorial-answer">
          <section aria-labelledby="article-answer-title">
            <h2 id="article-answer-title">الإجابة</h2>
            <p className="answer">{item.answer}</p>
            <p className="item-meta">الكاتب المقترح · {item.author}<br />تاريخ المراجعة · قيد الاعتماد</p>
          </section>
          <nav className="editorial-answer-related" aria-labelledby="article-related-title" data-editorial-reveal>
            <h2 id="article-related-title">اقرأ أيضاً</h2>
            {related.length ? <div className="editorial-rows">
              {related.map((question) => <Link className="editorial-row" key={question.id} href={`/knowledge/${question.slug}`}>{question.question}</Link>)}
            </div> : <Link className="text-link" href="/knowledge">جميع أسئلة مركز المعرفة</Link>}
          </nav>
        </div>
      </article>
      <NextStep title="هل لديك سؤال عن مشروعك؟" />
    </main>
  );
}
