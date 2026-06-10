import CollectionFilters from 'components/collection/CollectionFilters';
import CollectionGrid from 'components/collection/CollectionGrid';
import CTASection from 'components/shared/CTASection';
import Footer from 'components/layout/footer';
import { getCollection } from 'lib/shopify';
import Image from 'next/image';
import type { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await props.params;
  const collection = handle !== 'all' ? await getCollection(handle).catch(() => null) : null;

  return {
    title: collection?.title ?? 'Éditions — Wolfe',
    description: collection?.description ?? 'Bespoke furnishings for the world\'s most discerning clientele.',
  };
}

const ROOMS = [
  {
    name: 'Living Room',
    img: '/room-living.png',
    description: 'Refined gathering spaces that balance grandeur with intimacy. Our living room collections feature hand-selected sofas, sculptural occasional tables, and curated lighting to anchor any residence.',
    details: ['Bespoke upholstery', 'Natural stone and metal accents', 'Artisan lighting'],
  },
  {
    name: 'Kitchen & Dining',
    img: '/room-kitchen.jpg',
    description: 'Where material mastery meets daily ritual. Wolfe\'s kitchen and dining pieces are designed for those who demand beauty without compromise — from marble-topped dining tables to custom seating.',
    details: ['Natural stone surfaces', 'Custom cabinetry hardware', 'Bespoke dining seating'],
  },
  {
    name: 'Primary Suite',
    img: '/room-bedroom.png',
    description: 'The most personal room in the home deserves the most considered approach. Our primary suite collection emphasises restorative calm through layered textiles, quiet tones, and exceptional craftsmanship.',
    details: ['Upholstered bed frames', 'Bespoke nightstands', 'Curated textile collections'],
  },
];

const FINISHES = [
  { name: 'Arabesque Blanc', material: 'Calacatta Marble', img: '/finish-1.png' },
  { name: 'Smoked Walnut', material: 'Solid Hardwood', img: '/finish-2.png' },
  { name: 'Aged Brass', material: 'Hand-Patinated Metal', bg: '#b8952a' },
  { name: 'Marquina Noir', material: 'Spanish Marble', bg: '#1a1a1a' },
  { name: 'Bleached Oak', material: 'White Oak Veneer', bg: '#d4c4a0' },
  { name: 'Sage Bouclé', material: 'Italian Wool Blend', bg: '#8a9e85' },
];

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<{ sort?: string }>;
}) {
  const { handle } = await props.params;
  const { sort } = (await props.searchParams) ?? {};

  return (
    <>
      {/* Hero */}
      <header className="relative h-[540px] md:h-[620px] flex items-center justify-center">
        <Image src="/hero-shop.jpg" alt="Wolfe Éditions" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 mb-5">
            Bespoke Collection
          </span>
          <h1 className="font-heading text-[64px] md:text-[96px] lg:text-[112px] font-normal italic text-white leading-[1.0] mb-4">
            Éditions
          </h1>
          <p className="font-body text-[14px] font-light text-white/70 tracking-[0.04em]">
            Bespoke furnishings for the world&apos;s most discerning clientele.
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <div className="bg-brand-light border-b border-brand-border sticky top-[72px] z-40">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] py-5 flex items-center justify-between overflow-x-auto">
          <ul className="flex gap-6 md:gap-8 list-none whitespace-nowrap">
            {['All Pieces', 'Seating', 'Tables', 'Storage', 'Lighting', 'Décor'].map((tab, i) => (
              <li key={tab}>
                <button className={`font-body text-[11px] font-medium tracking-[0.15em] uppercase pb-1 border-b transition-colors ${
                  i === 0
                    ? 'text-brand-dark border-brand-dark'
                    : 'text-brand-muted border-transparent hover:text-brand-dark hover:border-brand-dark'
                }`}>
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-[1200px] mx-auto px-6 md:px-[60px] py-12 md:py-16 bg-brand-light min-h-[60vh]">
        <CollectionFilters activeHandle={handle} />
        <CollectionGrid handle={handle} sort={sort} />
      </div>

      {/* Room by Room */}
      <section className="py-16 md:py-[80px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-10 md:mb-16">
            Room by Room
          </h2>
          <div className="flex flex-col gap-16 md:gap-20">
            {ROOMS.map((room, i) => (
              <div
                key={room.name}
                className={`flex flex-col gap-8 md:gap-16 items-center ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="relative w-full md:w-[55%] shrink-0" style={{ aspectRatio: '4/3' }}>
                  <Image src={room.img} alt={room.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <span className="block font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-3">
                    The Collection
                  </span>
                  <h3 className="font-heading text-[28px] md:text-[36px] font-normal italic text-brand-dark leading-[1.1] mb-4">
                    {room.name}
                  </h3>
                  <p className="font-body text-[14px] font-light text-brand-muted leading-[1.9] mb-6">
                    {room.description}
                  </p>
                  <ul className="flex flex-col gap-2 mb-8">
                    {room.details.map((d) => (
                      <li key={d} className="flex items-center gap-3 font-body text-[12px] font-light text-brand-muted">
                        <span className="text-brand-primary">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <a href={`/collections/all?room=${room.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-8 py-3 hover:bg-brand-dark hover:text-white transition-colors">
                    Shop {room.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Finishes */}
      <section className="py-16 md:py-[80px] bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark">
              Curated Finishes
            </h2>
            <p className="font-body text-[13px] font-light text-brand-muted max-w-[420px]">
              Each Wolfe piece is available in an edited palette of natural materials — selected for their tactile quality, visual depth, and longevity.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px]">
            {FINISHES.map((finish) => (
              <div key={finish.name} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '1/1' }}>
                  {finish.img ? (
                    <Image src={finish.img} alt={finish.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full" style={{ backgroundColor: finish.bg }} />
                  )}
                </div>
                <div className="font-body text-[12px] font-medium text-brand-dark">{finish.name}</div>
                <div className="font-body text-[11px] font-light text-brand-muted">{finish.material}</div>
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
