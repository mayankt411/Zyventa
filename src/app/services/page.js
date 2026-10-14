import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export const metadata = {
  title: 'Services - Zyventa',
  description: 'Regulatory, marketing, sales, distribution and supply chain services for healthcare brands across the GCC, Middle East and Africa.',
};

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-brand-paper">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Services</p>
          <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Five divisions that take your product to market.
          </h1>
          <p className="mt-6 text-lg text-ink-80 leading-relaxed">
            Regulation, marketing, sales, distribution and supply chain, delivered by one team across the GCC and wider MEA region.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {contentData.distributionDivisions.map((div, idx) => (
            <article
              id={div.id}
              key={div.id}
              className="scroll-mt-28 grid lg:grid-cols-12 gap-8 lg:gap-14 py-14 sm:py-20 border-b border-slate-200 last:border-b-0"
            >
              <div className={`lg:col-span-6 ${idx % 2 ? 'lg:order-2' : ''}`}>
                <p className="font-display text-brand-blue text-lg">0{idx + 1}</p>
                <h2 className="display mt-2 text-3xl sm:text-4xl">{div.title}</h2>
                <p className="mt-4 text-lg text-ink-80 leading-relaxed">{div.description}</p>
                <ul className="mt-6 space-y-2 text-ink-80">
                  {div.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-2.5 h-px w-4 bg-brand-navy shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact-us" className="btn btn-line mt-8">
                  Enquire about {div.name} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <div className={`lg:col-span-6 ${idx % 2 ? 'lg:order-1' : ''}`}>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img src={div.image} alt={div.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-navy text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl">Bulk supply at wholesale rates</h2>
            <p className="mt-2 text-slate-300 max-w-xl">For pharmacies, clinics and healthcare centres across the UAE and GCC.</p>
          </div>
          <Link href="/our-range-products" className="btn btn-green">
            View wholesale range <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
