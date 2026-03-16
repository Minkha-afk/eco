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
    <div className="sticky top-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Shipping Fee</span>
          <span className="font-medium text-gray-900">₹{cartData.shipping_fee.toLocaleString('en-IN')}</span>
        </div>
        {cartData.discount_applied > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-700">
              -₹{cartData.discount_applied.toLocaleString('en-IN')}
            </span>
          </div>
        )}
        <div className="border-t border-gray-200 pt-4" />
        <div className="flex items-center justify-between text-base font-semibold">
          <span className="text-gray-900">Grand Total</span>
          <span className="text-emerald-600">₹{grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
