'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Search, Eye, Pill, Package, Star } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import ProductDetailModal from '@/components/ProductDetailModal';

export default function OnlineStorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const storeProducts = contentData.products.filter(p => p.isStore);

  const categories = ['All', 'Dermatology', 'CNS & Neurology', 'Orthopedic & Pain Care', 'Gastroenterology'];

  const filtered = storeProducts.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) ||
      (p.composition && p.composition.toLowerCase().includes(searchLower)) ||
      (p.tagline && p.tagline.toLowerCase().includes(searchLower)) ||
      p.category.toLowerCase().includes(searchLower);

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      
      {/* Banner */}
      <PageHeader eyebrow="Consumer Healthcare & Wellness" title={<>Online Store</>}>Certified consumer health formulations, scar care gels, neuro-nutrients, relaxation botanicals, and topical pain relief directly from Zyventa.</PageHeader>

      {/* Catalog & Filter Section */}
      <section className="py-16 sm:py-20 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="p-6 bg-white rounded-sm border border-slate-200/80 shadow-sm mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search store products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-green bg-white"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-sm p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Box */}
                  <div className="relative rounded-sm bg-gradient-to-br from-slate-50 via-slate-100/60 to-emerald-50/30 p-6 flex items-center justify-center border border-slate-100 aspect-square overflow-hidden mb-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-sm bg-white/95 border border-slate-200 text-[11px] font-bold text-brand-blue shadow-sm">
                      {product.category}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {product.name}
                  </h3>
                  {product.tagline && (
                    <p className="mt-1 text-xs font-semibold text-brand-blue">
                      {product.tagline}
                    </p>
                  )}

                  {product.composition && (
                    <div className="mt-3 p-2.5 rounded-sm bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700">
                      <Pill className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="font-medium line-clamp-1">{product.composition}</span>
                    </div>
                  )}

                  {product.packSize && (
                    <p className="mt-2 text-xs text-slate-500">
                      Pack: <span className="font-semibold text-slate-700">{product.packSize}</span>
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold bg-brand-paper hover:bg-slate-200 text-slate-800 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-brand-blue" />
                    <span>View Specs</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Order Online</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Interactive Detail Modal */}
      {activeModalProduct && (
        <ProductDetailModal
          product={activeModalProduct}
          onClose={() => setActiveModalProduct(null)}
        />
      )}

    </div>
  );
}
