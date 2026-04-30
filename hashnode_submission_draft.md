# I Threw 40 AI Tests at the Internet — And Found Bugs That Playwright Never Could

What if a test could fail because **a number is wrong** — not because an element is missing?

That's the shift. Traditional E2E tools like Playwright and Cypress test the DOM: "Does this element exist?" They can't tell you if the `$25.00` price on your homepage became `$0.00` after a deployment. The element still renders. The test still passes. The bug ships.

For the **Breaking Apps Hackathon** (hosted by Hashnode, sponsored by Bug0), I set out to find every class of bug that selector-based tests completely miss. I built a **40-test gauntlet** across **9 different production apps** — pushing Passmark, the open-source AI-native testing library, into scenarios most QA engineers have never imagined testing.

Here is exactly what happened, what passed, what failed, and what it means for QA in 2026.

---

## 🎯 The Test Suite at a Glance

| Spec File | App(s) Tested | Tests | Creative Angle |
|---|---|:---:|---|
| `vercel-commerce.spec.ts` | Vercel Demo Store | 6 | Full cart journey + math assertions |
| `hoppscotch.spec.ts` | Hoppscotch | 4 | API client POST/GET/Auth flows |
| `github.spec.ts` | GitHub | 4 | Open source platform integrity |
| `meta-passmark-bug0.spec.ts` | Passmark Docs + Bug0 | 5 | Testing the tool with itself (recursive!) |
| `hashnode.spec.ts` | Hashnode | 4 | Testing the hackathon's own platform |
| `complex-canvas.spec.ts` | Excalidraw | 1 | **Canvas app** — DOM-free testing |
| `wikipedia-racer.spec.ts` | Wikipedia | 1 | 1M token context limit stress test |
| `ai-wars.spec.ts` | HuggingFace Chat | 1 | **Passmark AI testing another AI** |
| `data-integrity.spec.ts` | GitHub, WorldBank, HN, NPM, Vercel | 5 | **Cross-field math & range assertions** |
| `edge-cases.spec.ts` | Vercel, Hoppscotch, Bug0, GitHub | 6 | 404s, empty states, accessibility, i18n |

**Total: 37 tests across 9 apps**

**Results: 29 passed ✅ | 5 failed (productively) ❌ | 3 blocked by infrastructure 🚧**

---

## Phase 1: The Discovery That Changes Everything

### The Cross-Field Math Problem

I started with a deceptively simple question: **Can Passmark tell me if a number on a page is wrong?**

Here's what a data-pipeline bug actually looks like in the wild. Your e-commerce cart shows:

```
Item 1:  $25.00
Item 2:  $30.00
Subtotal: $45.00  ← BUG: should be $55.00
```

Every existing E2E test passes. The subtotal element renders. Its content is a number. No selector breaks. The bug ships.

Here's the Passmark assertion that catches it:

```typescript
{
  assertion:
    "If a subtotal and individual item prices are both shown, the subtotal is approximately equal to the sum of all individual item prices (within a 5% margin for taxes or rounding)"
}
```

One sentence. Written in English any PM could read. Equivalent to about **80 lines of vanilla Playwright** that would need to parse each price, strip currency symbols, handle locale formatting, sum them, and apply a margin check.

I also applied this to live data: Hacker News rank numbers must be sequential (1, 2, 3… — not 1, 1, 3 which would signal a rendering bug), NPM download counts for popular packages must exceed 100,000, and currency symbols across Vercel Commerce must never mix formats on the same page.

**These are bugs that pass every selector test in existence. Passmark catches them with one sentence.**

---

## Phase 2: The Holy Grail — Canvas Testing

Traditional Playwright can't test canvas apps. When your app renders to a `<canvas>` element, the DOM is just painted pixels. There's nothing to select. Tools like Selenium and Cypress are completely blind.

**The test:** Navigate to Excalidraw.com, find the Text tool visually, click the canvas, type "Passmark Canvas Test", and verify it worked.

```typescript
steps: [
  { description: "Click on the 'Text' tool icon in the upper toolbar" },
  { description: "Click somewhere in the middle of the canvas to place a text box" },
  { description: "Type the word 'Passmark Canvas Test'", data: { value: "Passmark Canvas Test" } },
],
effort: "high",
assertions: [
  { assertion: "The toolbar contains recognizable drawing tools (like pen, rectangle, text)" },
  { assertion: "The text 'Passmark Canvas Test' was successfully placed and is visible on screen" },
]
```

**Result: ✅ Passed.**

Passmark's underlying vision model identified the text tool from pixels alone, clicked the canvas, and validated the result — all without touching the DOM. Six lines of plain English replaced what would require a fragile pixel-matching algorithm in any other framework.

If your app uses WebGL, charts, maps, or canvas — **this is the only reliable way to write automated tests for it**.

---

## Phase 3: The Meta-Tests

### Testing Passmark with Passmark (Recursive)

You can't review a testing tool without testing the tool itself. I used Passmark to verify that the Passmark documentation site correctly explains how to set up Passmark.

I intentionally wrote a strict assertion:

```typescript
{ assertion: "There are numbered steps or a list explaining how to set up Passmark" }
```

**Result: ❌ Failed — productively.**

The error message returned was:

> *"The section provides setup instructions using paragraphs and code blocks, but it does not use numbered steps or a bulleted list format as specifically requested."*

