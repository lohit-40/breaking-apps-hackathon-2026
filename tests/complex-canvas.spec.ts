import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test.describe("🎨 Canvas Crusher — Testing Non-DOM Interactive Web Apps", () => {
  test("✅ Passmark interacts successfully with a Canvas-based app (Excalidraw)", async ({ page }) => {
    test.setTimeout(240_000);

    await runSteps({
      page,
      userFlow: "Verify that Passmark can navigate the UI of a canvas-based application",
      steps: [
        { description: "Navigate to https://excalidraw.com/" },
        { description: "Wait until the main canvas and toolbars are fully loaded" },
        { description: "Look for any modal welcoming the user and close it if it exists" },
        { description: "Click on the 'Text' tool icon in the upper toolbar" },
        { description: "Click somewhat randomly in the middle of the main screen to place a text box" },
        { description: "Type the word 'Passmark Canvas Test'", data: { value: "Passmark Canvas Test" } },
      ],
      effort: "high",
      assertions: [
        { assertion: "The toolbar contains recognizable drawing tools (like pen, rectangle, text)" },
        { assertion: "The text 'Passmark Canvas Test' was successfully placed and is visible on the screen" },
      ],
      test,
      expect,
    });
  });
});
