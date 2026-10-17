import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

// Why global brands partner with Zyventa, and the three partnership models.
export default function WhyPartner() {
  return (
    <section id="why-zyventa" className="bg-brand-sand py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Why Zyventa</p>
            <h2 className="display mt-4 text-3xl sm:text-5xl">Why global brands <em>partner</em> with us.</h2>
          </div>
          <p className="lg:col-span-5 text-lg text-ink-80 leading-relaxed">
            Headquartered in Dubai, with commercial reach into Saudi Arabia, Oman and Bahrain through our own teams and channel partners.
          </p>
        </div>

        <ol className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 border-t border-brand-navy">
          {contentData.whyPartner.map((item, i) => (
            <li
              key={item.title}
              className={`py-8 pr-6 border-b border-brand-border lg:border-b-0 ${i > 0 ? 'lg:pl-6 lg:border-l' : ''} border-brand-border`}
            >
              <span className="font-display text-brand-blue">0{i + 1}</span>
              <h3 className="mt-3 font-display text-xl text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-60 leading-relaxed">{item.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 sm:mt-20">
          <p className="field-label">Three ways to partner</p>
          <div className="mt-4 grid md:grid-cols-3 gap-4">
            {contentData.partnerModels.map((model) => (
              <Link
                key={model.id}
                href={`/contact-us?type=${model.id}`}
                className="group block bg-brand-paper rounded-md p-7 border border-brand-border hover:border-brand-navy transition-colors"
              >
                <h3 className="font-display text-2xl text-brand-navy">{model.title}</h3>
                <p className="mt-2 text-sm text-ink-60">{model.description}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy">
                  Start a conversation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
