'use client';

import Link from 'next/link';
import {
  ShieldCheck,
  TrendingUp,
  Users,
  Truck,
  Layers,
  ShoppingCart,
  Package,
  Globe,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const serviceTheme = [
  { icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50 hover:border-indigo-300', iconBg: 'bg-indigo-100' },
  { icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50 hover:border-rose-300', iconBg: 'bg-rose-100' },
  { icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50 hover:border-emerald-300', iconBg: 'bg-emerald-100' },
  { icon: Truck, color: 'text-cyan-600', bg: 'bg-cyan-50 hover:border-cyan-300', iconBg: 'bg-cyan-100' },
  { icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50 hover:border-amber-300', iconBg: 'bg-amber-100' },
  { icon: ShoppingCart, color: 'text-purple-600', bg: 'bg-purple-50 hover:border-purple-300', iconBg: 'bg-purple-100' },
  { icon: Package, color: 'text-teal-600', bg: 'bg-teal-50 hover:border-teal-300', iconBg: 'bg-teal-100' },
  { icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50 hover:border-blue-300', iconBg: 'bg-blue-100' }
];

export default function KeyServicesGrid() {
  return (
    <section
      id="key-services"
      className="w-full py-20 sm:py-28 bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Key Services</span>
          </p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.15]">
            What We Bring to Every Partnership
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From initial registration and market entry to high-volume pharmacy distribution and digital brand acceleration.
          </p>
        </div>

        {/* 8-Card Grid with Colorful Badges & Hover Effects */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentData.keyServices.map((service, idx) => {
            const theme = serviceTheme[idx % serviceTheme.length];
            const Icon = theme.icon;
            return (
              <div
                key={idx}
                className={`group relative bg-white hover:bg-slate-50/60 rounded-2xl p-6 border border-slate-200/80 ${theme.bg} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl ${theme.iconBg} ${theme.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 font-mono">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-base font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer Link Arrow */}
                <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-brand-blue transition-colors">
                  <span>Learn More</span>
                  <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${theme.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-brand-navy via-brand-darkBlue to-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-brand-green/20 text-brand-green text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner Expansion</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-heading">
              Ready to expand your pharmaceutical brand across MEA?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Connect with our business development and regulatory leadership team.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors shadow-lg shadow-brand-green/20"
          >
            <span>Start Conversation</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
