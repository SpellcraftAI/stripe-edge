/* eslint-disable no-constant-condition */
import test from "ava";
import { customerHasSubscription } from "../src/lib/utils";
import { config } from "dotenv";

config();

const { TEST_CUSTOMER } = process.env;
if (TEST_CUSTOMER === undefined) {
  throw new Error("No TEST_CUSTOMER provided");
}

const { TEST_PRICE } = process.env;
if (TEST_PRICE === undefined) {
  throw new Error("No TEST_PRICE provided");
}

test.serial("check if customer has subscription", async (t) => {
  const userHasSubscription = await customerHasSubscription({
    customer: TEST_CUSTOMER,
    subscription: TEST_PRICE
  });

  console.table({ userHasSubscription });
  t.pass();
});
