import { CartData } from '@/lib/mockData';

type OrderSummaryProps = {
  cartData: CartData;
};

export default function OrderSummary({ cartData }: OrderSummaryProps) {
  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + cartData.shipping_fee - cartData.discount_applied;

  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span>₹{cartData.shipping_fee}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Discount</span>
          <span>- ₹{cartData.discount_applied}</span>
        </div>
        <div className="my-2 border-t" />
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Grand Total</span>
          <span>₹{grandTotal}</span>
        </div>
      </div>
    </div>
  );
}
