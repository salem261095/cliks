import Link from 'next/link';
import { NextStep, PageIntro, StorySpread } from '@/components/editorial';
import { sectorsOnHome } from '@/lib/homepage-content';

export const metadata = { title: 'قطاعاتنا' };

export default function SectorsPage() {
  return (
    <main className="inner-page">
      <PageIntro label="قطاعاتنا" title="السوق يغيّر نقطة البداية."
        description="من قرار على الرف إلى نقرة في متجر أو زيارة لفرع. نبدأ من طريقة اتخاذ العميل للقرار في كل قطاع." />
      <div className="directory cliks-container editorial-spreads">
        {sectorsOnHome.map((sector, index) => (
          <StorySpread key={sector.slug} id={sector.slug} label={sector.title} title={sector.goal}
            image={{ asset: sector.image }} reverse={index % 2 === 1}>
            <p>{sector.description}</p>
            <Link className="text-link" href={`/sectors/${sector.slug}`}>استكشف القطاع</Link>
          </StorySpread>
        ))}
      </div>
      <NextStep />
    </main>
  );
}
