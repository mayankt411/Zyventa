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
  ArrowUpRight
} from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const iconComponents = {
  ShieldCheck,
  TrendingUp,
  Users,
  Truck,
  Layers,
  ShoppingCart,
  Package,
  Globe
};

export default function KeyServicesGrid() {
  return (
    <section
      id="key-services"
      className="w-full py-24 sm:py-32 bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Key Services</span>
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15]">
            What We Bring to Every Partnership
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            From first market entry to long-term growth, our scientific approach and dedicated divisions empower healthcare brands across the GCC and Middle East.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contentData.keyServices.map((service, idx) => {
            const Icon = iconComponents[service.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group relative bg-brand-lightBg hover:bg-white rounded-2xl p-7 border border-slate-200/70 hover:border-brand-green/40 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col justify-between"
              >
                <div>
                  {/* Icon and Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-brand-green/10 flex items-center justify-center text-brand-blue group-hover:text-brand-green transition-colors border border-slate-200/60 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-brand-green/60 font-mono transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-lg font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Footer Link Arrow */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-brand-blue transition-colors">
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-brand-green" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-8 rounded-2xl bg-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-xl font-bold font-heading">
              Ready to expand your pharmaceutical brand across MEA?
            </h4>
            <p className="text-sm text-slate-300 mt-1">
              Connect with our business development and regulatory leadership today.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="flex-shrink-0 inline-flex items-center justify-center px-7 py-3 rounded-full text-sm font-semibold bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors shadow"
          >
            <span>Start Conversation</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
