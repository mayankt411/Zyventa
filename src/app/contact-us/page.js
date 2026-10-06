'use client';

import { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Let&apos;s Start Talk With Us
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              Get in touch and let us know how we can help your healthcare brand thrive across the GCC and Middle East.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-24 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Contact Details (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
                  <span className="w-2 h-2 rounded-full bg-brand-green"></span>
                  <span>Direct Communication</span>
                </p>
                <h2 className="mt-3 text-3xl font-bold text-ink font-heading">
                  Get in touch
                </h2>
                <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                  We serve as a link between international healthcare companies and GCC and the growing markets of the Middle East.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-navy text-brand-green flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink font-heading">
                      Office Address
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {contentData.site.address}
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-navy text-brand-green flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink font-heading">
                      Email Address
                    </h3>
                    <a
                      href={`mailto:${contentData.site.email}`}
                      className="mt-1 inline-block text-xs sm:text-sm text-brand-blue font-semibold hover:underline"
                    >
                      {contentData.site.email}
                    </a>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-brand-navy text-brand-green flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink font-heading">
                      Operating Hours
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-600">
                      Monday – Friday: 8:30 AM – 5:30 PM (GST)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Contact Form (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl shadow-slate-100">
                <h3 className="text-2xl sm:text-3xl font-bold text-ink font-heading mb-2">
                  Send us a message
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-8">
                  Fill out the form below and our regional distribution executive will reply promptly.
                </p>

                {submitted ? (
                  <div className="p-10 rounded-2xl bg-brand-green/15 text-brand-navy text-center space-y-4 animate-fade-up">
                    <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto" />
                    <h4 className="text-xl font-bold font-heading">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-sm text-slate-700 max-w-md mx-auto">
                      Thank you for contacting Zyventa. We have received your message and will get in touch shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-full bg-brand-navy text-white text-xs font-semibold hover:bg-brand-blue transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="e.g. Dr. Ahmed Al Mansoori"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Your Email *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="ahmed@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                          Subject / Inquiry Type
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green bg-white"
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Brand Partnership">Brand Partnership & Representation</option>
                          <option value="Wholesale Bulk Rates">Wholesale Bulk Medicine Purchase</option>
                          <option value="Regulatory Support">Regulatory Support</option>
                          <option value="Careers">Careers</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows="4"
                        placeholder="How can Zyventa assist your healthcare organization?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full bg-brand-green text-brand-navy font-bold text-sm sm:text-base hover:bg-brand-accentGreen transition-all duration-300 shadow-lg shadow-brand-green/20 flex items-center justify-center gap-2 group"
                    >
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Map Embed Section */}
      <section className="h-96 w-full relative bg-slate-200">
        <iframe
          title="Zyventa Office Location - Mamzar Dubai"
          src="https://maps.google.com/maps?q=Omniyat+Building+Mamzar+Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
          loading="lazy"
        ></iframe>
      </section>

    </div>
  );
}
