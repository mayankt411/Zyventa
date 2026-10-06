import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, Truck, Layers, CheckCircle2, ArrowRight, Package } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export const metadata = {
  title: 'Services - Zyventa',
  description: 'We offer seamless distribution of pharmaceuticals, nutraceuticals, and OTC consumer health products.',
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <img
          src="/assets/images/business-meeting-on-marketing-300x200.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Our Core Capabilities</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Services & Core Divisions
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              We offer seamless distribution of pharmaceuticals, nutraceuticals, and OTC consumer health products across the GCC and Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Divisions Detail Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>The Scientific Approach</span>
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink font-heading">
              Zyventa: The Scientific Approach to Achieving Success
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              At ZYVENTA, we pride ourselves on our comprehensive approach to establishing and enhancing brand presence within the region&apos;s dynamic healthcare landscape. Our dedicated team oversees every phase and process necessary to cultivate a strong brand identity and market presence through five essential divisions:
            </p>
          </div>

          {/* Division Cards */}
          <div className="space-y-16">
            {contentData.distributionDivisions.map((div, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  id={div.id}
                  key={div.id}
                  className="scroll-mt-28 bg-brand-lightBg rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-sm"
                >
                  <div className={`grid lg:grid-cols-12 gap-10 lg:gap-14 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    
                    <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/15 text-brand-navy text-xs font-bold uppercase tracking-wider">
                        Division 0{idx + 1}
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
                        {div.title}
                      </h3>

                      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                        {div.description}
                      </p>

                      <div className="space-y-3 pt-2">
                        {div.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                            <span className="text-sm sm:text-base text-slate-700 font-medium">
                              {pt}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center gap-4">
                        <Link
                          href="/contact-us"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors group"
                        >
                          <span>Inquire About {div.name}</span>
                          <ArrowRight className="w-4 h-4 text-brand-green transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-100 border border-slate-100">
                        <img
                          src={div.image}
                          alt={div.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Bulk Order CTA */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider">
                <Package className="w-3.5 h-3.5" />
                <span>Bulk Supply</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-heading">
                Order Now in Bulk at Wholesale Rates
              </h3>
              <p className="text-slate-300 text-base">
                We supply pharmacies, clinics, and healthcare centers across UAE and GCC with certified prescription medications and wellness essentials.
              </p>
            </div>
            <Link
              href="/our-range-products"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-semibold bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors flex-shrink-0 shadow-lg"
            >
              <span>View Wholesale Range</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
