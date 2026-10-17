'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight, Truck, Layers } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

const NAV_LINKS = [
  { href: '/', label: 'Home', exact: true },
  { href: '/about-us', label: 'About' },
  { href: '/services', label: 'Services' },
  { dropdown: true },
  { href: '/careers', label: 'Careers' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blogs', label: 'Insights' },
];

const PRODUCT_LINKS = [
  { href: '/our-range-products', label: 'Our range', description: 'Wholesale rates for bulk medicine purchases', Icon: Truck },
  { href: '/online-store', label: 'Online store', description: 'Consumer healthcare, derma and CNS products', Icon: Layers },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const isActive = (href, exact) => (exact ? pathname === href : pathname.startsWith(href));
  const productsActive = PRODUCT_LINKS.some((l) => pathname.startsWith(l.href));

  const desktopLinkClass = (active) =>
    `relative text-sm font-semibold py-2 transition-colors hover:text-brand-navy ${
      active
        ? 'text-brand-navy after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-brand-green'
        : 'text-ink-60'
    }`;

  return (
    <header
      id="siteHeader"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 site-header-scrolled ${isScrolled ? 'shadow-[0_8px_24px_-16px_rgb(var(--c-navy)/0.35)]' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-[height] duration-300 ${isScrolled ? 'h-16' : 'h-20'}`}>
          <Link
            href="/"
            className="flex items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
            aria-label="Zyventa home"
          >
            <img src={contentData.site.logo} alt="Zyventa" className={`w-auto object-contain transition-[height] duration-300 ${isScrolled ? 'h-8' : 'h-10'}`} />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main">
            {NAV_LINKS.map((link) =>
              link.dropdown ? (
                <div
                  key="products"
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 ${desktopLinkClass(productsActive)}`}
                    aria-expanded={dropdownOpen}
                    onClick={() => setDropdownOpen((o) => !o)}
                  >
                    Products
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full -left-4 pt-3 z-50">
                      <div className="w-80 bg-white rounded-md border border-brand-border shadow-[0_24px_48px_-24px_rgb(var(--c-navy)/0.35)] p-2 animate-fade-up">
                        {PRODUCT_LINKS.map(({ href, label, description, Icon }) => (
                          <Link
                            key={href}
                            href={href}
                            className="flex items-start gap-3 p-3 rounded hover:bg-brand-sand transition-colors"
                          >
                            <span className="p-2 rounded bg-brand-sand text-brand-blue">
                              <Icon className="w-4 h-4" />
                            </span>
                            <span>
                              <span className="block text-sm font-bold text-brand-navy">{label}</span>
                              <span className="block text-xs text-ink-60 mt-0.5">{description}</span>
                            </span>
                          </Link>
                        ))}
                        <div className="mt-1 pt-3 pb-1 px-3 border-t border-brand-border">
                          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-60">Our five divisions</p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {contentData.distributionDivisions.map((div) => (
                              <Link
                                key={div.id}
                                href={`/services#${div.id}`}
                                className="text-xs font-semibold text-brand-navy px-2.5 py-1 rounded-full border border-brand-border hover:border-brand-green hover:text-brand-blue transition-colors"
                              >
                                {div.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href} className={desktopLinkClass(isActive(link.href, link.exact))}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex">
            <Link href="/contact-us" className="btn btn-accent !py-2.5">
              Contact us <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-brand-navy hover:bg-brand-sand transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-paper border-b border-brand-border px-6 pt-2 pb-8 animate-fade-up">
          <nav className="flex flex-col" aria-label="Mobile">
            {[...NAV_LINKS.filter((l) => !l.dropdown), ...PRODUCT_LINKS].map((link) => {
              const active = isActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-display text-2xl py-3 border-b border-brand-border ${active ? 'text-brand-blue' : 'text-brand-navy'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link href="/contact-us" className="btn btn-accent w-full justify-center mt-6">
            Contact us <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <p className="text-xs text-ink-60 text-center mt-4">Mamzar, Dubai, UAE · {contentData.site.email}</p>
        </div>
      )}
    </header>
  );
}
