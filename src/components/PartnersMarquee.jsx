import contentData from '@/data/zyventaContent.json';

export default function PartnersMarquee() {
  return (
    <section id="our-partners" className="bg-brand-paper py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Partners</p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Trusted by global healthcare brands.</h2>
          </div>
        </div>
        <ul className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-brand-navy/15">
          {contentData.partners.map((partner) => (
            <li
              key={partner.name}
              className="h-28 flex items-center justify-center p-6 border-b border-r border-brand-navy/15 bg-white/60"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-[140px] w-auto object-contain grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
