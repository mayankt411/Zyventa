import { Mail, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export const metadata = {
  title: 'Careers - Zyventa',
  description: 'Send your CV to Zyventa and join a team connecting global healthcare brands with the Middle East and Africa.',
};

export default function CareersPage() {
  // NOTE: no dedicated recruitment address exists in the project; the company
  // contact address is used. Confirm or replace it here if HR has its own.
  const email = contentData.site.email;
  const subject = encodeURIComponent('Career Application — Zyventa');
  const mailto = `mailto:${email}?subject=${subject}`;

  return (
    <div className="pt-20 bg-brand-paper">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">Careers</p>
          <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Join the team behind Zyventa.
          </h1>
          <p className="mt-6 text-lg text-ink-80 leading-relaxed">
            We are always glad to hear from capable people in pharmaceutical sales, marketing, regulatory affairs and operations.
            Share your CV and we will be in touch when there is a fit.
          </p>
        </div>

        <div className="mt-14 rule-top pt-8 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <p className="text-sm font-semibold text-ink-60 uppercase tracking-wider">Send your CV to</p>
            <a
              href={mailto}
              className="mt-2 inline-flex items-center gap-3 font-display text-2xl sm:text-4xl text-brand-navy break-all hover:text-brand-blue transition-colors"
            >
              <Mail className="w-7 h-7 shrink-0" aria-hidden="true" />
              {email}
            </a>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a href={mailto} className="btn btn-solid">
              Send your CV <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
