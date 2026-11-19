import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DetailBlocks, NextStep, PageIntro } from '@/components/editorial';
import { productCopy, productSlugs } from '@/lib/editorial-content';
import { ProductDashboard } from '@/components/product-dashboard';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return productSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return { title: productSlugs.find((item) => item === slug) ? productCopy[slug as keyof typeof productCopy].name : 'منتجاتنا الرقمية' };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const key = productSlugs.find((item) => item === slug);
  if (!key) notFound();
  const product = productCopy[key];
  const href = `/contact?product=${key}`;

  return (
    <main className="inner-page">
      <PageIntro media={<ProductDashboard product={key} />} label={product.name} title={product.headline} description={product.benefit}>
        <Link className="button button-dark" href={href}>{product.cta}</Link>
      </PageIntro>
      <DetailBlocks entries={[
        { title: 'لمن صُمم؟', body: <p>{product.audience}</p> },
        { title: 'المزايا المتاحة', body: <p>{product.scope}</p> },
        { title: 'كيف تبدأ؟', body: <p>اذكر ما تريد متابعته أو تحسينه عند الاستفسار عن المنتج.</p> },
      ]} />
      <NextStep title={`هل يناسب ${product.name} مشروعك؟`} href={href} label={product.cta} />
    </main>
  );
}
