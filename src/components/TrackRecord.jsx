import contentData from '@/data/zyventaContent.json';
import { Reveal, CountUp } from '@/components/Motion';

// Portfolio growth (product counts only) and first-to-market launches.
export default function TrackRecord() {
  const { firstToMarket } = contentData;

  return (
    <section id="track-record" className="bg-brand-sand py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First to market */}
        <div>
          <div className="bg-brand-navy text-brand-paper rounded-md p-8 sm:p-10">
            <p className="eyebrow !text-brand-green">First to market in the UAE, Oman and KSA</p>
            <Reveal as="ol" stagger className="mt-6 grid sm:grid-cols-2 gap-x-8">
              {firstToMarket.regionFirsts.map((p, i) => (
                <li key={p.name} className="grid grid-cols-[2rem_1fr] items-baseline py-3 border-b border-white/15">
                  <span className="font-display text-sm text-brand-green">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display text-xl">{p.name}</span>
                    <span className="block text-xs text-brand-onDarkMuted mt-0.5">{p.use}</span>
                  </span>
                </li>
              ))}
            </Reveal>
          </div>

          <div className="mt-6">
            <div className="border-t-2 border-brand-green pt-5">
              <p className="field-label">First generic entrant in the UAE</p>
              <p className="font-display text-2xl text-brand-navy">{firstToMarket.firstGenerics.join(' and ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
