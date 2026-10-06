# Zyventa - Restructured into Azalea Pharma Design System & Motion Template

This project rebuilds **Zyventa (https://zyventa.com/)** inside the modern layout, section structure, navigation, component system, and animations of **Azalea Pharma (https://azaleapharma.com/)**.

---

## 💎 Project Philosophy & Strict Rules Adherence

1. **100% Verbatim Zyventa Content**: All text, therapeutic categories, product titles, descriptions, addresses, emails, phone numbers, and company history are taken directly from the live Zyventa website.
2. **Zero Azalea Content**: No Azalea text, partner logos, statistics, or contact details are used. Only Azalea's structure, typography rhythm, animations, and component hierarchy are replicated.
3. **Design System & Motion**:
   - **Zyventa Brand Colors**: Primary Deep Navy (`#0F2A4D`), Brand Green Accent (`#03E78B`), Secondary Blue (`#027ABB`), Text Ink (`#14213B`), Background Light (`#F8FAFC`).
   - **Sticky Navigation**: Transparent on hero at top, transitions to solid white with backdrop blur + subtle border and shadow upon scrolling down.
   - **Hero Background Video**: Full-viewport video playback (`Zyventa-Promo-Landscape-V3.mp4`) with play/pause toggle controls and scroll indicator.
   - **Stats Section**: Count-up animation on scroll with suffix indicators.
   - **Distribution Channels**: Interactive 5-division tabbed panel with smooth transitions.
   - **Key Services**: 8-card responsive icon grid with hover effects.
   - **Our Partners**: Dual-row infinite marquee moving in opposite directions (LTR & RTL) with hover pause.
   - **Our Journey**: Step-by-step milestone timeline with vertical line.
   - **Our Brands**: Alternating product showcase cards with modal inquiry.
   - **Leadership Spotlight**: Split portrait and team philosophy quote.
   - **Inner Pages**: About Us, Services, Our Range Products (Wholesale), Online Store, Careers, FAQ, Blogs & Single Post, Contact Us (with working interactive form and map).

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm start
```

---

## 📁 Project Structure

```
zyventa-site/
├── assets/                  # Harvested media from zyventa.com
│   ├── logos/               # Brand & partner logos
│   ├── images/              # Product and section photos
│   ├── videos/              # Zyventa promo landscape video
│   └── team/                # Leadership & medical team imagery
├── content-inventory/       # Zyventa raw crawl data & Azalea analysis
│   ├── zyventa.json         # Complete harvested content inventory
│   └── azalea_structure.json# Azalea structural and layout analysis
├── public/
│   └── assets/              # Static assets served by Next.js
├── src/
│   ├── app/
│   │   ├── about-us/        # About Us page
│   │   ├── blogs/           # Blog archive and single post pages
│   │   │   └── [slug]/
│   │   ├── careers/         # Careers and application form
│   │   ├── contact-us/      # Contact details, form & map
│   │   ├── faq/             # Interactive FAQ accordions
│   │   ├── online-store/    # Consumer & OTC product store
│   │   ├── our-range-products/ # Wholesale bulk pharmaceuticals
│   │   ├── services/        # 5 Core divisions & capabilities
│   │   ├── globals.css      # Design tokens, marquee animations, glassmorphism
│   │   ├── layout.js        # Root layout with Header and Footer
│   │   └── page.js          # Master Home page
│   ├── components/
│   │   ├── Header.jsx       # Sticky header, dropdowns & mobile drawer
│   │   ├── Hero.jsx         # Hero video, pause toggle, CTAs, scroll arrow
│   │   ├── AboutIntroStats.jsx # Split intro + animated count-up counters
│   │   ├── DistributionTabs.jsx # 5-division interactive tabbed panel
│   │   ├── KeyServicesGrid.jsx # 8-card responsive service grid
│   │   ├── PartnersMarquee.jsx # Dual-row infinite marquee
│   │   ├── OurJourney.jsx   # Timeline milestones
│   │   ├── OurBrandsShowcase.jsx # Alternating product showcase cards
│   │   ├── LeadershipSpotlight.jsx # Split portrait and team philosophy
│   │   └── Footer.jsx       # Multi-column footer, address, newsletter
│   └── data/
│       └── zyventaContent.json # Structured verbatim Zyventa content
├── tailwind.config.js       # Breakpoints (1440 / 768 / 390px), typography & colors
├── next.config.mjs
└── package.json
```

---

## 📱 Responsive Breakpoints
- **Desktop**: `1440px` (`2xl`)
- **Tablet**: `768px` (`md`)
- **Mobile**: `390px` (`mobile` / `sm`)
- **Reduced Motion**: Automatically respects `prefers-reduced-motion: reduce`.
