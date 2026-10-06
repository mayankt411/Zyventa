'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function OnlineStorePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const storeProducts = contentData.products.filter(p => p.isStore);

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrderSubmitted(true);
    setTimeout(() => {
      setOrderSubmitted(false);
      setSelectedProduct(null);
    }, 2500);
  };

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <img
          src="/assets/team/pharmacy-delivery-box-and-people-hands-for-healthcare-package-and-ecommerce-courier-services-shi.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Consumer Healthcare & Wellness</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Online Store
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Certified consumer health products, dermatology formulations, and nutritional supplements directly accessible from Zyventa.
            </p>
          </div>
        </div>
      </section>

      {/* Product Catalog Grid */}
      <section className="py-20 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {storeProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/60 p-6 flex items-center justify-center border border-slate-100 aspect-square overflow-hidden mb-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-52 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 border border-slate-200 text-[11px] font-bold text-brand-blue">
                      {product.therapy}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                    {product.category}
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow-sm"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-brand-green" />
                    <span>Order Online</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Product Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-ink text-xl font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-contain rounded-xl border border-slate-100 bg-slate-50 p-2"
              />
              <div>
                <h3 className="text-lg font-bold text-ink font-heading line-clamp-1">
                  {selectedProduct.name}
                </h3>
                <span className="text-xs font-semibold text-brand-blue">
                  {selectedProduct.therapy}
                </span>
              </div>
            </div>

            {orderSubmitted ? (
              <div className="p-6 rounded-2xl bg-brand-green/15 text-brand-navy text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                <p className="font-bold">Thank you for your order inquiry!</p>
                <p className="text-xs text-slate-600">Our customer support team will contact you to confirm delivery details.</p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (UAE/GCC)</label>
                    <input required type="tel" placeholder="+971 50 123 4567" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Quantity</label>
                    <input required type="number" min="1" defaultValue="1" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Delivery Address</label>
                  <textarea required rows="2" placeholder="Dubai / Sharjah / Abu Dhabi address..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:bg-brand-accentGreen transition-colors shadow"
                >
                  Confirm Order Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
