'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import ProductDetailModal from '@/components/ProductDetailModal';
import HomeCta from '@/components/HomeCta';
import { SearchField, ChipGroup, ProductCard, ProductGrid, EmptyState } from '@/components/Catalog';

const CATEGORIES = ['All', 'Dermatology', 'CNS & Neurology', 'Orthopedic & Pain Care', 'Gastroenterology'];

export default function OnlineStorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const filtered = contentData.products
    .filter((p) => p.isStore)
    .filter((p) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = [p.name, p.composition, p.tagline, p.category]
        .some((field) => field && field.toLowerCase().includes(searchLower));
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div>
      <PageHeader eyebrow="Consumer healthcare" title={<>The <em>online</em> store.</>}>
        Consumer health formulations, scar care gels, neuro-nutrients, relaxation botanicals and topical pain relief, direct from Zyventa.
      </PageHeader>

      <section className="py-14 sm:py-20 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-5">
              <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search store products" />
            </div>
            <div className="lg:col-span-7 lg:justify-self-end">
              <ChipGroup options={CATEGORIES} value={selectedCategory} onChange={setSelectedCategory} />
            </div>
          </div>

          <div className="mt-12 mb-5 flex flex-wrap items-center justify-between gap-4 text-sm text-ink-60">
            <span>
              <span className="font-display text-2xl text-brand-navy mr-1.5">{filtered.length}</span>
              products
            </span>
            <a href={contentData.site.ecommerceUrl} target="_blank" rel="noopener noreferrer" className="link-accent text-sm">
              Shop on our online portal <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {filtered.length > 0 ? (
            <ProductGrid>
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} onOpen={setActiveModalProduct} actionLabel="View and order" />
              ))}
            </ProductGrid>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </section>

      <HomeCta
        eyebrow="Ordering"
        title="Ordering for a pharmacy or clinic?"
        accent="Buy at wholesale rates."
        primary={{ href: '/our-range-products', label: 'Wholesale range' }}
        secondary={{ href: '/contact-us', label: 'Contact us' }}
      />

      {activeModalProduct && (
        <ProductDetailModal product={activeModalProduct} onClose={() => setActiveModalProduct(null)} />
      )}
    </div>
  );
}
