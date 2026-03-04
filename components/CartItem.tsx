import Image from 'next/image';
import { CartItem as CartItemType } from '@/lib/mockData';

type CartItemProps = {
  item: CartItemType;
};

export default function CartItem({ item }: CartItemProps) {
  const isSvg = item.image.endsWith('.svg');

  return (
    <div className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm">
      {isSvg ? (
        <img
          src={item.image}
          alt={item.product_name}
          className="h-[72px] w-[72px] rounded-md object-cover"
        />
      ) : (
        <Image
          src={item.image}
          alt={item.product_name}
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-md object-cover"
        />
      )}
      <div className="flex-1">
        <h3 className="font-medium">{item.product_name}</h3>
        <p className="text-sm text-gray-600">₹{item.product_price}</p>
      </div>
      <div className="text-sm text-gray-700">Qty: {item.quantity}</div>
    </div>
  );
}
