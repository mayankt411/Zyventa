'use client';

import Link from 'next/link';
import { ArrowRight, Award, ShieldCheck, HeartPulse, Sparkles, CheckCircle2 } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function LeadershipSpotlight() {
  return (
    <section
      id="leadership"
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-white"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-5">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>Leadership & Team Philosophy</span>
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.15] font-heading">
              The Scientific Approach to Achieving Success
            </h2>

            <blockquote className="p-5 sm:p-6 rounded-2xl bg-slate-50 border-l-4 border-brand-green text-slate-700 italic text-sm sm:text-base leading-relaxed">
              &ldquo;We provide world-class support to those who want to enter the most promising markets of Middle East & Africa, with the help of the most dynamic management team. We recognize that our team is what makes us who we are. We pride ourselves on our professional, highly skilled and dedicated staff, each bringing their own unique skills to the business.&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-cyan-50/50 border border-cyan-100">
                <div className="p-2 rounded-lg bg-cyan-600 text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">5 Integrated Divisions</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <div className="p-2 rounded-lg bg-emerald-600 text-white">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">Patient-Centric Quality</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-brand-navy text-white hover:bg-brand-blue transition-colors group shadow-md"
              >
                <span>About Our Team</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
              </Link>
            </div>
          </div>

          {/* Right Portrait Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3] border border-slate-200/80 group">
              <img
                src="/assets/team/international-medical-team-in-face-masks-having-team-building-300x200.jpg"
                alt="Zyventa Medical and Leadership Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/50 text-xs font-bold text-brand-navy shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                <span>MEA Region</span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-green">
                  The Zyventa Team
                </p>
                <p className="text-sm sm:text-base font-bold mt-0.5">
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
