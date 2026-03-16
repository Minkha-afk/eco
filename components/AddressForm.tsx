'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShippingAddress, useCheckout } from '@/context/CheckoutContext';
import AddressManager from './AddressManager';
import { Plus, ArrowLeft } from 'lucide-react';

type FormErrors = Partial<Record<keyof Omit<ShippingAddress, 'id' | 'createdAt'>, string>>;

export default function AddressForm() {
  const router = useRouter();
  const { addresses, selectedAddressId, addAddress } = useCheckout();

  const [showForm, setShowForm] = useState(addresses.length === 0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [form, setForm] = useState<Omit<ShippingAddress, 'id' | 'createdAt'>>({
    fullName: '',
    email: '',
    phoneNumber: '',
    pinCode: '',
    city: '',
    state: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = 'Full Name is required';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!form.phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      nextErrors.phoneNumber = 'Phone Number must be exactly 10 digits';
    }

    if (!form.pinCode.trim()) nextErrors.pinCode = 'PIN Code is required';
    if (!form.city.trim()) nextErrors.city = 'City is required';
    if (!form.state.trim()) nextErrors.state = 'State is required';

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    addAddress(form);
    setForm({
      fullName: '',
      email: '',
      phoneNumber: '',
      pinCode: '',
      city: '',
      state: ''
    });
    setShowForm(false);
  };

  const handleContinueToPayment = () => {
    setIsNavigating(true);
    router.push('/payment');
  };

  const handleBack = () => {
    router.push('/cart');
  };

  const canProceedToPayment = Boolean(addresses.length > 0 && selectedAddressId);

  const inputClass =
    'mt-1.5 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200';

  return (
    <div className="space-y-6 pb-32">
      {/* Existing Addresses */}
      {addresses.length > 0 && <AddressManager />}

      {/* Add Address Button */}
      {!showForm && addresses.length > 0 && (
        <button
          onClick={() => setShowForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-emerald-300 bg-emerald-50 px-4 py-6 font-medium text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100"
        >
          <Plus size={20} />
          Add New Address
        </button>
      )}

      {/* Address Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-semibold text-gray-900">
            {addresses.length > 0 ? 'Add New Address' : 'Enter Shipping Address'}
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field
              label="Full Name"
              value={form.fullName}
              error={errors.fullName}
              onChange={(value) => setForm((prev) => ({ ...prev, fullName: value }))}
              className={inputClass}
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              className={inputClass}
            />
            <Field
              label="Phone Number"
              value={form.phoneNumber}
              error={errors.phoneNumber}
              onChange={(value) => setForm((prev) => ({ ...prev, phoneNumber: value }))}
              className={inputClass}
            />
            <Field
              label="PIN Code"
              value={form.pinCode}
              error={errors.pinCode}
              onChange={(value) => setForm((prev) => ({ ...prev, pinCode: value }))}
              className={inputClass}
            />
            <Field
              label="City"
              value={form.city}
              error={errors.city}
              onChange={(value) => setForm((prev) => ({ ...prev, city: value }))}
              className={inputClass}
            />
            <Field
              label="State"
              value={form.state}
              error={errors.state}
              onChange={(value) => setForm((prev) => ({ ...prev, state: value }))}
              className={inputClass}
            />
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {addresses.length > 0 && (
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 sm:flex-none sm:px-6"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none sm:px-6"
            >
              {isSubmitting ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      )}

      {/* Sticky Footer */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-4 shadow-lg backdrop-blur sm:px-6">
        <div className="mx-auto max-w-6xl space-y-2">
          {!canProceedToPayment && (
            <p className="text-center text-xs font-medium text-amber-700 sm:text-left">
              Select a saved address (or save a new one) to continue.
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <button
              onClick={handleBack}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 sm:min-w-40"
            >
              <ArrowLeft size={18} />
              Back to Cart
            </button>
            <button
              onClick={handleContinueToPayment}
              disabled={!canProceedToPayment || isNavigating}
              className="min-h-11 rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-56"
            >
              {isNavigating ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className: string;
  type?: string;
  error?: string;
};

function Field({ label, value, onChange, className, type = 'text', error }: FieldProps) {
  return (
    <label className="text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={className}
      />
      {error ? <span className="mt-1 block text-xs font-medium text-red-600">{error}</span> : null}
    </label>
  );
}
