import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';

export function generateStaticParams() {
  return contentData.blogs.map((b) => ({
    slug: b.slug,
  }));
}

export default function SingleBlogPage({ params }) {
  const blog = contentData.blogs.find((b) => b.slug === params.slug) || contentData.blogs[0];

  return (
    <div className="pt-20">
      
      {/* Header Banner */}
      <section className="py-20 bg-brand-paper text-brand-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-blue hover:text-brand-navy transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Blogs</span>
          </Link>

          <div className="flex items-center gap-4 text-xs text-ink-60 mb-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-blue" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-blue" />
              {blog.author}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl display">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Main Content & Sidebar */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Featured Image */}
          <div className="rounded-sm overflow-hidden shadow-lg border border-slate-100 aspect-[16/9] mb-12 bg-slate-100">
            <img
              src="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none text-slate-700 space-y-6 text-base sm:text-lg leading-relaxed">
            {blog.content.map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}

            <blockquote className="p-6 rounded-sm bg-brand-paper border-l-4 border-brand-green italic text-ink font-medium">
              &ldquo;We serve as a link between international healthcare companies and GCC and the growing markets of the Middle East.&rdquo;
            </blockquote>

            <h3 className="text-2xl font-bold text-ink font-heading pt-4">
              Zyventa, The Medicine Distributor & Online Seller
            </h3>

            <p>
              At ZYVENTA, we pride ourselves on our comprehensive approach to establishing and enhancing brand presence within the region&apos;s dynamic healthcare landscape. Our dedicated team oversees every phase and process necessary to cultivate a strong brand identity and market presence.
            </p>
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-16 p-8 rounded-sm bg-brand-paper border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-ink font-heading">
                Looking to expand your pharmaceutical brand?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Speak with our business development and regulatory leaders today.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-brand-navy text-white hover:bg-brand-blue transition-colors flex-shrink-0 shadow"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-brand-green" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
