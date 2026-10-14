import Link from 'next/link';
import { Target, Compass, Users, Award, ShieldCheck, HeartPulse, ArrowRight, CheckCircle2 } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';

export const metadata = {
  title: 'About Us - Zyventa',
  description: 'ZYVENTA is the connection between your brand and the region’s best medical professionals, primary health centres, hospitals and pharmacies.',
};

export default function AboutUsPage() {
  return (
    <div>
      
      {/* Page Header Banner */}
      <PageHeader eyebrow="About Zyventa" title={<>One Stop Solution for Regional Healthcare</>}>ZYVENTA is the connection between your brand and the region&apos;s best medical professionals, primary health centres, hospitals and pharmacies.</PageHeader>

      {/* Overview & Split Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
                <span className="w-2 h-2 rounded-sm bg-brand-green"></span>
                <span>Our Foundation</span>
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-ink font-heading leading-tight">
                Empowering Healthcare Networks Worldwide
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {contentData.site.aboutText}
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {contentData.site.aboutSubtext}
              </p>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-sm overflow-hidden shadow-2xl border border-slate-100 bg-slate-100 aspect-[4/3]">
                <img
                  src="/assets/team/international-medical-team-in-face-masks-having-team-building-300x200.jpg"
                  alt="Zyventa Healthcare Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-brand-paper border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white rounded-sm p-8 sm:p-12 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-sm bg-brand-navy text-brand-green flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-ink font-heading mb-4">
                MISSION:
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                To bridge healthcare access gaps across the Arabian Gulf and Middle East by partnering with global innovators to deliver high-quality medicines, biologics, and wellness solutions directly to regional healthcare providers and patients.
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-sm p-8 sm:p-12 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-sm bg-brand-navy text-brand-green flex items-center justify-center mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-ink font-heading mb-4">
                VISION:
              </h3>
              <p className="text-base text-slate-600 leading-relaxed">
                To be the most trusted and comprehensive healthcare commercialization and distribution platform in the Middle East and Africa, recognized for scientific rigor, ethical excellence, and seamless execution.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Team Philosophy Quote */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-sm bg-brand-green/20 text-brand-green flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
            Our People Make Us Who We Are
          </h2>
          <blockquote className="text-lg sm:text-xl text-slate-700 italic leading-relaxed">
            &ldquo;We provide world-class support to those who want to enter the most promising markets of Middle East & Africa, with the help of the most dynamic management team. We recognize that our team is what makes us who we are. We pride ourselves on our professional, highly skilled and dedicated staff, each bringing their own unique skills to the business.&rdquo;
          </blockquote>
          <div className="pt-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow"
            >
              <span>Get in Touch With Our Team</span>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
