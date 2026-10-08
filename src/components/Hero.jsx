'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ChevronDown, ArrowRight, ShieldCheck, Globe, Building2, Sparkles } from 'lucide-react';
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
      {/* Bright Background Video Layer */}
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
        {/* Subtle, Bright Scrim for High Video Clarity */}
        <div className="hero-scrim"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl">
          
          {/* Glass Card Container for Crisp Text Readability & Video Brightness */}
          <div className="bg-brand-navy/65 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl space-y-6 animate-fade-up">
            
            {/* Vibrant Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-green/20 backdrop-blur-md border border-brand-green/40 text-white text-xs font-bold uppercase tracking-[0.16em]">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
              <span className="text-brand-green">{contentData.site.tagline}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.85rem] font-extrabold text-white leading-[1.12] tracking-tight font-heading drop-shadow-md">
              ZYVENTA: Your MEA Healthcare Bridge!
            </h1>

            {/* Streamlined Subheading */}
            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium">
              We connect global pharmaceutical and biotechnology innovators with growing markets across the Arabian Gulf, Middle East, and Africa through 5 integrated commercial divisions.
            </p>

            {/* Quick Metrics Badges Bar */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-2 border-t border-white/15">
              <div className="flex items-center gap-2 text-white">
                <div className="p-1.5 rounded-lg bg-brand-green/20 text-brand-green">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">5 Divisions</div>
                  <div className="text-[10px] sm:text-xs text-slate-300">Integrated</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white">
                <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">GCC & MEA</div>
                  <div className="text-[10px] sm:text-xs text-slate-300">Presence</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-white">
                <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">100% Quality</div>
                  <div className="text-[10px] sm:text-xs text-slate-300">Compliance</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 bg-brand-green text-brand-navy hover:bg-brand-accentGreen hover:shadow-xl hover:shadow-brand-green/30 transform hover:-translate-y-0.5 group"
              >
                <span>Explore Services & Divisions</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/our-range-products"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-bold transition-all duration-300 bg-white/20 backdrop-blur-md text-white border border-white/30 hover:bg-white/30 hover:border-white/50 transform hover:-translate-y-0.5"
              >
                <span>View Product Range</span>
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Floating Video Play / Pause Toggle Button */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-navy/70 backdrop-blur-md border border-white/30 text-white text-xs font-semibold hover:bg-brand-navy/90 transition-all shadow-lg focus:outline-none"
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current text-brand-green" />
              <span>Pause Video</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current text-brand-green" />
              <span>Play Video</span>
            </>
          )}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll to next section"
        >
          <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300 group-hover:text-white transition-colors">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-green" />
        </button>
      </div>
    </section>
  );
}
