import { Search, ArrowRight, ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const { productBadges } = contentData;

// Soft tint + strong accent per therapy area. Pack shots have white
// backgrounds, so they sit on these tints with mix-blend-multiply.
export const THERAPY_STYLES = {
  'Cardiovascular': { tint: '#FBE6E4', accent: '#B42318', short: 'CV' },
  'CNS & Neurology': { tint: '#ECE6F6', accent: '#5B3A8E', short: 'CNS' },
  'Orthopedic & Pain Care': { tint: '#FCEBDA', accent: '#B4561A', short: 'Ortho' },
  'Metabolic & Diabetes': { tint: '#E2F2EC', accent: '#1F7A5C', short: 'Metabolic' },
  'Dermatology': { tint: '#FBE8F0', accent: '#A23B67', short: 'Derma' },
  'Gastroenterology': { tint: '#E3EEF7', accent: '#1D5F8A', short: 'GI' },
};
const DEFAULT_STYLE = { tint: '#EEF1F4', accent: '#334155', short: '' };
export const therapyStyle = (category) => THERAPY_STYLES[category] || DEFAULT_STYLE;

const verifiedPacks = new Set(contentData.packShotVerified || []);
export const hasPackShot = (product) => verifiedPacks.has(product.id);

// Real pack shot when we have one; otherwise a designed pack graphic so a
// product never shows another company's logo or another product's box.
export function ProductVisual({ product, size = 'card', imgClassName = '' }) {
  const style = therapyStyle(product.category);
  if (hasPackShot(product)) {
    return (
      <img
        src={product.image}
        alt=""
        className={`max-h-full max-w-full object-contain mix-blend-multiply ${imgClassName}`}
        loading="lazy"
      />
    );
  }
  if (size === 'thumb') {
    return (
      <span className="w-full h-full rounded-md flex items-center justify-center font-display text-sm font-bold text-white" style={{ background: style.accent }}>
        {product.name.slice(0, 2)}
      </span>
    );
  }
  const form = (product.packSize || '').split(' ').slice(1).join(' ') || (product.isRx ? 'Prescription' : 'OTC');
  return (
    <span className={`relative flex w-[72%] max-w-[15rem] aspect-[16/10] rounded-lg bg-white shadow-[0_18px_30px_-14px_rgba(0,0,0,0.35)] overflow-hidden ${imgClassName}`}>
      <span className="w-3 shrink-0" style={{ background: style.accent }} />
      <span className="flex-1 flex flex-col justify-between p-3 sm:p-4 text-left">
        <span className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: style.accent }}>{product.category}</span>
        <span>
          <span className="block font-display text-xl sm:text-2xl leading-none text-ink">{product.name}</span>
          {product.availableStrengths && (
            <span className="block mt-1 text-[10px] text-ink-60 line-clamp-1">{product.availableStrengths}</span>
          )}
        </span>
        <span className="text-[9px] text-ink-60 line-clamp-1">{form}</span>
      </span>
    </span>
  );
}

// Achievement badges from the company portfolio (first-to-market, owned brands).
export function productHighlights(id) {
  const out = [];
  if (productBadges.firstToMarket.includes(id)) out.push('First to market');
  if (productBadges.firstGeneric.includes(id)) out.push('First generic in UAE');
  if (productBadges.owned.includes(id)) out.push('Zyventa brand');
  return out;
}

// Shared building blocks for the wholesale range and online store pages.

export function SearchField({ value, onChange, placeholder, compact = false }) {
  if (compact) {
    return (
      <label className="relative block w-full">
        <span className="sr-only">{placeholder}</span>
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-60" aria-hidden="true" />
        <input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field !rounded-full !pl-10 !py-2.5"
        />
      </label>
    );
  }
  return (
    <label className="relative block w-full">
      <span className="sr-only">{placeholder}</span>
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-navy" aria-hidden="true" />
      <input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent border-0 border-b border-brand-navy/30 pl-8 pr-2 py-3 font-display text-lg sm:text-2xl text-brand-navy placeholder:text-slate-400 focus:outline-none focus:border-brand-green"
      />
    </label>
  );
}

