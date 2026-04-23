# I Built 25 AI Tests to Break the Internet (And What It Taught Me About Passmark)

Testing apps used to be about finding the perfect CSS selector. Today, it’s about writing good prompts.

For the **Breaking Apps Hackathon** (hosted by Hashnode and sponsored by Bug0), I didn't want to just test a simple React to-do app. I wanted to see if **Passmark** — the new AI-native testing framework — could handle the most complex, un-testable, and weirdest parts of the internet.

So, I built a brutal 25-suite E2E testing gauntlet spanning 8 different platforms. My goal? Find out exactly where AI-driven testing shines, and exactly where it falls apart.

---

## Phase 1: The Bread and Butter (Traditional Apps)
I started by testing standard web applications to see if Passmark could replace traditional Playwright/Cypress workflows. 

### 1. Vercel Commerce (E-Commerce)
**The Test:** Navigate to the demo store, pick a product, verify consistent pricing, and test the cart state.
**The Result:** 🟢 **Passed.** Passmark handled the dynamic routing and Next.js SPA transitions flawlessly. No need to assert `div.text-2xl.font-bold` for pricing; I literally just wrote `expect("The product item has a price and a picture")`.

### 2. GitHub (Open Source Ecosystems)
**The Test:** Search for the Passmark repo, check stars, and verify the `CONTRIBUTING.md` displays correctly.
**The Result:** 🟢 **Passed.** Passmark understood the difference between a repository search result and the actual code pages without writing any explicit xpath selectors.

### 3. Hoppscotch (Complex API Clients)
**The Test:** Switch HTTP methods to POST, add a JSON payload, and read the network tab response visually.
**The Result:** 🟢 **Passed.** The AI understood complex UI elements like dropdowns and code editors natively.

---

## Phase 2: The Meta-Tests
To really test the framework, I tested the framework *with* the framework.
### 4. Passmark & Bug0 Sites
**The Test:** Use Passmark to test the Passmark documentation and the Bug0 sponsor platform.
**The Result:** 🔴 **Failed (in a good way).** I told Passmark to look for "numbered step lists" in the Quick Start guide. It failed the test, telling me: *"The section uses paragraphs and code blocks, but it does not use numbered steps."* This proved Passmark isn't just "fuzzy" AI hallucinating successes; it holds UI to strict standards.

---

## Phase 3: The Untestable Internet
To finish the hackathon, I pushed the library to its absolute breaking point. Here is where things got wild.

### 5. The Canvas Crusher: Excalidraw
Canvas apps (and WebGL apps) are nightmares for traditional E2E frameworks because there is no DOM to parse. It's just pixels on a `<canvas>` tag!
**The Test:** Navigate to Excalidraw, click the text tool in the top toolbar, place a random text box on the canvas, and type "Passmark Canvas Test".
**The Result:** 🟢 **Passed.** Passmark’s underlying visual capabilities successfully identified the text tool icon from pixels alone, clicked the canvas, and validated the result. Mind-blowing.

### 6. The 1-Million Token Speedrun: Wikipedia
**The Test:** Play the Wikipedia game. Start at the **Apple Inc.** page and click links to reach the **Steve Jobs** page without using search.
**The Result:** 🔴 **Failed.** The error? `The input token count exceeds the maximum number of tokens allowed 1048576.` The Apple Wikipedia page DOM is so incredibly massive it literally blew past the 1 Million token Context Window limit. A fascinating look at the boundaries of LLM context limits natively!

### 7. The Host Test: Hashnode
**The Test:** Test Hashnode's search functionality.
**The Result:** 🔴 **Failed.** Hashnode's underlying Cloudflare bot protection is so good it detected the headless Chromium instance and stopped it from loading dynamic elements natively. A massive win for Hashnode's security!

---

## What Does This Prove?

Passmark is a massive leap forward. Assertions written in plain English work beautifully. You don't need `data-testid` anymore. It abstracts away the fragile parts of Playwright and lets you focus on *user-intent*.

### My Takeaways for 2026:
1. **Passmark is incredibly powerful for Canvas/Visual apps.** If your app uses WebGL or Canvas, this is basically the only reliable way to write tests fast.
2. **Beware of the DOM Token limit.** Extremely heavy legacy sites can nuke your token counts, costing you severely if you aren't using the provided Hackathon API keys. 
3. **Bot Protection is getting smarter.** As we move towards AI-agent automation, the arms race between AI automation (Passmark) and Bot Protection (Cloudflare) will become the defining infrastructure struggle for QA engineers.

I pushed my full test suite to GitHub so you can run the massive 25-suite coverage yourself. Huge thanks to @bug0inc and Hashnode for organizing the Breaking Apps Hackathon. Writing tests has literally never been fun until today.
