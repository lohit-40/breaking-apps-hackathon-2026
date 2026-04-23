# 🔥 Breaking Apps Hackathon — AI-Powered Test Suite

> **Submission for the [Breaking Apps Hackathon](https://hashnode.com/hackathons/breaking-things) by Bug0**  
> Using [Passmark](https://passmark.dev) — the open-source AI testing library — to break 5 popular web apps.

---

## 🎯 The Approach: "Break Everything With Plain English"

Instead of testing a single app, this submission takes a **multi-app narrative approach**:  
I used Passmark to write AI-driven test suites for **5 different web apps**, covering happy paths, error states, edge cases, and even a **meta-test** (using Passmark to test Passmark itself).

---

## 📦 Test Suites

| File | App Tested | # Tests | Creative Angle |
|------|-----------|---------|----------------|
| `hoppscotch.spec.ts` | [Hoppscotch](https://hoppscotch.io) | 4 | GET/POST/Auth/Error flows |
| `hashnode.spec.ts` | [Hashnode](https://hashnode.com) | 4 | Testing the hackathon platform itself 🤯 |
| `meta-passmark-bug0.spec.ts` | [Passmark Docs](https://passmark.dev) + [Bug0](https://bug0.com) | 5 | Using Passmark to test Passmark (recursive!) |
| `github.spec.ts` | [GitHub](https://github.com) | 4 | Testing the home of open-source code |
| `vercel-commerce.spec.ts` | [Vercel Commerce](https://demo.vercel.store) | 5 | End-to-end shopping cart journey |

**Total: 22 tests across 5 apps**

---

## 🚀 Running the Tests

### Prerequisites
- Node.js 18+
- An OpenRouter API key (free for hackathon participants — [register here](https://hashnode.com/hackathons/breaking-things))

### Setup
```bash
# Clone this repo
git clone <your-repo-url>
cd breaking-apps-hackathon

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install chromium

# Add your API key to .env
echo "OPENROUTER_API_KEY=sk-or-your-key-here" > .env
```

### Run All Tests
```bash
npx playwright test --project chromium
```

### Run a Specific Suite
```bash
# Just Hoppscotch
npx playwright test hoppscotch --project chromium

# Just the meta test (Passmark testing Passmark!)
npx playwright test meta-passmark-bug0 --project chromium

# E-commerce journey
npx playwright test vercel-commerce --project chromium
```

### View the HTML Report
```bash
npx playwright show-report
```

---

## 💡 What Makes This Submission Different

1. **Multi-app coverage** — 5 apps, 22 tests, comprehensive real-world flows
2. **Meta test** — Used Passmark to test the Passmark docs site itself  
3. **Error state testing** — Not just happy paths; we test what happens when things break
4. **Sponsor engagement** — We tested Bug0.com, the hackathon sponsor's own platform
5. **Platform testing** — We tested Hashnode itself, the platform hosting this hackathon
6. **Meaningful assertions** — Every test has 3-5 specific assertions, not just "page loaded"

---

## 📋 Submission Checklist

- [x] ⭐ Starred and forked [bug0inc/passmark](https://github.com/bug0inc/passmark)
- [x] 🧪 Passmark test suite written for 5 web apps
- [x] 📁 Code pushed to GitHub
- [ ] ✍️ Hashnode article published with `#BreakingAppsHackathon`
- [ ] 📢 Shared on X/LinkedIn, tagged @bug0inc
- [ ] 🚀 Article submitted on hackathon page before May 10, 11:59 PM PT

---

## 📖 Hashnode Article

> *Coming soon — link will be added here after publication*

---

## 🛠️ Tech Stack

- [Passmark](https://passmark.dev) — AI-powered test steps in plain English
- [Playwright](https://playwright.dev) — Browser automation
- [OpenRouter](https://openrouter.ai) — AI gateway (free credits from hackathon)
- TypeScript

---

*Built for the Breaking Apps Hackathon 2026 — [hashnode.com/hackathons/breaking-things](https://hashnode.com/hackathons/breaking-things)*
