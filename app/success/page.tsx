import Link from 'next/link';

export default function SuccessPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">
      <div className="w-full rounded-lg border bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold text-green-700">Order Successful!</h1>
        <p className="mt-3 text-gray-600">Thank you for your purchase.</p>
        <Link
          href="/cart"
          className="mt-6 inline-flex rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
        >
          Back to Cart
        </Link>
      </div>
    </main>
  );
}
