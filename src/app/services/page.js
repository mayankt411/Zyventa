import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import HomeCta from '@/components/HomeCta';
import { Reveal } from '@/components/Motion';

export const metadata = {
  title: 'Services - Zyventa',
  description: 'Regulatory, marketing, sales, distribution and supply chain services for healthcare brands across the GCC, Middle East and Africa.',
};

export default function ServicesPage() {
  const divisions = contentData.distributionDivisions;

  return (
    <div>
      <PageHeader eyebrow="Services" title={<>Five divisions that take your product to <em>market</em>.</>}>
        Regulation, marketing, sales, distribution and supply chain, delivered by one team across the GCC and wider MEA region.
      </PageHeader>

      {/* Division index */}
      <nav aria-label="Divisions" className="bg-brand-paper">
        <ol className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-5 border-b border-brand-border">
          {divisions.map((div, i) => (
            <li key={div.id} className={i > 0 ? 'sm:border-l border-brand-border' : ''}>
              <a href={`#${div.id}`} className={`group block py-6 sm:px-5 ${i === 0 ? 'sm:pl-0' : ''}`}>
                <span className="font-display text-brand-blue">0{i + 1}</span>
                <span className="block mt-1 text-sm font-bold text-brand-navy group-hover:text-brand-blue transition-colors">{div.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {divisions.map((div, idx) => (
        <section
          id={div.id}
          key={div.id}
          className={`scroll-mt-20 ${idx % 2 ? 'bg-brand-sand' : 'bg-brand-paper'}`}
        >
          <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className={`lg:col-span-6 ${idx % 2 ? 'lg:order-2' : ''}`}>
              <p className="font-display text-6xl sm:text-7xl text-brand-green leading-none">0{idx + 1}</p>
              <h2 className="display mt-6 text-3xl sm:text-4xl">{div.title}</h2>
              <p className="mt-5 text-lg text-ink-80 leading-relaxed">{div.description}</p>
              <ul className="mt-8 border-t border-brand-navy">
                {div.points.map((pt) => (
                  <li key={pt} className="py-3 border-b border-brand-border text-ink-80">{pt}</li>
                ))}
              </ul>
              <Link href="/contact-us" className="link-accent mt-8">
                Enquire about {div.name.toLowerCase()} <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
            <div className={`lg:col-span-6 ${idx % 2 ? 'lg:order-1' : ''}`}>
              <div className="aspect-[4/3] bg-brand-sand overflow-hidden rounded-md">
                <img src={div.image} alt={div.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </Reveal>
        </section>
      ))}

      {/* Business lines */}
      <section className="bg-brand-paper py-20 sm:py-28 border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow">Business lines</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">Five verticals, one integrated <em>growth engine</em>.</h2>
            </div>
          </div>
          <Reveal as="ol" stagger className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 border-t border-brand-navy">
            {contentData.verticals.map((v, i) => (
              <li key={v.title} className={`py-8 pr-6 border-b border-brand-border lg:border-b-0 ${i > 0 ? 'lg:pl-6 lg:border-l' : ''}`}>
                <span className="font-display text-brand-blue">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-60 leading-relaxed">{v.description}</p>
              </li>
            ))}
          </Reveal>

          {/* Route to market */}
          <div className="mt-20">
            <p className="field-label">From manufacturer to patient</p>
            <Reveal as="ol" stagger className="mt-4 grid md:grid-cols-5 gap-3">
              {contentData.businessFlow.map((step, i) => (
                <li
                  key={step}
                  className={`relative rounded-md p-5 min-h-[7rem] flex flex-col justify-between ${
                    step === 'Zyventa Trading' ? 'bg-brand-navy text-brand-paper' : 'bg-brand-sand text-brand-navy'
                  }`}
                >
                  <span className={`text-xs font-bold ${step === 'Zyventa Trading' ? 'text-brand-green' : 'text-brand-blue'}`}>
                    Step {i + 1}
                  </span>
                  <span className="mt-3 font-display text-lg leading-snug">{step}</span>
                </li>
              ))}
            </Reveal>
            <p className="mt-4 text-sm text-ink-60 max-w-3xl">
              Trademarks are owned by Zyventa, or by another marketing authorisation holder with Zyventa holding distribution rights. Our field teams work with doctors to build prescriptions across hospitals and pharmacies.
            </p>
          </div>
        </div>
      </section>

      <HomeCta
        eyebrow="Wholesale"
        title="Bulk supply at wholesale rates,"
        accent="across the UAE and GCC."
        primary={{ href: '/our-range-products', label: 'View wholesale range' }}
        secondary={{ href: '/contact-us', label: 'Contact us' }}
      />
    </div>
  );
}
