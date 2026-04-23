import { test, expect } from '@playwright/test';
import { runSteps } from 'passmark';

// ============================================================
// SUITE 1: HOPPSCOTCH — The Developer's API Playground
// Goal: Test real API flows, error states, and edge cases
// ============================================================

test.describe("🔥 Hoppscotch — Breaking the API Playground", () => {

  test("✅ Happy Path — GET request returns 200 OK with valid JSON body", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Send a successful GET request and verify the JSON response",
      steps: [
        { description: "Navigate to https://hoppscotch.io" },
        { description: "Close any welcome popup, cookie banner, or modal by clicking X or pressing Escape" },
        { description: "Find the URL input field (next to the GET method dropdown) and clear it, then type the URL", data: { value: "https://httpbin.org/get" } },
        { description: "Click the Send button and wait until the response panel shows data" },
      ],
      assertions: [
        { assertion: "The response status shows 200 OK" },
        { assertion: "The response body panel shows valid JSON content (curly braces visible)" },
        { assertion: "The response time in milliseconds is shown on the screen" },
      ],
      test,
      expect,
    });
  });

  test("💥 Edge Case — Sending a POST request to verify method selection", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Send a POST request instead of GET and verify the response echoes the POST method",
      steps: [
        { description: "Navigate to https://hoppscotch.io" },
        { description: "Dismiss any modal or popup" },
        { description: "Click on the method dropdown (currently showing GET) and change it to POST" },
        { description: "Clear the URL field and type the URL", data: { value: "https://httpbin.org/post" } },
        { description: "Click the Send button and wait for the response to appear" },
      ],
      assertions: [
        { assertion: "The response status code shows 200 OK" },
      ],
      test,
      expect,
    });
  });

  test("🔴 Error State — Invalid URL triggers a visible error in the UI", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Submit a malformed URL and see if Hoppscotch handles the error gracefully",
      steps: [
        { description: "Navigate to https://hoppscotch.io" },
        { description: "Dismiss any popup" },
        { description: "Clear the URL input and type an invalid URL", data: { value: "not-a-real-url-xyz-broken" } },
        { description: "Click the Send button" },
      ],
      assertions: [
        { assertion: "An error message or warning is displayed on the screen (not a 200 status)" },
        { assertion: "The app does not crash or freeze — the UI remains usable after the failed request" },
      ],
      test,
      expect,
    });
  });

  test("🔐 Auth Flow — Bearer token header is sent correctly", async ({ page }) => {
    test.setTimeout(180_000);

    await runSteps({
      page,
      userFlow: "Add an Authorization header and verify the API echoes it back",
      steps: [
        { description: "Navigate to https://hoppscotch.io" },
        { description: "Dismiss any popup" },
        { description: "Set the URL to", data: { value: "https://httpbin.org/headers" } },
        { description: "Click on the 'Headers' tab in the request builder" },
        { description: "Add a new header row with key 'Authorization'", data: { value: "Authorization" } },
        { description: "Set the header value to", data: { value: "Bearer passmark-hackathon-test-token" } },
        { description: "Click Send and wait for the response" },
      ],
      assertions: [
        { assertion: "The response shows 200 OK" },
        { assertion: "The response body contains a 'headers' object" },
        { assertion: "The word 'passmark-hackathon-test-token' appears somewhere in the JSON response, confirming the header was sent" },
      ],
      test,
      expect,
    });
  });

});
