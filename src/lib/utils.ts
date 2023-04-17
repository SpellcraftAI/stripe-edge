import { Stripe, type StripeOptions, type StripeParams } from "./stripe";

/**
 * Check if a customer has an active subscription.
 *
 * @param params Customer and subscription price ID.
 * @param options Stripe API options.
 * @returns
 */
export const customerHasSubscription = async (
  { customer, subscription }: StripeParams,
  options?: StripeOptions
): Promise<boolean> => {
  try {
    const subscriptions: any[] = await Stripe(
      "subscriptions",
      { customer, price: subscription, status: "active" },
      options
    );

    return Boolean(subscriptions.length);
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return false;
  }
};
