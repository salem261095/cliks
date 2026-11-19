import Image from 'next/image';
import Link from 'next/link';
import { ProductDashboard } from '@/components/product-dashboard';
import { PlanningTimeline } from '@/components/planning-timeline';
import { ALL_SERVICES, SECTORS } from '@/lib';
import { productCopy, productSlugs, stages } from '@/lib/editorial-content';
import { measurementTopics, sectorsOnHome } from '@/lib/homepage-content';

const counts = [
  { value: SECTORS.length, label: 'قطاعات' },
  { value: ALL_SERVICES.length, label: 'خدمات مترابطة' },
  { value: stages.length, label: 'مراحل للتخطيط' },
  { value: productSlugs.length, label: 'منتجات رقمية' },
];

const productHeadlines = { madar: 'خطوة واضحة لنمو مشروعك.', 'clik-bi': 'اقرأ الأداء في صورة واحدة.' } as const;

export function EditorialApproach() {
  return (
    <section id="approach" className="cinema-section cinema-dark home-editorial editorial-approach" aria-labelledby="approach-title">
      <div className="cinema-wrap">
        <p className="cinema-kicker editorial-kicker">نهج كلكس</p>
        <div>
          <h2 id="approach-title" className="editorial-title" data-enter="right">نبدأ بالسؤال.<br /><em>ونقيس الأثر.</em></h2>
        </div>
        <div className="editorial-approach-note">
          <div data-enter="left">
            <p>ما الذي يحتاج أن يتغيّر في أعمالك؟ نبدأ من هذا السؤال، ونربط الخطة والحملة والمحتوى وتجربة الشراء بمؤشر تستطيع متابعته.</p>
            <Link className="cinema-link" href="/about">تعرّف على كلكس</Link>
          </div>
        </div>
        <dl className="editorial-figures">
          {counts.map(({ value, label }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd><span data-home-count={value} aria-hidden="true">{String(value).padStart(2, '0')}</span><span className="editorial-sr-only">{value}</span></dd>
            </div>
          ))}
        </dl>
        <section className="editorial-measure" aria-labelledby="project-measure-title">
          <div className="editorial-measure-intro">
            <p className="cinema-kicker editorial-kicker">القياس والنتائج</p>
            <div><h3 id="project-measure-title" data-enter="right">من الإنفاق<br />إلى المبيعات.</h3></div>
            <Link className="cinema-link" href="#selected-work">القياس في دراسات النجاح</Link>
          </div>
          <dl className="editorial-measure-list">
            {measurementTopics.map((topic) => (
              <div key={topic.title}><div data-enter="up"><dt>{topic.title}</dt><dd>{topic.description}</dd></div></div>
            ))}
          </dl>
        </section>
      </div>
    </section>
  );
}

export function EditorialSectors() {
  return (
    <section className="cinema-section home-editorial editorial-sectors" aria-labelledby="sector-title">
      <div className="cinema-wrap">
        <header className="editorial-chapter-header">
          <p className="cinema-kicker editorial-kicker">قطاعاتنا</p>
          <div><h2 id="sector-title" className="editorial-title" data-enter="right">السوق يغيّر<br />نقطة البداية.</h2></div>
        </header>
        <div className="editorial-sector-layout">
          <div className="editorial-sector-stage" aria-hidden="true">
            {sectorsOnHome.map((sector) => (
              <div className="editorial-sector-shot" data-sector-shot key={sector.slug}>
                <Image src={`/assets/editorial/${sector.image}.webp`} alt="" fill sizes="50vw" unoptimized />
              </div>
            ))}
          </div>
          <div className="editorial-sector-story">
            {sectorsOnHome.map((sector) => (
              <article className="editorial-sector-scene" data-sector-scene key={sector.slug}>
                <div className="editorial-sector-inline" aria-hidden="true">
                  <div data-photo-mask><Image src={`/assets/editorial/${sector.image}.webp`} alt="" fill sizes="(max-width: 760px) 90vw, 50vw" unoptimized /></div>
                </div>
                <div className="editorial-sector-scene-copy">
                  <div data-enter="up">
                    <p className="cinema-kicker">{sector.title}</p>
                    <h3>{sector.goal}</h3>
                    <p>{sector.description}</p>
                    <Link className="cinema-link" href={`/sectors/${sector.slug}`}>استكشف القطاع</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function EditorialProducts() {
  return (
    <section className="cinema-section cinema-dark home-editorial editorial-products" aria-labelledby="products-title">
      <div className="cinema-wrap">
        <header className="editorial-chapter-header">
          <p className="cinema-kicker editorial-kicker">منتجاتنا الرقمية</p>
          <div><h2 id="products-title" className="editorial-title" data-enter="right">خبرتنا التسويقية،<br />في منتجات رقمية.</h2></div>
        </header>
        {productSlugs.map((slug) => {
          const product = productCopy[slug];
          return (
            <article key={slug} className="editorial-product-spread" data-product={slug}>
              <div className="editorial-product-media"><ProductDashboard product={slug} /></div>
              <div className="editorial-product-note">
                <div data-enter={slug === 'madar' ? 'left' : 'right'}>
                  <p className="cinema-kicker">{product.name}</p>
                  <h3>{productHeadlines[slug]}</h3>
                  <p>{product.headline} {product.benefit}</p>
                  <Link className="cinema-link" href={`/products/${slug}`}>اكتشف {product.name}</Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function EditorialMethod() {
  return (
    <section className="home-editorial editorial-method" aria-labelledby="method-title">
      <div className="editorial-method-cover">
        <div className="editorial-photo-background" aria-hidden="true">
          <Image src="/assets/editorial/riyadh-kafd.webp" alt="" fill sizes="100vw" data-parallax unoptimized />
        </div>
        <div className="cinema-wrap editorial-method-cover-copy">
          <p className="cinema-kicker editorial-kicker">منهجية SOSTAC®</p>
          <div><h2 id="method-title" className="editorial-title" data-enter="right">لكل خطوة<br />سبب ومقياس.</h2></div>
        </div>
      </div>
      <div className="cinema-wrap editorial-method-body">
        <div className="editorial-method-note">
          <Image className="editorial-method-mark" src="/assets/marks/sostac.png" alt="SOSTAC®" width={253} height={52} />
          <p>ست خطوات تنقلنا من فهم الوضع إلى قرار التحسين التالي.</p>
          <Link className="cinema-link" href="/sostac">استكشف المنهجية</Link>
        </div>
        <PlanningTimeline />
      </div>
    </section>
  );
}

export function EditorialLocal() {
  return (
    <section className="home-editorial editorial-local" aria-labelledby="local-title">
      <div className="editorial-local-photo" aria-hidden="true">
        <div data-photo-mask><Image src="/assets/editorial/jeddah-alley.webp" alt="" fill sizes="(max-width: 760px) 100vw, 48vw" unoptimized /></div>
      </div>
      <div className="editorial-local-copy">
        <p className="cinema-kicker editorial-kicker">خرائط Google والظهور المحلي</p>
        <div><h2 id="local-title" className="editorial-title" data-enter="left">الزيارة تبدأ<br />قبل الوصول.</h2></div>
        <p>من أول بحث عن مكان قريب إلى طلب الاتجاهات. ندير ساعات العمل والصور والتقييمات على ملف نشاطك التجاري، ونتابع كيف يتفاعل الباحثون مع كل فرع.</p>
        <Link className="cinema-link" href="/services/google-maps-local">استكشف خدمة الظهور المحلي</Link>
      </div>
    </section>
  );
}
