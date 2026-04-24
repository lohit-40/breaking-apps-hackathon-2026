# I Built 25 AI Tests to Break the Internet (And What It Taught Me About Passmark)

Testing modern web applications used to be a frustrating game of cat-and-mouse. You spend hours writing the perfect CSS selectors or XPaths, only for a minor UI update to break your entire CI/CD pipeline. 

For the **Breaking Apps Hackathon** (hosted by Hashnode and sponsored by Bug0), I set out to see if **Passmark** — the open-source AI-native testing framework — could finally solve this. But I didn't want to just test a simple React to-do app. I wanted to throw the most complex, untestable, and edge-case-heavy parts of the internet at it.

So, I built a brutal 25-suite E2E testing gauntlet spanning 8 different massive platforms. My goal? Find out exactly where AI-driven testing shines, and exactly where it falls apart.

Here is what happened.

---

## Phase 1: The Bread and Butter (Traditional Apps)
Before testing, I configured Passmark to route all AI traffic through OpenRouter using the `configure()` utility. This simple flag allowed me to dynamically shift between Gemini Flash and Claude 3.5 Sonnet depending on the AI effort required.

```typescript
import { configure } from "passmark";

configure({
  ai: {
    gateway: "openrouter"
  }
});
```

### 1. Vercel Commerce (Complex E-Commerce SPA)
**The Challenge:** E-commerce sites are highly dynamic. Prices render conditionally, and Next.js SPAs have aggressive client-side routing.
**The Test:** I instructed Passmark to navigate the Vercel demo store, select a product, and verify that the pricing format remains perfectly consistent between the home page list and the deep product detail page.
**The Result:** 🟢 **Passed.** 
Instead of writing fragile `.price-tag-wrapper > span` locators, Passmark allowed me to just write assertions like this:
```typescript
assertions: [
  { assertion: "The product detail page shows a price" },
  { assertion: "The price format is consistent (e.g., shows $ symbol and decimal format)" },
]
```
The AI engine perfectly evaluated the screen visually and semantically. 

### 2. GitHub & Hoppscotch (Open Source & API Clients)
**The Challenge:** Hoppscotch's web app is essentially an IDE in the browser—dropdowns, nested tabs, and code editors.
**The Test:** I forced Passmark to change an HTTP method from GET to POST via a dropdown, input a JSON payload into the body editor, and extract the response.
**The Result:** 🟢 **Passed.** It flawlessly understood complex UI elements natively, completely bypassing the need to reverse-engineer their nested `div` structure.

---

## Phase 2: The Meta-Tests
You can't test a testing framework without testing the framework itself.

### 4. Passmark & Bug0 Sites
**The Challenge:** Can Passmark evaluate documentation accuracy?
**The Test:** Use Passmark to test the Passmark documentation. I intentionally wrote an assertion that demanded strict formatting: `"There are numbered steps or a list explaining how to set up Passmark"`.
**The Result:** 🔴 **Failed (in a good way).** 
It failed the test gracefully, returning an incredibly detailed error: 
> *"The section provides setup instructions using paragraphs and code blocks, but it does not use numbered steps or a bulleted list format as specifically requested by the assertion."*

This proved Passmark isn't just "fuzzy" AI hallucinating successes; it holds your UI to incredibly strict, literal standards.

---

## Phase 3: The Untestable Internet
To finish the hackathon, I pushed the library to its absolute breaking point. Here is where things got wild.

### 5. The Canvas Crusher: Excalidraw (The Holy Grail)
**The Challenge:** Canvas apps and WebGL apps are nightmares for traditional E2E frameworks. Tools like Playwright and Selenium rely on the DOM tree. But a `<canvas>` element hides everything; it's just painted pixels. You usually have to resort to fragile pixel-matching algorithms.

**The Test:** Navigate to **Excalidraw.com**, find the text tool visually, place a text box, and type "Passmark Canvas Test".

Here is the exact code snippet from my test:
```typescript
import { test, expect } from "@playwright/test";
import { runSteps } from "passmark";

test("🎨 Passmark interacts successfully with a Canvas-based app (Excalidraw)", async ({ page }) => {
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
    assertions: [
      { assertion: "The toolbar contains recognizable drawing tools (like pen, rectangle, text)" },
      { assertion: "The text 'Passmark Canvas Test' was successfully placed and is visible on the screen" },
    ],
    test,
    expect,
  });
});
```

