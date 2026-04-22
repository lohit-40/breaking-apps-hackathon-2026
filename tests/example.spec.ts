import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

test("Passmark Demo Test: Add to cart", async ({ page }) => {
  // We set a long timeout since AI steps can take a moment
  test.setTimeout(90_000); 

  await runSteps({
    page,
    userFlow: "Add product to cart",
    steps: [
      { description: "Navigate to https://demo.vercel.store" },
      { description: "Click Acme Circles T-Shirt" },
      { description: "Select color", data: { value: "White" } },
      { description: "Select size", data: { value: "S" } },
      { description: "Add to cart", waitUntil: "My Cart is visible" },
    ],
    assertions: [
      { assertion: "You can see My Cart with Acme Circles T-Shirt" },
    ],
    test,
    expect,
  });
});
