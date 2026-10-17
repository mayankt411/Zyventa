import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/Motion';

// Navy closing band used at the bottom of every page.
export default function HomeCta({
  eyebrow = 'Work with us',
  title = 'Bringing a product to the region?',
  accent = "Let's talk.",
  primary = { href: '/contact-us', label: 'Contact us' },
  secondary = { href: '/our-range-products', label: 'Product range' },
}) {
  return (
    <section className="bg-brand-navy text-brand-paper">
      <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow !text-brand-green">{eyebrow}</p>
          <h2 className="font-display font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mt-5">
            {title} {accent && <em className="text-brand-green">{accent}</em>}
          </h2>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end flex flex-wrap gap-3">
          <Link href={primary.href} className="btn btn-accent">
            {primary.label} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-on-dark">
              {secondary.label}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
