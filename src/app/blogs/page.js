import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import contentData from '@/data/zyventaContent.json';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';

export const metadata = {
  title: 'Blogs & Insights - Zyventa',
  description: 'Stay updated with pharmaceutical distribution insights, healthcare regulations, and regional market trends from Zyventa.',
};

const COVER = '/assets/images/connected-logistics-and-supply-chain-concept-table-tennis-ball-with-plane-trucks-train-and-ship-s-300x200.jpg';

export default function BlogsPage() {
  const [featured, ...rest] = contentData.blogs;

  return (
    <div>
      <PageHeader eyebrow="Insights" title={<>Notes on healthcare in the <em>region</em>.</>}>
        Distribution, regulation and market trends across the GCC, Middle East and Africa.
      </PageHeader>

      <section className="py-16 sm:py-24 bg-brand-paper">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article */}
          {featured && (
            <Reveal as="article" className="group grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              <Link href={`/blogs/${featured.slug}`} className="lg:col-span-7 block aspect-[16/10] rounded-md overflow-hidden bg-brand-sand">
                <img src={COVER} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="lg:col-span-5">
                <p className="eyebrow">Featured · {featured.date}</p>
                <h2 className="display mt-5 text-3xl sm:text-4xl">
                  <Link href={`/blogs/${featured.slug}`} className="hover:text-brand-blue transition-colors">{featured.title}</Link>
                </h2>
                <p className="mt-5 text-ink-80 leading-relaxed line-clamp-4">{featured.excerpt}</p>
                <Link href={`/blogs/${featured.slug}`} className="link-accent mt-8">
                  Read article <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          )}

          {/* Remaining articles as an index */}
          {rest.length > 0 && (
            <Reveal as="ol" stagger className="mt-20 border-t border-brand-navy">
              {rest.map((blog) => (
                <li key={blog.slug} className="border-b border-brand-border">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="service-row group grid sm:grid-cols-[10rem_1fr_auto] gap-2 sm:gap-6 items-baseline py-7"
                  >
                    <span className="text-sm text-ink-60">{blog.date}</span>
                    <span>
                      <span className="block font-display text-2xl text-brand-navy">{blog.title}</span>
                      <span className="block mt-2 text-sm text-ink-60 line-clamp-2 max-w-2xl">{blog.excerpt}</span>
                    </span>
                    <ArrowUpRight className="hidden sm:block w-5 h-5 text-brand-navy transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </Reveal>
          )}
        </div>
      </section>
    </div>
  );
}
