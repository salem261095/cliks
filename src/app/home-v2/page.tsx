import Image from 'next/image';
import Link from 'next/link';
import { contactLabel } from '@/components/editorial';
import { HomeMotion } from '@/components/home/home-motion';
import { ClientLogoLoop } from '@/components/home/brand-proof';
import { featuredProjects, serviceGroupLines } from '@/lib/editorial-content';
import { featuredProjectImages } from '@/lib/editorial-media';
import { SERVICE_GROUPS } from '@/lib/catalogs/services';
import { serviceImages } from '@/lib/service-media';
import { VariantServices } from './variant-services';
import { VariantInquiry } from './variant-inquiry';
import '../home-cinema.css';
import './home-v2.css';

export const metadata = {
  title: 'كلكس | النمو من أول خطوة',
  robots: { index: false, follow: true },
};

const tabLabels = { strategy: 'الاستراتيجية', performance: 'الأداء', creative: 'الإبداع', digital: 'التقنية' } as const;
const services = SERVICE_GROUPS.map(({ id, title }) => ({
  id, title, label: tabLabels[id], description: serviceGroupLines[id], image: serviceImages[id].asset,
}));

export default function HomeVariantPage() {
  return (
    <main className="motion-home home-v2">
      <HomeMotion />

      <section className="cinema-hero" aria-labelledby="variant-title">
        <div className="cinema-hero-stage">
          <div className="cinema-photo" aria-hidden="true">
            <Image src="/assets/editorial/riyadh-skyline.webp" alt="" fill sizes="100vw" preload />
          </div>
          <div className="cinema-copy">
            <p className="cinema-kicker cinema-opening-detail">وكالة نمو سعودية</p>
            <h1 id="variant-title">
              <span className="cinema-line"><span>نفهم أعمالك.</span></span>
              <span className="cinema-line"><span>ونبني نموّك.</span></span>
            </h1>
            <p className="cinema-intro cinema-opening-detail">نجمع الاستراتيجية والحملات والإبداع والتقنية لنساعدك على جذب عملاء وتحسين تجربة الشراء وقياس الأثر.</p>
            <div className="cinema-actions cinema-opening-detail">
              <Link className="cinema-button" href="#inquiry">{contactLabel}</Link>
              <Link className="cinema-link" href="#selected-work">شاهد أعمالنا</Link>
            </div>
            <div className="home-v2-hero-marks cinema-opening-detail" aria-label="الاعتمادات والمنهجيات">
              <a href="https://www.google.com/partners/agency?id=5892162601" className="home-v2-hero-google">
                <Image src="/assets/marks/google-partner.svg" alt="Google Partner" width={72} height={72} unoptimized />
              </a>
              <Link href="/sostac" className="home-v2-hero-method" aria-label="منهجية SOSTAC">
                <Image src="/assets/marks/sostac.png" alt="SOSTAC®" width={253} height={52} />
              </Link>
            </div>
          </div>
          <p className="cinema-after" aria-hidden="true">النمو يبدأ<br />بوضوح الاتجاه.</p>
        </div>
      </section>

      <section className="home-v2-trust" aria-labelledby="variant-trust-title">
        <div className="cinema-wrap home-v2-trust-inner">
          <h2 id="variant-trust-title">عملاؤنا</h2>
          <ClientLogoLoop />
        </div>
      </section>

      <section className="home-v2-work" aria-labelledby="variant-work-title">
        <div id="selected-work" className="cinema-work">
          <div className="cinema-work-stage">
            <header className="cinema-wrap cinema-work-heading">
              <div><p className="cinema-kicker">أعمال مختارة</p><h2 id="variant-work-title" className="cinema-display">كيف يأخذ النمو شكله؟</h2></div>
              <Link className="cinema-link" href="/work">كل الأعمال</Link>
            </header>
            <div className="cinema-work-view" tabIndex={0} role="region" aria-label="الأعمال المختارة">
              <ul className="cinema-work-track">
                {featuredProjects.map((project) => {
                  const image = featuredProjectImages[project.slug];
                  return (
                    <li key={project.slug}>
                      <Link className="cinema-project" href={`/work/${project.slug}`}>
                        <div className={`cinema-project-photo cinema-project-${project.slug}`}>
                          <Image src={`/assets/editorial/${image.asset}.webp`} alt="" fill sizes="(max-width: 899px) 83vw, 52vw" />
                        </div>
                        <div className="cinema-project-copy">
                          <div>
                            <p className="cinema-kicker">{project.client} · مسودة دراسة</p>
                            <h3>{project.title}</h3>
                            <p>المؤشر المستهدف · {project.metrics[0]}</p>
                          </div>
                          <span className="cinema-link">عرض الدراسة</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="cinema-wrap"><div className="cinema-work-progress" aria-hidden="true"><span /></div></div>
          </div>
        </div>
        <div className="cinema-wrap home-v2-work-action">
          <p>هل تعمل على تحدٍّ مشابه؟</p>
          <Link className="cinema-button" href="#inquiry">{contactLabel}</Link>
        </div>
      </section>

      <section className="home-v2-services cinema-dark" aria-labelledby="variant-services-title">
        <div className="cinema-wrap">
          <header className="home-v2-service-heading">
            <div><p className="cinema-kicker">خدماتنا</p><h2 id="variant-services-title" className="cinema-display">ابدأ بما يحتاجه عملك.</h2></div>
            <Link className="cinema-link" href="/sectors">اكتشف كيف نعمل في قطاعك</Link>
          </header>
          <VariantServices services={services} />
        </div>
      </section>

      <section id="inquiry" className="home-v2-inquiry" aria-labelledby="variant-inquiry-title">
        <div className="cinema-wrap home-v2-inquiry-layout">
          <div className="home-v2-inquiry-copy">
            <p className="cinema-kicker">تواصل معنا</p>
            <h2 id="variant-inquiry-title" className="cinema-display">{contactLabel}.</h2>
            <p>صف هدفك في جملة واحدة. سنقرأ استفسارك ونتواصل عبر بريدك لتحديد الخطوة التالية.</p>
            <details>
              <summary>هل يمكن أن نبدأ بخدمة واحدة؟</summary>
              <p>نعم. يمكنك البدء بتحدٍّ محدد، مثل تحسين أداء الحملات أو سهولة الشراء أو الظهور المحلي.</p>
            </details>
          </div>
          <VariantInquiry />
        </div>
      </section>
    </main>
  );
}
