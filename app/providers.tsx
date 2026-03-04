'use client';

import { ReactNode } from 'react';
import { CheckoutProvider } from '@/context/CheckoutContext';

export function Providers({ children }: { children: ReactNode }) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
