'use client';

import { useCheckout } from '@/context/CheckoutContext';
import { Trash2 } from 'lucide-react';

export default function AddressManager() {
  const { addresses, deleteAddress, selectedAddressId, setSelectedAddressId } = useCheckout();

  if (addresses.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Saved Addresses</h3>
      <div className="space-y-3">
        {addresses.map((addr) => (
          <label
            key={addr.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <input
              type="radio"
              name="address"
              value={addr.id}
              checked={selectedAddressId === addr.id}
              onChange={() => setSelectedAddressId(addr.id)}
              className="mt-1 h-4 w-4 cursor-pointer accent-emerald-600"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{addr.fullName}</p>
              <p className="text-sm text-gray-600">{addr.email}</p>
              <p className="text-sm text-gray-600">{addr.phoneNumber}</p>
              <p className="text-sm text-gray-600">
                {addr.city}, {addr.state} - {addr.pinCode}
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                deleteAddress(addr.id);
              }}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              title="Delete address"
            >
              <Trash2 size={18} />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}
