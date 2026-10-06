'use client';

import contentData from '@/data/zyventaContent.json';

export default function PartnersMarquee() {
  const row1 = contentData.partners.slice(0, 5);
  const row2 = contentData.partners.slice(5);

  return (
    <section
      id="our-partners"
      className="w-full py-24 sm:py-32 bg-white overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
            <span className="w-2 h-2 rounded-full bg-brand-green"></span>
            <span>Our Partners & Collaborations</span>
          </p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15]">
            Building Stronger Healthcare Partnerships
          </h2>
          <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            We partner with international pharmaceutical and biotechnology companies to deploy and commercialize high-quality healthcare solutions in the Middle East and Africa.
          </p>
        </div>

      </div>

      {/* Marquee Container */}
      <div className="mt-16 space-y-6">
        
        {/* Row 1: Left to Right Marquee */}
        <div className="marquee-container py-2">
          <div className="marquee-content marquee-ltr flex items-center gap-6">
            {row1.concat(row1, row1).map((partner, idx) => (
              <div
                key={`r1-${idx}`}
                className="flex-shrink-0 w-52 h-24 px-6 py-4 bg-brand-lightBg rounded-2xl border border-slate-200/60 flex items-center justify-center hover:border-brand-green/40 hover:shadow-md transition-all duration-300 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-[140px] w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="marquee-container py-2">
          <div className="marquee-content marquee-rtl flex items-center gap-6">
            {row2.concat(row2, row2).map((partner, idx) => (
              <div
                key={`r2-${idx}`}
                className="flex-shrink-0 w-52 h-24 px-6 py-4 bg-brand-lightBg rounded-2xl border border-slate-200/60 flex items-center justify-center hover:border-brand-green/40 hover:shadow-md transition-all duration-300 group"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 max-w-[140px] w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
