'use client';

import { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Pill, 
  Package, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Activity, 
  Send
} from 'lucide-react';

const categoryBadgeStyles = {
  'Cardiovascular': 'bg-cyan-500/15 text-cyan-600 border-cyan-300',
  'CNS & Neurology': 'bg-emerald-500/15 text-emerald-600 border-emerald-300',
  'Orthopedic & Pain Care': 'bg-rose-500/15 text-rose-600 border-rose-300',
  'Metabolic & Diabetes': 'bg-amber-500/15 text-amber-600 border-amber-300',
  'Dermatology': 'bg-purple-500/15 text-purple-600 border-purple-300',
  'Gastroenterology': 'bg-teal-500/15 text-teal-600 border-teal-300',
};

export default function ProductDetailModal({ product, onClose, onInquire }) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '100',
    notes: ''
  });

  if (!product) return null;

  const badgeClass = categoryBadgeStyles[product.category] || 'bg-blue-500/15 text-blue-600 border-blue-300';

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setShowInquiryForm(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md overflow-y-auto animate-fade-up">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeClass}`}>
              {product.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              product.isRx ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {product.prescription}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Top Hero Grid */}
          <div className="grid sm:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Product Pack Image */}
            <div className="sm:col-span-5 bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50/30 rounded-2xl p-6 border border-slate-100 flex items-center justify-center aspect-square relative group">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-52 w-auto object-contain filter drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Main Title & Tagline */}
            <div className="sm:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-ink font-heading leading-tight">
                {product.name}
              </h2>

              {product.tagline && (
                <p className="text-sm sm:text-base font-semibold text-brand-blue leading-snug">
                  {product.tagline}
                </p>
              )}

              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              {/* Strengths & Pack Pills */}
              <div className="pt-2 flex flex-wrap gap-2">
                {product.availableStrengths && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    <span>{product.availableStrengths}</span>
                  </div>
                )}
                {product.packSize && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                    <Package className="w-3.5 h-3.5 text-slate-600" />
                    <span>{product.packSize}</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Detailed Info Tabs / Cards */}
          <div className="space-y-4 pt-2">
            
            {/* Active Composition Card */}
            {product.composition && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  <Pill className="w-4 h-4 text-brand-green" />
                  <span>Active Composition & Ingredients</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-ink">
                  {product.composition}
                </p>
              </div>
            )}

            {/* Closing Line Note */}
            {product.closingLine && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-brand-navy to-brand-blue text-white text-xs sm:text-sm font-medium flex items-center justify-between">
                <span>✨ {product.closingLine}</span>
              </div>
            )}

          </div>

          {/* Inquiry Form Accordion */}
          {showInquiryForm ? (
            <div className="mt-6 p-6 rounded-2xl bg-brand-lightBg border border-slate-200 animate-fade-up">
              <h4 className="text-base font-bold text-ink mb-4 flex items-center gap-2">
                <Send className="w-4 h-4 text-brand-green" />
                <span>Request Wholesale / Order Inquiry for {product.name}</span>
              </h4>

              {inquirySubmitted ? (
                <div className="p-6 rounded-xl bg-brand-green/20 text-brand-navy text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-brand-green mx-auto" />
                  <p className="font-bold text-sm">Inquiry received successfully!</p>
                  <p className="text-xs text-slate-600">Our medical distribution manager will connect with you.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      required
                      type="text"
                      placeholder="Your Name / Organization"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-green bg-white"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-green bg-white"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp (+971 ...)"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-green bg-white"
                    />
                    <input
                      type="number"
                      min="1"
                      placeholder="Estimated Units Required"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-green bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-full bg-brand-green text-brand-navy font-bold text-xs hover:bg-brand-accentGreen transition-colors shadow"
                  >
                    Submit Product Inquiry
                  </button>
                </form>
              )}
            </div>
          ) : null}

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 sm:px-8 py-4 border-t border-slate-100 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-20">
          <div className="text-xs text-slate-500 font-medium">
            Available across UAE & GCC distribution channels
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowInquiryForm(!showInquiryForm)}
              className="px-5 py-2.5 rounded-full text-xs font-bold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow flex items-center gap-1.5"
            >
              <span>{showInquiryForm ? 'Hide Inquiry Form' : 'Request Pricing & Stock'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-green" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
