import CTASection from 'components/shared/CTASection';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Projects — Wolfe Interior Design',
  description: 'Luxury commercial interior design projects by Wolfe Interior Design.',
};

const PROJECTS = [
  { name: 'Wellness Collective', location: 'Toronto, ON', type: 'Wellness Centre', sqft: '4,200 SQ FT', year: '2024', img: '/com-project-1.png' },
  { name: 'Dr. Andrea Med Spa', location: 'Toronto, ON', type: 'Medical Spa', sqft: '2,800 SQ FT', year: '2024', img: '/com-project-2.png' },
  { name: 'The Pemberton Hotel', location: 'Miami, FL', type: 'Boutique Hotel', sqft: '18,000 SQ FT', year: '2023', img: '/com-project-3.png' },
  { name: 'Salon Venti', location: 'Toronto, ON', type: 'Beauty Salon', sqft: '1,600 SQ FT', year: '2023', img: '/com-project-4.png' },
  { name: 'Capital Health Clinic', location: 'Ottawa, ON', type: 'Medical Office', sqft: '3,100 SQ FT', year: '2022', img: '/com-project-5.png' },
  { name: 'Apex Fitness Studio', location: 'Miami, FL', type: 'Fitness Studio', sqft: '5,400 SQ FT', year: '2022', img: '/com-project-6.png' },
];

export default function CommercialPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[540px] md:h-[620px] flex items-end pb-16 md:pb-20">
        <Image src="/hero-commercial.jpg" alt="Commercial Projects" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-[60px] w-full">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
            Portfolio
          </span>
          <h1 className="font-heading text-[52px] md:text-[80px] font-normal italic text-white leading-[1.0]">
            Commercial
          </h1>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-16 md:py-[80px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {PROJECTS.map((project) => (
              <div key={project.name} className="group cursor-pointer relative overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
                  <Image src={project.img} alt={project.name} fill className="object-cover group-hover:brightness-110 transition-all duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">
                    {project.type} — {project.location}
                  </div>
                  <div className="font-heading text-[28px] md:text-[32px] font-normal text-white mb-1">
                    {project.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-[12px] font-light text-white/60">{project.sqft} · {project.year}</span>
                    <span className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-white/50 group-hover:text-white transition-colors">
                      View Project →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}
