import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

// ============================================================
// SUITE 5: GITHUB — Testing the Open Source Ecosystem
// Testing the platform where ALL hackathon code lives
// Complex flows: repo browsing, code viewing, README rendering
// ============================================================

test.describe("🐙 GitHub — Testing the Home of Open-Source Code", () => {

  test("✅ Passmark GitHub repo is accessible with correct metadata", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Verify the official Passmark GitHub repository is correctly set up",
      steps: [
        { description: "Navigate to https://github.com/bug0inc/passmark" },
        { description: "Wait for the repository page to fully load" },
        { description: "Scroll down slightly to see the README" },
      ],
      assertions: [
        { assertion: "The repository name 'passmark' is shown in the page header or breadcrumb" },
        { assertion: "A star count is displayed on the repository page" },
        { assertion: "A README section is rendered below the file list" },
        { assertion: "The README mentions 'Passmark' and contains code examples or installation instructions" },
        { assertion: "The repository shows a list of files or folders such as src, package.json or similar" },
      ],
      test,
      expect,
    });
  });

  test("🔍 GitHub code search finds Passmark usage examples", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Search GitHub for real-world Passmark usage in public repositories",
      steps: [
        { description: "Navigate to https://github.com/search?q=passmark+playwright&type=repositories" },
        { description: "Wait for search results to load" },
      ],
      assertions: [
        { assertion: "At least one repository appears in the search results" },
        { assertion: "Each result shows a repository name and brief description" },
        { assertion: "The search results page shows the total count of matching repositories" },
        { assertion: "No error message is displayed on the search results page" },
      ],
      test,
      expect,
    });
  });

  test("📋 Passmark CONTRIBUTING.md is readable and well-formatted", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Open the CONTRIBUTING guide from the Passmark repository",
      steps: [
        { description: "Navigate to https://github.com/bug0inc/passmark/blob/main/CONTRIBUTING.md" },
        { description: "Wait for the file to render" },
        { description: "Scroll through the document" },
      ],
      assertions: [
        { assertion: "The CONTRIBUTING.md file renders as formatted markdown (not raw text)" },
        { assertion: "The document has headings and sections" },
        { assertion: "Instructions for contributing to the project are present" },
        { assertion: "The page does not show a 404 or file not found error" },
      ],
      test,
      expect,
    });
  });

  test("⭐ Star button is visible and clearly actionable on Passmark repo", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Confirm the star button exists and is visible for community engagement",
      steps: [
        { description: "Navigate to https://github.com/bug0inc/passmark" },
        { description: "Scroll to the top of the page to see the repo action buttons" },
      ],
      assertions: [
        { assertion: "A 'Star' button is visibly rendered near the top of the page" },
        { assertion: "A 'Fork' button is also visible next to the Star button" },
        { assertion: "The star count number is displayed next to the Star button" },
      ],
      test,
      expect,
    });
  });

});
