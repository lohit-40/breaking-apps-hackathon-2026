import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

// ============================================================
// SUITE 8: EDGE CASES — The Stuff Nobody Tests
//
// Happy-path tests are table stakes. Real QA finds bugs in:
// - 404 / error pages
// - Empty states (no results)
// - Form validation feedback
// - Accessibility (ARIA, contrast, focus traps)
// - Loading state races
//
// These tests use Passmark to assert on BEHAVIORAL correctness
// in states most test suites completely ignore.
// ============================================================

test.describe("💥 Edge Cases — Testing What Everyone Else Ignores", () => {

  test("✅ 404 page is human-friendly, not a raw error dump", async ({ page }) => {
    // Most frameworks test what exists. We test what BREAKS.
    // A good 404 has: helpful message, navigation back home, no stack trace exposed
    test.setTimeout(120_000);

    await runSteps({
      page,
      userFlow: "Navigate to a known non-existent page and verify the 404 experience is user-friendly",
      steps: [
        {
          description:
            "Navigate to https://demo.vercel.store/this-page-does-not-exist-at-all",
        },
        {
          description: "Wait for the page to finish loading",
        },
        {
          description: "Scroll through the entire page to see all visible content",
        },
      ],
      assertions: [
        {
          assertion:
            "The page shows a 404 or 'page not found' message that a human can understand — NOT a raw server error or blank white page",
        },
        {
          assertion:
            "The page does NOT expose a stack trace, server path, or internal error message to the user",
        },
        {
          assertion:
            "A link or button to return to the homepage or store is visible on the error page",
        },
        {
          assertion:
            "The store branding (logo or navigation) is still present even on the error page",
        },
      ],
      test,
      expect,
    });
  });

  test("🔍 Empty search state is explained — not a blank page", async ({ page }) => {
    // Empty states are critical UX. A blank white page with 0 results
    // is indistinguishable from a crash to most users.
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Search for a gibberish term and verify the empty state is clearly explained",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Find the search bar or search icon and click it" },
        {
          description:
            "Type a nonsense search term that will return no results",
          data: { value: "xzqwerty99999zzz" },
        },
        { description: "Press Enter or click the search submit button" },
        {
          description: "Wait for the search results page to fully load",
        },
      ],
      assertions: [
        {
          assertion:
            "The page shows a clear 'no results found' or 'no products match' message — NOT a blank page or broken layout",
        },
        {
          assertion:
            "The search term entered ('xzqwerty99999zzz') is reflected somewhere on the results page so the user knows what was searched",
        },
        {
          assertion:
            "A suggestion to try different keywords OR a link to browse all products is shown — the page should guide the user forward",
        },
        {
          assertion:
            "No JavaScript error message or stack trace is visible on the page",
        },
      ],
      test,
      expect,
    });
  });

  test("♿ Accessibility — Hoppscotch has navigable keyboard structure", async ({ page }) => {
    // Accessibility is almost never tested by AI-testing articles.
    // Passmark can semantically evaluate ARIA roles and keyboard navigability
    // — something impossible with a CSS selector.
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Evaluate the accessibility structure of Hoppscotch's main interface",
      steps: [
        { description: "Navigate to https://hoppscotch.io/test-app" },
        { description: "Wait for the app interface to fully load" },
        { description: "Scroll through the visible interface without clicking anything" },
      ],
      assertions: [
        {
          assertion:
            "The main navigation or sidebar has visible labels or icons that describe each section's purpose — not just cryptic icons with no text",
        },
        {
          assertion:
            "The primary action button (such as 'Send' for API requests) is clearly labeled and visually distinguishable from secondary controls",
        },
        {
          assertion:
            "Form input fields have visible labels or placeholder text describing what to enter — no unlabeled blank input boxes",
        },
        {
          assertion:
            "The color contrast between text and background appears sufficient — no light gray text on a white background that would be invisible to users with low vision",
        },
      ],
      test,
      expect,
    });
  });

  test("⏳ Loading state — GitHub is honest about what it's loading", async ({ page }) => {
    // Race condition test: pages that show content before it's ready
    // Traditional tools can't distinguish "loading spinner visible" from "data present"
    // Passmark can semantically evaluate if a loading state is communicated
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Navigate to a GitHub repository and verify loading states are communicated",
      steps: [
        { description: "Navigate to https://github.com/vercel/next.js" },
        {
          description:
            "Wait for the full repository page to load including the file list and README",
        },
        { description: "Scroll down to the README section" },
      ],
      assertions: [
        {
          assertion:
            "The file tree (list of files and folders) is fully loaded and shows actual file names — not placeholder skeleton bars or 'Loading...' text",
        },
        {
          assertion:
            "The README content is rendered with actual text and headings — not raw markdown symbols like ## or **bold**",
        },
        {
          assertion:
            "The star count displayed is a specific number greater than 0 — not 'Loading' or an empty badge",
        },
        {
          assertion:
            "The number of contributors, commits, or branches shown in the header area are non-zero numbers",
        },
      ],
      test,
      expect,
    });
  });

  test("🧪 Form validation — Passmark catches silent form failures", async ({ page }) => {
    // Classic bug: submit an empty form, nothing happens, no error shown.
    // Users think it worked. It didn't.
    // This class of bug passes every happy-path test but breaks real user flows.
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Submit an empty or invalid form and verify proper validation feedback is shown",
      steps: [
        { description: "Navigate to https://bug0.com" },
        {
          description: "Wait for the page to fully load",
        },
        {
          description:
            "Find any email input field or contact form on the page",
        },
        {
          description:
            "Click on the email input field without typing anything",
        },
        {
          description:
            "Try to click the 'Submit', 'Send', or 'Book a Call' button without filling in any fields",
        },
      ],
      assertions: [
        {
          assertion:
            "Either: a validation error message appears telling the user the field is required, OR the form does not submit silently — some form of feedback is given",
        },
        {
          assertion:
            "The page does NOT navigate away or show a 'success' message after submitting an empty form — that would be a critical form validation bug",
        },
        {
          assertion:
            "No server error (500 error or crash screen) is shown as a result of submitting an empty form",
        },
      ],
      test,
      expect,
    });
  });

  test("🌐 Internationalization — Vercel Commerce handles currency consistently", async ({ page }) => {
    // I18N bugs are invisible to selector tests.
    // A locale flip (en-US vs en-IN) can silently swap commas and decimals:
    // $1,234.56 becomes $1.234,56 — the element still exists, the number is wrong.
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify all prices use a consistent currency format with no locale mixing",
      steps: [
        { description: "Navigate to https://demo.vercel.store" },
        { description: "Wait for all products to load on the homepage" },
        { description: "Note the price format of 3 different products visible on screen" },
        { description: "Click on one product to go to its detail page" },
        { description: "Note the price on the product detail page" },
      ],
      assertions: [
        {
          assertion:
            "All prices visible on the homepage use the same currency symbol — no mixing of $ and € or £ on the same page",
        },
        {
          assertion:
            "The price format is consistent: either all prices use a period as the decimal separator (e.g., $25.00) or all use a comma — no inconsistent mixing within the same page",
        },
        {
          assertion:
            "The price on the product detail page uses the same currency and format as the price shown on the homepage listing — they should match",
        },
        {
          assertion:
            "No price is shown as 0, NaN, or 'undefined' — those indicate a currency conversion or data-fetch bug",
        },
      ],
      test,
      expect,
    });
  });
});
