'use client';

import { useEffect, useId, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { stages } from '@/lib/editorial-content';
import './planning-timeline.css';

function keepInView(rail: HTMLOListElement, index: number, behavior: ScrollBehavior) {
  const step = rail.children[index]?.getBoundingClientRect();
  if (!step) return;
  const bounds = rail.getBoundingClientRect();
  const left = step.left < bounds.left ? step.left - bounds.left
    : step.right > bounds.right ? step.right - bounds.right : 0;
  if (left) rail.scrollBy({ left, behavior });
}

export function PlanningTimeline() {
  const [active, setActive] = useState(0);
  const current = useRef(0);
  const timelineId = useId();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLOListElement>(null);
  const scenes = useRef<HTMLDivElement>(null);

  function showStep(index: number) {
    if (current.current === index) return;
    current.current = index;
    setActive(index);
  }

  useEffect(() => {
    const track = root.current;
    const header = stage.current;
    const railNode = rail.current;
    const sceneList = scenes.current;
    if (!track || !header || !railNode || !sceneList) return;

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let frame = 0;
    let visible = !('IntersectionObserver' in window);

    function readScroll() {
      frame = 0;
      if (!header || !sceneList || !railNode) return;
      const line = Math.min(window.innerHeight - 20, Math.max(window.innerHeight * .38, header.getBoundingClientRect().bottom + 26));
      let next = 0;
      for (let index = 1; index < sceneList.children.length; index++) {
        if (sceneList.children[index].getBoundingClientRect().top > line) break;
        next = index;
      }
      if (next === current.current) return;
      showStep(next);
      keepInView(railNode, next, motion.matches ? 'smooth' : 'instant');
    }

    function requestRead() {
      if (visible && !frame) frame = window.requestAnimationFrame(readScroll);
    }

    const intersection = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      requestRead();
    }) : null;
    intersection?.observe(track);
    window.addEventListener('resize', requestRead, { passive: true });
    window.addEventListener('scroll', requestRead, { passive: true });
    requestRead();

    return () => {
      intersection?.disconnect();
      window.removeEventListener('resize', requestRead);
      window.removeEventListener('scroll', requestRead);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  function selectStep(index: number) {
    const scene = scenes.current?.children[index];
    const stageNode = stage.current;
    if (!scene || !stageNode) return;

    const stickyTop = Number.parseFloat(getComputedStyle(stageNode).top);
    const offset = Number.isFinite(stickyTop)
      ? stickyTop + stageNode.offsetHeight
      : document.querySelector('.site-header')?.getBoundingClientRect().height ?? 0;
    showStep(index);
    if (rail.current) keepInView(rail.current, index, 'instant');
    window.scrollTo({ top: window.scrollY + scene.getBoundingClientRect().top - offset - 12, behavior: 'instant' });
  }

  function onSelect(event: MouseEvent<HTMLAnchorElement>, index: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectStep(index);
  }

  function moveWithKeyboard(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const next = event.key === 'ArrowLeft' ? Math.min(index + 1, stages.length - 1)
      : event.key === 'ArrowRight' ? Math.max(index - 1, 0)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? stages.length - 1
      : null;
    if (next === null) return;

    event.preventDefault();
    selectStep(next);
    rail.current?.children[next]?.querySelector('a')?.focus({ preventScroll: true });
  }

  return (
    <div className="planning-timeline" dir="rtl" ref={root}>
      <div className="planning-stage" ref={stage}>
        <ol className="planning-rail" ref={rail} aria-label="مراحل SOSTAC">
          {stages.map((item, index) => (
            <li key={item.title}>
              <a href={`#${timelineId}-${index}`} aria-current={active === index ? 'step' : undefined}
                data-visited={index <= active} onClick={(event) => onSelect(event, index)}
                onKeyDown={(event) => moveWithKeyboard(event, index)}>
                <span className="planning-node" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
      <div className="planning-scenes" ref={scenes}>
        {stages.map((item, index) => (
          <section key={item.title} className="planning-scene" id={`${timelineId}-${index}`} data-active={active === index}
            aria-labelledby={`${timelineId}-question-${index}`}>
            <div className="planning-panel-content">
              <div>
                <p className="planning-label">{item.title}</p>
                <h3 id={`${timelineId}-question-${index}`}>{item.question}</h3>
              </div>
              <div>
                <p className="planning-label">مخرج المرحلة</p>
                <p>{item.output}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
