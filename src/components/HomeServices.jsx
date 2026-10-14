import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function HomeServices() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow">What we do</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl">Five divisions, one partner.</h2>
          <p className="mt-5 text-ink-80 leading-relaxed">
            From registration to the pharmacy shelf, every step of market entry is handled in-house.
          </p>
          <Link href="/services" className="btn btn-line mt-8">All services</Link>
        </div>

        <ol className="lg:col-span-8 rule-top">
          {contentData.distributionDivisions.map((div, i) => (
            <li key={div.id} className="border-b border-slate-200">
              <Link
                href={`/services#${div.id}`}
                className="service-row group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue"
              >
                <span className="font-display text-brand-blue text-lg">0{i + 1}</span>
                <span>
                  <span className="block font-display text-xl sm:text-2xl text-brand-navy">{div.name}</span>
                  <span className="block mt-1 text-sm sm:text-base text-ink-60 max-w-xl">{div.description}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-brand-navy transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
