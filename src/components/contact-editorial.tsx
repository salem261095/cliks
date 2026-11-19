import type { ReactNode } from 'react';
import { siteContact } from '@/lib/site-contact';
import './contact-editorial.css';

export function ContactEditorial({ children, headingLevel, interest }: {
  children: ReactNode;
  headingLevel: 1 | 2;
  interest?: string;
}) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div className="contact-editorial">
      <div className="cliks-container contact-editorial-layout">
        <div className="contact-editorial-story">
          <p className="contact-editorial-kicker">تواصل معنا</p>
          <Heading id="contact-editorial-title">
            <span><span>لنبدأ</span></span>{' '}
            <span><span>بهدفك.</span></span>
          </Heading>
          <div className="contact-editorial-context">
            <p>أخبرنا عن عملك وما تريد تحقيقه. نبدأ بفهم التحدي، ثم نحدد معك الخطوة التالية.</p>
            <a className="text-link" href={`https://wa.me/${siteContact.internationalPhone}`}>تواصل عبر واتساب</a>
          </div>
        </div>
        <div className="contact-editorial-sheet">
          <p className="contact-editorial-form-title">ناقش أهدافك معنا</p>
          {interest && <p className="contact-editorial-interest">موضوع اهتمامك · <bdi>{interest}</bdi></p>}
          {children}
        </div>
      </div>
    </div>
  );
}
