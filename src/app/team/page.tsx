import Link from 'next/link';
import { NextStep, PageIntro } from '@/components/editorial';
import { TeamRoster } from '@/components/home/team-roster';

export const metadata = { title: 'فريق كلكس' };

export default function TeamPage() {
  return (
    <main className="inner-page editorial-team-page">
      <PageIntro label="فريق كلكس" title="التخصصات التي تعمل على هدفك."
        description="نتعاون عبر الاستراتيجية والأداء والإبداع والتقنية، من تحديد الهدف إلى متابعة النتائج.">
        <Link className="text-link" href="/about">عن الوكالة والشركاء</Link>
      </PageIntro>
      <section className="directory" aria-label="أعضاء الفريق"><div className="cliks-container"><TeamRoster headingLevel={2} /></div></section>
      <NextStep />
    </main>
  );
}
