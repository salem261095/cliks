import Link from 'next/link';
import Image from 'next/image';
import { NextStep, PageIntro } from '@/components/editorial';
import { PlanningTimeline } from '@/components/planning-timeline';

export const metadata = { title: 'منهجية SOSTAC®' };

export default function SostacPage() {
  return (
    <main className="inner-page">
      <PageIntro label="منهجية SOSTAC®" title="لكل خطوة سبب ومقياس."
        description="ست مراحل تجعل الخطة مرتبطة بسؤال واضح ومخرج يمكن مراجعته في كل خطوة."
        image={{ asset: 'riyadh-kafd' }}>
        <Link className="text-link" href="/services/sostac-consulting">استكشف خدمة التخطيط</Link>
      </PageIntro>
      <div className="directory cliks-container">
        <Image className="editorial-method-mark" src="/assets/marks/sostac.png" alt="SOSTAC®" width={253} height={52} />
        <PlanningTimeline />
      </div>
      <NextStep href="/contact?service=sostac-consulting" />
    </main>
  );
}
