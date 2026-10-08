'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Sparkles, ArrowRight, CheckCircle2, ShoppingBag, Eye, Pill, Activity, ShieldCheck, Filter } from 'lucide-react';
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

export default function OurRangeProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [rxFilter, setRxFilter] = useState('All'); // 'All', 'Rx', 'OTC'
  const [activeProductModal, setActiveProductModal] = useState(null);

  const categories = contentData.categories || [
    "All",
    "Cardiovascular",
    "CNS & Neurology",
    "Orthopedic & Pain Care",
    "Metabolic & Diabetes",
    "Dermatology",
    "Gastroenterology"
  ];

  const filteredProducts = contentData.products.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) ||
      (p.composition && p.composition.toLowerCase().includes(searchLower)) ||
      (p.tagline && p.tagline.toLowerCase().includes(searchLower)) ||
      (p.indication && p.indication.toLowerCase().includes(searchLower)) ||
      (p.availableStrengths && p.availableStrengths.toLowerCase().includes(searchLower)) ||
      p.category.toLowerCase().includes(searchLower);

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    
    const matchesRx = 
      rxFilter === 'All' ? true :
      rxFilter === 'Rx' ? p.isRx :
      !p.isRx;

    return matchesSearch && matchesCategory && matchesRx;
  });

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-20 sm:py-28 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <img
          src="/assets/images/warehouse-female-worker-checking-up-stuff-in-a-warehouse-.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/20 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-wider">
              <Package className="w-3.5 h-3.5" />
              <span>Pharmaceutical Wholesale Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading leading-tight">
              Our Range Products
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              At Zyventa, we provide competitive wholesale rates for bulk medicine purchases across cardiovascular, central nervous system, metabolic, dermatology, orthopedic, and gastroenterology therapeutic lines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="py-16 sm:py-20 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm mb-10 space-y-5">
            
            {/* Search & Rx Toggle */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, ingredient, strength or indication..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-brand-green focus:bg-white"
                />
              </div>

              {/* Rx / OTC Filter Toggle */}
              <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRxFilter('All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rxFilter === 'All' ? 'bg-white text-ink shadow-sm' : 'text-slate-600 hover:text-ink'
                  }`}
                >
                  All ({contentData.products.length})
                </button>
                <button
                  type="button"
                  onClick={() => setRxFilter('Rx')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rxFilter === 'Rx' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-ink'
                  }`}
                >
                  Rx Only
                </button>
                <button
                  type="button"
                  onClick={() => setRxFilter('OTC')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    rxFilter === 'OTC' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-ink'
                  }`}
                >
                  OTC / Nutraceuticals
                </button>
              </div>

            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
                Therapeutic Area:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
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

          {/* Results Summary Counter */}
          <div className="mb-6 flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Showing {filteredProducts.length} pharmaceutical formulations</span>
            {(searchTerm || selectedCategory !== 'All' || rxFilter !== 'All') && (
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setRxFilter('All'); }}
                className="text-brand-blue hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const pillStyle = categoryPillColors[product.category] || 'bg-blue-100 text-blue-800 border-blue-200';
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/60 to-emerald-50/30 p-6 flex items-center justify-center border border-slate-100 aspect-[4/3] overflow-hidden mb-5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${pillStyle}`}>
                          {product.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          product.isRx ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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
                      <p className="mt-1 text-xs font-semibold text-brand-blue line-clamp-1">
                        {product.tagline}
                      </p>
                    )}

                    {/* Active Composition Chip */}
                    {product.composition && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2 text-xs text-slate-700">
                        <Pill className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                        <div className="line-clamp-2 font-medium">
                          <span className="text-slate-400 font-normal">Active: </span>
                          {product.composition}
                        </div>
                      </div>
                    )}

                    {/* Strengths & Pack */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {product.availableStrengths && (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold">
                          {product.availableStrengths}
                        </span>
                      )}
                      {product.packSize && (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-semibold">
                          Pack: {product.packSize}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveProductModal(product)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-green" />
                      <span>Clinical Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveProductModal(product)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-navy transition-colors"
                    >
                      <span>Wholesale Quote →</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-bold">No products found matching your search</p>
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setRxFilter('All'); }}
                className="mt-3 text-xs font-bold text-brand-blue underline"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Interactive Detail Modal */}
      {activeProductModal && (
        <ProductDetailModal
          product={activeProductModal}
          onClose={() => setActiveProductModal(null)}
        />
      )}

    </div>
  );
}
