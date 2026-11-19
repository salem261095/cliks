import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteNavigation } from '@/lib/site-navigation';
import { siteContact } from '@/lib/site-contact';
import { FooterInquiry } from './footer-inquiry';
import { NewsletterForm } from './newsletter-form';

const { address, phone, internationalPhone, email } = siteContact;
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const footerNavigation = [...siteNavigation, { label: 'فريق كلكس', href: '/team' }, { label: 'منهجية SOSTAC®', href: '/sostac' }];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <FooterInquiry />
      <div className="cliks-container footer-content">
        <section className="footer-newsletter" aria-labelledby="footer-newsletter-title">
          <div><h2 id="footer-newsletter-title">نشرة كلكس</h2><p>أفكار واستراتيجيات في التسويق والنمو، تصل إلى بريدك.</p></div>
          <NewsletterForm />
        </section>
        <div className="footer-main">
          <div className="footer-masthead">
            <Link className="footer-wordmark" href="/" aria-label="كلكس، الرئيسية">CLIKS<span aria-hidden="true">.</span></Link>
            <p>نحن وكالة تسويق سعودية رائدة في تقديم خدمات التسويق الإلكتروني. نسعى جاهدين لمساعدة شركائنا في تحقيق النجاح المستمر من خلال تقديم حلول تسويقية شاملة ومبتكرة تعزز نتائج مشاريعهم.</p>
          </div>
          <div className="footer-contact">
            <h2>نبدأ من <em>هدفك.</em></h2>
            <address>
              <a href={mapHref}><MapPin aria-hidden="true" /><span>{address}</span></a>
              <a href={`tel:+${internationalPhone}`} aria-label={`اتصل على ${phone}`}><Phone aria-hidden="true" /><bdi dir="ltr">{phone}</bdi></a>
              <a href={`https://wa.me/${internationalPhone}`} aria-label={`راسلنا على واتساب ${internationalPhone}`}><MessageCircle aria-hidden="true" /><bdi dir="ltr">{internationalPhone}</bdi></a>
              <a href={`mailto:${email}`} aria-label={`راسلنا عبر البريد الإلكتروني ${email}`}><Mail aria-hidden="true" /><bdi dir="ltr">{email}</bdi></a>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <nav aria-label="استكشف الموقع">
            <ul>{footerNavigation.map(({ label, href }) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
          </nav>
          <span>© {new Date().getFullYear()} كلكس</span>
        </div>
      </div>
    </footer>
  );
}
