export default function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="bg-brand-paper pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl reveal">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
          {children && <p className="mt-6 text-lg text-ink-80 leading-relaxed">{children}</p>}
        </div>
      </div>
    </section>
  );
}
