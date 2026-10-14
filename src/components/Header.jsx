'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, Mail, ArrowRight, ShieldCheck, TrendingUp, Users, Truck, Layers } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = false; // all pages use the solid header

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const headerThemeClass = !isHomePage || isScrolled
    ? 'site-header-scrolled bg-white/95 text-ink shadow-sm'
    : 'site-header-transparent bg-transparent text-white';

  const logoThemeFilter = !isHomePage || isScrolled
    ? ''
    : 'brightness-0 invert';

  return (
    <header
      id="siteHeader"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerThemeClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded"
            aria-label="Zyventa Home"
          >
            <img
              src={contentData.site.logo}
              alt="Zyventa"
              className={`h-11 w-auto max-h-12 object-contain transition-all duration-300 group-hover:opacity-90 ${logoThemeFilter}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname === '/'
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              Home
            </Link>

            <Link
              href="/about-us"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname === '/about-us'
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              About Us
            </Link>

            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname === '/services'
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              Services
            </Link>

            {/* Distribution Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-brand-green py-2 focus:outline-none ${
                  pathname.startsWith('/our-range-products') || pathname.startsWith('/online-store')
                    ? 'text-brand-green font-semibold'
                    : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
                }`}
                aria-expanded={dropdownOpen}
              >
                <span>Distribution & Products</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-brand-green' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-3 px-2 transition-all duration-200 z-50 animate-fade-up">
                  <Link
                    href="/our-range-products"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                  >
                    <div className="p-2 rounded-md bg-brand-lightBg text-brand-blue group-hover/item:bg-brand-green/10 group-hover/item:text-brand-green transition-colors">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink group-hover/item:text-brand-blue">
                        Our Range Products
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Wholesale rates for bulk medicine purchases
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/online-store"
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group/item"
                  >
                    <div className="p-2 rounded-md bg-brand-lightBg text-brand-blue group-hover/item:bg-brand-green/10 group-hover/item:text-brand-green transition-colors">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink group-hover/item:text-brand-blue">
                        Online Store
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Consumer healthcare, Derma & CNS products
                      </div>
                    </div>
                  </Link>

                  <div className="my-1 border-t border-slate-100"></div>

                  <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    5 Core Divisions
                  </div>
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {contentData.distributionDivisions.map((div) => (
                      <Link
                        key={div.id}
                        href={`/services#${div.id}`}
                        className="text-xs font-medium text-slate-600 hover:text-brand-green hover:bg-slate-50 px-2 py-1.5 rounded transition-colors"
                      >
                        {div.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/careers"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname === '/careers'
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              Careers
            </Link>

            <Link
              href="/faq"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname === '/faq'
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              FAQ
            </Link>

            <Link
              href="/blogs"
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                pathname.startsWith('/blogs')
                  ? 'text-brand-green font-semibold'
                  : (!isHomePage || isScrolled ? 'text-ink' : 'text-white/90')
              }`}
            >
              Blogs
            </Link>
          </nav>

          {/* Right Action / Contact CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 bg-brand-green text-brand-navy hover:bg-brand-accentGreen hover:shadow-lg hover:shadow-brand-green/20"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors focus:outline-none ${
                !isHomePage || isScrolled ? 'text-ink hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-ink border-b border-slate-200 shadow-2xl px-6 pt-4 pb-8 space-y-4 animate-fade-up">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/about-us' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/services' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Services
            </Link>
            <Link
              href="/our-range-products"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/our-range-products' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Our Range Products (Wholesale)
            </Link>
            <Link
              href="/online-store"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/online-store' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Online Store
            </Link>
            <Link
              href="/careers"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/careers' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Careers
            </Link>
            <Link
              href="/faq"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname === '/faq' ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              FAQ
            </Link>
            <Link
              href="/blogs"
              className={`text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                pathname.startsWith('/blogs') ? 'bg-brand-green/15 text-brand-blue font-semibold' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Blogs
            </Link>
          </nav>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            <Link
              href="/contact-us"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-base font-semibold bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors shadow"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            
            <div className="text-xs text-slate-500 text-center mt-2">
              Mamzar, Dubai, UAE • contact@zyventa.com
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
