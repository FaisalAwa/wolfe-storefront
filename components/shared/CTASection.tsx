import Image from 'next/image';
import Link from 'next/link';

interface CTASectionProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function CTASection({
  eyebrow = 'Begin Your Journey',
  heading = "Let's Create Something\nExtraordinary Together",
  body = 'Our team is selective about the projects we undertake, ensuring each receives the attention and artistry it deserves. We invite you to begin a conversation about your vision.',
  ctaLabel = 'Request Consultation',
  ctaHref = '/contact',
}: CTASectionProps) {
  return (
    <section className="relative min-h-[500px] flex items-center">
      <Image src="/cta-bg.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 w-full text-center px-6 py-20 md:py-24">
        <span className="block font-body text-[11px] font-medium tracking-[0.18em] uppercase text-white/60 mb-5">
          {eyebrow}
        </span>
        <h2 className="font-heading text-[36px] md:text-[56px] lg:text-[64px] font-normal italic text-white leading-[1.1] max-w-[700px] mx-auto mb-6 whitespace-pre-line">
          {heading}
        </h2>
        <p className="font-body text-[14px] font-light text-white/70 max-w-[480px] mx-auto mb-10 leading-[1.8]">
          {body}
        </p>
        <Link
          href={ctaHref}
          className="inline-block font-body text-[11px] font-medium tracking-[0.14em] uppercase text-white border border-white px-10 py-4 hover:bg-white hover:text-[#1a1a1a] transition-colors"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
