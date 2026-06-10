import { getCollections } from 'lib/shopify';
import type { Collection } from 'lib/shopify/types';
import Link from 'next/link';

export default async function CollectionFilters({ activeHandle }: { activeHandle?: string }) {
  let collections: Collection[] = [];
  try {
    collections = await getCollections();
  } catch {
    collections = [];
  }

  return (
    <aside className="w-full md:w-[220px] md:flex-shrink-0">
      <h3 className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-brand-muted mb-5">
        Collections
      </h3>
      <ul className="flex flex-wrap gap-2 md:flex-col md:gap-0 md:space-y-1">
        <li>
          <Link
            href="/collections/all"
            className={`block font-body text-[13px] font-light py-2 px-3 transition-colors ${
              activeHandle === 'all' || !activeHandle
                ? 'bg-brand-dark text-white'
                : 'text-brand-muted hover:text-brand-dark hover:bg-brand-cream'
            }`}
          >
            All Pieces
          </Link>
        </li>
        {collections
          .filter((c) => c.handle !== 'all')
          .map((col: Collection) => (
            <li key={col.handle}>
              <Link
                href={`/collections/${col.handle}`}
                className={`block font-body text-[13px] font-light py-2 px-3 transition-colors ${
                  activeHandle === col.handle
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-muted hover:text-brand-dark hover:bg-brand-cream'
                }`}
              >
                {col.title}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
}
