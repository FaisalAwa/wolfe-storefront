import SortSelector from 'components/collection/SortSelector';
import { getCollectionProducts, getProducts } from 'lib/shopify';
import type { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

const SORT_MAP: Record<string, { sortKey: string; reverse: boolean }> = {
  'price-asc':  { sortKey: 'PRICE', reverse: false },
  'price-desc': { sortKey: 'PRICE', reverse: true },
  'newest':     { sortKey: 'CREATED_AT', reverse: true },
  'featured':   { sortKey: 'BEST_SELLING', reverse: false },
};

export default async function CollectionGrid({
  handle,
  sort,
}: {
  handle: string;
  sort?: string;
}) {
  const { sortKey, reverse } = SORT_MAP[sort ?? ''] ?? (SORT_MAP['featured'] as { sortKey: string; reverse: boolean });

  let products: Product[] = [];
  try {
    products =
      handle === 'all'
        ? await getProducts({ sortKey, reverse })
        : await getCollectionProducts({ collection: handle, sortKey, reverse });
  } catch {
    products = [];
  }

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-8">
        <span className="font-body text-[13px] font-light text-brand-muted">{products.length} pieces</span>
        <Suspense fallback={null}>
          <SortSelector current={sort} />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <p className="font-body text-[15px] font-light text-brand-muted py-16 text-center">No pieces found in this collection.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px]">
          {products.map((product) => (
            <Link
              key={product.handle}
              href={`/product/${product.handle}`}
              className="group"
            >
              <div className="relative overflow-hidden bg-brand-cream" style={{ aspectRatio: '3/4' }}>
                {product.featuredImage ? (
                  <Image
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ede9e3] via-[#d9d3ca] to-[#ede9e3]" />
                )}
                {!product.availableForSale && (
                  <span className="absolute top-4 left-4 bg-brand-dark text-white font-body text-[9px] font-medium uppercase tracking-[0.15em] px-3 py-1">
                    Sold Out
                  </span>
                )}
              </div>
              <div className="pt-5 pb-4">
                <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">
                  {product.tags[0] || 'Collection'}
                </div>
                <div className="font-heading text-[22px] font-normal text-brand-dark mb-1 leading-[1.2]">{product.title}</div>
                <div className="flex justify-between items-center">
                  <div className="font-body text-[12px] font-light text-brand-muted">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: product.priceRange.minVariantPrice.currencyCode,
                    }).format(Number(product.priceRange.minVariantPrice.amount))}
                  </div>
                  <span className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-brand-muted group-hover:text-brand-dark transition-colors">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
