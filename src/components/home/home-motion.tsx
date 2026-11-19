'use client';

import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export function HomeMotion() {
  useLayoutEffect(() => {
    const home = document.querySelector<HTMLElement>('.motion-home');
    if (!home) return;

    gsap.registerPlugin(ScrollTrigger);
    const select = gsap.utils.selector(home);
    const media = gsap.matchMedia();
    const headerOffset = () => document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;

    media.add({
      desktop: '(min-width: 900px) and (min-height: 640px)',
      mobile: '(max-width: 899px), (max-height: 639px)',
      shortHero: '(max-height: 650px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
      if (conditions?.reduced) return;
      home.classList.add('motion-enabled');
      const desktop = Boolean(conditions?.desktop);
      const [hero] = select('.cinema-hero');
      const opening = gsap.timeline({ defaults: { ease: 'power3.out', duration: .78 } });
      opening.from(select('.cinema-line > span'), { yPercent: 105, stagger: .105 }, 0)
        .from(select('.cinema-opening-detail'), { autoAlpha: 0, y: 16, stagger: .1 }, .17)
        .from(select('.cinema-photo img'), { scale: 1.16 }, 0);
      opening.progress(window.scrollY > 24 ? 1 : 0);

      if (!conditions?.shortHero) {
        const heroScroll = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: () => `top top+=${headerOffset()}`,
            end: 'bottom bottom',
            scrub: .42,
            invalidateOnRefresh: true,
          },
        });

        heroScroll.fromTo(select('.cinema-photo'), {
          clipPath: () => getComputedStyle(hero).getPropertyValue('--photo-inset').trim(),
        }, { clipPath: 'inset(0% 0% 0% 0%)', duration: .76 }, 0)
          .to(select('.cinema-copy'), { xPercent: desktop ? 21 : 8, autoAlpha: 0, duration: .4 }, .08)
          .to(select('.cinema-photo img'), { scale: 1.12, duration: 1 }, 0)
          .fromTo(select('.cinema-after'), { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: .38 }, .56)
          .to(select('.cinema-scroll-cue'), { autoAlpha: 0, duration: .15 }, .06);
      }

      select<HTMLElement>('[data-enter]').forEach((element) => {
        const direction = element.dataset.enter;
        const x = direction === 'right' ? 66 : direction === 'left' ? -66 : 0;
        const offset = x ? { x: desktop ? x : x / 2 } : { y: 58 };
        gsap.fromTo(element, { ...offset, opacity: .18 }, {
          x: 0, y: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top 96%', end: 'top 68%', scrub: .28 },
        });
      });

      select<HTMLElement>('[data-photo-mask]').forEach((element) => {
        if (desktop && element.closest('.editorial-sector-inline, .cinema-service-inline')) return;
        if (!desktop && element.closest('.cinema-service-media')) return;
        gsap.fromTo(element, { clipPath: 'inset(19% 15% 19% 15%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top 95%', end: 'top 25%', scrub: .38 },
        });
      });

      select<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -7 }, {
          yPercent: 7, ease: 'none',
          scrollTrigger: { trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: .5 },
        });
      });

      select<HTMLElement>('[data-home-count]').forEach((element) => {
        const value = Number(element.dataset.homeCount);
        const finalText = element.textContent;
        const counter = { value: 0 };
        gsap.fromTo(counter, { value: 0 }, {
          value, snap: 'value', ease: 'power2.out', duration: .95,
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          onUpdate: () => { element.textContent = String(counter.value).padStart(2, '0'); },
          onComplete: () => { element.textContent = finalText; },
          onReverseComplete: () => { element.textContent = finalText; },
        });
      });

      if (desktop) {
        for (const chapter of ['sector', 'service']) {
          const scenes = select<HTMLElement>(`[data-${chapter}-scene]`);
          select<HTMLElement>(`[data-${chapter}-shot]`).slice(1).forEach((shot, index) => {
            gsap.fromTo(shot, { clipPath: 'inset(100% 0% 0% 0%)' }, {
              clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
              scrollTrigger: { trigger: scenes[index + 1], start: 'top 83%', end: 'top 44%', scrub: .45 },
            });
          });
        }
      }

      let releaseRailFocus: (() => void) | undefined;
      if (desktop) {
        const [work] = select<HTMLElement>('.cinema-work');
        const [viewport] = select<HTMLElement>('.cinema-work-view');
        const [track] = select<HTMLElement>('.cinema-work-track');
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const rail = gsap.to(track, {
          x: distance, ease: 'none',
          scrollTrigger: {
            trigger: work, start: () => `top top+=${headerOffset()}`, end: 'bottom bottom',
            scrub: .4, invalidateOnRefresh: true,
          },
        });

        gsap.to(select('.cinema-work-progress > span'), {
          scaleX: 1, ease: 'none',
          scrollTrigger: {
            trigger: work, start: () => `top top+=${headerOffset()}`, end: 'bottom bottom', scrub: .4,
          },
        });

        const followFocus = (event: FocusEvent) => {
          if (!(event.target instanceof HTMLElement) || !event.target.matches('.cinema-project:focus-visible')) return;
          const card = event.target.getBoundingClientRect();
          const windowRect = viewport.getBoundingClientRect();
          const overflow = card.left < windowRect.left ? windowRect.left - card.left
            : card.right > windowRect.right ? windowRect.right - card.right : 0;
          const trigger = rail.scrollTrigger;
          if (!overflow || !trigger || !distance()) return;
          const x = Number(gsap.getProperty(track, 'x'));
          const progress = gsap.utils.clamp(0, 1, (x + overflow) / distance());
          window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: 'instant' });
        };
        track.addEventListener('focusin', followFocus);
        releaseRailFocus = () => track.removeEventListener('focusin', followFocus);
      }

      return () => {
        home.classList.remove('motion-enabled');
        releaseRailFocus?.();
        select<HTMLElement>('[data-home-count]').forEach((element) => {
          element.textContent = (element.dataset.homeCount ?? '').padStart(2, '0');
        });
      };
    });

    return () => media.revert();
  }, []);

  return null;
}
