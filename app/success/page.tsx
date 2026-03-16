import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-4">
            <CheckCircle size={48} className="text-emerald-600" />
          </div>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-gray-900">Order Successful!</h1>
        <p className="mb-2 text-gray-600">Thank you for your purchase</p>
        <p className="mb-6 text-sm text-gray-500">
          Your order has been confirmed and you will receive a confirmation email shortly.
        </p>

        <div className="rounded-lg bg-emerald-50 p-4 mb-6">
          <p className="text-sm font-medium text-emerald-800">
            Order ID: <span className="font-semibold">#ECO{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </p>
        </div>

        <Link
          href="/cart"
          className="inline-flex w-full justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
