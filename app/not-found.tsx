import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="font-heading text-[52px] font-bold text-brand-primary">404</h1>
      <p className="text-lg text-muted">This page could not be found.</p>
      <Link
        href="/"
        className="mt-4 inline-block bg-brand-primary text-white px-8 py-3 rounded-md hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
