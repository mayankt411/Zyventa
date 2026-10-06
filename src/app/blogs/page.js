import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export const metadata = {
  title: 'Blogs & Insights - Zyventa',
  description: 'Stay updated with pharmaceutical distribution insights, healthcare regulations, and regional market trends from Zyventa.',
};

export default function BlogsPage() {
  return (
    <div className="pt-20">
      
      {/* Banner */}
      <section className="relative py-24 sm:py-32 bg-brand-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
              <span>Industry Insights</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight">
              Blogs & Market Insights
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed">
              ZYVENTA is the connection between your brand and the region&apos;s best medical professionals, primary health centres, hospitals and pharmacies.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-24 bg-brand-lightBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {contentData.blogs.map((blog) => (
              <article
                key={blog.slug}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img
                      src="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 text-brand-navy text-xs font-bold">
                      Healthcare Distribution
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-brand-green" />
                        {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-brand-green" />
                        {blog.author}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-ink font-heading group-hover:text-brand-blue transition-colors line-clamp-2">
                      <Link href={`/blogs/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue group-hover:text-brand-navy transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 text-brand-green transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
