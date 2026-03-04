import AddressForm from '@/components/AddressForm';

export default function CheckoutPage() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">2. Shipping Address</h1>
      <AddressForm />
    </main>
  );
}
