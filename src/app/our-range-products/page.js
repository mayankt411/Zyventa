'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown, X } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import ProductDetailModal from '@/components/ProductDetailModal';
import HomeCta from '@/components/HomeCta';
import { CountUp } from '@/components/Motion';
import HeroSlideshow from '@/components/HeroSlideshow';
import {
  SearchField, ChipGroup, ProductCard, ProductGrid, EmptyState,
  TherapyTiles, Spotlight, therapyStyle, hasPackShot,
} from '@/components/Catalog';

const RX_OPTIONS = [
  { value: 'All', label: 'All' },
  { value: 'Rx', label: 'Prescription' },
  { value: 'OTC', label: 'OTC' },
];

const SPOTLIGHT_IDS = ['troximetacin-gel', 'calmivenal-gel', 'nourisil-md'];

export default function OurRangeProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rxFilter, setRxFilter] = useState('All');
  const [activeProductModal, setActiveProductModal] = useState(null);
  const catalogueRef = useRef(null);

  const { products } = contentData;
  const therapyAreas = (contentData.categories || []).filter((c) => c !== 'All');
  const byId = (ids) => ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  // Hero slideshow: every product with a real pack shot, first-to-market launches first.
  const firstToMarket = contentData.productBadges.firstToMarket;
  const slideshowProducts = [
    ...byId(firstToMarket),
    ...products.filter((p) => !firstToMarket.includes(p.id)),
  ].filter(hasPackShot);

  const filteredProducts = products.filter((p) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = [p.name, p.composition, p.tagline, p.description, p.availableStrengths, p.category]
      .some((field) => field && field.toLowerCase().includes(searchLower));
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesRx = rxFilter === 'All' ? true : rxFilter === 'Rx' ? p.isRx : !p.isRx;
    return matchesSearch && matchesCategory && matchesRx;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setRxFilter('All');
  };
  const hasFilters = searchTerm || selectedCategory !== 'All' || rxFilter !== 'All';

  const pickArea = (cat) => {
    setSelectedCategory(cat);
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stats = [
    { value: contentData.stats[0]?.value || products.length, label: 'Products in portfolio' },
    { value: therapyAreas.length, label: 'Therapy areas' },
    { value: contentData.firstToMarket.regionFirsts.length, label: 'First-to-market launches' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-brand-darkBlue text-brand-paper pt-20 overflow-hidden isolate">
        {/* Depth: soft amber and plum glows over the navy, plus a faint grid */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(55% 70% at 88% 18%, rgb(var(--c-accent) / 0.16), transparent 62%), radial-gradient(45% 60% at 4% 100%, rgb(var(--c-plum) / 0.38), transparent 65%), linear-gradient(135deg, rgb(var(--c-navy)) 0%, rgb(var(--c-navy-dark)) 100%)',
          }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(rgb(255 255 255) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(70% 90% at 70% 40%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(70% 90% at 70% 40%, black, transparent)',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div className="lg:col-span-5 reveal">
            <p className="eyebrow !text-brand-green">Wholesale catalogue</p>
            <h1 className="display !text-brand-paper mt-6 text-5xl sm:text-6xl xl:text-7xl">
              Our <em>range</em> of products.
            </h1>
            <p className="mt-6 max-w-md text-lg text-brand-onDarkMuted leading-relaxed">
              Branded pharmaceuticals, generics, nutraceuticals and OTC products at competitive wholesale rates for pharmacies, clinics and hospitals.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button type="button" onClick={() => pickArea('All')} className="btn btn-accent">
                Browse catalogue <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>
              <Link href="/contact-us?type=distribution" className="btn btn-on-dark">
                Request wholesale pricing
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 max-w-md rounded-xl bg-white/[0.06] ring-1 ring-white/10 backdrop-blur-sm divide-x divide-white/10">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-4 first:pl-5">
                  <dd className="font-display text-3xl sm:text-4xl leading-none text-brand-paper"><CountUp value={s.value} /></dd>
                  <dt className="mt-2 text-[11px] leading-snug text-brand-onDarkMuted">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-7 reveal" style={{ animationDelay: '.15s' }}>
            <HeroSlideshow products={slideshowProducts} onOpen={setActiveProductModal} />
          </div>
        </div>
      </section>

      {/* Therapy areas */}
      <section className="bg-brand-paper py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Therapy areas</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">Browse by <em>therapy area</em>.</h2>
            </div>
            <p className="text-sm text-ink-60">Select an area to filter the catalogue.</p>
          </div>
          <div className="mt-10">
            <TherapyTiles categories={therapyAreas} products={products} value={selectedCategory} onChange={pickArea} />
          </div>
        </div>
      </section>

      {/* First-to-market spotlight */}
      <section className="bg-brand-darkBlue py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow !text-brand-green">Spotlight</p>
              <h2 className="display !text-brand-paper mt-4 text-3xl sm:text-4xl">First to market in the UAE, Oman and <em>KSA</em>.</h2>
            </div>
            <Link href="/#track-record" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-paper hover:text-brand-green transition-colors">
              Our track record <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10">
            <Spotlight products={byId(SPOTLIGHT_IDS)} onOpen={setActiveProductModal} />
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section ref={catalogueRef} id="catalogue" className="bg-brand-paper scroll-mt-20">
        {/* Sticky toolbar */}
        <div className="sticky top-16 z-30 bg-brand-paper/95 backdrop-blur border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="md:w-80">
              <SearchField compact value={searchTerm} onChange={setSearchTerm} placeholder="Search name, ingredient or use" />
            </div>
            <ChipGroup options={RX_OPTIONS} value={rxFilter} onChange={setRxFilter} />
            <div className="md:ml-auto flex items-center gap-3 text-sm text-ink-60">
              {selectedCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('All')}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ background: therapyStyle(selectedCategory).accent }}
                >
                  {selectedCategory} <X className="w-3.5 h-3.5" aria-label="Clear therapy area" />
                </button>
              )}
              <span>
                <span className="font-display text-xl text-brand-navy mr-1">{filteredProducts.length}</span>
                products
              </span>
              {hasFilters && (
                <button type="button" onClick={resetFilters} className="link-accent text-xs">Clear all</button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {filteredProducts.length > 0 ? (
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpen={setActiveProductModal}
                  actionLabel="Request wholesale quote"
                />
              ))}
            </ProductGrid>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </section>

      <HomeCta
        eyebrow="Wholesale"
        title="Need bulk supply for your pharmacy or clinic?"
        accent="Ask for a quote."
        primary={{ href: '/contact-us?type=distribution', label: 'Request pricing' }}
        secondary={{ href: '/online-store', label: 'Online store' }}
      />

      {activeProductModal && (
        <ProductDetailModal product={activeProductModal} onClose={() => setActiveProductModal(null)} />
      )}
    </div>
  );
}
