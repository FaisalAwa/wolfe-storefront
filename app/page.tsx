import CTASection from 'components/shared/CTASection';
import WolfeEditions from 'components/home/WolfeEditions';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'WOLFE — Timeless Interiors, Designed Objects',
  description: 'Luxury interior design and artisanal éditions for the world\'s most discerning clientele. Based in Toronto and Miami.',
  openGraph: { type: 'website' },
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="relative h-screen min-h-[700px] flex items-end pb-16 md:pb-20">
        <Image src="/hero-home.jpg" alt="Wolfe Interior Design" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-[60px] w-full">
          <h1 className="font-heading text-[52px] sm:text-[72px] md:text-[88px] font-normal italic text-white leading-[1.0] max-w-[720px] mb-6">
            Timeless Interiors,<br />Designed Objects
          </h1>
          <p className="font-body text-[14px] font-light text-white/75 max-w-[480px] leading-[1.8] tracking-[0.04em]">
            Luxury interior design and artisanal éditions for the world&apos;s most discerning clientele. Based in Toronto and Miami.
          </p>
        </div>
      </header>

      {/* WOLFE EDITIONS */}
      <WolfeEditions />

      {/* DESIGN PRACTICE */}
      <section className="py-24 md:py-[100px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-16 md:mb-20">
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
                The Studio
              </span>
              <h2 className="font-heading text-[32px] md:text-[48px] lg:text-[52px] font-normal italic text-brand-dark leading-[1.1]">
                A Design Practice Defined by Precision and Intent
              </h2>
            </div>
            <div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Wolfe Interior Design represents the convergence of timeless European craftsmanship and contemporary design thinking. Founded with a singular vision to create interiors that transcend trends, our studio has become a trusted partner for thoughtfully designed residences and commercial spaces rooted in beauty, functionality, and enduring quality.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-8">
                Operating between Toronto and Miami, our all-female studio brings over two decades of experience crafting bespoke living environments for private clients, hospitality spaces, and developers across North America.
              </p>
              <Link
                href="/about"
                className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Project duo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            <div className="relative overflow-hidden group cursor-pointer">
              <div className="relative w-full group-hover:brightness-110 transition-all duration-500" style={{ aspectRatio: '4/3' }}>
                <Image src="/project-miami.jpg" alt="Muskoka Retreat" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-2">Residential — Muskoka, ON</div>
                <div className="font-heading text-[28px] font-normal text-white">Muskoka Retreat</div>
                <div className="font-body text-[13px] font-light text-white/70 mt-2 leading-[1.6]">A study in restraint set within a raw natural landscape — where architecture and interior move as one.</div>
              </div>
            </div>
            <div className="relative overflow-hidden group cursor-pointer">
              <div className="relative w-full group-hover:brightness-110 transition-all duration-500" style={{ aspectRatio: '4/3' }}>
                <Image src="/hero-about.jpg" alt="Kallea Residences" fill className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-2">Residential — Toronto, ON</div>
                <div className="font-heading text-[28px] font-normal text-white">Kallea Residences</div>
                <div className="font-body text-[13px] font-light text-white/70 mt-2 leading-[1.6]">Refined interiors for a landmark residential development balancing contemporary form with timeless material palettes.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORKS */}
      <section className="relative h-[520px] flex items-center justify-center">
        <Image src="/selected-works.png" alt="Selected Works" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center">
          <h2 className="font-heading text-[56px] sm:text-[80px] md:text-[100px] font-normal italic text-white leading-[1.0]">
            Selected Works
          </h2>
        </div>
      </section>

      {/* CLIENTELE */}
      <section className="py-24 md:py-[100px] bg-brand-light text-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
            Our Reach
          </span>
          <h2 className="font-heading text-[32px] md:text-[48px] font-normal text-brand-dark mb-5">
            A Discerning Global Clientele
          </h2>
          <p className="font-body text-[15px] font-light text-brand-muted max-w-[680px] mx-auto leading-[1.9] mb-16">
            Wolfe maintains a client roster grounded in discretion, precision, and long-term relationships. From private residences for public figures and athletes to boutique hospitality environments, each engagement reflects our commitment to exceptional outcomes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 border-t border-brand-border pt-14">
            {[
              { number: '20+', label: 'Years in Practice' },
              { number: '2,000+', label: 'Interiors Realized' },
              { number: '$900M+', label: 'Project Value Delivered' },
              { number: '4', label: 'Studio Locations' },
            ].map(({ number, label }) => (
              <div key={label} className="text-center">
                <div className="font-heading text-[44px] md:text-[48px] font-light text-brand-dark leading-[1]  mb-3">{number}</div>
                <div className="font-body text-[10px] font-medium tracking-[0.18em] uppercase text-brand-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IN DEVELOPMENT */}
      <section className="py-24 md:py-[100px] bg-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-3">
                Current Projects
              </span>
              <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-white">
                In Development
              </h2>
            </div>
            <Link
              href="/projects/residential"
              className="font-body text-[11px] font-medium tracking-[0.14em] uppercase text-white border border-white/60 px-7 py-3 hover:bg-white hover:text-[#1a1a1a] transition-colors whitespace-nowrap"
            >
              View All Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-[2px]">
            {/* Main project */}
            <div className="relative overflow-hidden group cursor-pointer min-h-[440px]">
              <Image src="/project-miami.jpg" alt="Miami Mansion" fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-8">
                <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-2">Miami, FL — 10,000 SQ FT</div>
                <div className="font-heading text-[32px] font-normal text-white">Miami Mansion</div>
                <Link href="/projects/residential" className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 mt-3 flex items-center gap-2 hover:text-white transition-colors">
                  View Project →
                </Link>
              </div>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-[2px]">
              <div className="relative overflow-hidden group cursor-pointer flex-1 min-h-[220px]">
                <Image src="/project-wellness.png" alt="Wellness Collective" fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">Toronto, ON</div>
                  <div className="font-heading text-[22px] font-normal text-white">Wellness Collective</div>
                </div>
              </div>
              <div className="relative overflow-hidden group cursor-pointer flex-1 min-h-[220px]">
                <Image src="/project-medspa.png" alt="Dr. Andrea Med Spa" fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-6">
                  <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">Toronto, ON</div>
                  <div className="font-heading text-[22px] font-normal text-white">Dr. Andrea Med Spa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="py-24 md:py-[100px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4 text-center">
            Press &amp; Media
          </span>
          <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark text-center mb-14">
            International Recognition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { pub: 'Architectural Digest', title: 'The New Icons of Luxury Design', date: 'March 2024 — Cover Story', img: '/recognition-1.jpg' },
              { pub: 'Elle Décor', title: 'European Craftsmanship Meets American Vision', date: 'January 2024', img: '/recognition-2.jpg' },
              { pub: 'Wallpaper*', title: 'Bespoke Excellence for the Global Elite', date: 'December 2023', img: '/recognition-3.jpg' },
            ].map((item) => (
              <div key={item.pub} className="bg-brand-light overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <Image src={item.img} alt={item.pub} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-2">{item.pub}</div>
                  <div className="font-heading text-[20px] font-normal text-brand-dark mb-2 leading-[1.3]">{item.title}</div>
                  <div className="font-body text-[11px] font-light text-brand-muted">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE ATELIER */}
      <section className="py-24 md:py-[100px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
                Our Locations
              </span>
              <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-2">
                The Atelier
              </h2>
              <div className="font-body text-[12px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-6">
                Toronto · Miami · Global
              </div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-4">
                Operating between Toronto and Miami, Wolfe maintains a distinctly North American perspective shaped by international influence. Our studio works in close collaboration with architects, developers, and a network of specialized artisans to deliver fully realized environments — from concept through execution.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-8">
                Each project is guided by material intelligence, proportion and scale, and a disciplined, human-centric design approach that places the client at the center of every decision.
              </p>
              <Link
                href="/about"
                className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors"
              >
                Meet the Studio
              </Link>
            </div>
            <div className="order-first md:order-last">
              <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                <Image src="/atelier.jpg" alt="The Atelier" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE STUDIO */}
      <section className="py-24 md:py-[100px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="order-first">
              <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
                <Image src="/studio.png" alt="The Studio" fill className="object-cover" />
              </div>
            </div>
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
                Design Forward
              </span>
              <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-2">
                The Studio
              </h2>
              <div className="font-body text-[12px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-6">
                Toronto · Miami · North America
              </div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-4">
                Our studio&apos;s approach to design is grounded in technical precision and artisanal excellence. Every project begins with a deep understanding of how our clients live — their routines, aspirations, and the environments that restore them.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-8">
                From the selection of natural stone to the custom specification of metalwork and joinery, every decision reflects our commitment to materials that improve with time and spaces that feel enduringly personal.
              </p>
              <Link
                href="/collections/all"
                className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors"
              >
                Explore Éditions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />

      <Footer />
    </>
  );
}
