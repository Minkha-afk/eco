export type CartItem = {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
};

export type CartData = {
  cartItems: CartItem[];
  shipping_fee: number;
  discount_applied: number;
};

export const MOCK_CART_DATA: CartData = {
  cartItems: [
    {
      product_id: 101,
      product_name: 'Bamboo Toothbrush (Pack of 4)',
      product_price: 299,
      quantity: 2,
      image: '/assets/brush.png'
    },
    {
      product_id: 102,
      product_name: 'Reusable Cotton Produce Bags',
      product_price: 450,
      quantity: 1,
      image: '/assets/bags.png'
    }
  ],
  shipping_fee: 50,
  discount_applied: 0
};

export async function getCartData(): Promise<CartData> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return MOCK_CART_DATA;
}
