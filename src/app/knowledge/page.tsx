import Link from 'next/link';
import { PageIntro } from '@/components/editorial';
import { KNOWLEDGE_CATEGORIES, KNOWLEDGE_ITEMS } from '@/lib/catalogs/knowledge';

export const metadata = { title: 'مركز المعرفة' };
type Search = { q?: string | string[]; category?: string | string[]; page?: string | string[] };
const pageSize = 8;

export default async function KnowledgePage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q.trim().slice(0, 120) : '';
  const category = KNOWLEDGE_CATEGORIES.find((item) => item.id === params.category)?.id ?? 'all';
  const terms = query.toLocaleLowerCase('ar').split(/\s+/).filter(Boolean);
  const items = KNOWLEDGE_ITEMS.filter((item) => {
    const text = [item.question, item.answer, ...item.tags].join(' ').toLocaleLowerCase('ar');
    return (category === 'all' || category === item.category) && terms.every((term) => text.includes(term));
  });
  const pages = Math.max(1, Math.ceil(items.length / pageSize));
  const requested = typeof params.page === 'string' ? Number(params.page) : 1;
  const page = Number.isInteger(requested) ? Math.min(pages, Math.max(1, requested)) : 1;

  function pageHref(target: number) {
    const filters = new URLSearchParams();
    if (query) filters.set('q', query);
    if (category !== 'all') filters.set('category', category);
    if (target > 1) filters.set('page', String(target));
    return filters.size ? `/knowledge?${filters}` : '/knowledge';
  }

  return (
    <main className="inner-page">
      <PageIntro tone="paper" format="compact" label="مركز المعرفة" title="إجابات لقراراتك التسويقية." description="ابحث في أسئلة عن الاستراتيجية والحملات والمتاجر والظهور المحلي والقياس ومنتجات كليكس." />
      <section className="directory cliks-container" aria-label="بنك الأسئلة">
        <form className="filter-bar" action="/knowledge" method="get">
          <label className="search-field">ابحث في الأسئلة<input name="q" type="search" maxLength={120} defaultValue={query} placeholder="مثلاً، تكلفة الاكتساب" /></label>
          <label>الموضوع<select name="category" defaultValue={category}>
            {KNOWLEDGE_CATEGORIES.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
          </select></label>
          <button className="button button-dark" type="submit">بحث</button>
          {(query || category !== 'all') && <Link className="text-link" href="/knowledge">مسح البحث</Link>}
        </form>
        <p className="filter-status">{items.length ? `${new Intl.NumberFormat('ar-SA').format(items.length)} من الأسئلة` : 'لا توجد أسئلة تطابق هذا البحث.'}</p>
        <div className="editorial-rows editorial-reading-index">
          {items.slice((page - 1) * pageSize, page * pageSize).map((item) => <Link className="editorial-row" data-editorial-reveal href={`/knowledge/${item.slug}`} key={item.id}>
            <div><p>{item.categoryLabel}</p><h2>{item.question}</h2></div><span>اقرأ الإجابة</span>
          </Link>)}
        </div>
        {pages > 1 && <nav className="pagination" aria-label="صفحات بنك الأسئلة">
          {page > 1 && <Link className="text-link" href={pageHref(page - 1)}>السابقة</Link>}
          <span>صفحة {new Intl.NumberFormat('ar-SA').format(page)} من {new Intl.NumberFormat('ar-SA').format(pages)}</span>
          {page < pages && <Link className="text-link" href={pageHref(page + 1)}>التالية</Link>}
        </nav>}
      </section>
    </main>
  );
}
