import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeCta() {
  return (
    <section className="bg-brand-navy text-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] max-w-2xl">
          Bringing a product to the region? Let&apos;s talk.
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact-us" className="btn btn-green">
            Contact us <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link href="/our-range-products" className="btn border-white/50 text-white hover:bg-white hover:text-brand-navy">
            Product range
          </Link>
        </div>
      </div>
    </section>
  );
}
