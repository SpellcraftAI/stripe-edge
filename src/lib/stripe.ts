export type StripeAPI = (
  endpoint: string,
  params?: StripeParams,
  options?: StripeOptions,
) => Promise<any>;

export type StripeParams = Record<string, any>;

export interface StripeOptions {
  apiKey?: string
  method?: "GET" | "POST" | "PUT" | "DELETE"
}

/**
 * Make a request to the Stripe API.
 *
 * @param endpoint A stripe endpoint, e.g. /product/[id].
 * @param params Params for the Stripe endpoint.
 * @param options Other options such as `method` and `apiKey`.
 * @returns
 */
export const Stripe: StripeAPI = async (
  endpoint,
  params = {},
  {
    apiKey = process.env.STRIPE_LIVE_MODE === "true"
      ? process.env.STRIPE_SECRET_KEY
      : process.env.STRIPE_SECRET_TEST_KEY,
    method = "GET"
  } = {}
): Promise<ResponseType> => {
  if (apiKey === undefined) {
    throw new Error("No API key provided");
  }

  const url = new URL(`https://api.stripe.com/v1/${endpoint}`);
  const headers = new Headers();

  headers.set("Authorization", `Bearer ${apiKey}`);

  if (method === "GET") {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(
    url.href,
    {
      method,
      headers,
      body: method === "GET" ? undefined : JSON.stringify(params)
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { data } = await response.json();
  return data;
};