**The Result:** 🟢 **Passed.** 
Passmark’s underlying visual capabilities successfully identified the text tool icon from pixels alone, clicked the canvas, and validated the text on screen. This is a monumental shift in QA automation. What used to be impossible for standard testing frameworks was solved with 6 lines of plain English.

### 6. The 1-Million Token Speedrun: Wikipedia
**The Challenge:** How much contextual DOM can the underlying LLM vision actually handle? Let's play the Wikipedia Game.
**The Test:** Start at the **Apple Inc.** Wikipedia page and click links to reach the **Steve Jobs** page without using the search bar.
**The Result:** 🔴 **Failed.** 
The error returned was: `The input token count exceeds the maximum number of tokens allowed 1048576.` 
The Apple Wikipedia page DOM is so incredibly massive and dense that it literally blew past the 1 Million token Context Window limit. A fascinating, explicit look at the boundaries of LLM context limits when parsing legacy web infrastructure!

### 7. The Host Test: Hashnode
**The Challenge:** Can we test the Hashnode search bar automatically?
**The Result:** 🔴 **Failed.** Hashnode's underlying Cloudflare bot protection is top-tier. It detected the headless Chromium instance running Passmark and stopped it from loading dynamic elements. A massive win for Hashnode's security, and a reminder that testing production environments requires bypassing anti-bot measures.

---

## Phase 4: Hard Metrics (Latency & Cost)
AI testing sounds amazing in theory, but what happens when you run it? Here are the brutal, no-sugarcoating metrics from my test runs.

*   **Latency vs Traditional Playwright:** The Excalidraw Canvas test took exactly **1.8 minutes (108 seconds)** to execute from start to finish. A traditional DOM-based Playwright test takes about **5 seconds**. AI testing is *slow* on a cold run because it has to capture screenshots and run LLM inferences for every step.
*   **The Cache Rate is the Cost Rate:** Passmark uses a Redis cache. If a test flow is deterministic and cached, the runtime drops back down to traditional Playwright speeds (zero AI calls). However, highly dynamic multi-step flows often miss the cache. If your cache hit rate is only 15%, you are paying OpenRouter token costs on 85% of your steps on every CI run. 

---

## The Verdict: What Does This Prove?

Passmark is a massive leap forward. Assertions written in plain English are not a gimmick; they are the future of QA. It abstracts away the fragile, frustrating ecosystem of DOM parsing and lets engineers focus entirely on *user-intent*.

### The Hybrid Production Strategy for 2026
You shouldn't replace your entire testing suite with Passmark today, but you absolutely should adopt a **Hybrid Model**:
1.  **Use Traditional Playwright (Selectors)** for ultra-fast, deterministic, high-volume CI/CD pipelines (like Payment flow validations) where speed is everything.
2.  **Use Passmark (AI)** for complex WebGL/Canvas apps, dynamic exploratory user flows, and nightly visual regression runs where maintenance costs traditionally outweigh the benefits of writing tests. Let the AI handle the brittle UI layers that change every sprint.

### My Takeaways:
1. **Passmark is the Holy Grail for Canvas/Visual apps.** If your app uses WebGL, charts, vector maps, or Canvas, this is basically the most reliable way to write tests. Period.
2. **Beware of the DOM Token limit.** Extremely heavy, unoptimized legacy sites will nuke your token counts. Structuring pages hierarchically is more important than ever for AI accessibility.
3. **The new arms race.** As we move towards AI-agent automation, the ongoing battle between AI automation (like Passmark) and Bot Protection (like Cloudflare) will define web infrastructure for the next decade.

I pushed my full test suite to GitHub so you can run all 25 edge-cases yourself. You can find the repository linked below.

Huge thanks to the **Bug0** team and **Hashnode** for organizing the Breaking Apps Hackathon. Writing tests has literally never been this much fun.

*(👉 **GitHub Repository:** [Insert your GitHub URL here]*
