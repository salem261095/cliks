'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { siteNavigation } from '@/lib/site-navigation';

const menuLinks = [{ label: 'الرئيسية', href: '/' }, ...siteNavigation];

export function SiteHeader() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function openMenu() {
    if (!dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    setOpen(true);
  }

  function closeMenu() {
    dialog.current?.close();
  }

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">انتقل إلى المحتوى</a>
      <div className="cliks-container header-inner">
        <Link href="/" className="wordmark" aria-label="كلكس، الرئيسية"><span aria-hidden="true" />CLIKS</Link>
        <button className="menu-toggle" type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls="site-menu" onClick={openMenu}>
          القائمة<span className="menu-toggle-mark" aria-hidden="true" />
        </button>
      </div>

      <dialog className="site-menu" id="site-menu" ref={dialog} aria-label="قائمة التنقل" onClose={() => setOpen(false)}>
        <div className="cliks-container header-inner site-menu-bar">
          <Link href="/" className="wordmark" aria-label="كلكس، الرئيسية" onClick={closeMenu}><span aria-hidden="true" />CLIKS</Link>
          <button className="menu-toggle" type="button" data-close autoFocus onClick={closeMenu}>
            إغلاق<span className="menu-toggle-mark" aria-hidden="true" />
          </button>
        </div>
        <div className="cliks-container site-menu-layout">
          <nav aria-label="القائمة الرئيسية">
            <ul className="site-nav-list">
              {menuLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} aria-current={path === href ? 'page' : undefined}
                    data-active={path === href || (href !== '/' && path.startsWith(href + '/'))} onClick={closeMenu}>{label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="chrome-cta site-menu-cta" onClick={closeMenu}>ناقش أهدافك معنا</Link>
          </nav>
          <div className="site-menu-art" aria-hidden="true">
            <div className="site-menu-photo">
              <Image src="/assets/editorial/riyadh-kafd.webp" alt="" fill sizes="(max-width: 760px) 0px, 40vw" unoptimized />
            </div>
            <span lang="en">CLIKS<span>.</span></span>
          </div>
        </div>
      </dialog>
    </header>
  );
}
