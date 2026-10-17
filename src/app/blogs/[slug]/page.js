import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import HomeCta from '@/components/HomeCta';

export function generateStaticParams() {
  return contentData.blogs.map((b) => ({
    slug: b.slug,
  }));
}

export function generateMetadata({ params }) {
  const blog = contentData.blogs.find((b) => b.slug === params.slug);
  return blog ? { title: `${blog.title} - Zyventa`, description: blog.excerpt } : {};
}

export default function SingleBlogPage({ params }) {
  const blog = contentData.blogs.find((b) => b.slug === params.slug) || contentData.blogs[0];

  return (
    <div className="pt-20 bg-brand-paper">
      <article>
        <header className="bg-brand-navy text-white border-b-4 border-brand-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20">
            <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All insights
            </Link>
            <div className="mt-10 grid lg:grid-cols-12 gap-8 pb-12">
              <h1 className="display !text-white lg:col-span-9 text-4xl sm:text-5xl lg:text-6xl">{blog.title}</h1>
              <dl className="lg:col-span-3 lg:self-end text-sm space-y-3">
                <div>
                  <dt className="field-label !mb-1 !text-brand-onDarkMuted">Published</dt>
                  <dd>{blog.date}</dd>
                </div>
                <div>
                  <dt className="field-label !mb-1 !text-brand-onDarkMuted">Author</dt>
                  <dd>{blog.author}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="aspect-[21/9] rounded-md overflow-hidden bg-brand-sand">
            <img
              src="/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 text-lg text-ink-80 leading-[1.8] space-y-6">
          {blog.content.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none first-letter:text-brand-navy' : ''}>
              {paragraph}
            </p>
          ))}

          <blockquote className="my-12 border-l-2 border-brand-green pl-6 font-display text-2xl sm:text-3xl text-brand-navy leading-snug">
            &ldquo;We serve as a link between international healthcare companies and GCC and the growing markets of the Middle East.&rdquo;
          </blockquote>

          <h2 className="display text-3xl pt-4">Zyventa, the medicine distributor and online seller</h2>
          <p>
            At ZYVENTA, we pride ourselves on our comprehensive approach to establishing and enhancing brand presence within the region&apos;s dynamic healthcare landscape. Our dedicated team oversees every phase and process necessary to cultivate a strong brand identity and market presence.
          </p>
        </div>
      </article>

      <HomeCta
        eyebrow="Partner with us"
        title="Looking to expand your pharmaceutical brand?"
        accent="Let's talk."
        primary={{ href: '/contact-us', label: 'Contact us' }}
        secondary={{ href: '/services', label: 'Our services' }}
      />
    </div>
  );
}
