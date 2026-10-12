'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
          <p className="text-brand-green text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3">
            About Zyventa
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading leading-tight">
            Bridging Global Pharmaceutical Innovation to the Middle East & Africa
          </h2>
        </div>

        {/* 3 Pillars - Clean, editorial typography without bubbly AI icon styling */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-t-2 border-brand-green/40 pt-5">
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              Regional Gateway
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Founded to serve as a vital link connecting international healthcare companies with the growing markets of the Arabian Gulf and Middle East.
            </p>
          </div>

          <div className="border-t-2 border-brand-green/40 pt-5">
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              5 Core Divisions
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              End-to-end integration across Regulation, Marketing, Sales, Wholesale Distribution, and Supply Chain Logistics.
            </p>
          </div>

          <div className="border-t-2 border-brand-green/40 pt-5">
            <h3 className="text-lg font-bold text-white font-heading mb-2">
              Rigorous Compliance
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
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
