import { getProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

export default async function WolfeEditions() {
  let products: Product[] = [];
  try {
    products = await getProducts({ sortKey: 'BEST_SELLING', reverse: false });
  } catch {
    products = [];
  }
  const featured = products.slice(0, 3);

  const placeholders = [
    { category: 'Seating', name: 'Milano Lounge Chair', material: 'Italian velvet, walnut frame' },
    { category: 'Tables', name: 'Precursor Dining Table', material: 'Carrara marble, brass base' },
    { category: 'Lighting', name: 'Lumière Floor Lamp', material: 'Brass, marble base' },
  ];

  return (
    <section className="py-24 md:py-[100px] bg-brand-light">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
        <div className="text-center mb-14">
          <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-4">
            Curated Collection
          </span>
          <h2 className="font-heading text-[36px] md:text-[48px] font-normal text-brand-dark mb-4">
            Wolfe Éditions
          </h2>
          <p className="font-body text-[15px] font-light text-brand-muted max-w-[560px] mx-auto leading-[1.8]">
            Bespoke furnishings and limited editions for the most discerning collectors worldwide. Handcrafted in partnership with master artisans across Europe and North America.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px] mb-12">
          {featured.length > 0
            ? featured.map((product) => (
                <Link
                  key={product.handle}
                  href={`/product/${product.handle}`}
                  className="group"
                >
                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText || product.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ede9e3] via-[#d9d3ca] to-[#ede9e3]" />
                    )}
                  </div>
                  <div className="pt-5 pb-2">
                    <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">
                      {product.tags[0] || 'Collection'}
                    </div>
                    <div className="font-heading text-[20px] font-normal text-brand-dark mb-1">{product.title}</div>
                    <div className="font-body text-[12px] font-light text-brand-muted">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: product.priceRange.minVariantPrice.currencyCode,
                      }).format(Number(product.priceRange.minVariantPrice.amount))}
                    </div>
                  </div>
                </Link>
              ))
            : placeholders.map((item) => (
                <div key={item.name} className="group cursor-pointer">
                  <div
                    className="relative overflow-hidden bg-gradient-to-br from-[#ede9e3] via-[#d9d3ca] to-[#ede9e3] group-hover:brightness-95 transition-all duration-500"
                    style={{ aspectRatio: '3/4' }}
                  />
                  <div className="pt-5 pb-2">
                    <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">
                      {item.category}
                    </div>
                    <div className="font-heading text-[20px] font-normal text-brand-dark mb-1">{item.name}</div>
                    <div className="font-body text-[12px] font-light text-brand-muted mb-2">{item.material}</div>
                    <div className="font-body text-[12px] text-brand-dark">Upon Request</div>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center">
          <Link
            href="/collections/all"
            className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-brand-dark border border-brand-dark px-10 py-4 hover:bg-brand-dark hover:text-white transition-colors"
          >
            View All Éditions
          </Link>
        </div>
      </div>
    </section>
  );
}
