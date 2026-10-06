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
      className="relative min-h-screen w-full overflow-hidden flex items-center bg-brand-navy"
    >
      {/* Background Video Layer */}
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

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-3xl animate-fade-up">
          
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-[0.16em] mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span>{contentData.site.tagline}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold text-white leading-[1.12] tracking-tight font-heading">
            {contentData.site.heroHeadline}
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal">
            {contentData.site.heroSubheadline}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 bg-brand-green text-brand-navy hover:bg-brand-accentGreen hover:shadow-xl hover:shadow-brand-green/25 transform hover:-translate-y-0.5 group"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 bg-white/15 backdrop-blur-md text-white border border-white/20 hover:bg-white/25 hover:border-white/40 transform hover:-translate-y-0.5"
            >
              <span>Partner With Us</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Floating Video Play / Pause Toggle Button */}
      <div className="absolute bottom-8 right-8 z-30 hidden sm:flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium hover:bg-black/60 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
        >
          {isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Video</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Video</span>
            </>
          )}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={scrollToNext}
          className="group flex flex-col items-center gap-1 text-slate-300 hover:text-white transition-colors focus:outline-none"
          aria-label="Scroll to next section"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400 group-hover:text-white transition-colors">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-brand-green" />
        </button>
      </div>
    </section>
  );
}
