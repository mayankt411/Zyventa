'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProductVisual, therapyStyle } from '@/components/Catalog';
import { submitEnquiry, enquiryMailto } from '@/lib/submitEnquiry';
import contentData from '@/data/zyventaContent.json';

export default function ProductDetailModal({ product, onClose }) {
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '100',
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const variants = product.images || [];
  const [variantIndex, setVariantIndex] = useState(0);
  const shown = variants[variantIndex] ? { ...product, image: variants[variantIndex].src } : product;

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!product) return null;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    const result = await submitEnquiry('product', {
      ...formData,
      product: product.name,
      website: e.target.website.value,
    });
    setSending(false);
    if (result.ok) setInquirySubmitted(true);
    else setError(true);
  };

  const update = (key) => (e) => setFormData({ ...formData, [key]: e.target.value });

  const specs = [
    ['Active composition', product.composition],
    ['Available strengths', product.availableStrengths],
    ['Pack size', product.packSize],
    ['Indication', product.indication],
  ].filter(([, value]) => value);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-darkBlue/70 backdrop-blur-sm animate-fade-up"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      <div className="bg-brand-paper rounded-md max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="overflow-y-auto grid md:grid-cols-12">
          {/* Product visual */}
          <div className="md:col-span-5 p-10 flex flex-col items-center justify-center gap-4 relative min-h-[260px]" style={{ background: therapyStyle(product.category).tint }}>
            <div className="flex items-center justify-center w-full max-h-[18rem]">
              <ProductVisual product={shown} />
            </div>
            {variants.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Select strength">
                {variants.map((v, i) => (
                  <button
                    key={v.src}
                    type="button"
                    role="tab"
                    aria-selected={i === variantIndex}
                    onClick={() => setVariantIndex(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${i === variantIndex ? 'bg-brand-navy text-white border-brand-navy' : 'bg-white text-brand-navy border-brand-border hover:border-brand-navy'}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-7 p-6 sm:p-10 relative">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-brand-border hover:border-brand-navy flex items-center justify-center text-brand-navy transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-wrap gap-1.5 pr-12">
              <span className="tag tag-neutral">{product.category}</span>
              {product.prescription && (
                <span className={`tag ${product.isRx ? 'tag-rx' : 'tag-otc'}`}>{product.prescription}</span>
              )}
            </div>
            <h2 className="display mt-5 text-3xl sm:text-4xl">{product.name}</h2>
            {product.tagline && <p className="mt-2 text-brand-blue font-semibold">{product.tagline}</p>}
            {product.description && <p className="mt-4 text-sm text-ink-80 leading-relaxed">{product.description}</p>}

            {specs.length > 0 && (
              <dl className="mt-8 border-t border-brand-navy">
                {specs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-3 gap-4 py-3 border-b border-brand-border text-sm">
                    <dt className="field-label !mb-0 pt-0.5">{label}</dt>
                    <dd className="col-span-2 text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {product.closingLine && (
              <p className="mt-6 font-display text-lg italic text-brand-navy">{product.closingLine}</p>
            )}

            {showInquiryForm && (
              <div className="mt-8 pt-6 border-t border-brand-border animate-fade-up">
                {inquirySubmitted ? (
                  <div className="flex items-center gap-3 text-brand-navy">
                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                    <div>
                      <p className="font-bold text-sm">Enquiry received</p>
                      <p className="text-xs text-ink-60">Our distribution team will be in touch.</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="grid sm:grid-cols-2 gap-4">
                    <label>
                      <span className="field-label">Name or organisation</span>
                      <input required type="text" value={formData.name} onChange={update('name')} className="field" />
                    </label>
                    <label>
                      <span className="field-label">Email</span>
                      <input required type="email" value={formData.email} onChange={update('email')} className="field" />
                    </label>
                    <label>
                      <span className="field-label">Phone or WhatsApp</span>
                      <input type="tel" placeholder="+971" value={formData.phone} onChange={update('phone')} className="field" />
                    </label>
                    <label>
                      <span className="field-label">Units required</span>
                      <input type="number" min="1" value={formData.quantity} onChange={update('quantity')} className="field" />
                    </label>
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    {error && (
                      <p role="alert" className="sm:col-span-2 text-sm text-red-700">
                        Your enquiry couldn&apos;t be sent right now.{' '}
                        <a
                          href={enquiryMailto(contentData.site.email, `Product enquiry · ${product.name}`, [
                            `Product: ${product.name}`,
                            `Units required: ${formData.quantity}`,
                            '',
                            formData.name,
                            formData.phone,
                          ])}
                          className="font-bold underline"
                        >
                          Email it to us
                        </a>{' '}
                        instead.
                      </p>
                    )}
                    <button type="submit" disabled={sending} className="btn btn-solid sm:col-span-2 justify-center disabled:opacity-60">
                      {sending ? 'Sending…' : 'Send enquiry'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 sm:px-10 py-4 border-t border-brand-border bg-white flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-60">Available across UAE and GCC distribution channels</p>
          <button type="button" onClick={() => setShowInquiryForm(!showInquiryForm)} className="btn btn-solid !py-2.5">
            {showInquiryForm ? 'Hide form' : 'Request pricing and stock'} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
