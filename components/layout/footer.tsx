import { WolfeLogo } from 'components/shared/WolfeLogo';
import Link from 'next/link';

const EXPLORE_LINKS = [
  { label: 'Interiors', href: '/interiors' },
  { label: 'Éditions', href: '/collections/all' },
  { label: 'Portfolio', href: '/projects/residential' },
  { label: 'Press', href: '/press' },
  { label: 'Journal', href: '/journal' },
  { label: 'The Atelier', href: '/about' },
];

const SERVICES_LINKS = [
  { label: 'Residential Design', href: '/projects/residential' },
  { label: 'Commercial Interiors', href: '/projects/commercial' },
  { label: 'Bespoke Furniture', href: '/collections/all' },
  { label: 'Art Curation', href: '/art-curation' },
  { label: 'Project Management', href: '/services' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 md:pt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-8 md:gap-12 pb-12 md:pb-16 border-b border-white/10">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <WolfeLogo color="white" />
            </Link>
            <p className="font-body text-[13px] font-light text-white/60 leading-[1.7] mb-6 max-w-[240px]">
              Bespoke interiors and artisanal éditions for the world&apos;s most discerning clientele.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4.5"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                </svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/60 hover:border-brand-primary hover:text-brand-primary transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Explore</h4>
            <ul className="flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-[13px] font-light text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Services</h4>
            <ul className="flex flex-col gap-3">
              {SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="font-body text-[13px] font-light text-white/65 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-white/50 mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:atelier@wolfedesign.com" className="font-body text-[13px] font-light text-white/65 hover:text-white transition-colors">
                atelier@wolfedesign.com
              </a>
              <a href="tel:+14165551234" className="font-body text-[13px] font-light text-white/65 hover:text-white transition-colors">
                +1 (416) 555-1234
              </a>
              <Link href="/contact" className="font-body text-[13px] font-light text-brand-primary hover:text-white transition-colors">
                Request Consultation
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-body text-[10px] font-medium tracking-[0.2em] uppercase text-white/30">
            Global Presence <span className="text-white/50 mx-2">·</span> Toronto <span className="text-white/50 mx-2">·</span> Miami
          </span>
          <span className="font-body text-[11px] font-light text-white/30">
            © {new Date().getFullYear()} Wolfe Design Inc. All rights reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="font-body text-[11px] text-white/35 hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="font-body text-[11px] text-white/35 hover:text-white/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
