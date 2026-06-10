import CartModal from "components/cart/modal";
import { WolfeLogo } from "components/shared/WolfeLogo";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

const FALLBACK_MENU: Menu[] = [
  { title: 'Projects', path: '/projects/residential' },
  { title: 'Shop', path: '/collections/all' },
  { title: 'Press', path: '/press' },
  { title: 'About', path: '/about' },
  { title: 'Journal', path: '/journal' },
  { title: 'Contact', path: '/contact' },
];

const LEFT_LINKS = ['Projects', 'Shop', 'Press'];
const RIGHT_LINKS = ['About', 'Journal', 'Contact'];

export async function Navbar() {
  let menu: Menu[] = [];
  try {
    menu = await getMenu("next-js-frontend-header-menu");
  } catch {
    menu = [];
  }

  const navLinks = menu.length > 0 ? menu : FALLBACK_MENU;
  const leftLinks = navLinks.filter(item => LEFT_LINKS.includes(item.title));
  const rightLinks = navLinks.filter(item => RIGHT_LINKS.includes(item.title));

  return (
    <nav className="flex items-center justify-between px-6 md:px-12 h-[72px] bg-[#1a1a1a] sticky top-0 z-50">
      {/* Mobile: hamburger */}
      <div className="flex md:hidden flex-1">
        <Suspense fallback={null}>
          <MobileMenu menu={navLinks} />
        </Suspense>
      </div>

      {/* Desktop left links */}
      <ul className="hidden md:flex items-center gap-8 flex-1">
        {leftLinks.map((item: Menu) => (
          <li key={item.title}>
            <Link
              href={item.path}
              prefetch={true}
              className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-brand-primary transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>

      {/* Center: Logo */}
      <Link href="/" prefetch={true} className="flex justify-center">
        <WolfeLogo color="white" />
      </Link>

      {/* Desktop right links + cart */}
      <ul className="hidden md:flex items-center gap-8 flex-1 justify-end">
        {rightLinks.map((item: Menu) => (
          <li key={item.title}>
            <Link
              href={item.path}
              prefetch={true}
              className="font-body text-[11px] font-medium tracking-[0.15em] uppercase text-white/80 hover:text-brand-primary transition-colors"
            >
              {item.title}
            </Link>
          </li>
        ))}
        <li className="flex items-center gap-4 ml-2">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>
          <CartModal />
        </li>
      </ul>

      {/* Mobile: logo + cart */}
      <div className="flex md:hidden items-center gap-3 flex-1 justify-end">
        <CartModal />
      </div>
    </nav>
  );
}
