'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

// useLayoutEffect warns during server rendering; fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Scroll-triggered motion. Hidden start states only apply when <html> has
// `motion-ok` or `motion-reduce` (set in layout.js before paint), so content is
// never hidden without JS. Reduced-motion visitors get fades and counters but
// no sliding, growing or parallax (see globals.css).

// The huge top margin counts anything above the viewport as seen, so sections
// skipped by a fast scroll, End key or anchor jump still reveal instead of staying hidden.
function useInView(ref, { once = true, rootMargin = '100000px 0px -10% 0px' } = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, once, rootMargin]);
  return inView;
}

// Fades and lifts its content into view. `stagger` animates each direct child
// in turn instead (for grids and lists); `variant="bars"` grows .bar children.
export function Reveal({ as: Tag = 'div', stagger = false, variant, className = '', children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const base = variant === 'bars' ? 'reveal-bars' : stagger ? 'reveal-stagger' : 'reveal-up';
  return (
    <Tag ref={ref} className={`${base} ${inView ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts a number up from zero the first time it scrolls into view.
export function CountUp({ value, duration = 1400, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const target = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0;
  const pad = /^0\d/.test(String(value)) ? String(value).length : 0;
  const [current, setCurrent] = useState(target);

  // Reset to zero before first paint so on-screen counters don't flash the final value.
  useIsoLayoutEffect(() => {
    setCurrent(0);
  }, []);

  useEffect(() => {
    if (!inView) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  const shown = pad ? String(current).padStart(pad, '0') : current;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {shown}
    </span>
  );
}

// Moves its content slowly against the scroll for a sense of depth.
export function Parallax({ speed = 0.08, className = '', children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let frame;
    const update = () => {
      frame = null;
      el.style.transform = `translate3d(0, ${window.scrollY * speed}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
