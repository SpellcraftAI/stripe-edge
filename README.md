# Stripe Edge

A simple, untyped (for now) Stripe API client for Edge.

### Usage

```ts
await Stripe(
  // 'subscriptions', 'prices/:id' etc.
  endpoint,
  // endpoint parameters
  params,
  // { method, apiKey }
  options
)
```

### Setup

Set the following env vars at runtime (Next.js etc. do this for you):

```
STRIPE_TEST_MODE="false"
STRIPE_SECRET_KEY=""
STRIPE_SECRET_TEST_KEY=""
```

The library will automatically use the correct key given test mode or not.