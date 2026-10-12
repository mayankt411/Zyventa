'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ChevronDown, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('stats');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden flex items-center bg-brand-navy"
    >
      {/* Background Video */}
      <div aria-hidden="true" className="hero-video-wrap">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
          className="w-full h-full object-cover"
        >
          <source src={contentData.site.videoSrc} type="video/mp4" />
        </video>
        <div className="hero-scrim"></div>
      </div>

      {/* Main Content — sits directly over video, no card box */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 animate-fade-up">
        <div className="max-w-3xl space-y-6">

          {/* Eyebrow — plain text, no badge/box */}
          <p className="text-brand-green text-sm font-semibold uppercase tracking-[0.18em]">
            {contentData.site.tagline}
          </p>

          {/* Main Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold text-white leading-[1.1] tracking-tight font-heading"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.45)' }}
          >
            ZYVENTA: Your MEA Healthcare Bridge
          </h1>

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            We connect global pharmaceutical and biotechnology innovators with growing markets across the Arabian Gulf, Middle East, and Africa through 5 integrated commercial divisions.
          </p>

          {/* Plain text metrics — no icons, no boxes */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1 border-t border-white/20">
            <div>
              <span className="text-white font-bold text-sm">5 Divisions</span>
              <span className="text-slate-300 text-sm ml-1.5">Integrated</span>
            </div>
            <div>
              <span className="text-white font-bold text-sm">GCC &amp; MEA</span>
              <span className="text-slate-300 text-sm ml-1.5">Presence</span>
            </div>
            <div>
              <span className="text-white font-bold text-sm">100% Quality</span>
              <span className="text-slate-300 text-sm ml-1.5">Compliance</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 bg-brand-green text-brand-navy hover:bg-brand-accentGreen hover:shadow-xl hover:shadow-brand-green/30 transform hover:-translate-y-0.5 group"
            >
              Explore Services &amp; Divisions
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/our-range-products"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 bg-transparent text-white border border-white/60 hover:bg-white/10 hover:border-white transform hover:-translate-y-0.5"
            >
              View Product Range
            </Link>
          </div>

        </div>
      </div>

      {/* Video Play / Pause */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-semibold hover:bg-black/60 transition-all focus:outline-none"
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? (
            <><Pause className="w-3.5 h-3.5 fill-current" /><span>Pause</span></>
          ) : (
            <><Play className="w-3.5 h-3.5 fill-current" /><span>Play</span></>
          )}
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <button
          type="button"
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