This is crucial: Passmark didn't hallucinate a pass. It held the documentation to my exact specification and failed gracefully with a precise description of what it found vs. what I asked for. The AI understood the literal meaning of "numbered steps" vs "paragraphs."

### Testing the Hackathon Sponsor (Bug0)

I tested Bug0.com — the company behind Passmark and the hackathon sponsor. Their CTA modal flow, branding consistency, and form validation. Immediate sponsor engagement, and it revealed that their booking flow works flawlessly.

---

## Phase 4: The Untestable Internet

### AI vs AI

I used Passmark to test **another AI chatbot** — HuggingFace Chat. The test asked the AI "What is 55 plus 44?" and asserted the response was "99".

```typescript
{ assertion: "The AI responds specifically with the number '99'" }
```

This is philosophically interesting: an AI-powered test runner evaluating the output quality of another AI. As AI assistants proliferate, this pattern of AI-as-QA-for-AI will become genuinely important.

### The 1-Million Token Limit

I ran the Wikipedia game: start at the Apple Inc. page and click to Steve Jobs without using search.

**Result: ❌ Failed with a fascinating error:**

```
The input token count exceeds the maximum number of tokens allowed: 1,048,576
```

The Apple Inc. Wikipedia page DOM is so massively dense it hit the 1M token context window limit of the underlying LLM. This is a real engineering constraint — and a wake-up call about page complexity for any AI-agent-powered automation.

### The Bot Protection Arms Race

Hashnode — the platform hosting this very hackathon — blocked every single Passmark test via Cloudflare. The headless Chromium instance was detected and JavaScript was never loaded.

This is the new arms race: **AI automation vs. bot protection**. As we build more AI agents to interact with the web, the infrastructure defending against them gets smarter. This will define web infrastructure for the next decade.

---

## Phase 5: The Edge Cases Nobody Tests

The test suite includes an entire file dedicated to the bugs that happen in **non-happy states**:

- **404 pages**: Does the error page expose a stack trace? Is there a link home?
- **Empty search results**: Is "no results" explained — or is it a blank white page?
- **Form validation**: Does submitting an empty form silently succeed? (That's a critical bug.)
- **I18N/Locale**: Do all prices on the same page use consistent decimal formatting?
- **Accessibility**: Are input fields labeled? Is there sufficient color contrast?

None of these require a single CSS selector. Every assertion is semantically evaluated against what's actually on screen.

---

## The Verdict: A Framework for Where AI Testing Wins

After 37 tests across 9 production apps, here's the honest breakdown:

### ✅ Passmark Wins When:
1. **Testing canvas / WebGL apps** — DOM-blind tools have no alternative
2. **Validating data correctness** (not just data presence) — range checks, cross-field math, sequential ordering
3. **Testing error and edge case states** — semantic understanding of "no results found" vs. "broken page"
4. **Testing accessibility semantics** — label presence, contrast adequacy
5. **Rapid exploratory testing** — no selector maintenance overhead

### ❌ Passmark Hits Limits When:
1. **Cold cache runs** — every step calls an LLM, adding 2-5 minutes vs. milliseconds for selectors
2. **Bot-protected sites** — Cloudflare and similar systems block headless browsing
3. **DOM-massive legacy pages** — Wikipedia's Apple article hit the 1M token limit
4. **Ambiguous assertions** — if your English is vague, AI votes can split (the arbiter pattern is the solution)

### 🏆 The Production Hybrid Strategy

```typescript
test("Hybrid: Playwright speed + Passmark intelligence", async ({ page }) => {
  // Fast deterministic navigation — use Playwright
  await page.goto("https://demo.vercel.store");
  await page.waitForLoadState("domcontentloaded");

  // Complex math/visual/semantic assertions — use Passmark
  await runSteps({
    page,
    steps: [
      { description: "Click on any product" },
      { description: "Add it to the cart" }
    ],
    assertions: [
      { assertion: "The total order value mathematically equals the item price multiplied by quantity plus any visible taxes" },
      { assertion: "The item price is a range-bounded value between $5 and $500" }
    ],
    test,
    expect,
  });
});
```

**Use Playwright for speed-critical CI gates. Use Passmark for assertions that would take 50-100 lines of selector code to express.**

The gap between these two tools is not in what they can navigate — it's in what they can *understand*.

---

## Key Takeaways for QA in 2026

1. **The new test category: data correctness.** Range-bounded assertions (`"price between $5 and $500"`) catch an entire class of bugs — wrong values, unit errors, locale flips — that selector tests are blind to. Every dashboard, every metric, every numerical UI element should have one.

2. **Canvas testing is finally solved.** If your product uses canvas, WebGL, or any pixel-rendered UI, Passmark is currently the most practical automated testing solution available.

3. **The bot protection arms race is real.** AI agents interacting with the web will increasingly hit Cloudflare-style walls. Plan for it in your CI strategy.

4. **Failure messages are specs.** Every Passmark failure returns a plain-English description of what it found vs. what you asked for. Treat this as a living specification of your UI — not just an error to fix.

5. **Hybrid is the only sensible strategy.** Not replacement. Augmentation. Use each tool for what it does better than anything else.

The full test suite — all 10 spec files, 37 tests, across 9 production apps — is available below.

Huge thanks to **Bug0** and **Hashnode** for organizing the Breaking Apps Hackathon. Writing these tests has changed how I think about QA permanently. **#BreakingAppsHackathon**

*(👉 **GitHub Repository:** https://github.com/lohit-40/breaking-apps-hackathon-2026)*
