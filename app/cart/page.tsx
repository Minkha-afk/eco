import Link from 'next/link';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { getCartData } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
  const cartData = await getCartData();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-semibold">1. Cart / Order Summary</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4">
          {cartData.cartItems.map((item) => (
            <CartItem key={item.product_id} item={item} />
          ))}
        </section>
        <section className="space-y-4">
          <OrderSummary cartData={cartData} />
          <Link
            href="/checkout"
            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800"
          >
            Proceed to Checkout
          </Link>
        </section>
      </div>
    </main>
  );
}
