import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

// ============================================================
// SUITE 7: DATA INTEGRITY — Cross-Field Math & Range Assertions
//
// THE KILLER INSIGHT: Traditional Playwright tests check "does
// an element exist?". These tests check "are the NUMBERS correct?"
// A data-pipeline bug that shows the wrong stat passes every
// selector test — but fails these range-bounded assertions.
//
// This is the class of bug that ships to production undetected.
// ============================================================

test.describe("📊 Data Integrity — Can Passmark Catch Wrong Numbers?", () => {

  test("✅ GitHub trending page — repo star counts are in a sane range", async ({ page }) => {
    // A repo showing 0 stars or 999 billion stars = data bug
    // Traditional Playwright: can only check if the element exists
    // Passmark: checks if the NUMBER MAKES SENSE
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify GitHub trending repo star counts are realistic",
      steps: [
        { description: "Navigate to https://github.com/trending" },
        { description: "Wait for the trending repositories list to fully load" },
        { description: "Scroll down slowly to see the first 5 trending repos" },
      ],
      assertions: [
        {
          assertion:
            "At least 5 repositories are listed on the trending page",
        },
        {
          assertion:
            "Each listed repository shows a star count that is a positive number greater than 0",
        },
        {
          assertion:
            "The star counts shown are reasonable values — no repository shows a count greater than 500,000 stars for a 'today' trending filter",
        },
        {
          assertion:
            "Repository names and descriptions are visible alongside their star counts",
        },
      ],
      test,
      expect,
    });
  });

  test("✅ WorldBank open data — global population stat is in sane range", async ({ page }) => {
    // Cross-field math: WorldBank shows population stats publicly
    // This catches a data-pipeline bug that divides by 1000 accidentally
    test.setTimeout(240_000);

    await runSteps({
      page,
      userFlow: "Verify WorldBank population indicator shows a realistic global figure",
      steps: [
        {
          description:
            "Navigate to https://data.worldbank.org/indicator/SP.POP.TOTL",
        },
        {
          description:
            "Wait for the page to fully load including any charts or data tables",
        },
        {
          description: "Scroll down to find the most recent global population figure",
        },
      ],
      assertions: [
        {
          assertion:
            "The page displays a world population figure that is greater than 7 billion and less than 10 billion",
        },
        {
          assertion:
            "The data displayed includes a year label (e.g., 2022, 2023, or 2024)",
        },
        {
          assertion:
            "No NaN, undefined, or zero values are shown as the primary population statistic",
        },
      ],
      test,
      expect,
    });
  });

  test("🔢 Cross-field math: Vercel Commerce cart total must equal sum of items", async ({ page }) => {
    // THE KILLER TEST: Validates mathematical consistency
    // Catches: rounding bugs, tax calculation errors, currency conversion bugs
    // Equivalent to ~80 lines of vanilla Playwright with number parsing + margin calc
    // With Passmark: 2 assertions in plain English
    test.setTimeout(240_000);

    await runSteps({
      page,
      userFlow: "Add multiple products to cart and verify the total price is mathematically consistent",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Wait for the homepage to fully load" },
        { description: "Click on the first product visible" },
        { description: "Wait for the product detail page to load" },
        { description: "If there are size or color options, click on the first available option" },
        { description: "Click the 'Add to Cart' or 'Add to Bag' button" },
        { description: "Wait for cart confirmation to appear" },
        { description: "Navigate back to the homepage" },
        { description: "Click on a different product" },
        { description: "If there are size or color options, click on the first available option" },
        { description: "Click 'Add to Cart' again" },
        { description: "Open the cart or go to checkout to see the full cart summary" },
      ],
      assertions: [
        {
          assertion:
            "The cart shows 2 or more items with individual prices listed for each",
        },
        {
          assertion:
            "The cart total price is a positive number greater than $0 and less than $10,000",
        },
        {
          assertion:
            "If a subtotal and individual item prices are both shown, the subtotal is approximately equal to the sum of all individual item prices (within a 5% margin for taxes or rounding)",
        },
        {
          assertion:
            "No item in the cart shows a price of $0.00 or a negative price — those would indicate a pricing data bug",
        },
        {
          assertion:
            "All monetary values use a consistent currency symbol (all USD $ or all the same currency)",
        },
      ],
      test,
      expect,
    });
  });

  test("📈 NPM download stats — weekly download counts are realistic", async ({ page }) => {
    // Data pipeline integrity: npmjs.com shows download stats
    // A bug that shows 0 downloads for a popular package = data pipeline failure
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify NPM package download stats are realistic and not broken",
      steps: [
        { description: "Navigate to https://www.npmjs.com/package/playwright" },
        { description: "Wait for the package page to fully load" },
        { description: "Scroll down to find the weekly download count or stats section" },
      ],
      assertions: [
        {
          assertion:
            "The page shows a weekly download count that is greater than 100,000 for a widely used package like Playwright",
        },
        {
          assertion:
            "The download count is not displayed as 0, NaN, or undefined — those would indicate a stats pipeline bug",
        },
        {
          assertion:
            "A version number (e.g., 1.x.x) is displayed on the page indicating the package is actively maintained",
        },
        {
          assertion:
            "The package description mentions browser automation or testing",
        },
      ],
      test,
      expect,
    });
  });

  test("🗂️ Cross-field math: Hacker News front page story rank is sequential", async ({ page }) => {
    // Logical consistency test: story rank numbers must be sequential (1, 2, 3...)
    // A rendering bug could show: 1, 1, 3, 5... (duplicates or skips)
    // This is impossible to detect with selector tests — Passmark catches it semantically
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify Hacker News front page stories are ranked sequentially without gaps",
      steps: [
        { description: "Navigate to https://news.ycombinator.com" },
        { description: "Wait for the page to fully load with all story rows visible" },
        { description: "Scroll down to see at least the first 10 ranked stories" },
      ],
      assertions: [
        {
          assertion:
            "The stories are numbered starting from 1 and the ranks are sequential integers (1, 2, 3, 4...) with no visible duplicates or gaps in the first 10 items",
        },
        {
          assertion:
            "Each story shows a point score that is a positive integer greater than 0",
        },
        {
          assertion:
            "The comment counts shown next to stories are non-negative integers (0 or higher, never negative)",
        },
        {
          assertion:
            "At least 10 story links are visible on the page — fewer than 10 would indicate a rendering failure",
        },
      ],
      test,
      expect,
    });
  });
});
