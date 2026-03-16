'use client';

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { CartData, MOCK_CART_DATA } from '@/lib/mockData';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/lib/storage';

export type ShippingAddress = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  pinCode: string;
  city: string;
  state: string;
  createdAt: number;
};

type CheckoutContextType = {
  cartData: CartData;
  setCartData: (cartData: CartData) => void;
  addresses: ShippingAddress[];
  addAddress: (address: Omit<ShippingAddress, 'id' | 'createdAt'>) => void;
  updateAddress: (id: string, address: Omit<ShippingAddress, 'id' | 'createdAt'>) => void;
  deleteAddress: (id: string) => void;
  selectedAddressId: string | null;
  setSelectedAddressId: (id: string | null) => void;
  selectedAddress: ShippingAddress | null;
  isHydrated: boolean;
};

const initialAddress: Omit<ShippingAddress, 'id' | 'createdAt'> = {
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
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedAddresses = getFromStorage<ShippingAddress[]>(STORAGE_KEYS.ADDRESSES, []);
    const savedSelectedId = getFromStorage<string | null>(STORAGE_KEYS.SELECTED_ADDRESS_ID, null);

    setAddresses(savedAddresses);
    setSelectedAddressId(savedSelectedId);
    setIsHydrated(true);
  }, []);

  // Persist addresses to localStorage
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.ADDRESSES, addresses);
    }
  }, [addresses, isHydrated]);

  // Persist selected address ID to localStorage
  useEffect(() => {
    if (isHydrated) {
      saveToStorage(STORAGE_KEYS.SELECTED_ADDRESS_ID, selectedAddressId);
    }
  }, [selectedAddressId, isHydrated]);

  const addAddress = (address: Omit<ShippingAddress, 'id' | 'createdAt'>) => {
    const newAddress: ShippingAddress = {
      ...address,
      id: `addr_${Date.now()}`,
      createdAt: Date.now()
    };
    setAddresses((prev) => [newAddress, ...prev]);
    setSelectedAddressId(newAddress.id);
  };

  const updateAddress = (id: string, address: Omit<ShippingAddress, 'id' | 'createdAt'>) => {
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...address, id, createdAt: a.createdAt } : a))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(addresses.length > 1 ? addresses[0].id : null);
    }
  };

  const selectedAddress = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const value = useMemo(
    () => ({
      cartData,
      setCartData,
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      selectedAddressId,
      setSelectedAddressId,
      selectedAddress,
      isHydrated
    }),
    [cartData, addresses, selectedAddressId, isHydrated]
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
