import { ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';

export const metadata = {
  title: 'Careers - Zyventa',
  description: 'Send your CV to Zyventa and join a team connecting global healthcare brands with the Middle East and Africa.',
};

const AREAS = ['Pharmaceutical sales', 'Marketing', 'Regulatory affairs', 'Operations and supply chain'];

export default function CareersPage() {
  // NOTE: no dedicated recruitment address exists in the project; the company
  // contact address is used. Confirm or replace it here if HR has its own.
  const email = contentData.site.email;
  const subject = encodeURIComponent('Career Application — Zyventa');
  const mailto = `mailto:${email}?subject=${subject}`;

  return (
    <div>
      <PageHeader eyebrow="Careers" title={<>Join the team <em>behind</em> Zyventa.</>}>
        We are always glad to hear from capable people. Share your CV and we will be in touch when there is a fit.
      </PageHeader>

      <section className="bg-brand-paper py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-10 lg:gap-0">
          <div className="lg:col-span-7 lg:pr-16">
            <p className="eyebrow">Where you could fit</p>
            <Reveal as="ol" stagger className="mt-8 border-t border-brand-navy">
              {AREAS.map((area, i) => (
                <li key={area} className="grid grid-cols-[3rem_1fr] items-baseline py-6 border-b border-brand-border">
                  <span className="font-display text-brand-blue text-lg">0{i + 1}</span>
                  <span className="font-display text-2xl sm:text-3xl text-brand-navy">{area}</span>
                </li>
              ))}
            </Reveal>
          </div>

          <aside className="lg:col-span-5 bg-brand-navy text-brand-paper rounded-md p-8 sm:p-12 flex flex-col justify-between gap-12">
            <span className="font-display text-7xl leading-none text-brand-green" aria-hidden="true">&ldquo;</span>
            <div>
              <p className="font-display text-2xl sm:text-3xl leading-snug">Our team is what makes us who we are.</p>
              <p className="mt-8 field-label !text-brand-onDarkMuted">Send your CV to</p>
              <a href={mailto} className="font-display text-xl sm:text-2xl break-all hover:text-brand-green transition-colors">
                {email}
              </a>
              <div className="mt-8">
                <a href={mailto} className="btn btn-accent">
                  Send your CV <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
