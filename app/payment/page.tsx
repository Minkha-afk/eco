'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckout } from '@/context/CheckoutContext';

export default function PaymentPage() {
  const router = useRouter();
  const { cartData, shippingAddress } = useCheckout();
  const [isPaying, setIsPaying] = useState(false);

  const total = useMemo(() => {
    const subtotal = cartData.cartItems.reduce(
      (sum, item) => sum + item.product_price * item.quantity,
      0
    );
    return subtotal + cartData.shipping_fee - cartData.discount_applied;
  }, [cartData]);

  const hasAddress =
    shippingAddress.fullName &&
    shippingAddress.email &&
    shippingAddress.phoneNumber &&
    shippingAddress.pinCode &&
    shippingAddress.city &&
    shippingAddress.state;

  const handlePay = () => {
    setIsPaying(true);
    router.push('/success');
  };

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">3. Payment Confirmation</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4 rounded-lg border bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Cart Items</h2>
          {cartData.cartItems.map((item) => (
            <div key={item.product_id} className="flex items-center gap-4 border-b pb-3 last:border-b-0">
              <Image
                src={item.image}
                alt={item.product_name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product_name}</p>
                <p className="text-sm text-gray-600">
                  ₹{item.product_price} × {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Shipping Address</h2>
            {hasAddress ? (
              <div className="mt-3 space-y-1 text-sm text-gray-700">
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.email}</p>
                <p>{shippingAddress.phoneNumber}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
                </p>
              </div>
            ) : (
              <p className="mt-3 text-sm text-red-600">No address found. Please complete shipping details.</p>
            )}
          </div>

          <div className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Final Total</span>
              <span>₹{total}</span>
            </div>
            <button
              onClick={handlePay}
              disabled={!hasAddress || isPaying}
              className="mt-4 inline-flex w-full justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPaying ? 'Processing...' : 'Pay Securely'}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
