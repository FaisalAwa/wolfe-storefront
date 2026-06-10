import CTASection from 'components/shared/CTASection';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press — Wolfe Interior Design',
  description: 'International press coverage and recognition for Wolfe Interior Design.',
};

const PRESS_ITEMS = [
  { pub: 'Architectural Digest', title: 'The New Icons of Luxury Design', desc: 'Wolfe Interior Design\'s signature residential project in Toronto earns global recognition for its mastery of material and restraint.', date: 'March 2024', badge: 'Cover Story', img: '/press-article-1.jpg' },
  { pub: 'Elle Décor', title: 'European Craftsmanship Meets American Vision', desc: 'Inside the studio that is redefining luxury residential design in North America.', date: 'January 2024', badge: null, img: '/press-article-2.jpg' },
  { pub: 'Wallpaper*', title: 'Bespoke Excellence for the Global Elite', desc: 'How Wolfe has built a reputation for client discretion and uncompromising material quality.', date: 'December 2023', badge: null, img: '/press-article-3.jpg' },
  { pub: 'Azure Magazine', title: 'The Art of Restraint', desc: 'A study in how Wolfe Interior Design strips away excess to reveal the essential beauty of a space.', date: 'November 2023', badge: null, img: '/press-article-4.jpg' },
  { pub: 'House & Home', title: 'Canada\'s Most Influential Interior Studios', desc: 'Wolfe named among the top five interior design practices shaping the Canadian luxury market.', date: 'September 2023', badge: 'Award', img: '/press-article-5.jpg' },
  { pub: 'The Globe and Mail', title: 'Designing the New Canadian Luxury', desc: 'Jessica Neilas on building a global reputation from a Toronto address.', date: 'August 2023', badge: null, img: '/press-article-6.jpg' },
  { pub: 'Interior Design', title: 'Wellness at the Core', desc: 'How Wolfe\'s human-centric approach is transforming how we think about luxury living.', date: 'June 2023', badge: null, img: '/press-article-7.jpg' },
  { pub: 'Toronto Life', title: 'The Designer\'s Designer', desc: 'Why architects and developers trust Wolfe with their most complex and prestigious projects.', date: 'April 2023', badge: null, img: '/press-article-8.jpg' },
  { pub: 'Condé Nast Traveler', title: 'Boutique Hospitality Reimagined', desc: 'Wolfe\'s commercial interiors division is setting a new standard for intimate hospitality experiences.', date: 'March 2023', badge: null, img: '/press-article-9.jpg' },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[560px] md:h-[640px] flex items-center justify-center">
        <Image src="/hero-press.jpg" alt="Wolfe Press" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 mb-5">
            Press &amp; Publications
          </span>
          <h1 className="font-heading text-[72px] md:text-[100px] lg:text-[108px] font-normal italic text-white leading-[1.0]">
            Press
          </h1>
        </div>
      </header>

      {/* Intro */}
      <section className="py-20 md:py-[80px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-20">
            <div>
              <h2 className="font-heading text-[28px] md:text-[36px] font-normal text-brand-dark leading-[1.2]">
                International Recognition &amp; Media Coverage
              </h2>
            </div>
            <div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-4">
                Wolfe Interior Design has been recognized by leading publications across North America and Europe for its distinctive approach to luxury residential and commercial design.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9]">
                From cover stories in Architectural Digest to features in Elle Décor and Wallpaper*, our studio&apos;s work is consistently acknowledged for its technical mastery, material intelligence, and human-centered philosophy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Highlights */}
      <section className="py-16 md:py-[80px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-10">
            Recent Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-[2px]">
            {/* Main highlight */}
            <div className="relative overflow-hidden group cursor-pointer">
              <div className="relative w-full group-hover:brightness-110 transition-all duration-500" style={{ aspectRatio: '4/5' }}>
                <Image src="/press-feat-1.jpg" alt="Architectural Digest feature" fill className="object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 to-transparent">
                <span className="inline-block font-body text-[9px] font-medium tracking-[0.2em] uppercase bg-brand-primary text-[#1a1a1a] px-3 py-1 mb-3">
                  Architectural Digest
                </span>
                <h3 className="font-heading text-[28px] md:text-[36px] font-normal text-white leading-[1.2] mb-2">
                  The New Icons of Luxury Design
                </h3>
                <span className="font-body text-[11px] font-medium tracking-[0.1em] uppercase text-white/60">
                  March 2024 — Cover Story
                </span>
              </div>
            </div>
            {/* Right column */}
            <div className="flex flex-col gap-[2px]">
              {[
                { pub: 'Elle Décor', title: 'European Craftsmanship Meets American Vision', date: 'January 2024', img: '/press-feat-2.jpg' },
                { pub: 'Wallpaper*', title: 'Bespoke Excellence for the Global Elite', date: 'December 2023', img: '/press-feat-3.jpg' },
              ].map((item) => (
                <div key={item.pub} className="relative overflow-hidden group cursor-pointer flex-1 min-h-[200px]">
                  <Image src={item.img} alt={item.pub} fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/85 to-transparent">
                    <span className="block font-body text-[9px] font-medium tracking-[0.15em] uppercase text-brand-primary mb-1">{item.pub}</span>
                    <h3 className="font-heading text-[22px] font-normal text-white leading-[1.2] mb-1">{item.title}</h3>
                    <span className="font-body text-[10px] font-medium tracking-[0.1em] uppercase text-white/60">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Press Grid */}
      <section className="py-16 md:py-[80px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-2">
            All Coverage
          </h2>
          <p className="font-body text-[14px] font-light text-brand-muted mb-10">
            A selection of international media features, awards, and publications.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {PRESS_ITEMS.map((item) => (
              <div key={`${item.pub}-${item.title}`} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-5" style={{ aspectRatio: '4/3' }}>
                  <Image src={item.img} alt={item.pub} fill className="object-cover group-hover:brightness-95 transition-all duration-500" />
                  {item.badge && (
                    <span className={`absolute top-3 left-3 font-body text-[9px] font-medium tracking-[0.15em] uppercase px-3 py-1 ${
                      item.badge === 'Award'
                        ? 'bg-brand-primary text-[#1a1a1a]'
                        : 'bg-brand-dark text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-2">{item.pub}</div>
                <h3 className="font-heading text-[22px] font-normal text-brand-dark leading-[1.2] mb-2">{item.title}</h3>
                <p className="font-body text-[13px] font-light text-brand-muted leading-[1.7] mb-3">{item.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-body text-[10px] font-medium tracking-[0.12em] uppercase text-brand-muted">{item.date}</span>
                  <span className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-brand-primary group-hover:text-brand-dark transition-colors">Read →</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center pt-12">
            <p className="font-body text-[13px] font-light text-brand-muted mb-1">Showing 9 of 24 features</p>
            <button className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors mt-4">
              Load More
            </button>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
