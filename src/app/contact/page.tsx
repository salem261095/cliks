import { contactLabel } from '@/components/editorial';
import { ContactEditorial } from '@/components/contact-editorial';
import { InquiryForm } from '@/components/inquiry-form';
import { ALL_SERVICES } from '@/lib/catalogs/services';
import { SECTORS } from '@/lib/catalogs/sectors';
import { featuredProjects, productCopy, productSlugs } from '@/lib/editorial-content';

export const metadata = { title: contactLabel };
type Search = Record<string, string | string[] | undefined>;

export default async function ContactPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const sector = SECTORS.find((item) => item.slug === params.sector);
  const service = ALL_SERVICES.find((item) => item.slug === params.service);
  const project = featuredProjects.find((item) => item.slug === params.project);
  const product = productSlugs.find((slug) => slug === params.product);
  const interest = product ? productCopy[product].name : service?.title ?? project?.client ?? sector?.title;

  return (
    <main className="inner-page">
      <ContactEditorial headingLevel={1} interest={interest}>
        <InquiryForm key={sector?.slug} sector={sector?.slug} />
      </ContactEditorial>
    </main>
  );
}
