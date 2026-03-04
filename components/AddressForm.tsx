'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShippingAddress, useCheckout } from '@/context/CheckoutContext';

type FormErrors = Partial<Record<keyof ShippingAddress, string>>;

export default function AddressForm() {
  const router = useRouter();
  const { shippingAddress, setShippingAddress } = useCheckout();

  const [form, setForm] = useState<ShippingAddress>(shippingAddress);
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
    setShippingAddress(form);
    router.push('/payment');
  };

  const inputClass =
    'mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none ring-0 focus:border-gray-900';

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border bg-white p-6 shadow-sm">
      <h1 className="text-xl font-semibold">Shipping Address</h1>
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
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
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Processing...' : 'Continue to Payment'}
      </button>
    </form>
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
      <span className="text-gray-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={className}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
