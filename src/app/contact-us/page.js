'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import { submitEnquiry, enquiryMailto } from '@/lib/submitEnquiry';

const EMPTY_FORM = { name: '', email: '', phone: '', subject: 'General Inquiry', message: '' };

export default function ContactUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    const result = await submitEnquiry('contact', { ...formData, website: e.target.website.value });
    setSending(false);
    if (result.ok) setSubmitted(true);
    else setError(true);
  };

  const fallbackMailto = enquiryMailto(contentData.site.email, formData.subject, [
    formData.message,
    '',
    formData.name,
    formData.phone,
  ]);

  // Preselect the enquiry type when arriving from a partnership link (?type=distribution)
  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get('type');
    const match = contentData.partnerModels.find((m) => m.id === type);
    if (match) setFormData((f) => ({ ...f, subject: match.title }));
  }, []);

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const details = [
    { label: 'Office', value: contentData.site.address },
    { label: 'Email', value: contentData.site.email, href: `mailto:${contentData.site.email}` },
    { label: 'Hours', value: 'Monday to Friday, 8:30 AM to 5:30 PM (GST)' },
  ];

  return (
    <div>
      <PageHeader eyebrow="Contact" title={<>Let&apos;s <em>talk</em>.</>}>
        Tell us how we can help your healthcare brand grow across the GCC and Middle East.
      </PageHeader>

      <section className="py-16 sm:py-24 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Details panel */}
          <aside className="lg:col-span-5 bg-brand-navy text-brand-paper rounded-md p-8 sm:p-12 flex flex-col justify-between gap-12">
            <div>
              <p className="eyebrow !text-brand-green">Dubai headquarters</p>
              <p className="mt-6 font-display text-2xl sm:text-3xl leading-snug">
                The link between international healthcare companies and the growing markets of the Middle East.
              </p>
            </div>
            <dl className="border-t border-white/15">
              {details.map(({ label, value, href }) => (
                <div key={label} className="py-5 border-b border-white/15">
                  <dt className="field-label !text-brand-onDarkMuted">{label}</dt>
                  <dd className="text-sm leading-relaxed">
                    {href ? (
                      <a href={href} className="font-semibold hover:text-brand-green transition-colors">{value}</a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>

          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="display text-3xl sm:text-4xl">Send us a message</h2>
            <p className="mt-3 text-ink-60">Fill out the form and our regional team will reply promptly.</p>

            {submitted ? (
              <div className="mt-10 border-t border-brand-navy pt-10 animate-fade-up">
                <CheckCircle2 className="w-10 h-10 text-brand-green" />
                <p className="mt-4 font-display text-3xl text-brand-navy">Message sent.</p>
                <p className="mt-2 text-ink-80 max-w-md">
                  Thank you for contacting Zyventa. We have received your message and will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData(EMPTY_FORM);
                  }}
                  className="link-accent mt-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 grid sm:grid-cols-2 gap-6">
                <label>
                  <span className="field-label">Your name *</span>
                  <input required type="text" placeholder="Dr. Ahmed Al Mansoori" value={formData.name} onChange={update('name')} className="field" />
                </label>
                <label>
                  <span className="field-label">Email *</span>
                  <input required type="email" placeholder="ahmed@example.com" value={formData.email} onChange={update('email')} className="field" />
                </label>
                <label>
                  <span className="field-label">Phone</span>
                  <input type="tel" placeholder="+971 50 123 4567" value={formData.phone} onChange={update('phone')} className="field" />
                </label>
                <label>
                  <span className="field-label">Enquiry type</span>
                  <select value={formData.subject} onChange={update('subject')} className="field">
                    <option value="General Inquiry">General enquiry</option>
                    {contentData.partnerModels.map((m) => (
                      <option key={m.id} value={m.title}>{m.title}</option>
                    ))}
                    <option value="Wholesale Bulk Rates">Wholesale bulk purchase</option>
                    <option value="Regulatory Support">Regulatory support</option>
                    <option value="Careers">Careers</option>
                  </select>
                </label>
                <label className="sm:col-span-2">
                  <span className="field-label">Message *</span>
                  <textarea required rows="5" placeholder="How can Zyventa help your organisation?" value={formData.message} onChange={update('message')} className="field" />
                </label>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="sm:col-span-2">
                  {error && (
                    <p role="alert" className="mb-4 text-sm text-red-700">
                      Your message couldn&apos;t be sent right now.{' '}
                      <a href={fallbackMailto} className="font-bold underline">Email it to {contentData.site.email}</a> instead.
                    </p>
                  )}
                  <button type="submit" disabled={sending} className="btn btn-solid disabled:opacity-60">
                    {sending ? 'Sending…' : 'Send message'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="h-96 w-full bg-brand-sand">
        <iframe
          title="Zyventa office location, Mamzar, Dubai"
          src="https://maps.google.com/maps?q=Omniyat+Building+Mamzar+Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-full border-0 grayscale-[60%] sepia-[15%]"
          loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
