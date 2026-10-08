'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, Truck, Layers, Sparkles } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const tabConfig = {
  regulation: { icon: ShieldCheck, color: 'text-indigo-600', activeBg: 'bg-indigo-600 text-white', badge: 'bg-indigo-100 text-indigo-700' },
  marketing: { icon: TrendingUp, color: 'text-rose-600', activeBg: 'bg-rose-600 text-white', badge: 'bg-rose-100 text-rose-700' },
  sales: { icon: Users, color: 'text-emerald-600', activeBg: 'bg-emerald-600 text-white', badge: 'bg-emerald-100 text-emerald-700' },
  distribution: { icon: Truck, color: 'text-cyan-600', activeBg: 'bg-cyan-600 text-white', badge: 'bg-cyan-100 text-cyan-700' },
  'supply-chain': { icon: Layers, color: 'text-amber-600', activeBg: 'bg-amber-600 text-white', badge: 'bg-amber-100 text-amber-700' }
};

export default function DistributionTabs() {
  const [activeTab, setActiveTab] = useState(contentData.distributionDivisions[0].id);

  const currentDivision = contentData.distributionDivisions.find(d => d.id === activeTab) || contentData.distributionDivisions[0];
  const activeStyle = tabConfig[currentDivision.id] || tabConfig.regulation;

  return (
    <section
      id="distribution-channels"
      className="w-full py-20 sm:py-28 bg-brand-lightBg"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Our Distribution Channels & Divisions</span>
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.15]">
            One Integrated Commercial Network
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Connecting international pharmaceutical and wellness brands directly with healthcare providers across UAE, GCC, and MEA.
          </p>
        </div>

        {/* Tab Navigation Pill Buttons */}
        <div className="mt-10 flex flex-wrap gap-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm w-fit">
          {contentData.distributionDivisions.map((div) => {
            const cfg = tabConfig[div.id] || tabConfig.regulation;
            const Icon = cfg.icon;
            const isActive = activeTab === div.id;
            return (
              <button
                key={div.id}
                type="button"
                onClick={() => setActiveTab(div.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 focus:outline-none ${
                  isActive
                    ? `${cfg.activeBg} shadow-md`
                    : 'text-slate-600 hover:text-ink hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : cfg.color}`} />
                <span>{div.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Content Card */}
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-100 transition-all duration-300">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${activeStyle.badge}`}>
                  Division {contentData.distributionDivisions.findIndex(d => d.id === currentDivision.id) + 1} of 5
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  GCC & MEA Coverage
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink font-heading">
                {currentDivision.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentDivision.description}
              </p>

              {/* Visual Bullet Points Chips */}
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {currentDivision.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-brand-navy text-white hover:bg-brand-blue transition-colors group shadow"
                >
                  <span>Explore Division Capabilities</span>
                  <ArrowRight className="w-4 h-4 text-brand-green transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/contact-us"
                  className="text-xs sm:text-sm font-bold text-brand-blue hover:text-brand-navy transition-colors"
                >
                  Partner With Us →
                </Link>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-100 border border-slate-200/80 group">
                <img
                  src={currentDivision.image}
                  alt={currentDivision.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold uppercase tracking-wider text-brand-green">
                    {currentDivision.name} Division
                  </div>
                  <div className="text-sm font-semibold truncate">
                    {currentDivision.title}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
