'use client';

import { usePathname } from 'next/navigation';
import { ContactEditorial } from './contact-editorial';
import { InquiryForm } from './inquiry-form';

export function FooterInquiry() {
  const pathname = usePathname();
  if (pathname === '/contact' || pathname === '/home-v2') return null;

  return (
    <section id="inquiry" aria-labelledby="contact-editorial-title">
      <ContactEditorial headingLevel={2}>
        <InquiryForm key={pathname} embedded />
      </ContactEditorial>
    </section>
  );
}
