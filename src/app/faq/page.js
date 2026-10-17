'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import { SearchField } from '@/components/Catalog';

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = contentData.faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader eyebrow="FAQ" title={<>Questions, <em>answered</em>.</>}>
        What partners, pharmacies and healthcare brands most often ask us about entering the GCC and MEA markets.
      </PageHeader>

      <section className="py-16 sm:py-24 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Sidebar: search and help panel */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-10">
              <SearchField value={searchTerm} onChange={setSearchTerm} placeholder="Search questions" />
              <div className="bg-brand-navy text-brand-paper rounded-md p-8">
                <p className="font-display text-2xl leading-snug">Can&apos;t find what you need?</p>
                <p className="mt-3 text-sm text-brand-onDarkMuted leading-relaxed">
                  Our distribution and regulatory specialists can answer any enquiry.
                </p>
                <Link href="/contact-us" className="btn btn-accent mt-6">
                  Contact us <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Questions */}
          <div className="lg:col-span-8">
            <ol className="border-t border-brand-navy">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <li key={faq.question} className="border-b border-brand-border">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                      className="w-full grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_auto] items-baseline gap-3 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-green"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-brand-blue text-lg">{String(idx + 1).padStart(2, '0')}</span>
                      <span className="font-display text-xl sm:text-2xl text-brand-navy">{faq.question}</span>
                      <span className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-navy">
                        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="pb-7 pl-[2.5rem] sm:pl-[3.5rem] pr-12 text-ink-80 leading-relaxed animate-fade-up">
                        {faq.answer}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
            {filteredFaqs.length === 0 && (
              <p className="py-12 font-display text-2xl text-brand-navy">No questions match your search.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
