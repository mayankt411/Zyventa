'use client';

import contentData from '@/data/zyventaContent.json';

export default function OurJourney() {
  return (
    <section
      id="our-journey"
      className="w-full py-24 sm:py-32 bg-white"
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Our Journey</span>
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15]">
            From Distribution to Healthcare Partnership
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            How Zyventa evolved into a trusted bridge connecting global pharmaceutical innovation with the Arabian Gulf and Middle East.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="mt-20 relative">
          
          {/* Vertical Connecting Center Line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-slate-200" aria-hidden="true" />

          <div className="space-y-12 sm:space-y-16">
            {contentData.journey.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline Badge Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-brand-green shadow-md flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-brand-navy"></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <div className="bg-brand-lightBg p-6 sm:p-8 rounded-2xl border border-slate-200/70 hover:border-brand-green/40 hover:shadow-lg transition-all duration-300">
                      <div className="inline-block px-3 py-1 rounded-full bg-brand-green/15 text-brand-navy text-xs font-bold uppercase tracking-wider mb-3">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-ink font-heading">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty Spacer Column for balance on desktop */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
