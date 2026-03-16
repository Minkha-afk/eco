import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/mockData';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const isSvg = item.image.endsWith('.svg');
  const itemTotal = item.product_price * item.quantity;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md md:p-5">
      {isSvg ? (
        <img
          src={item.image}
          alt={item.product_name}
          className="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
        />
      ) : (
        <Image
          src={item.image}
          alt={item.product_name}
          width={80}
          height={80}
          className="h-16 w-16 rounded-lg object-cover md:h-20 md:w-20"
        />
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-2">{item.product_name}</h3>
        <p className="mt-1 text-sm text-gray-600">
          ₹{item.product_price.toLocaleString('en-IN')} each
        </p>
        <p className="mt-1 text-sm font-medium text-gray-700">
          Qty: <span className="text-emerald-600">{item.quantity}</span>
        </p>
      </div>

      <div className="text-right whitespace-nowrap">
        <p className="font-semibold text-gray-900">₹{itemTotal.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}
