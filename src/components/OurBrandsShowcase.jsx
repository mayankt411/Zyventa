'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function OurBrandsShowcase() {
  const showcaseProducts = contentData.products.slice(0, 6);

  return (
    <section
      id="our-brands"
      className="w-full py-24 sm:py-32 bg-brand-lightBg"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>Our Brands & Product Range</span>
            </p>
            <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-[1.15]">
              Leading Brands in Pharmaceutical Care
            </h2>
            <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore our diverse therapeutic and consumer healthcare portfolio, bridging certified global quality with regional accessibility.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/online-store"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-white text-brand-navy border border-slate-200 hover:border-brand-green hover:shadow-md transition-all group"
            >
              <span>View Online Store</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Alternating Product Showcase Cards */}
        <div className="mt-16 space-y-8 sm:space-y-12">
          {showcaseProducts.map((product, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/70 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Left/Right Product Image */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 p-8 flex items-center justify-center border border-slate-100 aspect-square sm:aspect-[4/3] group overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-60 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-md"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 text-xs font-semibold text-brand-navy">
                        {product.category}
                      </div>
                    </div>
                  </div>

                  {/* Right/Left Product Details */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-blue text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                      <span>{product.therapy}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
                      {product.name}
                    </h3>

                    <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                      {product.description}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Link
                        href="/online-store"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors group"
                      >
                        <ShoppingBag className="w-4 h-4 text-brand-green" />
                        <span>View in Store</span>
                      </Link>

                      <Link
                        href="/our-range-products"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-lightBg text-slate-700 hover:bg-slate-200 transition-colors"
                      >
                        <span>Wholesale Rates</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
