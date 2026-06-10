import CTASection from 'components/shared/CTASection';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — Wolfe Interior Design',
  description: 'A luxury interior design studio based in Toronto and Miami, creating bespoke residential and hospitality environments.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        <Image src="/hero-about.jpg" alt="Wolfe Interior Design Studio" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-[60px] pt-8 max-w-[640px]">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 mb-5">
            Wolfe Interior Design
          </span>
          <h1 className="font-heading text-[52px] md:text-[72px] lg:text-[88px] font-normal italic text-white leading-[1.0] mb-6">
            Designing<br />Thoughtful<br />Luxury
          </h1>
          <p className="font-body text-[14px] font-light text-white/75 leading-[1.9] max-w-[480px]">
            A luxury interior design studio based in Toronto and Miami, creating bespoke residential and hospitality environments alongside limited edition décor.
          </p>
        </div>
      </header>

      {/* European Influence */}
      <section className="py-24 md:py-[100px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20 mb-16">
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
                The Studio
              </span>
              <h2 className="font-heading text-[32px] md:text-[44px] font-normal italic text-brand-dark leading-[1.1]">
                Where European Influence Meets Contemporary Living
              </h2>
            </div>
            <div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Wolfe Interior Design represents the convergence of timeless European craftsmanship and contemporary design thinking. Founded with a singular vision to create interiors that transcend trends, our studio has become a trusted partner for thoughtfully designed residences and commercial spaces rooted in beauty, functionality, and enduring quality.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Based in Toronto with a second atelier in Austin, Miami, Los Angeles, New York, and beyond — Wolfe Interior Design is an all-female interior design studio with over two decades of experience crafting living interiors for private clients, hospitality spaces, and developers.
              </p>
              <blockquote className="font-heading text-[20px] md:text-[24px] font-light italic text-brand-dark leading-[1.5] border-l-2 border-brand-primary pl-8 my-10">
                &ldquo;We believe exceptional interiors should not only be beautiful, but also connected to how people live, gather, move, and experience their everyday environment.&rdquo;
              </blockquote>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Influenced by European lifestyle and design culture, our studio specializes in high-end residential interiors, full scale renovations, new construction, and boutique commercial spaces. We create environments that balance sophistication with warmth — layering natural stone, handcrafted metals, thoughtful layouts, and refined materiality.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9]">
                Supported by a collaborative network of artisans, fabricators, and trades across North America and Europe, Wolfe Interior Design brings together creative vision and technical expertise to deliver interiors defined by authenticity, longevity, and unrestrained luxury.
              </p>
            </div>
          </div>

          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
              <Image src="/about-interior-1.jpg" alt="Interior materials" fill className="object-cover" />
            </div>
            <div className="relative w-full md:mt-14" style={{ aspectRatio: '3/4' }}>
              <Image src="/about-interior-2.png" alt="Design studio" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Jessica Neilas */}
      <section className="py-24 md:py-[100px] bg-[#1a1a1a]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <div className="order-first md:order-first">
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <Image src="/about-founder.png" alt="Jessica Neilas" fill className="object-cover object-top" />
              </div>
            </div>
            <div className="pt-0 md:pt-10">
              <span className="block font-body text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 mb-4">
                Founder &amp; Creative Director
              </span>
              <h2 className="font-heading text-[40px] md:text-[56px] font-normal italic text-white mb-2 leading-[1.1]">
                Jessica Neilas
              </h2>
              <span className="block font-body text-[11px] font-medium tracking-[0.15em] uppercase text-brand-primary mb-8">
                Founder &amp; Creative Director
              </span>
              <p className="font-body text-[15px] font-light text-white/75 leading-[1.9] mb-5">
                Jessica Neilas is the Founder and Creative Director of Wolfe Interior Design, bringing over two decades of experience in luxury residential, commercial, hospitality, and high-performance interior design across North America.
              </p>
              <p className="font-body text-[15px] font-light text-white/75 leading-[1.9] mb-5">
                Known for her highly refined architectural and technically driven approach, Jessica approaches each project with a balance of creative intent, architectural understanding, and thoughtful functionality. Her work is recognized for superlative material palette, European influence, and tailored spatial planning.
              </p>
              <p className="font-body text-[15px] font-light text-white/75 leading-[1.9] mb-5">
                Throughout her career, Jessica has designed and overseen projects spanning Toronto, Miami, Austin, Los Angeles, New York, and beyond — collaborating with private clients, developers, architects, and builders on full-scale renovations, custom homes, boutique hospitality spaces, and wellness-oriented environments.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {[
                  'As featured in Elle Décor, 2020, 2021, 2024',
                  'Elle Décor in Contemporary Design',
                  'Design Award for Residential Excellence',
                ].map((cred) => (
                  <div key={cred} className="flex items-start gap-3 font-body text-[13px] font-light text-white/60">
                    <span className="text-brand-primary flex-shrink-0">—</span>
                    {cred}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Big Quote */}
      <section className="py-20 md:py-[100px] bg-brand-cream text-center">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <blockquote className="font-heading text-[24px] md:text-[36px] lg:text-[40px] font-normal italic text-brand-dark leading-[1.4] max-w-[900px] mx-auto mb-6">
            &ldquo;Our approach to design begins with understanding — creating interiors that feel refined, personal, and lasting.&rdquo;
          </blockquote>
          <cite className="font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary not-italic">
            Jessica Neilas, Founder &amp; Creative Director
          </cite>
        </div>
      </section>

      {/* Wellness Design */}
      <section className="py-24 md:py-[100px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div>
              <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
                Design Forward
              </span>
              <h2 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] font-normal italic text-brand-dark leading-[1.1]">
                Human-Centric<br />Wellness Design
              </h2>
            </div>
            <div>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                At Wolfe Interior Design, wellness is approached not as an aesthetic trend, but as an integral part of how environments should be designed and experienced.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Guided by human-centric and evidence-based design principles, our work considers the direct relationship between interior environments, emotional wellbeing, physical health, and everyday experience. Our studio believes thoughtful interior design has the ability to positively influence stress, focus, rest, social connection, and the longevity of living.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9] mb-5">
                Through the lens of environmental psychology and biophilic design, we carefully consider how elements such as natural light, spatial flow, acoustics, materiality, color theory, air quality, and ease of habitual connectivity condition more restorative living environments.
              </p>
              <p className="font-body text-[15px] font-light text-brand-muted leading-[1.9]">
                Our goal is to create spaces that not only feel refined and timeless, but that actively enhance the physical, emotional, and psychological wellbeing of those who experience them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
