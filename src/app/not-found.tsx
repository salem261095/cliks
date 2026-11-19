import Link from 'next/link';
import { PageIntro } from '@/components/editorial';

export default function NotFound() {
  return <main className="inner-page"><PageIntro tone="yellow" format="compact" title="الصفحة غير متوفرة." description="يمكنك العودة إلى الرئيسية أو استكشاف أعمال كلكس.">
    <div className="actions"><Link href="/" className="button button-dark">الصفحة الرئيسية</Link><Link href="/work" className="text-link">معرض الأعمال</Link></div>
  </PageIntro></main>;
}
