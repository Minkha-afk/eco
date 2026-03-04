'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CartData, MOCK_CART_DATA } from '@/lib/mockData';

export type ShippingAddress = {
  fullName: string;
  email: string;
  phoneNumber: string;
  pinCode: string;
  city: string;
  state: string;
};

type CheckoutContextType = {
  cartData: CartData;
  setCartData: (cartData: CartData) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (shippingAddress: ShippingAddress) => void;
};

const initialAddress: ShippingAddress = {
  fullName: '',
  email: '',
  phoneNumber: '',
  pinCode: '',
  city: '',
  state: ''
};

const CheckoutContext = createContext<CheckoutContextType | null>(null);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartData, setCartData] = useState<CartData>(MOCK_CART_DATA);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(initialAddress);

  const value = useMemo(
    () => ({
      cartData,
      setCartData,
      shippingAddress,
      setShippingAddress
    }),
    [cartData, shippingAddress]
  );

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within CheckoutProvider');
  }

  return context;
}
