# Next.js Checkout Flow (SSR + Context API)

Minimal, clean 3-step checkout flow built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Context API for checkout state

## Flow

1. `/cart` – Cart / Order Summary (SSR data fetch)
2. `/checkout` – Shipping Address form + validation
3. `/payment` – Payment confirmation + final total
4. `/success` – Order successful page

## Architecture

```text
/app
  /cart/page.tsx
  /checkout/page.tsx
  /payment/page.tsx
  /success/page.tsx
/components
  CartItem.tsx
  OrderSummary.tsx
  AddressForm.tsx
/context
  CheckoutContext.tsx
/lib
  mockData.ts
```

### SSR Strategy

- `app/cart/page.tsx` is a Server Component.
- Cart data is fetched using an async server-side function (`getCartData`) from `lib/mockData.ts`.

### State Management (Context API)

`CheckoutContext` stores:
- `cartData`
- `shippingAddress`

Shipping details persist across pages using context state.

## Validation Rules

On `/checkout`:
- All fields required
- Email format must be valid
- Phone must be exactly 10 digits

## Styling

- Tailwind CSS utility classes
- Responsive layout
- Clean card-based UI
- Route-level loading states for each checkout page

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000/cart
```

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Lint project
