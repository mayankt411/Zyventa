import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';

export const metadata = {
  title: 'About Us - Zyventa',
  description: 'ZYVENTA is the connection between your brand and the region’s best medical professionals, primary health centres, hospitals and pharmacies.',
};

const PRINCIPLES = [
  { label: 'Vision', text: contentData.site.vision },
  { label: 'Mission', text: contentData.site.mission },
];

export default function AboutUsPage() {
  return (
    <div>
      <PageHeader eyebrow="About Zyventa" title={<>One partner for <em>regional</em> healthcare.</>}>
        ZYVENTA is the connection between your brand and the region&apos;s best medical professionals, primary health centres, hospitals and pharmacies.
      </PageHeader>

      {/* Overview */}
      <section className="py-20 sm:py-28 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow">Our foundation</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">Building healthcare networks across the region.</h2>
            <p className="mt-6 text-base sm:text-lg text-ink-80 leading-relaxed">{contentData.site.aboutText}</p>
            <p className="mt-4 text-base sm:text-lg text-ink-80 leading-relaxed">{contentData.site.aboutSubtext}</p>
          </div>
          <figure className="lg:col-span-6">
            <div className="rounded-md overflow-hidden bg-brand-sand aspect-[4/3]">
              <img
                src="/assets/team/international-medical-team-in-face-masks-having-team-building-300x200.jpg"
                alt="Zyventa healthcare team"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-brand-navy text-brand-paper">
        <Reveal stagger className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2">
          {PRINCIPLES.map((p, i) => (
            <div key={p.label} className={`py-16 sm:py-20 ${i === 0 ? 'md:pr-14' : 'md:pl-14 border-t md:border-t-0 md:border-l border-white/15'}`}>
              <p className="eyebrow !text-brand-green">{p.label}</p>
              <p className="mt-6 font-display text-2xl sm:text-[1.75rem] leading-snug">{p.text}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Footprint and drug store */}
      <section className="py-20 sm:py-28 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow">Where we operate</p>
            <h2 className="display mt-5 text-3xl sm:text-4xl">Headquartered in Dubai, serving four GCC markets.</h2>
            <dl className="mt-8 border-t border-brand-navy">
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-brand-border">
                <dt className="field-label !mb-0 pt-1">Headquarters</dt>
                <dd className="col-span-2 font-display text-xl text-brand-navy">{contentData.site.markets.headquarters}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-brand-border">
                <dt className="field-label !mb-0 pt-1">Commercial markets</dt>
                <dd className="col-span-2 font-display text-xl text-brand-navy">{contentData.site.markets.commercial.join(', ')}</dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4 border-b border-brand-border">
                <dt className="field-label !mb-0 pt-1">Portfolio</dt>
                <dd className="col-span-2 text-ink-80">Branded pharmaceuticals, generics, nutraceuticals and OTC products</dd>
              </div>
            </dl>
          </div>
          <aside className="lg:col-span-6 bg-brand-navy text-brand-paper rounded-md p-8 sm:p-12 flex flex-col justify-between gap-10">
            <p className="eyebrow !text-brand-green">{contentData.drugStore.approval}</p>
            <div>
              <p className="font-display text-3xl sm:text-4xl leading-tight">{contentData.drugStore.name}</p>
              <p className="mt-2 text-brand-onDarkMuted">{contentData.drugStore.location}</p>
              <p className="mt-6 text-lg leading-relaxed">{contentData.drugStore.role}</p>
            </div>
          </aside>
        </div>
      </section>

      {/* Team philosophy */}
      <section className="py-20 sm:py-28 bg-brand-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow">Our people</p>
          <p className="display mt-6 text-5xl sm:text-6xl">20<em>+</em></p>
          <p className="mt-2 text-sm font-semibold text-ink-60">years of combined leadership experience across MENA</p>
          <blockquote className="mt-8 font-display text-2xl sm:text-3xl text-brand-navy leading-snug">
            &ldquo;We recognize that our team is what makes us who we are. We pride ourselves on our professional, highly skilled and dedicated staff, each bringing their own unique skills to the business.&rdquo;
          </blockquote>
          <Link href="/contact-us" className="btn btn-solid mt-10">
            Get in touch with our team <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
