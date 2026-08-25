# Voltex

Voltex is a responsive e-commerce frontend application built with React, TypeScript, Redux Toolkit, React Router, Tailwind CSS, Axios, and Vite.

It demonstrates a complete shopping flow including product discovery, product details, cart management, multi-step checkout, authentication, account management, order history, and order details.

## Live Demo

https://voltex-neon.vercel.app

## GitHub Repository

https://github.com/rabbiyasana/voltex

## Features

- Product listing with API-powered data
- Product search
- Category filtering
- Product detail pages
- Related products
- Shopping cart
- Cart quantity management
- Cart persistence with `localStorage`
- Multi-step checkout
  - Contact information
  - Shipping address
  - Delivery method
  - Payment step
  - Order confirmation
- Login
- Registration
- Auth state management with Redux Toolkit
- Account/Profile page
- My Orders
- Order Details
- Contact and shipping information stored with completed orders
- Order persistence with `localStorage`
- Responsive desktop and mobile UI
- React Router SPA navigation
- Vercel deployment configuration

## Tech Stack

### Frontend

- React
- TypeScript
- Redux Toolkit
- React Redux
- React Router
- Tailwind CSS
- Lucide React
- Axios

### Tooling

- Vite
- TypeScript Compiler
- ESLint
- Git
- GitHub
- Vercel

### API

- DummyJSON

## Architecture

The project uses a type-based application structure, with UI components grouped further by domain.

```text
src/
├── api/
│   ├── apiClient.ts
│   ├── authApi.ts
│   └── productApi.ts
│
├── app/
│   └── store.ts
│
├── components/
│   ├── account/
│   ├── auth/
│   ├── cart/
│   ├── checkout/
│   ├── common/
│   ├── layout/
│   ├── orders/
│   └── product/
│
├── hooks/
│
├── pages/
│
├── slices/
│   ├── authSlice.ts
│   ├── cartSlice.ts
│   ├── orderSlice.ts
│   └── productSlice.ts
│
├── types/
│   ├── orderType.ts
│   └── productType.ts
│
├── utils/
│
├── App.tsx
├── main.tsx
└── index.css
```

## State Management

Redux Toolkit is used for application-level state such as:

- Products
- Authentication
- Cart
- Orders

Component-local state is used for UI-specific behavior and form state where global state is not required.

## API Layer

Axios is configured through a shared API client.

```ts
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

Product API responses are mapped into the application's own `Product` model before being used by UI components.

This keeps external API response shapes separate from application-specific types.

## Data Flow Example

A typical product request follows this flow:

```text
Page
→ Redux async thunk
→ API service
→ Axios
→ DummyJSON
→ response mapper
→ Redux state
→ UI
```

The checkout/order flow follows:

```text
Product Listing
→ Product Details
→ Cart
→ Checkout
→ Contact
→ Shipping
→ Payment
→ Order Confirmation
→ My Orders
→ Order Details
```

## Local Persistence

`localStorage` is used for demo persistence of:

- Cart
- Authentication state
- Completed orders

This allows important application state to survive page refreshes.

For a production application, authentication tokens would preferably be handled using a more secure server-controlled approach such as HttpOnly cookies when supported by the backend.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rabbiyasana/voltex.git
cd voltex
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an environment file

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

You can also create `.env.local` for local development.

### 4. Start the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL used by the Axios API client |

Example:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

> Variables prefixed with `VITE_` are included in the frontend bundle and should not contain secrets.

## Routing

The app uses React Router.

Important routes include:

```text
/
/products
/products/:id
/cart
/checkout
/login
/register
/account
/account/orders
/account/orders/:id
```

For Vercel deployment, SPA rewrites are configured so refreshing a nested React Router URL still serves `index.html`.

Example `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Authentication

Authentication is demonstrated using DummyJSON.

The application stores authenticated user information and tokens in Redux and persists demo auth state locally.

### DummyJSON limitation

DummyJSON authentication and user creation are useful for frontend demonstrations, but some mutation endpoints simulate changes rather than persisting them like a real production backend.

For example, registration should be treated as a simulated frontend/API integration rather than a persistent production user-registration system.

## Orders

Completed checkout orders are stored in Redux and persisted locally.

Each order contains:

- Order ID
- Date
- Status
- Products and quantities
- Contact information
- Shipping address
- Subtotal
- Shipping cost
- Total

This allows the app to demonstrate a complete checkout-to-order-history experience without requiring a custom backend.

## Design

The UI uses a clean ecommerce design system with:

- Responsive layouts
- Reusable domain components
- Consistent cards and spacing
- Loading/error states
- Product and checkout-focused UX
- Mobile-friendly navigation

## Future Improvements

Possible next improvements include:

- Wishlist
- Saved addresses
- Forgot-password flow
- Backend-backed persistent orders
- Backend-backed registration
- Secure cookie-based authentication
- Automated testing
- Improved global toast notifications
- Additional accessibility improvements

## License

This project was created as a portfolio project.
