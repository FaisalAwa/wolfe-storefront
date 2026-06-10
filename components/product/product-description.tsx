import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-brand-primary mb-3">
        Signature Collection
      </span>

      <h1 className="font-heading text-[36px] md:text-[52px] font-normal italic text-brand-dark leading-[1.1] mb-4">
        {product.title}
      </h1>

      {product.descriptionHtml ? (
        <Prose
          className="font-body text-[14px] font-light text-brand-muted leading-[1.9] mb-6"
          html={product.descriptionHtml}
        />
      ) : null}

      {/* Price */}
      <div className="flex items-baseline gap-4 mb-8 pb-8 border-b border-brand-border">
        <span className="font-heading text-[28px] font-normal text-brand-dark">
          <Price
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
          />
        </span>
        <span className="font-body text-[10px] font-medium tracking-[0.15em] uppercase text-brand-muted">
          Starting Price
        </span>
      </div>

      {/* Variant Selector */}
      <VariantSelector options={product.options} variants={product.variants} />

      {/* Add to Cart */}
      <div className="mt-6 mb-6">
        <AddToCart product={product} />
      </div>

      {/* Trust info */}
      <div className="border-t border-brand-border pt-6 flex flex-col gap-3">
        {[
          '12–16 week lead time · Handcrafted to order',
          'Fabric swatches available on request',
          'White-glove delivery and installation',
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="text-brand-primary text-[14px] flex-shrink-0">—</span>
            <span className="font-body text-[13px] font-light text-brand-muted">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}
