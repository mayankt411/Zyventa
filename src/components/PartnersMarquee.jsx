import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import { Reveal } from '@/components/Motion';

export default function PartnersMarquee() {
  return (
    <section id="our-partners" className="bg-brand-paper py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-12">
            <p className="eyebrow">Partners</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Worldwide Principal Partners</h2>
          </div>
        </Reveal>
        <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 border-t border-l border-brand-navy/15">
          {contentData.partners.map((partner) => (
            <li
              key={partner.name}
              className="group h-28 sm:h-32 flex flex-col items-center justify-center gap-2 px-3 py-4 border-b border-r border-brand-navy/15 bg-white"
            >
              <span className="flex-1 w-full flex items-center justify-center min-h-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  className="max-h-[3.75rem] max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </span>
              {partner.country && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-60">{partner.country}</span>
              )}
            </li>
          ))}
          <li className="h-28 sm:h-32 col-span-2 sm:col-span-1 md:col-span-2 border-b border-r border-brand-navy/15">
            <Link
              href="/contact-us?type=distribution"
              className="group h-full flex flex-col items-center justify-center gap-1 bg-brand-navy text-white hover:bg-brand-darkBlue transition-colors"
            >
              <span className="text-sm font-bold text-center px-2">Become a partner</span>
              <span className="inline-flex items-center gap-1 text-xs text-brand-green">
                Start a conversation <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
