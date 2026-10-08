'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShoppingBag, Eye, Activity, Pill, Package } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import ProductDetailModal from '@/components/ProductDetailModal';

const categoryPillColors = {
  'Cardiovascular': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'CNS & Neurology': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Orthopedic & Pain Care': 'bg-rose-100 text-rose-800 border-rose-200',
  'Metabolic & Diabetes': 'bg-amber-100 text-amber-800 border-amber-200',
  'Dermatology': 'bg-purple-100 text-purple-800 border-purple-200',
  'Gastroenterology': 'bg-teal-100 text-teal-800 border-teal-200',
};

export default function OurBrandsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const categories = ['All', 'Cardiovascular', 'CNS & Neurology', 'Orthopedic & Pain Care', 'Metabolic & Diabetes', 'Dermatology'];

  const filtered = contentData.products.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  }).slice(0, 6);

  return (
    <section
      id="our-brands"
      className="w-full py-20 sm:py-28 bg-brand-lightBg"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>Our Brands & Product Portfolio</span>
            </p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.15]">
              Leading Brands in Pharmaceutical Care
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore our diverse therapeutic and consumer healthcare portfolio, bridging certified global quality with regional accessibility.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/our-range-products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-brand-navy text-white hover:bg-brand-blue transition-all shadow"
            >
              <span>Explore All 18 Products</span>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 6 Rich Product Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const pillStyle = categoryPillColors[product.category] || 'bg-blue-100 text-blue-800 border-blue-200';
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image Box */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/60 to-emerald-50/30 p-6 flex items-center justify-center border border-slate-100 aspect-[4/3] overflow-hidden mb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${pillStyle}`}>
                        {product.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        product.isRx ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'
                      }`}>
                        {product.prescription}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {product.name}
                  </h3>
                  {product.tagline && (
                    <p className="mt-1 text-xs font-semibold text-brand-blue">
                      {product.tagline}
                    </p>
                  )}

                  {/* Composition Chip */}
                  {product.composition && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700">
                      <Pill className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="font-medium line-clamp-1">{product.composition}</span>
                    </div>
                  )}
                </div>

                {/* Card Action Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  {product.availableStrengths ? (
                    <span className="text-[11px] font-semibold text-slate-500 truncate max-w-[150px]">
                      {product.availableStrengths}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-slate-500">
                      {product.packSize || 'Wholesale Available'}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(product)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-lightBg hover:bg-brand-navy hover:text-white text-slate-800 transition-all border border-slate-200"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-green" />
                    <span>Details</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Product Details Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}
    </section>
  );
}
