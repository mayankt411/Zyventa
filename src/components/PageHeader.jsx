export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="bg-brand-paper pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-end py-16 sm:py-24 border-b border-brand-border reveal">
          <div className="lg:col-span-8">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display mt-6 text-4xl sm:text-5xl lg:text-[4rem]">{title}</h1>
          </div>
          {children && (
            <p className="lg:col-span-4 text-lg text-ink-80 leading-relaxed lg:pb-2">{children}</p>
          )}
        </div>
      </div>
    </section>
  );
}
