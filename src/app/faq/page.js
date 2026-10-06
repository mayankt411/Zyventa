'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, HelpCircle, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = contentData.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Need Help?</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Discover Zyventa: Your Top FAQs Answered – Your Gateway to Success in Healthcare Markets!
            </p>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="py-24 bg-brand-lightBg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search Bar */}
          <div className="relative mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 text-sm sm:text-base focus:outline-none focus:border-brand-green shadow-sm"
            />
          </div>

          {/* Accordions */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-ink font-heading">
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-full bg-slate-100 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-brand-green/20 text-brand-navy' : ''}`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fade-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact Support CTA Box */}
          <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
            <HelpCircle className="w-10 h-10 text-brand-green mx-auto" />
            <h3 className="text-xl font-bold text-ink font-heading">
              Have More Questions?
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Our regional distribution and healthcare consultation specialists are available to answer any inquiry.
            </p>
            <div className="pt-2">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow"
              >
                <span>Contact Our Support Team</span>
                <ArrowRight className="w-4 h-4 text-brand-green" />
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
