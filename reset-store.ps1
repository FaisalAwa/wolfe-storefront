<#
  reset-store.ps1
  ----------------------------------------------------------------------------
  Purpose: Reset this storefront repo to a CLEAN, no-client state BEFORE you
           start a new client. Run this ONCE before /new-client.

  What it does:
    1. DELETES all previous-client content:
         components/home/   (all Hero/section components)
         app/about/         (about page)
         public/*           (all client images)
         claude-input/*     (HTML + design.md + screenshots)
         .env.local         (old Shopify token)
         .next/ .netlify/ tsconfig.tsbuildinfo  (build caches)
    2. RESETS the shared shell files to a neutral, buildable baseline:
         app/page.tsx, app/collections/[handle]/page.tsx,
         app/product/[handle]/page.tsx, navbar, footer, globals.css
    3. RESETS state files: project-registry.json, session-handoff.md

  What it NEVER touches (the reusable engine):
    lib/, .claude/skills/, package.json, configs, boilerplate components.

  Usage (from the project root):
    powershell -ExecutionPolicy Bypass -File .\reset-store.ps1
  or just:
    .\reset-store.ps1
#>

$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }

# --- Safety check: make sure we're at a storefront root ---------------------
if (-not (Test-Path (Join-Path $root 'package.json')) -or -not (Test-Path (Join-Path $root 'lib\shopify'))) {
  Write-Host "ERROR: This folder doesn't look like the storefront root" -ForegroundColor Red
  Write-Host "       (missing package.json or lib\shopify). cd into the project and retry." -ForegroundColor Red
  exit 1
}

# Write UTF-8 without BOM so Next.js / tsc read files cleanly
function Write-File([string]$relPath, [string]$content) {
  $full = Join-Path $root $relPath
  $dir  = Split-Path $full -Parent
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force $dir | Out-Null }
  [System.IO.File]::WriteAllText($full, $content, (New-Object System.Text.UTF8Encoding($false)))
  Write-Host "  reset    $relPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "Resetting storefront to clean no-client state..." -ForegroundColor Cyan
Write-Host ""

# === 1) DELETE previous-client folders / files ==============================
$toDelete = @(
  'components\home',
  'app\about',
  '.next',
  '.netlify',
  '.env.local',
  'tsconfig.tsbuildinfo'
)
foreach ($rel in $toDelete) {
  $p = Join-Path $root $rel
  if (Test-Path $p) {
    Remove-Item $p -Recurse -Force
    Write-Host "  deleted  $rel" -ForegroundColor DarkYellow
  }
}

# === 2) WIPE per-client input + images (keep empty folders) =================
foreach ($dir in @('claude-input','public')) {
  $p = Join-Path $root $dir
  if (Test-Path $p) {
    Get-ChildItem $p -Force | Remove-Item -Recurse -Force
  } else {
    New-Item -ItemType Directory -Force $p | Out-Null
  }
  $keep = Join-Path $p '.gitkeep'
  if (-not (Test-Path $keep)) { New-Item -ItemType File $keep | Out-Null }
  Write-Host "  wiped    $dir\ (kept empty folder)" -ForegroundColor DarkYellow
}

# === 3) RESET shared shell files to clean baseline ==========================

Write-File 'app\page.tsx' @'
import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import type { Metadata } from 'next';

// Home pulls live products/collections from Shopify at request time, so it must
// not be statically prerendered at build (real credentials may not be set yet).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  description: 'High-performance ecommerce storefront built with Next.js and Shopify.',
  openGraph: { type: 'website' },
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
'@

Write-File 'app\collections\[handle]\page.tsx' @'
import CollectionFilters from 'components/collection/CollectionFilters';
import CollectionGrid from 'components/collection/CollectionGrid';
import CollectionHeader from 'components/collection/CollectionHeader';
import Footer from 'components/layout/footer';
import { getCollection } from 'lib/shopify';
import type { Metadata } from 'next';

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await props.params;
  const collection = handle !== 'all' ? await getCollection(handle).catch(() => null) : null;

  return {
    title: collection?.title ?? 'All Products',
    description: collection?.description ?? 'Browse our product collection.',
  };
}

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
  searchParams?: Promise<{ sort?: string }>;
}) {
  const { handle } = await props.params;
  const { sort } = (await props.searchParams) ?? {};

  const collection = handle !== 'all' ? await getCollection(handle).catch(() => null) : null;

  const title = collection?.title ?? (handle === 'all' ? 'All Products' : handle.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  const description = collection?.description ?? 'Browse our products.';

  return (
    <>
      <CollectionHeader title={title} description={description} />
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 px-5 md:px-[80px] py-10 md:py-[60px] bg-brand-dark min-h-screen">
        <CollectionFilters activeHandle={handle} />
        <CollectionGrid handle={handle} sort={sort} />
      </div>
      <Footer />
    </>
  );
}
'@

Write-File 'app\product\[handle]\page.tsx' @'
import { GridTileImage } from "components/grid/tile";
import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductDescription } from "components/product/product-description";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProductRecommendations } from "lib/shopify";
import type { Image } from "lib/shopify/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

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
  const product = await getProduct(params.handle);

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

      {/* Back link */}
      <div className="px-5 md:px-[80px] py-4 border-b border-[#2A2A2A] bg-brand-dark">
        <Link href="/collections/all" className="font-body text-[12px] font-medium uppercase tracking-[1px] text-[#9A9A9A] hover:text-white transition-colors flex items-center gap-2">
          ← Back to Collection
        </Link>
      </div>

      {/* Product Detail */}
      <section className="bg-brand-dark py-10 md:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <Suspense fallback={<div className="w-full aspect-square bg-[#141414] border border-[#2A2A2A]" />}>
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

      {/* You Might Also Like */}
      <section className="bg-[#0A0A0A] border-t border-[#2A2A2A] py-12 md:py-[64px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[80px]">
          <h2 className="font-heading text-[32px] md:text-[36px] uppercase text-white text-center mb-10" style={{ textShadow: 'none' }}>YOU MIGHT ALSO LIKE</h2>
          <Suspense fallback={null}>
            <RelatedProducts id={product.id} />
          </Suspense>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0A0A0A] border-t border-b border-[rgba(255,255,255,0.2)] py-12 md:py-[80px] text-center">
        <div className="max-w-[896px] mx-auto px-5">
          <h2 className="font-heading text-[32px] md:text-[36px] uppercase text-white mb-4" style={{ textShadow: 'none' }}>STAY IN THE LOOP</h2>
          <p className="font-sub font-light text-[17px] text-brand-muted mb-8">Get exclusive access to new drops, special offers, and insider updates.</p>
          <form className="flex max-w-[576px] mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-2 border-r-0 border-[rgba(255,255,255,0.3)] bg-transparent outline-none px-6 py-4 font-sub text-[15px] text-white placeholder:text-brand-muted"
            />
            <button
              type="submit"
              className="border-2 border-brand-primary bg-transparent text-brand-primary font-sub font-bold text-[13px] uppercase tracking-[2px] px-7 py-4 hover:bg-brand-primary hover:text-black transition-colors whitespace-nowrap"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

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
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.slice(0, 4).map((product) => (
        <li key={product.handle}>
          <Link
            className="block border-2 border-[rgba(255,255,255,0.2)] bg-gradient-to-b from-[#0A0A0A] to-black group hover:border-brand-primary transition-colors"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <div className="aspect-square overflow-hidden relative">
              <GridTileImage
                alt={product.title}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-sub font-light text-[16px] text-white mb-1">{product.title}</h3>
              <p className="font-sub font-light text-[18px] text-white">
                ${parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
'@

Write-File 'components\layout\navbar\index.tsx' @'
import CartModal from "components/cart/modal";
import { getCollections, getMenu } from "lib/shopify";
import { Collection, Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const SITE_NAME = process.env.SITE_NAME || 'Storefront';

const FALLBACK_MENU: Menu[] = [
  { title: 'Shop', path: '/collections/all' },
  { title: 'About', path: '/about' },
];

export async function Navbar() {
  let menu: Menu[] = [];
  let collections: Collection[] = [];

  try {
    menu = await getMenu("next-js-frontend-header-menu");
  } catch {
    menu = [];
  }

  try {
    collections = await getCollections();
  } catch {
    collections = [];
  }

  const navLinks = menu.length > 0 ? menu : FALLBACK_MENU;

  return (
    <nav className="flex items-center justify-between px-5 md:px-[60px] h-[70px] border-b border-[#2A2A2A] bg-black sticky top-0 z-50">
      <div className="block flex-none md:hidden">
        <Suspense fallback={null}>
          <MobileMenu menu={navLinks} />
        </Suspense>
      </div>
      <Link href="/" prefetch={true} className="flex items-center gap-3">
        <span className="font-heading text-[22px] md:text-[26px] tracking-[0.18em] text-white uppercase">
          {SITE_NAME}
        </span>
      </Link>
      <ul className="hidden gap-9 md:flex md:items-center">
        {navLinks.filter(item => item.title !== 'Cart').map((item: Menu) => (
          <li key={item.title}>
            <Link
              href={item.path}
              prefetch={true}
              className="font-body text-[13px] font-medium tracking-[1px] text-white hover:text-brand-primary transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
        {collections.length > 0 && (
          <li className="relative group">
            <span className="font-body text-[13px] font-medium tracking-[1px] text-white hover:text-brand-primary transition-colors cursor-pointer">
              Collections ▾
            </span>
            <ul className="absolute left-0 top-full mt-2 w-52 bg-[#111111] border border-[#2A2A2A] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              <li>
                <Link href="/collections/all" className="block px-5 py-3 font-body text-[13px] text-[#9A9A9A] hover:text-brand-primary hover:bg-[#1A1A1A] transition-colors">
                  All Products
                </Link>
              </li>
              {collections.filter(c => c.handle !== 'all').map((col) => (
                <li key={col.handle}>
                  <Link href={`/collections/${col.handle}`} className="block px-5 py-3 font-body text-[13px] text-[#9A9A9A] hover:text-brand-primary hover:bg-[#1A1A1A] transition-colors">
                    {col.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <div className="flex items-center gap-5">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
        <CartModal />
      </div>
    </nav>
  );
}
'@

Write-File 'components\layout\footer.tsx' @'
import Link from 'next/link';

const SITE_NAME = process.env.SITE_NAME || 'Storefront';

const MENU_LINKS = [
  { label: 'All Products', href: '/collections/all' },
  { label: 'About', href: '/about' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/pages/contact' },
  { label: 'Returns & Exchange', href: '/pages/returns-exchange' },
  { label: 'Terms of Service', href: '/pages/terms-of-service' },
  { label: 'Privacy Policy', href: '/pages/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-brand-border pt-14 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 md:px-[64px]">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-8 md:gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <span className="font-heading text-[22px] tracking-[0.18em] text-white uppercase">
                {SITE_NAME}
              </span>
            </Link>
            <p className="font-body text-[14px] text-brand-muted leading-[1.7] max-w-[280px]">
              A modern storefront built with Next.js and Shopify.
            </p>
          </div>
          <div>
            <h4 className="font-heading text-[14px] text-white tracking-[2px] uppercase mb-5">Menu</h4>
            <ul className="flex flex-col gap-3">
              {MENU_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-[13px] text-brand-muted hover:text-brand-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-[14px] text-white tracking-[2px] uppercase mb-5">Support</h4>
            <ul className="flex flex-col gap-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-[13px] text-brand-muted hover:text-brand-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-[12px] text-brand-muted">© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
'@

Write-File 'app\globals.css' @'
@import "tailwindcss";

@theme {
  --color-brand-primary: #2563EB;
  --color-brand-secondary: #1D4ED8;
  --color-brand-dark: #0A0A0A;
  --color-brand-bg-secondary: #111111;
  --color-brand-bg-tertiary: #1A1A1A;
  --color-brand-border: #2A2A2A;
  --color-brand-card: #111827;
  --color-brand-muted: #9CA3AF;
  --color-brand-faint: #6B7280;
  --color-star: #FBBF24;

  --font-heading: var(--font-bebas), 'Bebas Neue', sans-serif;
  --font-sub: var(--font-montserrat), 'Montserrat', sans-serif;
  --font-body: var(--font-worksans), 'Work Sans', sans-serif;
}

@plugin "@tailwindcss/container-queries";
@plugin "@tailwindcss/typography";

@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-brand-border, currentColor);
  }

  body {
    background-color: #0A0A0A;
    color: #FFFFFF;
  }
}

@supports (font: -apple-system-body) and (-webkit-appearance: none) {
  img[loading="lazy"] {
    clip-path: inset(0.6px);
  }
}

a,
input,
button {
  @apply focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2;
}
'@

# === 4) RESET state files ===================================================

Write-File 'project-registry.json' @'
{
  "client": "",
  "store_handle": "",
  "shopify_api_version": "2024-07",
  "shopify_pending": true,
  "session1_complete": false,
  "session2_complete": false,
  "pages_expected": [],
  "pages_done": [],
  "pages_remaining": [],
  "typescript_clean": false,
  "images_verified": false,
  "github_repo": null,
  "netlify_url": null
}
'@

Write-File 'session-handoff.md' @'
# Session Handoff

## Status
- Session 1: NOT STARTED
- Session 2: NOT STARTED

## Notes
- Fresh repo — no client initialized yet.
- Run /new-client [name] [store-handle.myshopify.com] to begin.
'@

Write-Host ""
Write-Host "Done. Repo is clean and ready for a new client." -ForegroundColor Cyan
Write-Host "Next: run /new-client [name] [store-handle.myshopify.com]" -ForegroundColor Cyan
Write-Host ""
