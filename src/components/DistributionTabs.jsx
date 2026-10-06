'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, Truck, Layers } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const iconMap = {
  regulation: ShieldCheck,
  marketing: TrendingUp,
  sales: Users,
  distribution: Truck,
  'supply-chain': Layers
};

export default function DistributionTabs() {
  const [activeTab, setActiveTab] = useState(contentData.distributionDivisions[0].id);

  const currentDivision = contentData.distributionDivisions.find(d => d.id === activeTab) || contentData.distributionDivisions[0];

  return (
    <section
      id="distribution-channels"
      className="w-full py-24 sm:py-32 bg-brand-lightBg"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Our Distribution Channels & Divisions</span>
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15]">
            One integrated distribution network connecting brands with the UAE and MEA markets.
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            With meticulous attention to detail, we integrate five essential divisions to cultivate a strong brand identity and market presence.
          </p>
        </div>

        {/* Tab Navigation Pill Buttons */}
        <div className="mt-12 flex flex-wrap gap-2 sm:gap-3 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
          {contentData.distributionDivisions.map((div) => {
            const Icon = iconMap[div.id] || Truck;
            const isActive = activeTab === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setActiveTab(div.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-white text-brand-navy shadow-md shadow-slate-200'
                    : 'text-slate-600 hover:text-ink hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-green' : 'text-slate-400'}`} />
                <span>{div.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Content Card */}
        <div className="mt-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl shadow-slate-100 transition-all duration-300">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-blue text-xs font-semibold uppercase tracking-wider">
                <span>Division {contentData.distributionDivisions.findIndex(d => d.id === currentDivision.id) + 1} of 5</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
                {currentDivision.title}
              </h3>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {currentDivision.description}
              </p>

              {/* Bullet Points */}
              <div className="space-y-3 pt-2">
                {currentDivision.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-700 font-medium">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors group"
                >
                  <span>More Details</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
                </Link>

                <Link
                  href="/contact-us"
                  className="text-sm font-semibold text-slate-600 hover:text-brand-blue transition-colors"
                >
                  Inquire for Partnership →
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-100 border border-slate-100">
                <img
                  src={currentDivision.image}
                  alt={currentDivision.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
