'use client';

import { useEffect, useRef } from 'react';
import './custom-cursor.css';

const cursorMedia = '(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';
const interactiveSelector = 'a[href], button, summary, [role="button"], [role="link"], [role="tab"], [role="menuitem"]';
const nativeSelector = 'input, textarea, select, option, iframe, video[controls], audio[controls], [contenteditable]:not([contenteditable="false"])';
const particleCount = 7;
const impactLifetime = 520;
const clickSlop = 7;

type Point = { x: number; y: number };

function isOverSelectableText(target: Element, { x, y }: Point) {
  if (getComputedStyle(target).userSelect === 'none') return false;

  let node: Node | undefined;
  let offset = 0;
  if (document.caretPositionFromPoint) {
    const caret = document.caretPositionFromPoint(x, y);
    node = caret?.offsetNode;
    offset = caret?.offset ?? 0;
  } else if (document.caretRangeFromPoint) {
    const caret = document.caretRangeFromPoint(x, y);
    node = caret?.startContainer;
    offset = caret?.startOffset ?? 0;
  }

  if (!(node instanceof Text) || !target.contains(node)) return false;

  // Caret APIs can snap to text beside the mouse. Check the actual line box.
  const range = document.createRange();
  range.setStart(node, Math.max(0, offset - 1));
  range.setEnd(node, Math.min(node.length, offset + 1));
  return Array.from(range.getClientRects()).some((rect) =>
    x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom);
}

function measureSurfaceTone() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const colors = new Map<string, { lightness: number; alpha: number }>();

  return (target: Element) => {
    if (!context) return 'light';

    let lightness = 0;
    let coverage = 0;
    for (let element: Element | null = target; element && coverage < .98; element = element.parentElement) {
      const color = getComputedStyle(element).backgroundColor;
      let sample = colors.get(color);
      if (!sample) {
        context.clearRect(0, 0, 1, 1);
        context.fillStyle = 'transparent';
        context.fillStyle = color;
        context.fillRect(0, 0, 1, 1);
        const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data;
        sample = { lightness: .213 * red + .715 * green + .072 * blue, alpha: alpha / 255 };
        if (colors.size >= 64) colors.clear();
        colors.set(color, sample);
      }
      const contribution = sample.alpha * (1 - coverage);
      lightness += sample.lightness * contribution;
      coverage += contribution;
    }

    return lightness + (1 - coverage) * 255 < 140 ? 'dark' : 'light';
  };
}

