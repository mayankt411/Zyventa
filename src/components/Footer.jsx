'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2, Linkedin, Facebook, Instagram } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-navy text-white overflow-hidden">
      
      {/* Upper Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Info & Address (Col 1 - 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block" aria-label="Zyventa Home">
              <img
                src={contentData.site.logo}
                alt="Zyventa"
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              {contentData.site.footerDescription}
            </p>

            {/* Address & Contact */}
            <div className="space-y-3 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>{contentData.site.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-green flex-shrink-0" />
                <a
                  href={`mailto:${contentData.site.email}`}
                  className="hover:text-brand-green transition-colors"
                >
                  {contentData.site.email}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.linkedin.com/company/zyventa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green hover:text-brand-navy flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100089488054496"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green hover:text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/zyventa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green hover:text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Columns (Col 2 - 8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Column: Company */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-5 font-heading">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link href="/about-us" className="hover:text-brand-green transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-brand-green transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-brand-green transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-brand-green transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact-us" className="hover:text-brand-green transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: Distribution & Products */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-5 font-heading">
                Distribution & Range
              </h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>
                  <Link href="/our-range-products" className="hover:text-brand-green transition-colors">
                    Wholesale Products
                  </Link>
                </li>
                <li>
                  <Link href="/online-store" className="hover:text-brand-green transition-colors">
                    Online Store
                  </Link>
                </li>
                <li>
                  <Link href="/services#regulation" className="hover:text-brand-green transition-colors">
                    Regulatory Affairs
                  </Link>
                </li>
                <li>
                  <Link href="/services#marketing" className="hover:text-brand-green transition-colors">
                    Strategic Marketing
                  </Link>
                </li>
                <li>
                  <Link href="/services#supply-chain" className="hover:text-brand-green transition-colors">
                    Supply Chain & Logistics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column: Newsletter & Support */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-brand-green mb-5 font-heading">
                Support & Updates
              </h4>
              <ul className="space-y-3 text-sm text-slate-300 mb-6">
                <li>
                  <Link href="/faq" className="hover:text-brand-green transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:text-brand-green transition-colors">
                    Blogs & Insights
                  </Link>
                </li>
              </ul>

              <div className="pt-2">
                <p className="text-xs text-slate-300 mb-3">
                  Signup our newsletter to get update information, news, insight or promotions.
                </p>
                {subscribed ? (
                  <div className="flex items-center gap-2 text-xs text-brand-green font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thank you for subscribing!</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-brand-green"
                      />
                      <button
                        type="submit"
                        className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-brand-green text-brand-navy hover:bg-brand-accentGreen transition-colors flex items-center justify-center"
                        aria-label="Subscribe"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Legal / Copyright Row */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Zyventa. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">
              Privacy & Compliance
            </Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Terms of Distribution
            </Link>
            <Link href="/contact-us" className="hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
