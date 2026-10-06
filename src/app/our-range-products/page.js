'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Sparkles, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function OurRangeProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inquiryProduct, setInquiryProduct] = useState(null);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const categories = ['All', 'Bulk Wholesale Medicine', 'Central Nervous System', 'Dermatology', 'Orthopedics', 'Dietary Supplement'];

  const filteredProducts = contentData.products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.therapy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryProduct(null);
    }, 2500);
  };

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <img
          src="/assets/images/warehouse-female-worker-checking-up-stuff-in-a-warehouse-.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Wholesale Medicine Range</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Our Range Products
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              At Zyventa, we understand the importance of accessibility when it comes to healthcare. That&apos;s why we&apos;re proud to offer wholesale rates for bulk medicine purchases, ensuring that quality medications are affordable and accessible to all.
            </p>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="py-20 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar: Search & Category Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm mb-12">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products or therapies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:bg-white"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 p-6 flex items-center justify-center border border-slate-100 aspect-[4/3] overflow-hidden mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-[11px] font-bold text-brand-blue">
                      {product.therapy}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-ink font-heading line-clamp-2 group-hover:text-brand-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-brand-green bg-brand-navy px-2.5 py-1 rounded-md">
                    Wholesale Available
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => setInquiryProduct(product)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-blue hover:text-brand-navy transition-colors"
                  >
                    <span>Request Bulk Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-green" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No products found matching &ldquo;{searchTerm}&rdquo;</p>
              <button
                type="button"
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs font-semibold text-brand-blue underline"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Bulk Quote Modal */}
      {inquiryProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setInquiryProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-ink text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-ink font-heading">
              Request Wholesale Quote
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Product: <strong className="text-ink">{inquiryProduct.name}</strong>
            </p>

            {inquirySubmitted ? (
              <div className="p-6 rounded-2xl bg-brand-green/15 text-brand-navy text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                <p className="font-bold">Thank you for your bulk inquiry!</p>
                <p className="text-xs text-slate-600">Our wholesale distribution representative will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Pharmacy Name</label>
                  <input required type="text" placeholder="e.g. Al Mamzar Pharmacy LLC" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Email</label>
                    <input required type="email" placeholder="name@domain.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity (Units / Packs)</label>
                    <input required type="number" min="10" placeholder="100" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Destination Country</label>
                  <textarea rows="3" placeholder="Dubai, UAE / GCC delivery..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:bg-brand-accentGreen transition-colors shadow"
                >
                  Submit Bulk Quote Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
