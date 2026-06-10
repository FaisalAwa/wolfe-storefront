import { GridTileImage } from "components/grid/tile";
import CTASection from "components/shared/CTASection";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image, Product } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const FALLBACK_PRODUCT: Product = {
  id: 'fallback-belgravia-sofa',
  handle: 'belgravia-sofa',
  availableForSale: true,
  title: 'Belgravia Sofa',
  description: 'A study in restraint and proportion. The Belgravia Sofa is hand-upholstered in a deep forest bouclé with solid brass leg detailing — designed for the living room that refuses to compromise.',
  descriptionHtml: '<p>A study in restraint and proportion. The Belgravia Sofa is hand-upholstered in a deep forest bouclé with solid brass leg detailing — designed for the living room that refuses to compromise.</p>',
  options: [
    { id: 'opt-fabric', name: 'Fabric', values: ['Forest Bouclé', 'Ivory Linen', 'Charcoal Velvet'] },
    { id: 'opt-leg', name: 'Leg Finish', values: ['Aged Brass', 'Brushed Nickel', 'Matte Black'] },
  ],
  priceRange: {
    minVariantPrice: { amount: '12400.00', currencyCode: 'CAD' },
    maxVariantPrice: { amount: '14800.00', currencyCode: 'CAD' },
  },
  variants: [
    { id: 'v1', title: 'Forest Bouclé / Aged Brass', availableForSale: true, selectedOptions: [{ name: 'Fabric', value: 'Forest Bouclé' }, { name: 'Leg Finish', value: 'Aged Brass' }], price: { amount: '12400.00', currencyCode: 'CAD' } },
  ],
  featuredImage: { url: '/product-sofa.png', altText: 'Belgravia Sofa', width: 800, height: 1000 },
  images: [
    { url: '/product-sofa.png', altText: 'Belgravia Sofa — Front View', width: 800, height: 1000 },
    { url: '/product-sofa-2.png', altText: 'Belgravia Sofa — Side View', width: 800, height: 1000 },
    { url: '/product-sofa-3.png', altText: 'Belgravia Sofa — Detail', width: 800, height: 1000 },
    { url: '/product-sofa-4.png', altText: 'Belgravia Sofa — Arm Detail', width: 800, height: 1000 },
  ],
  seo: { title: 'Belgravia Sofa — Wolfe Éditions', description: 'Hand-upholstered bespoke sofa in forest bouclé with aged brass legs.' },
  tags: ['Seating', 'Living Room'],
  updatedAt: '2024-01-01T00:00:00Z',
};

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  let product: Product | undefined;
  try {
    product = (await getProduct(params.handle)) ?? undefined;
  } catch {
    product = FALLBACK_PRODUCT;
  }

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: { index: indexable, follow: indexable },
    },
    openGraph: url ? { images: [{ url, width, height, alt }] } : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  let product: Product | undefined;
  try {
    product = (await getProduct(params.handle)) ?? undefined;
  } catch {
    product = FALLBACK_PRODUCT;
  }

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="px-6 md:px-[60px] py-4 border-b border-brand-border bg-brand-light max-w-[1200px] mx-auto w-full">
        <Link
          href="/collections/all"
          className="font-body text-[11px] font-medium tracking-[0.12em] uppercase text-brand-muted hover:text-brand-dark transition-colors"
        >
          ← Éditions
        </Link>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16 bg-brand-light">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
            <Suspense fallback={
              <div className="w-full bg-gradient-to-br from-[#ede9e3] via-[#d9d3ca] to-[#ede9e3]" style={{ aspectRatio: '1' }} />
            }>
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
            <div className="pt-2">
              <Suspense fallback={null}>
                <ProductDescription product={product} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="py-16 md:py-[80px] bg-brand-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="text-center mb-12">
            <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-3">
              Complete the Collection
            </span>
            <h2 className="font-heading text-[36px] md:text-[48px] font-normal italic text-brand-dark">
              You May Also Like
            </h2>
          </div>
          <Suspense fallback={null}>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </section>

      <CTASection />
      <Footer />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  let relatedProducts: Awaited<ReturnType<typeof import('lib/shopify').getProductRecommendations>> = [];
  try {
    relatedProducts = await getProductRecommendations(id);
  } catch {
    relatedProducts = [];
  }

  if (!relatedProducts.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[2px]">
      {relatedProducts.slice(0, 3).map((product) => (
        <Link
          key={product.handle}
          href={`/product/${product.handle}`}
          className="group"
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <GridTileImage
              alt={product.title}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            />
          </div>
          <div className="pt-5 pb-2">
            <div className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary mb-1">
              {product.tags[0] || 'Collection'}
            </div>
            <div className="font-heading text-[24px] font-normal italic text-brand-dark mb-1">{product.title}</div>
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
  );
}
