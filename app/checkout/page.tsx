import Link from 'next/link';
import AddressForm from '@/components/AddressForm';
import ProgressBar from '@/components/ProgressBar';
import StickyFooter from '@/components/StickyFooter';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <ProgressBar currentStep={2} />

      <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Shipping Address</h1>
          <p className="mt-2 text-gray-600">Where should we deliver your order?</p>
        </div>

        <AddressForm />
      </div>

      {/* Sticky Footer */}
      <StickyFooter>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cart"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50 md:flex-none md:px-6"
          >
            Back
          </Link>
        </div>
      </StickyFooter>
    </main>
  );
}
