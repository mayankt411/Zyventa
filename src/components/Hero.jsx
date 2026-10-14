'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <section id="hero" className="bg-brand-paper pt-28 sm:pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end reveal">
          <div className="lg:col-span-8">
            <p className="eyebrow">{contentData.site.tagline}</p>
            <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-[4.25rem]">
              Your healthcare bridge to the Middle East&nbsp;&amp;&nbsp;Africa.
            </h1>
          </div>
          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-base sm:text-lg text-ink-80 leading-relaxed">
              Zyventa connects global pharmaceutical and biotechnology companies with the Arabian Gulf, Middle East and Africa.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/services" className="btn btn-solid">
                Our services <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact-us" className="btn btn-line">Contact us</Link>
            </div>
          </div>
        </div>

        {/* Featured video — the page's primary visual */}
        <figure className="mt-10 sm:mt-14 reveal" style={{ animationDelay: '.15s' }}>
          <div className="relative aspect-video w-full bg-brand-navy overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,42,77,0.55)]">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
              aria-label="Zyventa company film"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={contentData.site.videoSrc} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={togglePlay}
              className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-2 px-3.5 py-2 bg-brand-navy/80 text-white text-xs font-semibold hover:bg-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </figure>
      </div>
      <div className="h-16 sm:h-24" />
    </section>
  );
}
