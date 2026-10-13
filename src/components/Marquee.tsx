import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { color, font, media } from '../styles/theme';

const items = ['Go', 'React', 'TypeScript', 'Next.js', 'Claude Code', 'LLM agents', 'MCP', 'Node.js', 'Kubernetes', 'Docker', 'AWS', 'Pulumi', 'Terraform', 'Solidity', 'PostgreSQL', 'Python', 'CI/CD'];

/** Seconds for one full loop at cruising speed. */
const LOOP_SECONDS = 40;
/** How quickly the strip eases back to cruising speed after a fling (higher = faster). */
const EASE_RATE = 2.5;

/**
 * Infinite scrolling strip of technologies.
 * - Press and hold to stop it.
 * - Drag left or right to scrub it; let go and it keeps moving in the direction you dragged,
 *   with a little momentum that eases back to cruising speed.
 */
export function Marquee() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let half = track.scrollWidth / 2; // width of one copy of the items
    let offset = 0; // current translateX in px, kept within (-half, 0]
    let direction = -1; // -1 = moving left, 1 = moving right
    let velocity = 0; // px per second, current
    let holding = false;
    let lastX = 0;
    let lastMoveTime = 0;
    let dragVelocity = 0;
    let pointerId: number | null = null;
    let frame = 0;
    let prev = performance.now();

    const cruise = () => (reducedMotion.matches ? 0 : half / LOOP_SECONDS);

    const wrapOffset = () => {
      if (half <= 0) return;
      offset = offset % half;
      if (offset > 0) offset -= half;
    };

    const render = () => {
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    const tick = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!holding) {
        const target = direction * cruise();
        velocity += (target - velocity) * Math.min(1, dt * EASE_RATE);
        offset += velocity * dt;
        wrapOffset();
        render();
      }
      frame = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      holding = true;
      pointerId = e.pointerId;
      velocity = 0;
      dragVelocity = 0;
      lastX = e.clientX;
      lastMoveTime = e.timeStamp;
      wrap.setPointerCapture(e.pointerId);
      wrap.dataset.dragging = 'true';
    };

    const onMove = (e: PointerEvent) => {
      if (!holding || e.pointerId !== pointerId) return;
      const dx = e.clientX - lastX;
      const dtMs = Math.max(e.timeStamp - lastMoveTime, 1);
      lastX = e.clientX;
      lastMoveTime = e.timeStamp;
      if (dx === 0) return;
      offset += dx;
      wrapOffset();
      render();
      // Smooth the drag speed so a jittery final move doesn't decide the direction.
      dragVelocity = dragVelocity * 0.6 + (dx / dtMs) * 1000 * 0.4;
      if (Math.abs(dx) >= 1) direction = dx > 0 ? 1 : -1;
    };

    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      holding = false;
      pointerId = null;
      delete wrap.dataset.dragging;
      // If the pointer rested before release, don't fling — just resume cruising.
      const restedMs = e.timeStamp - lastMoveTime;
      velocity = restedMs > 120 ? 0 : dragVelocity;
      if (wrap.hasPointerCapture(e.pointerId)) wrap.releasePointerCapture(e.pointerId);
    };

    const measure = () => {
      const ratio = half > 0 ? offset / half : 0;
      half = track.scrollWidth / 2;
      offset = ratio * half;
      wrapOffset();
      render();
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    wrap.addEventListener('pointerdown', onDown);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerup', onUp);
    wrap.addEventListener('pointercancel', onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      wrap.removeEventListener('pointerdown', onDown);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerup', onUp);
      wrap.removeEventListener('pointercancel', onUp);
    };
  }, []);

  const row = [...items, ...items];
  return (
    <Wrap ref={wrapRef} aria-hidden="true">
      <Track ref={trackRef}>
        {row.map((m, i) => (
          <span key={i}>
            {m} <Sep>✦</Sep>
          </span>
        ))}
      </Track>
    </Wrap>
  );
}

/* ---------- styles ---------- */

const Wrap = styled.div`
  overflow: hidden;
  border-block: 1px solid ${color.border};
  padding: 18px 0;
  margin: 24px 0 0;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y; /* horizontal drags go to the marquee, vertical swipes still scroll the page */

  &[data-dragging='true'] {
    cursor: grabbing;
  }
`;

const Track = styled.div`
  display: flex;
  gap: 28px;
  width: max-content;
  will-change: transform;
  font-family: ${font.serif};
  font-size: 1.8rem;
  font-style: italic;
  white-space: nowrap;

  /* trailing gap so the track is exactly two identical halves — keeps the loop seamless */
  padding-right: 28px;

  & > span {
    display: inline-flex;
    align-items: center;
    gap: 28px;
  }

  ${media.mobile} {
    font-size: 1.4rem;
  }
`;

const Sep = styled.span`
  color: ${color.accent};
  font-size: 0.9rem;
  font-style: normal;
`;
