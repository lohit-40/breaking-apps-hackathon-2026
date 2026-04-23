import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

// ============================================================
// SUITE 6: VERCEL COMMERCE — End-to-End Ecommerce User Journey
// Suggested by the hackathon itself — complex multi-step shopping flow
// Tests: browse → product → variant selection → add to cart → review cart
// ============================================================

test.describe("🛒 Vercel Commerce — Breaking the Perfect E-Commerce Demo", () => {

  test("✅ Full shopping journey: browse → select → add to cart", async ({ page }) => {
    test.setTimeout(240_000);

    await runSteps({
      page,
      userFlow: "Complete a full shopping flow — find a product, select options, and add to cart",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Wait for the homepage to fully load including product images" },
        { description: "Click on the first product visible on the homepage" },
        { description: "Wait for the product detail page to load" },
        { description: "If color or size options exist, click on the first available option" },
        { description: "Click the 'Add to Cart' or 'Add to Bag' button" },
        { description: "Wait for the cart confirmation to appear (e.g., cart icon updates or a mini-cart opens)" },
      ],
      assertions: [
        { assertion: "A product detail page was shown with a product name and price" },
        { assertion: "The cart icon or cart counter shows at least 1 item after adding" },
        { assertion: "A confirmation message or mini-cart appears confirming the product was added" },
        { assertion: "The page did not navigate away unexpectedly or show an error" },
      ],
      test,
      expect,
    });
  });

  test("🔍 Product search returns relevant results", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Search for a product using the store's search functionality",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Find the search icon or search bar on the page and click it" },
        { description: "Type a search term in the search input field", data: { value: "shirt" } },
        { description: "Press Enter or click the search button" },
        { description: "Wait for the search results to appear" },
      ],
      assertions: [
        { assertion: "At least one product is displayed in the search results" },
        { assertion: "Each product card shows an image, name, and price" },
        { assertion: "The results are relevant to the search term (clothing or apparel items shown)" },
        { assertion: "No error or 'no results found' message is displayed for the search term 'shirt'" },
      ],
      test,
      expect,
    });
  });

  test("💰 Product pricing is consistently displayed", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify prices are shown on product pages",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Click on that first product to open its detail page" },
        { description: "Wait until the URL changes or the product details fully render on the screen" },
      ],
      assertions: [
        { assertion: "The product detail page shows a price" },
        { assertion: "The price format is consistent (e.g., shows $ symbol and decimal format)" },
      ],
      test,
      expect,
    });
  });

  test("📱 Responsive layout — product grid adapts correctly to available space", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify the product grid layout is clean and properly structured",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Wait for all product images to load" },
        { description: "Scroll down to see the full product grid" },
      ],
      assertions: [
        { assertion: "Multiple products are shown in a grid or list layout (more than 2 products visible)" },
        { assertion: "Product images are not broken (no image placeholder or alt-text-only visible)" },
        { assertion: "Product names and prices are readable and not overlapping" },
        { assertion: "The footer of the store is visible after scrolling to the bottom" },
      ],
      test,
      expect,
    });
  });

  test("🛒 Cart persists items when navigating between pages", async ({ page }) => {
    test.setTimeout(240_000);

    await runSteps({
      page,
      userFlow: "Add a product to cart, navigate to a different page, and verify the cart still shows the item",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Click on any product to open its detail page" },
        { description: "Add the product to cart by clicking 'Add to Cart' or equivalent button" },
        { description: "Navigate back to the homepage by clicking the store logo or Home link" },
        { description: "Check the cart icon in the navigation bar" },
      ],
      assertions: [
        { assertion: "After navigating back to the homepage, the cart icon still shows items (count is 1 or more)" },
        { assertion: "The homepage loaded normally without errors" },
        { assertion: "The cart counter did not reset to 0 after navigation" },
      ],
      test,
      expect,
    });
  });

});
