'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';
import ProgressBar from '@/components/ProgressBar';
import StickyFooter from '@/components/StickyFooter';

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, selectedAddress } = useCheckout();
  const [isPaying, setIsPaying] = useState(false);

  const total = useMemo(() => {
    const subtotal = cartData.cartItems.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );
    return subtotal + cartData.shipping_fee - cartData.discount_applied;
  }, [cartData]);

  const hasAddress = selectedAddress !== null;

  const handlePay = () => {
    if (!hasAddress) return;
    setIsPaying(true);
    router.push('/success');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <ProgressBar currentStep={3} />

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Order Review</h1>
          <p className="mt-2 text-gray-600">Review your order before payment</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Order Items & Address */}
          <section className="space-y-6">
            {/* Cart Items */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">Order Items</h2>
              <div className="space-y-4">
                {cartData.cartItems.map((item) => {
                  const isSvg = item.image.endsWith('.svg');
                  return (
                    <div
                      key={item.product_id}
                      className="flex items-center gap-4 border-b border-gray-100 pb-4 last:border-b-0 last:pb-0"
                    >
                      {isSvg ? (
                        <img
                          src={item.image}
                          alt={item.product_name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.product_name}
                          width={56}
                          height={56}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.product_name}</p>
                        <p className="text-sm text-gray-600">
                          ₹{item.product_price.toLocaleString('en-IN')} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-gray-900">
                        ₹{(item.product_price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">Shipping Address</h2>
              {hasAddress ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                  <p className="font-medium text-gray-900">{selectedAddress.fullName}</p>
                  <p className="text-sm text-gray-700">{selectedAddress.email}</p>
                  <p className="text-sm text-gray-700">{selectedAddress.phoneNumber}</p>
                  <p className="text-sm text-gray-700">
                    {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
                  </p>
                </div>
              ) : (
                <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  No address selected. Please go back and add an address.
                </p>
              )}
            </div>
          </section>

          {/* Order Summary & Payment */}
          <section className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-900">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹
                    {cartData.cartItems
                      .reduce((sum, item) => sum + item.product_price * item.quantity, 0)
                      .toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    ₹{cartData.shipping_fee.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartData.discount_applied > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-green-700">
                      -₹{cartData.discount_applied.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3" />
                <div className="flex items-center justify-between text-base font-semibold">
                  <span>Total</span>
                  <span className="text-emerald-600">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                disabled={!hasAddress || isPaying}
                className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPaying ? 'Processing Payment...' : 'Pay Securely'}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky Footer */}
      <StickyFooter>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/checkout"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-center font-medium text-gray-700 transition hover:bg-gray-50 md:flex-none md:px-6"
          >
            Back
          </Link>
        </div>
      </StickyFooter>
    </main>
  );
}
