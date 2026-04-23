import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

// ============================================================
// SUITE 3: PASSMARK DOCS — Testing the tool with itself
// Ultra-creative: "I tested Passmark.dev using Passmark"
// This is recursive/meta and will absolutely stand out
// ============================================================

test.describe("🤯 Meta Test — Using Passmark to Test the Passmark Documentation", () => {

  test("✅ Passmark landing page is complete and explains the tool", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify the Passmark site loads correctly with its value proposition",
      steps: [
        { description: "Navigate to https://passmark.dev" },
        { description: "Wait for the page to fully load" },
        { description: "Scroll slowly from top to bottom to see all page content" },
      ],
      assertions: [
        { assertion: "The page title or main heading prominently shows 'Passmark' or 'Bug0'" },
        { assertion: "The page explains what the tool does (e.g. mentions 'AI' or 'testing' or 'Playwright')" },
        { assertion: "The page loads without any 404 error or broken layout" },
        { assertion: "At least one link to GitHub is present on the page" },
      ],
      test,
      expect,
    });
  });

  test("📖 Quick start guide is accessible and has a real code example", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Navigate to the quickstart or getting started guide and validate it",
      steps: [
        { description: "Navigate to https://passmark.dev" },
        { description: "Look for a 'Quick Start', 'Getting Started', or 'Introduction' link in the navigation and click it" },
        { description: "Wait for the documentation page to load" },
        { description: "Scroll down through the content" },
      ],
      assertions: [
        { assertion: "A code block with TypeScript or JavaScript code is visible on the page" },
        { assertion: "The word 'runSteps' appears in a code example" },
        { assertion: "There are numbered steps or a list explaining how to set up Passmark" },
        { assertion: "The page does not display any error message" },
      ],
      test,
      expect,
    });
  });

  test("🔗 The GitHub link navigates to the Passmark repository", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify that the GitHub link on the Passmark site is fully functional",
      steps: [
        { description: "Navigate to https://passmark.dev" },
        { description: "Find the GitHub link or icon (often in the top header) and click it" },
        { description: "Wait for the new page to load" },
      ],
      assertions: [
        { assertion: "The browser navigated to a GitHub URL (github.com)" },
        { assertion: "The GitHub page is for the repository 'bug0inc/passmark' or similar" },
        { assertion: "No '404 Not Found' message is displayed" },
      ],
      test,
      expect,
    });
  });

});

// ============================================================
// SUITE 4: BUG0.COM — Testing the Sponsor's Own Product
// Creative: Testing Bug0 (the hackathon sponsor) — shows deep engagement
// ============================================================

test.describe("🐛 Bug0 — Testing the Hackathon Sponsor's Platform", () => {

  test("✅ Bug0 homepage loads with product highlights", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify Bug0's homepage clearly explains its product offering",
      steps: [
        { description: "Navigate to https://bug0.com" },
        { description: "Wait for the page to fully load" },
        { description: "Scroll down the page to see all sections" },
      ],
      assertions: [
        { assertion: "The page has a main headline or hero section describing Bug0's purpose" },
        { assertion: "The words 'AI' or 'testing' or 'QA' appear on the page" },
        { assertion: "There is a Call-To-Action button (e.g., 'Get Started', 'Try for Free', or 'Sign Up')" },
        { assertion: "The page loads without JavaScript errors shown in the UI" },
        { assertion: "Bug0 logo or branding is visible at the top" },
      ],
      test,
      expect,
    });
  });

  test("🔑 CTA buttons are clickable and lead to a booking modal", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Test that the primary call-to-action on Bug0 works and opens the calendar/demo modal",
      steps: [
        { description: "Navigate to https://bug0.com" },
        { description: "Find the primary CTA button such as 'Book a Call' or 'Book a Demo' and click it" },
        { description: "Wait for the calendar or booking modal to open" },
      ],
      assertions: [
        { assertion: "A modal dialog (like 'Book a Demo') or pop-up containing a calendar iframe is visible on the screen" },
        { assertion: "No error page or 500 status is shown" },
      ],
      test,
      expect,
    });
  });

});
