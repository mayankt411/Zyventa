'use client';

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { productHighlights, imageRatio, imageSize } from '@/components/Catalog';

const INTERVAL_MS = 4800;
const SLIDE_MS = 900;
const EASE = 'cubic-bezier(0.7, 0, 0.2, 1)';
// Tallest the photo frame ever gets. Wide photos use the full width; squarer
// photos get a narrower frame at this same height instead of a taller one.
const STAGE_MAX_REM = 27;

// Frame size for a photo shape: its own ratio, capped to STAGE_MAX_REM tall.
const frameFor = (ratio) => ({
  aspectRatio: String(ratio),
  width: `min(100%, ${(STAGE_MAX_REM * ratio).toFixed(3)}rem)`,
});

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Resolves once the image is cached (or after a short timeout), so a slide never
// slides in blank.
function preload(src, timeout = 900) {
  return new Promise((resolve) => {
    const img = new Image();
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
    img.src = src;
    setTimeout(done, timeout);
  });
}

// Self-moving slideshow of product photos for the catalogue hero.
//
// All motion is driven with the Web Animations API rather than CSS, because the
// site stylesheet flattens CSS animations/transitions for `prefers-reduced-motion`.
// Reduced-motion visitors still get movement, but as a gentle crossfade with no
// sideways travel. Every photo is shown whole (never cropped) in a frame that
// takes the photo's own shape, morphing between shapes as the slides change; the
// area it sits in is reserved at the tallest shape so nothing below ever jumps.
// Pauses on hover/focus and via the pause button.
export default function HeroSlideshow({ products, onOpen }) {
  const count = products.length;
  // exit = the slide that is currently leaving; n changes on every navigation.
  const [view, setView] = useState({ index: 0, exit: null, dir: 1, n: 0 });
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const slideEls = useRef({});
  const stageEl = useRef(null);
  const fillEl = useRef(null);
  const progress = useRef(null);
  const captionEl = useRef(null);
  const tagsEl = useRef(null);
  const touchX = useRef(null);
  const firstRender = useRef(true);

  const { index, exit } = view;
  const playing = !paused && !userPaused && count > 1;

  const next = useCallback(
    () => setView((v) => ({ index: (v.index + 1) % count, exit: v.index, dir: 1, n: v.n + 1 })),
    [count]
  );
  const prev = useCallback(
    () => setView((v) => ({ index: (v.index - 1 + count) % count, exit: v.index, dir: -1, n: v.n + 1 })),
    [count]
  );
  const jump = useCallback(
    async (target) => {
      await preload(products[target].image);
      setView((v) => (v.index === target ? v : { index: target, exit: v.index, dir: target > v.index ? 1 : -1, n: v.n + 1 }));
    },
    [products]
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = (e) => setReduceMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Keep the neighbouring photos warm so autoplay and the arrows never show a blank frame.
  useEffect(() => {
    if (count < 2) return;
    preload(products[(index + 1) % count].image);
    preload(products[(index - 1 + count) % count].image);
  }, [index, count, products]);

  // The slide change itself: the incoming slide travels in as the outgoing one
  // leaves. Started in a layout effect so there is no flash before it begins.
  useIsoLayoutEffect(() => {
    if (view.exit == null) return undefined;
    const enter = slideEls.current[products[view.index].id];
    const leave = slideEls.current[products[view.exit].id];
    const d = view.dir || 1;
    const anims = [];
    // The frame glides from the old photo's shape to the new one's.
    const stage = stageEl.current;
    const fromRatio = imageRatio(products[view.exit].image);
    const toRatio = imageRatio(products[view.index].image);
    if (stage && fromRatio !== toRatio && !reduceMotion) {
      anims.push(stage.animate([frameFor(fromRatio), frameFor(toRatio)], { duration: SLIDE_MS, easing: EASE, fill: 'both' }));
    }
    if (reduceMotion) {
      const fade = { duration: 700, easing: 'ease-in-out', fill: 'both' };
      if (enter) anims.push(enter.animate([{ opacity: 0 }, { opacity: 1 }], fade));
      if (leave) anims.push(leave.animate([{ opacity: 1 }, { opacity: 0 }], fade));
    } else {
      const slide = { duration: SLIDE_MS, easing: EASE, fill: 'both' };
      if (enter) anims.push(enter.animate([{ transform: `translate3d(${d * 100}%,0,0)` }, { transform: 'translate3d(0,0,0)' }], slide));
      if (leave) anims.push(leave.animate([{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(${-d * 100}%,0,0)` }], slide));
    }
    let cancelled = false;
    Promise.all(anims.map((a) => a.finished))
      .then(() => {
        if (!cancelled) setView((v) => (v.n === view.n ? { ...v, exit: null } : v));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      anims.forEach((a) => a.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view.n]);

  // Caption and tags settle in just after the slide lands.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const from = { opacity: 0, transform: reduceMotion ? 'none' : 'translateY(10px)' };
    [captionEl.current, tagsEl.current].filter(Boolean).forEach((el) => {
      el.animate([from, { opacity: 1, transform: 'none' }], { duration: 600, delay: 300, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)', fill: 'backwards' });
    });
  }, [index, reduceMotion]);

  // Autoplay clock: the active tick fills over INTERVAL_MS and the slideshow advances
  // when it completes. Pausing freezes the fill, so the bar always shows the real time left.
  useEffect(() => {
    const el = fillEl.current;
    if (!el || count < 2) return undefined;
    const a = el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: INTERVAL_MS, easing: 'linear', fill: 'forwards' });
    progress.current = a;
    a.onfinish = next;
    if (!playing) a.pause();
    return () => {
      a.onfinish = null;
      a.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, count, next]);

  useEffect(() => {
    const a = progress.current;
    if (!a) return;
    if (playing) a.play();
    else a.pause();
  }, [playing]);

  if (!count) return null;

  const current = products[index];
  const highlights = productHighlights(current.id);
  const mounted = [exit, index].filter((i, k, arr) => i != null && arr.indexOf(i) === k);
  // Reserve the height of the tallest (squarest) photo so the frame can change shape
  // without moving anything around it.
  const reserveRatio = Math.min(...products.map((p) => imageRatio(p.image)));

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
      className="mx-auto w-full max-w-[34rem]"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative flex w-full items-center justify-center" style={{ aspectRatio: reserveRatio, maxHeight: `${STAGE_MAX_REM}rem` }}>
      <div
        ref={stageEl}
        className="group relative overflow-hidden rounded-2xl shadow-[0_32px_64px_-28px_rgba(0,0,0,0.75)]"
        style={frameFor(imageRatio(current.image))}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        }}
      >
        {mounted.map((i) => {
          const p = products[i];
          const [w, h] = imageSize(p.image);
          return (
            <div
              key={p.id}
              ref={(el) => {
                if (el) slideEls.current[p.id] = el;
                else delete slideEls.current[p.id];
              }}
              aria-hidden={i !== index}
              className="absolute inset-0 will-change-transform"
            >
              {/* The frame matches the photo's shape, so cover shows the whole photo. */}
              <img
                src={p.image}
                alt={i === index ? p.name : ''}
                width={w}
                height={h}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          );
        })}

        {/* Whole stage opens the product */}
        <button
          type="button"
          onClick={() => onOpen(current)}
          className="absolute inset-0 z-10 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-green"
          aria-label={`View ${current.name}`}
        />

        {highlights.length > 0 && (
          <span ref={tagsEl} className="pointer-events-none absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5">
            {highlights.map((h) => (
              <span key={h} className={`tag ${h === 'Zyventa brand' ? 'bg-brand-navy text-brand-paper' : 'bg-brand-green text-brand-darkBlue'}`}>{h}</span>
            ))}
          </span>
        )}

        <div
          ref={captionEl}
          className="pointer-events-none absolute left-4 bottom-4 z-20 max-w-[calc(100%-2rem)] rounded-2xl bg-white/90 backdrop-blur px-4 py-2.5 shadow-lg"
          aria-live={playing ? 'off' : 'polite'}
        >
          <span className="block text-[10px] font-bold uppercase tracking-[0.16em] leading-none text-ink-60 truncate">{current.category}</span>
          <span className="mt-1.5 flex items-center gap-1.5 font-display text-lg leading-none text-brand-navy">
            <span className="truncate">{current.name}</span>
            <ArrowUpRight className="w-4 h-4 shrink-0 text-brand-navy/50" aria-hidden="true" />
          </span>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous product"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-brand-navy shadow-md backdrop-blur transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next product"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-brand-navy shadow-md backdrop-blur transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center gap-4">
          <p className="shrink-0 font-display text-sm tabular-nums text-brand-onDarkMuted">
            <span className="text-brand-paper">{String(index + 1).padStart(2, '0')}</span> / {String(count).padStart(2, '0')}
          </p>
          <div className="flex flex-1 items-center gap-1" role="tablist" aria-label="Choose a product">
            {products.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show ${p.name}`}
                onClick={() => jump(i)}
                className="group/tick flex h-6 flex-1 items-center focus-visible:outline-none"
              >
                <span
                  className={`relative block h-1 w-full overflow-hidden rounded-full transition-colors duration-300 group-focus-visible/tick:ring-2 group-focus-visible/tick:ring-brand-green ${
                    i === index ? 'bg-white/30' : 'bg-white/20 group-hover/tick:bg-white/45'
                  }`}
                >
                  <span
                    ref={i === index ? fillEl : null}
                    className="absolute inset-0 origin-left rounded-full bg-brand-green"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? 'Play slideshow' : 'Pause slideshow'}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-brand-paper ring-1 ring-white/15 transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
          >
            {userPaused ? <Play className="w-3.5 h-3.5" aria-hidden="true" /> : <Pause className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
        </div>
      )}
    </div>
  );
}
