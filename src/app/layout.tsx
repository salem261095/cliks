import type { Metadata } from 'next';
import './globals.css';
import './site-chrome.css';
import './inner-editorial.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CustomCursor } from '@/components/custom-cursor';

export const metadata: Metadata = {
  title: { default: 'كليكس | وكالة نمو سعودية', template: '%s | كليكس' },
  description: 'وكالة سعودية تجمع الاستراتيجية والتسويق بالأداء والإبداع والتقنية. نفهم أعمالك، نوجّه تسويقك، ونبني نموّك.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
