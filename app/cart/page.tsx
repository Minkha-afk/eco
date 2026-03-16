import Link from 'next/link';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import ProgressBar from '@/components/ProgressBar';
import StickyFooter from '@/components/StickyFooter';
import { getCartData } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartData = await getCartData();

  return (
    <main className="min-h-screen bg-gray-50">
      <ProgressBar currentStep={1} />

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">Your Cart</h1>
          <p className="mt-2 text-gray-600">Review your items before checkout</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Cart Items */}
          <section className="space-y-4">
            {cartData.cartItems.length > 0 ? (
              cartData.cartItems.map((item) => <CartItem key={item.product_id} item={item} />)
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            )}
          </section>

          {/* Order Summary */}
          <section>
            <OrderSummary cartData={cartData} />
          </section>
        </div>
      </div>

      {/* Sticky Footer */}
      <StickyFooter>
        <Link
          href="/checkout"
          className="inline-flex w-full justify-center rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          Proceed to Checkout
        </Link>
      </StickyFooter>
    </main>
  );
}
