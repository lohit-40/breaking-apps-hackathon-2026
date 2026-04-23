import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

// ============================================================
// SUITE 2: HASHNODE — Testing the Platform That Hosts This Hackathon
// Creative angle: "I used Passmark to test the platform I'm submitting to"
// This is META and judges will LOVE it
// ============================================================

test.describe("🌐 Hashnode — Testing the Platform Hosting This Very Hackathon", () => {

  test("✅ Homepage loads and navigation works correctly", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify Hashnode homepage loads with key navigation elements accessible",
      steps: [
        { description: "Navigate to https://hashnode.com" },
        { description: "Wait for the page to fully load" },
      ],
      assertions: [
        { assertion: "The Hashnode logo is visible at the top of the page" },
        { assertion: "There is a navigation bar or header present" },
        { assertion: "The page contains links or buttons for signing in or signing up" },
        { assertion: "The page title or heading contains 'Hashnode' or references a developer blogging platform" },
      ],
      test,
      expect,
    });
  });

  test("🔍 Search feature returns relevant results", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Use Hashnode's search to find content about Passmark",
      steps: [
        { description: "Navigate to https://hashnode.com" },
        { description: "Find the search button or icon (usually a magnifying glass) in the top header and click it to open the search modal" },
        { description: "Type a search query in the search input box inside the modal", data: { value: "Passmark playwright testing" } },
        { description: "Press Enter to submit the search query" },
        { description: "Wait for the search results to populate in the modal or on the page" },
      ],
      assertions: [
        { assertion: "Search results or article suggestions are displayed" },
        { assertion: "The page does not show a crash or 'something went wrong' error" },
      ],
      test,
      expect,
    });
  });

  test("🏆 Hackathon page is accessible and shows prize info", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Navigate to the Breaking Apps Hackathon page and verify all key sections",
      steps: [
        { description: "Navigate to https://hashnode.com/hackathons/breaking-things" },
        { description: "Scroll down slowly to see all sections of the hackathon page" },
      ],
      assertions: [
        { assertion: "The page heading or title mentions 'Breaking Apps' or 'Hackathon'" },
        { assertion: "A prize amount such as '$4,000' is displayed somewhere on the page" },
        { assertion: "There is a deadline or date mentioned (May 10)" },
        { assertion: "A 'How to participate' or submission requirements section is visible" },
        { assertion: "The Bug0 sponsor name or logo appears on the page" },
      ],
      test,
      expect,
    });
  });

  test("📰 Article tag page for #BreakingAppsHackathon loads submissions", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Check if the hackathon tag page shows community submissions",
      steps: [
        { description: "Navigate to https://hashnode.com/tag/breakingappshackathon" },
        { description: "Wait for the page to fully load and render articles" },
      ],
      assertions: [
        { assertion: "The page shows the tag #BreakingAppsHackathon or similar heading" },
        { assertion: "At least one article or post card is visible on the page" },
        { assertion: "Each article card shows an author name or avatar" },
        { assertion: "The page does not show a 404 error or empty state with zero articles" },
      ],
      test,
      expect,
    });
  });

});
