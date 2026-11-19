import Link from 'next/link';
import { DetailBlocks, NextStep, PageIntro } from '@/components/editorial';
import { homePartners } from '@/lib/homepage-content';

export const metadata = { title: 'عن كلكس' };

export default function AboutPage() {
  return (
    <main className="inner-page">
      <PageIntro label="عن كلكس" title="أربع تخصصات. هدف واحد."
        description="كلكس وكالة تسويق سعودية تجمع الاستراتيجية والتسويق بالأداء والإبداع والتقنية حول أهداف أعمالك."
        image={{ asset: 'riyadh-skyline' }}>
        <Link className="text-link" href="/team">تعرّف على الفريق</Link>
      </PageIntro>
      <DetailBlocks entries={[
        { title: 'كيف نعمل', body: <><p>نفهم الوضع الحالي، نتفق على ما نريد تحسينه، ثم نربط التنفيذ بمؤشرات يمكن متابعتها.</p><Link className="text-link" href="/sostac">استكشف منهجية SOSTAC®</Link></> },
        { title: 'فريق كلكس', body: <><p>يعمل التخطيط والحملات والهوية والمحتوى والمنتجات الرقمية ضمن فريق مشروع واحد، من تحديد الهدف إلى متابعة النتائج.</p><Link className="text-link" href="/team">تعرّف على الفريق</Link></> },
        { title: 'الشركاء الاستراتيجيون', body: <div className="editorial-rows">{homePartners.map((partner) => <article className="editorial-row" key={partner.title}><div><p className="editorial-label">{partner.role}</p><h3>{partner.title}</h3><p>{partner.description}</p></div></article>)}</div> },
      ]} />
      <NextStep />
    </main>
  );
}
