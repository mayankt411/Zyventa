import contentData from '@/data/zyventaContent.json';
import { Reveal } from '@/components/Motion';

export default function PartnersMarquee() {
  return (
    <section id="our-partners" className="bg-brand-paper py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Partners</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Principals from eight countries.</h2>
          </div>
          <ul className="lg:col-span-5 flex flex-wrap gap-2 lg:justify-end" aria-label="Principal countries">
            {contentData.principalCountries.map((country) => (
              <li key={country} className="tag tag-neutral !text-xs !px-3 !py-1.5">{country}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-brand-navy/15">
          {contentData.partners.map((partner) => (
            <li
              key={partner.name}
              className="h-28 flex items-center justify-center p-6 border-b border-r border-brand-navy/15 bg-white"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-[140px] w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
                loading="lazy"
              />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
