import contentData from '@/data/zyventaContent.json';

// Portfolio growth (product counts only) and first-to-market launches.
export default function TrackRecord() {
  const { portfolioGrowth, portfolioMix, firstToMarket } = contentData;
  const max = Math.max(...portfolioGrowth.map((p) => p.products));

  return (
    <section id="track-record" className="bg-brand-paper py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-14 lg:gap-16">
        {/* Portfolio growth */}
        <div className="lg:col-span-5">
          <p className="eyebrow">Track record</p>
          <h2 className="display mt-4 text-3xl sm:text-4xl">A portfolio that has grown <em>five-fold</em> since 2022.</h2>

          <figure className="mt-10" aria-label="Number of products by year">
            <div className="flex items-end gap-3 sm:gap-5 h-56 border-b border-brand-navy">
              {portfolioGrowth.map((p, i) => {
                const isLast = i === portfolioGrowth.length - 1;
                return (
                  <div key={p.year} className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className={`font-display text-2xl sm:text-3xl ${isLast ? 'text-brand-navy' : 'text-ink-60'}`}>{p.products}</span>
                    <div
                      className={`mt-2 w-full rounded-t ${isLast ? 'bg-brand-green' : 'bg-brand-navy/80'}`}
                      style={{ height: `${(p.products / max) * 75}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-3 sm:gap-5 mt-3">
              {portfolioGrowth.map((p) => (
                <span key={p.year} className="flex-1 text-center text-xs font-semibold text-ink-60">{p.year}</span>
              ))}
            </div>
            <figcaption className="sr-only">Products in portfolio: {portfolioGrowth.map((p) => `${p.year} ${p.products}`).join(', ')}</figcaption>
          </figure>

          <dl className="mt-10 border-t border-brand-border">
            {portfolioMix.map((m) => (
              <div key={m.label} className="flex justify-between gap-4 py-3 border-b border-brand-border text-sm">
                <dt className="text-ink-80">{m.label}</dt>
                <dd className="font-bold text-brand-navy whitespace-nowrap">{m.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* First to market */}
        <div className="lg:col-span-7">
          <div className="bg-brand-navy text-brand-paper rounded-md p-8 sm:p-10">
            <p className="eyebrow !text-brand-green">First to market in the UAE, Oman and KSA</p>
            <ol className="mt-6 grid sm:grid-cols-2 gap-x-8">
              {firstToMarket.regionFirsts.map((p, i) => (
                <li key={p.name} className="grid grid-cols-[2rem_1fr] items-baseline py-3 border-b border-white/15">
                  <span className="font-display text-sm text-brand-green">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="block font-display text-xl">{p.name}</span>
                    <span className="block text-xs text-brand-onDarkMuted mt-0.5">{p.use}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div className="border-t-2 border-brand-green pt-5">
              <p className="field-label">First generic entrant in the UAE</p>
              <p className="font-display text-2xl text-brand-navy">{firstToMarket.firstGenerics.join(' and ')}</p>
            </div>
            <div className="border-t-2 border-brand-navy pt-5">
              <p className="field-label">Differentiated UAE firsts</p>
              <p className="text-ink-80">{firstToMarket.uaeFirsts.join(', ')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
