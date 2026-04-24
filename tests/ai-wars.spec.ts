import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test.describe("🤖 AI Wars — Using Passmark AI to Test Another AI Chatbot", () => {
  // We use huggingface.co/chat because it does not strictly require login and is accessible headless
  test("✅ AI successfully converses with another AI model", async ({ page }) => {
    // Increase timeout to 10 minutes since external AI generation takes significant time
    test.setTimeout(600_000);

    await runSteps({
      page,
      userFlow: "Navigate to HuggingFace chat, prompt the AI with a math problem, and verify it provides the correct answer",
      steps: [
        { description: "Navigate to https://huggingface.co/chat/" },
        { description: "Wait for the page to load completely" },
        { description: "If there is a 'Guest' or 'Try as Guest' button to enter the chat, click it" },
        { description: "Find the main chat input box" },
        { description: "Type the prompt 'What is 55 plus 44?' into the input box", data: { value: "What is 55 plus 44?" } },
        { description: "Press the Enter key or click the send button to submit the message" },
        { description: "Wait for the AI to finish generating its response (this may take up to 20 seconds)" },
      ],
      assertions: [
        { assertion: "The chat interface shows the message we sent ('What is 55 plus 44?')" },
        { assertion: "The AI responds specifically with the number '99'" },
      ],
      test,
      expect,
    });
  });
});
