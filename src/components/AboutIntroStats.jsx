'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

function StatCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const targetNum = parseInt(target, 10);
    if (isNaN(targetNum)) return;

    let start = 0;
    const duration = 1800; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = targetNum / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="font-bold text-4xl sm:text-5xl lg:text-6xl text-brand-green tracking-tight">
      {count}{suffix}
    </span>
  );
}

export default function AboutIntroStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="stats-section relative w-full py-24 sm:py-32 overflow-hidden bg-brand-navy"
    >
      {/* Background Graphic Image */}
      <img
        src="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
        alt=""
        className="stats-bg-img"
        aria-hidden="true"
      />
      <div aria-hidden="true" className="stats-overlay"></div>

      <div className="stats-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Paragraph Split Layout */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/15 text-brand-green text-xs font-semibold uppercase tracking-[0.14em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
            <span>About Zyventa</span>
          </div>

          <p className="text-xl sm:text-2xl lg:text-[1.65rem] text-slate-100 font-normal leading-relaxed">
            <strong className="text-white font-semibold">ZYVENTA</strong> was founded to serve as a link between international healthcare companies and the growing markets of Arabian Gulf and the Middle East. ZYVENTA bridges access gaps by partnering with global pharmaceutical and biotechnology companies to deploy and commercialize new pharmaceutical, biologics, and other healthcare solutions in the Middle East and Africa (MEA) Markets.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-white transition-colors group"
            >
              <span>Learn more about our mission & history</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Animated Counter Stats Row */}
        <div className="mt-20 pt-16 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {contentData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="flex items-baseline">
                <StatCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="mt-2 text-base sm:text-lg font-semibold text-white">
                {stat.label}
              </div>
              <div className="mt-1 text-xs sm:text-sm text-slate-300 max-w-[200px]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
