'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Users, Send } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setSelectedRole(null);
    }, 2500);
  };

  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <img
          src="/assets/team/international-medical-team-in-face-masks-having-team-building-300x200.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          aria-hidden="true"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Careers at Zyventa</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Bring Innovation to Your Company
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              ZYVENTA is the connection between your brand and the region&apos;s best medical professionals, primary health centres, hospitals and pharmacies. Join our dynamic team today!
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-16">
            <p className="flex items-center gap-2 font-heading text-xs font-bold tracking-[0.14em] uppercase text-ink-60">
              <span className="w-2 h-2 rounded-full bg-brand-green"></span>
              <span>Join Our Team</span>
            </p>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink font-heading">
              Open Positions in UAE
            </h2>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              We recognize that our team is what makes us who we are. We pride ourselves on our professional, highly skilled and dedicated staff.
            </p>
          </div>

          <div className="space-y-6">
            {contentData.careers.map((job) => (
              <div
                key={job.id}
                className="bg-brand-lightBg rounded-3xl p-8 border border-slate-200/80 hover:border-brand-green/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-brand-green/15 text-brand-navy text-xs font-bold">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-brand-blue" />
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-ink font-heading group-hover:text-brand-blue transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(job)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors shadow"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 text-brand-green" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Application Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-100 relative">
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-ink text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-ink font-heading">
              Apply for {selectedRole.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Department: {selectedRole.department} • Location: {selectedRole.location}
            </p>

            {applied ? (
              <div className="p-6 rounded-2xl bg-brand-green/15 text-brand-navy text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-green mx-auto" />
                <p className="font-bold">Application submitted successfully!</p>
                <p className="text-xs text-slate-600">Our HR and talent team will review your application and get in touch.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                  <input required type="text" placeholder="John Doe" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input required type="email" placeholder="name@domain.com" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input required type="tel" placeholder="+971 50 123 4567" className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile or Portfolio Link</label>
                  <input type="url" placeholder="https://linkedin.com/in/..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Cover Note / Experience Summary</label>
                  <textarea rows="3" placeholder="Tell us about your experience in pharmaceutical sales, marketing or administration..." className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-brand-green"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-brand-green text-brand-navy font-bold text-sm hover:bg-brand-accentGreen transition-colors shadow"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
