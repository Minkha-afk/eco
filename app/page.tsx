import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-16">
      <div className="rounded-lg border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Checkout Flow Demo</h1>
        <p className="mt-2 text-gray-600">A minimal multi-step checkout flow with SSR and Context API.</p>
        <Link
          href="/cart"
          className="mt-6 inline-flex rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          Go to Cart
        </Link>
      </div>
    </main>
  );
}
