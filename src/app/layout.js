import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Medicine Supplier | Online Store | Zyventa Pharmacy in UAE',
  description: 'ZYVENTA was founded to serve as a link between international healthcare companies and the growing markets of Arabian Gulf and the Middle East.',
  icons: {
    icon: '/assets/logos/cropped-zyventa-logo-png1.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Enable scroll motion before first paint unless the visitor prefers reduced motion */}
        <script
          dangerouslySetInnerHTML={{
            __html: "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-brand-paper text-ink">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-brand-navy focus:rounded">Skip to content</a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
