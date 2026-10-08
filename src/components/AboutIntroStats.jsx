'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe, Users, Building2, Sparkles } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

function StatCounter({ target, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const targetNum = parseInt(target, 10);
    if (isNaN(targetNum)) return;

    let start = 0;
    const duration = 1800;
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
    <span className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-green tracking-tight font-heading">
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
      className="stats-section relative w-full py-20 sm:py-28 overflow-hidden bg-brand-navy"
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
        
        {/* Intro Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-[0.14em] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Zyventa</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
            Bridging Global Pharmaceutical Innovation to the Middle East & Africa
          </h2>
        </div>

        {/* 3 Visual Feature Cards (Chunked, Less Text Wall) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-brand-green/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-brand-green/20 text-brand-green flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              Regional Gateway
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Founded to serve as a vital link connecting international healthcare companies with the growing markets of the Arabian Gulf and Middle East.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-cyan-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              5 Core Divisions
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              End-to-end integration across Regulation, Marketing, Sales, Wholesale Distribution, and Supply Chain Logistics.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-amber-400/40 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              Rigorous Compliance
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Strict adherence to regional health authority regulations and GDP standards, ensuring seamless market access and patient safety.
            </p>
          </div>

        </div>

        {/* Animated Counter Stats Row */}
        <div className="mt-14 pt-12 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {contentData.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-baseline">
                <StatCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <div className="mt-2 text-sm sm:text-base font-bold text-white">
                {stat.label}
              </div>
              <div className="mt-0.5 text-xs text-slate-300 max-w-[180px]">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
