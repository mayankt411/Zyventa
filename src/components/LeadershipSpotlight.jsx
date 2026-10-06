'use client';

import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, HeartPulse } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function LeadershipSpotlight() {
  return (
    <section
      id="leadership"
      className="relative w-full py-24 sm:py-32 overflow-hidden bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="space-y-6">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>Leadership & Team Philosophy</span>
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15] font-heading">
              The Scientific Approach to Achieving Success
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {contentData.site.aboutSubtext}
            </p>

            <blockquote className="p-6 rounded-2xl bg-brand-lightBg border-l-4 border-brand-green text-slate-700 italic text-base leading-relaxed">
              &ldquo;We provide world-class support to those who want to enter the most promising markets of Middle East & Africa, with the help of the most dynamic management team. We recognize that our team is what makes us who we are. We pride ourselves on our professional, highly skilled and dedicated staff, each bringing their own unique skills to the business.&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-ink">5 Integrated Divisions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-green/10 text-brand-green">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-ink">Patient-Centric Focus</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors group shadow"
              >
                <span>About Our Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
              </Link>
            </div>
          </div>

          {/* Right Portrait Image Column */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3] border border-slate-100">
              <img
                src="/assets/team/international-medical-team-in-face-masks-having-team-building-300x200.jpg"
                alt="Zyventa Medical and Leadership Team"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-bold uppercase tracking-wider text-brand-green">
                  The Zyventa Team
                </p>
                <p className="text-lg font-semibold mt-1">
                  Dedicated Healthcare & Management Professionals
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
