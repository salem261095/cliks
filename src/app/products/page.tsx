import Link from 'next/link';
import { PageIntro, StorySpread } from '@/components/editorial';
import { productCopy, productSlugs } from '@/lib/editorial-content';
import { ProductDashboard } from '@/components/product-dashboard';

export const metadata = { title: 'منتجاتنا الرقمية' };

export default function ProductsPage() {
  return (
    <main className="inner-page">
      <PageIntro tone="yellow" label="منتجاتنا الرقمية" title="خبرتنا التسويقية، في منتجات رقمية."
        description="مدار لنمو المشاريع الصغيرة، وCLIK BI لمتابعة الحملات الممولة ومؤشرات الأداء." />
      <div className="directory cliks-container editorial-spreads">
        {productSlugs.map((slug, index) => {
          const product = productCopy[slug];
          return (
            <StorySpread key={slug} label={product.name} title={product.headline}
              media={<ProductDashboard product={slug} />} reverse={index % 2 === 1}>
              <p>{product.benefit}</p>
              <Link className="text-link" href={`/products/${slug}`}>اكتشف {product.name}</Link>
            </StorySpread>
          );
        })}
      </div>
    </main>
  );
}
