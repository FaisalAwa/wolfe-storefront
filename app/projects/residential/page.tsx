import CTASection from 'components/shared/CTASection';
import Footer from 'components/layout/footer';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Residential Projects — Wolfe Interior Design',
  description: 'Luxury residential interior design projects by Wolfe Interior Design.',
};

const PROJECTS = [
  { name: 'Miami Mansion', location: 'Miami, FL', sqft: '10,000 SQ FT', type: 'Private Residence', year: '2024', img: '/res-project-1.png' },
  { name: 'Muskoka Retreat', location: 'Muskoka, ON', sqft: '6,200 SQ FT', type: 'Lakeside Villa', year: '2024', img: '/res-project-2.png' },
  { name: 'Kallea Residences', location: 'Toronto, ON', sqft: '3,400 SQ FT', type: 'Urban Penthouse', year: '2023', img: '/res-project-3.png' },
  { name: 'Forest Hill Manor', location: 'Toronto, ON', sqft: '8,500 SQ FT', type: 'Heritage Renovation', year: '2023', img: '/res-project-4.png' },
  { name: 'Bayshore Estate', location: 'Vancouver, BC', sqft: '5,800 SQ FT', type: 'New Build', year: '2022', img: '/res-project-5.png' },
  { name: 'Austin Hacienda', location: 'Austin, TX', sqft: '7,200 SQ FT', type: 'Private Residence', year: '2022', img: '/res-project-6.png' },
];

export default function ResidentialPage() {
  return (
    <>
      {/* Hero */}
      <header className="relative h-[540px] md:h-[620px] flex items-end pb-16 md:pb-20">
        <Image src="/hero-residential.jpg" alt="Residential Projects" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-[60px] w-full">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
            Portfolio
          </span>
          <h1 className="font-heading text-[52px] md:text-[80px] font-normal italic text-white leading-[1.0]">
            Residential
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