export function ChipGroup({ label, options, value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {label && <span className="field-label !mb-0 mr-2">{label}</span>}
      {options.map((opt) => {
        const key = typeof opt === 'string' ? opt : opt.value;
        const text = typeof opt === 'string' ? opt : opt.label;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`chip ${value === key ? 'chip-active' : ''}`}
            aria-pressed={value === key}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
}

// Collage of real pack shots for the top of a catalogue page.
export function PackCollage({ products }) {
  const layout = [
    'col-span-2 row-span-2 -rotate-2',
    'rotate-3 translate-y-4',
    '-rotate-3',
    'col-span-3 rotate-1 -translate-y-2',
  ];
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[22rem] sm:h-[26rem]" aria-hidden="true">
      {products.slice(0, 4).map((p, i) => {
        const style = therapyStyle(p.category);
        return (
          <div
            key={p.id}
            className={`relative rounded-2xl flex items-center justify-center p-5 shadow-[0_24px_48px_-20px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] ${layout[i]}`}
            style={{ background: style.tint }}
          >
            <img src={p.image} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            {productBadges.firstToMarket.includes(p.id) && i === 0 && (
              <span className="absolute top-3 left-3 tag bg-brand-green text-brand-darkBlue">First to market</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Therapy-area tiles that double as the main category filter.
export function TherapyTiles({ categories, products, value, onChange }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {categories.map((cat) => {
        const items = products.filter((p) => p.category === cat);
        const style = therapyStyle(cat);
        const active = value === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(active ? 'All' : cat)}
            aria-pressed={active}
            className={`group relative text-left rounded-xl p-4 pb-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green ${
              active ? 'ring-2 ring-offset-2 ring-offset-brand-paper' : ''
            }`}
            style={{ background: style.tint, '--tw-ring-color': style.accent }}
          >
            <div className="flex -space-x-4 h-14">
              {[...items].sort((a, b) => hasPackShot(b) - hasPackShot(a)).slice(0, 3).map((p) => (
                <span key={p.id} className="w-14 h-14 rounded-lg bg-white/70 flex items-center justify-center p-1.5 border border-white">
                  <ProductVisual product={p} size="thumb" />
                </span>
              ))}
            </div>
            <p className="mt-4 font-display text-lg leading-tight" style={{ color: style.accent }}>{cat}</p>
            <p className="mt-1 text-xs font-semibold text-ink-60">
              {items.length} {items.length === 1 ? 'product' : 'products'}
            </p>
            <ArrowUpRight
              className="absolute top-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: style.accent }}
              aria-hidden="true"
            />
          </button>
        );
      })}
    </div>
  );
}

// Large featured cards for first-to-market launches.
export function Spotlight({ products, onOpen }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((p) => {
        const style = therapyStyle(p.category);
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onOpen(p)}
            className="group text-left rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-brand-green transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
          >
            <span className="aspect-[4/3] p-6 flex items-center justify-center relative" style={{ background: style.tint }}>
              <ProductVisual product={p} imgClassName="transition-transform duration-500 group-hover:scale-110" />
            </span>
            <span className="block p-5">
              <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">{p.category}</span>
              <span className="block mt-2 font-display text-2xl text-brand-paper">{p.name}</span>
              {p.tagline && <span className="block mt-1 text-sm text-brand-onDarkMuted line-clamp-2">{p.tagline}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function ProductCard({ product, onOpen, actionLabel }) {
  const highlights = productHighlights(product.id);
  const style = therapyStyle(product.category);
  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-brand-border overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-24px_rgb(var(--c-navy)/0.35)]">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative aspect-[4/3] flex items-center justify-center p-8 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
        style={{ background: style.tint }}
        aria-label={`View ${product.name}`}
      >
        <ProductVisual product={product} imgClassName="transition-transform duration-500 group-hover:scale-110" />
        {highlights.length > 0 && (
          <span className="absolute top-3 left-3 flex flex-col items-start gap-1">
            {highlights.map((h) => (
              <span key={h} className={`tag ${h === 'Zyventa brand' ? 'bg-brand-navy text-brand-paper' : 'bg-brand-green text-brand-darkBlue'}`}>{h}</span>
            ))}
          </span>
        )}
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-navy opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Quick view <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
        </span>
      </button>
      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: style.accent }}>
            {product.category}
          </span>
          {product.prescription && (
            <span className={`tag ${product.isRx ? 'tag-rx' : 'tag-otc'}`}>{product.isRx ? 'Rx' : 'OTC'}</span>
          )}
        </div>
        <h3 className="mt-3 font-display text-2xl text-brand-navy">{product.name}</h3>
        {product.tagline && <p className="mt-1 text-sm text-ink-60 line-clamp-2">{product.tagline}</p>}
        {product.composition && (
          <p className="mt-4 pt-4 border-t border-brand-border text-xs text-ink-80 line-clamp-2">
            <span className="font-bold text-brand-blue">Active · </span>
            {product.composition}
          </p>
        )}
        <div className="mt-auto pt-6">
          <button type="button" onClick={() => onOpen(product)} className="link-accent text-sm">
            {actionLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}

export function EmptyState({ onReset }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-border py-20 text-center">
      <p className="font-display text-2xl text-brand-navy">No products match your search.</p>
      <button type="button" onClick={onReset} className="link-accent mt-5 text-sm">
        Clear filters
      </button>
    </div>
  );
}
