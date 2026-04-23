import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test.describe("🏁 Wikipedia Speedrun — Multi-Page Linked Navigation", () => {
  test("✅ Navigate from 'Apple Inc.' to 'Steve Jobs' entirely via links", async ({ page }) => {
    test.setTimeout(240_000); // 4 minutes

    await runSteps({
      page,
      userFlow: "Play the Wikipedia game: start at Apple Inc and find the link to Steve Jobs.",
      steps: [
        { description: "Navigate to https://en.wikipedia.org/wiki/Apple_Inc." },
        { description: "Scroll down and look carefully through the 'Founders' section in the infobox or the first few paragraphs" },
        { description: "Find the hyperlink exactly for 'Steve Jobs' and click it" },
        { description: "Wait for the new Wikipedia page to load completely" },
      ],
      assertions: [
        { assertion: "The current page title prominently displays 'Steve Jobs'" },
        { assertion: "The URL of the current page ends with 'Steve_Jobs'" },
        { assertion: "The page contains a biography or infobox detailing the life of Steve Jobs" },
      ],
      test,
      expect,
    });
  });
});
