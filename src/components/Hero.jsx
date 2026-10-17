'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Play, Pause, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import { CountUp } from '@/components/Motion';

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
    <section id="hero" className="bg-brand-paper pt-20">
      {/* Headline split: statement left, navy quote panel right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 border-b border-brand-border">
          <div className="lg:col-span-8 py-14 sm:py-20 lg:pr-14 reveal">
            <p className="eyebrow">Healthcare market entry · GCC, Middle East &amp; Africa</p>
            <h1 className="display mt-6 text-[2.6rem] sm:text-6xl lg:text-[4.6rem]">
              Creating a <em>healthy</em> tomorrow, across the Middle East &amp;&nbsp;Africa.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-ink-80 leading-relaxed">
              We connect global pharmaceutical and biotechnology companies with the patients who need them, from registration to the pharmacy shelf.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/contact-us" className="btn btn-solid">
                Partner with us <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/services" className="link-accent">
                See what we do <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside
            className="lg:col-span-4 bg-brand-navy text-brand-paper p-8 sm:p-10 flex flex-col justify-between gap-10 reveal"
            style={{ animationDelay: '.1s' }}
          >
            <span className="font-display text-7xl leading-none text-brand-green" aria-hidden="true">&ldquo;</span>
            <div>
              <p className="font-display text-2xl sm:text-[1.7rem] leading-snug">
                From registration to the pharmacy shelf, handled in-house.
              </p>
              <p className="mt-6 text-sm text-brand-onDarkMuted">Five divisions · one partner</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {contentData.distributionDivisions.map((div) => (
                  <li key={div.id}>
                    <Link
                      href={`/services#${div.id}`}
                      className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20 hover:border-brand-green hover:text-brand-green transition-colors"
                    >
                      {div.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Key figures */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-b border-brand-border">
          {contentData.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 pr-4 ${i % 2 === 1 ? 'pl-6 border-l border-brand-border' : ''} ${i === 2 ? 'lg:pl-6 lg:border-l border-brand-border' : ''}`}
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-4xl sm:text-5xl text-brand-navy">
                <CountUp value={stat.value} /><span className="text-brand-green">{stat.suffix}</span>
              </dd>
              <dd className="mt-2 text-sm font-semibold text-ink">{stat.label}</dd>
              <dd className="mt-1 text-xs sm:text-sm text-ink-60 leading-relaxed">{stat.description}</dd>
            </div>
          ))}
        </dl>

        {/* Company film */}
        <figure className="mt-14 sm:mt-20 reveal" style={{ animationDelay: '.15s' }}>
          <div className="relative aspect-[21/9] w-full bg-brand-navy overflow-hidden rounded-md">
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
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-paper/90 text-brand-navy text-xs font-bold hover:bg-brand-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
          <figcaption className="mt-3 text-xs text-ink-60">Zyventa company film</figcaption>
        </figure>
      </div>
      <div className="h-16 sm:h-24" />
    </section>
  );
}