export function CustomCursor() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const arrow = arrowRef.current;
    const effects = effectsRef.current;
    if (!arrow || !effects) return;

    const root = document.documentElement;
    const media = window.matchMedia(cursorMedia);
    let stopTracking: (() => void) | undefined;

    function startTracking(arrow: HTMLDivElement, effects: HTMLDivElement) {
      const controller = new AbortController();
      const listen = { capture: true, passive: true, signal: controller.signal };
      const getTone = measureSurfaceTone();
      const impacts = new Map<HTMLElement, number>();
      let point: Point | undefined;
      let press: (Point & { id: number }) | undefined;
      let nativeDrag = false;
      let frame = 0;
      let reboundTimer = 0;
      let hovered: Element | null = null;
      let tone = 'light';

      function removeImpact(impact: HTMLElement) {
        window.clearTimeout(impacts.get(impact));
        impacts.delete(impact);
        impact.remove();
      }

      function showImpact({ x, y }: Point) {
        const oldest = impacts.keys().next().value;
        if (impacts.size >= 6 && oldest) removeImpact(oldest);

        const impact = document.createElement('span');
        impact.className = 'cliks-impact';
        impact.dataset.tone = tone;
        impact.style.transform = `translate3d(${x}px, ${y}px, 0)`;

        const ring = document.createElement('span');
        ring.className = 'cliks-impact-ring';
        impact.append(ring);

        const phase = Math.random() * Math.PI;
        for (let index = 0; index < particleCount; index++) {
          const particle = document.createElement('span');
          const angle = phase + index * 2 * Math.PI / particleCount;
          const distance = index % 2 ? 20 : 27;
          particle.className = 'cliks-impact-particle';
          if (index === 2 || index === 5) particle.dataset.accent = 'secondary';
          particle.style.setProperty('--particle-x', `${Math.cos(angle) * distance}px`);
          particle.style.setProperty('--particle-y', `${Math.sin(angle) * distance}px`);
          impact.append(particle);
        }

        effects.append(impact);
        impacts.set(impact, window.setTimeout(() => removeImpact(impact), impactLifetime));
      }

      function conceal() {
        arrow.removeAttribute('data-visible');
        root.removeAttribute('data-cliks-cursor');
        hovered = null;
      }

      function render() {
        if (!point) return false;
        const overPage = point.x >= root.clientLeft && point.x < root.clientLeft + root.clientWidth &&
          point.y >= 0 && point.y < root.clientHeight;
        const target = overPage ? document.elementFromPoint(point.x, point.y) : null;
        if (!target || nativeDrag || document.fullscreenElement ||
            target.closest(nativeSelector) || document.querySelector('dialog[open]')) {
          conceal();
          return false;
        }

        const interactive = target.closest(interactiveSelector);
        if (!interactive && isOverSelectableText(target, point)) {
          conceal();
          return false;
        }

        if (target !== hovered) {
          tone = getTone(target);
          arrow.dataset.tone = tone;
          hovered = target;
        }
        const enabled = interactive && !interactive.closest(':disabled, [aria-disabled="true"], [inert]');
        arrow.toggleAttribute('data-hover', Boolean(enabled));
        arrow.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
        arrow.setAttribute('data-visible', '');
        root.setAttribute('data-cliks-cursor', '');
        return true;
      }

      function scheduleRender() {
        if (frame || !point) return;
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          render();
        });
      }

      function clearRebound() {
        window.clearTimeout(reboundTimer);
        arrow.removeAttribute('data-released');
      }

      function reset() {
        window.cancelAnimationFrame(frame);
        frame = 0;
        point = undefined;
        press = undefined;
        nativeDrag = false;
        clearRebound();
        arrow.removeAttribute('data-pressed');
        conceal();
        for (const impact of impacts.keys()) removeImpact(impact);
      }

      function track(event: PointerEvent) {
        if (event.pointerType !== 'mouse') {
          reset();
          return false;
        }
        point = { x: event.clientX, y: event.clientY };
        return true;
      }

      function onMove(event: PointerEvent) {
        if (track(event)) scheduleRender();
      }

      function onDown(event: PointerEvent) {
        if (!track(event) || event.button !== 0 || !point) return;
        clearRebound();
        hovered = null;
        nativeDrag = !render();
        if (nativeDrag) return;

        press = { ...point, id: event.pointerId };
        arrow.setAttribute('data-pressed', '');
      }

      function onUp(event: PointerEvent) {
        if (!track(event) || event.button !== 0 || !point) return;

        const start = press;
        press = undefined;
        nativeDrag = false;
        if (start?.id === event.pointerId) {
          arrow.setAttribute('data-released', '');
          reboundTimer = window.setTimeout(clearRebound, 300);
        }
        arrow.removeAttribute('data-pressed');

        if (render() && start?.id === event.pointerId &&
            Math.hypot(point.x - start.x, point.y - start.y) <= clickSlop) {
          showImpact(point);
        }
      }

      function onViewportChange() {
        hovered = null;
        scheduleRender();
      }

      window.addEventListener('pointermove', onMove, listen);
      window.addEventListener('pointerdown', onDown, listen);
      window.addEventListener('pointerup', onUp, listen);
      window.addEventListener('pointercancel', reset, listen);
      window.addEventListener('pointerout', (event) => { if (event.relatedTarget === null) reset(); }, listen);
      window.addEventListener('dragstart', reset, listen);
      window.addEventListener('contextmenu', reset, listen);
      window.addEventListener('blur', reset, { signal: controller.signal });
      window.addEventListener('scroll', onViewportChange, listen);
      window.addEventListener('resize', onViewportChange, listen);
      document.addEventListener('visibilitychange', reset, listen);

      return () => {
        controller.abort();
        reset();
      };
    }

    const updateAvailability = () => {
      stopTracking?.();
      stopTracking = media.matches ? startTracking(arrow, effects) : undefined;
    };

    updateAvailability();
    media.addEventListener('change', updateAvailability);
    return () => {
      media.removeEventListener('change', updateAvailability);
      stopTracking?.();
    };
  }, []);

  return (
    <div className="cliks-cursor-layer" aria-hidden="true">
      <div className="cliks-cursor-effects" ref={effectsRef} />
      <div className="cliks-cursor-position" ref={arrowRef}>
        <span className="cliks-cursor-arrow" />
      </div>
    </div>
  );
}
