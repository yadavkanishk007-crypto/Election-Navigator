<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge" alt="Status: Live" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Vanilla-JS-yellow?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/ES-Modules-orange?style=for-the-badge" alt="ES Modules" />
  <img src="https://img.shields.io/badge/Zero-Dependencies-red?style=for-the-badge" alt="Zero Dependencies" />
  <img src="https://img.shields.io/badge/WCAG-2.1_AA-purple?style=for-the-badge" alt="WCAG 2.1 AA" />
  <img src="https://img.shields.io/badge/i18n-5_Languages-teal?style=for-the-badge" alt="5 Languages" />
  <img src="https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="GCP Cloud Run" />
</p>

<h1 align="center">🗳️ Election Navigator</h1>

<p align="center">
  <strong>A non-partisan, interactive, multilingual web application that guides users through the entire election process — from voter registration to the final inauguration.</strong>
</p>

<p align="center">
  Built with a custom <strong>Neon Grid Protocol</strong> design system · WCAG 2.1 AA accessible · Deployed on Google Cloud Run
</p>

---

## 📸 Preview

<p align="center">
  <img src="./screenshots/hero.png" alt="Election Navigator — Hero Section" width="90%" />
</p>

---

## ✨ Features

### 🎓 Adaptive Learning System
- **Three knowledge levels** — Beginner, Intermediate, and Expert
- **Progressive phase unlocking** — complete a quiz to advance to the next phase
- **Real-time progress tracking** — Unicode progress bar (`[████░░░░░░]`) and step-dot tracker update live

### 📚 Four Comprehensive Learning Phases

| Phase | Title | Topics |
|-------|-------|--------|
| 1 | Registration & Eligibility | Who can vote, how to register, key deadlines |
| 2 | Candidates & Platforms | Ballot access, party platforms, candidate research |
| 3 | Voting Mechanics | In-person, early, absentee & electronic voting, ballot security |
| 4 | Counting & Results | Vote counting, certification, recounts, transition of power |

### 🧠 Interactive Quiz Engine
- 12 questions across 4 phases with instant feedback and explanations
- 66% pass threshold with retry and material review options
- Celebration animation on full completion

### 📅 Region-Aware Election Timelines
Pre-built timelines for **🇺🇸 United States**, **🇮🇳 India**, and **🇬🇧 United Kingdom**, plus a universal default timeline for all other countries.

### 🌐 Multi-Language Support (i18n)
Full UI translation for 5 languages with persistent preference:

| Language | Code |
|----------|------|
| English | `en` |
| हिन्दी (Hindi) | `hi` |
| தமிழ் (Tamil) | `ta` |
| తెలుగు (Telugu) | `te` |
| বাংলা (Bengali) | `bn` |

Switch languages via the 🌐 selector in the header — preference is saved to `localStorage`.

### ♿ Accessibility (WCAG 2.1 AA)
- **Skip navigation link** for keyboard users
- **ARIA roles & labels** on every interactive element, section, and modal
- **Focus trapping** inside modal dialogs with focus restore on close
- **Screen reader announcements** via `aria-live` region for quiz results and progress
- **`prefers-reduced-motion`** support — disables all animations
- **`prefers-contrast: more`** support — increases border and text contrast
- **Keyboard navigation** — Tab through all elements, Enter/Space to activate, Escape to close

### 🔒 Security
- **Content Security Policy (CSP)** via `<meta>` tag restricting script and style sources
- **Input sanitization** — all user input stripped of HTML tags, limited length, and escaped
- **XSS prevention** — `escapeHTML()` on every dynamically rendered string, `sanitizeHTML()` whitelist for trusted data
- **Quiz answer validation** — bounds checking via `isValidIndex()`
- **Immutable data** — `Object.freeze()` on all exported data objects
- **Nginx security headers** — `X-Content-Type-Options`, `X-Frame-Options`, `Strict-Transport-Security`, `Permissions-Policy`

### 🧪 Testing
Custom zero-dependency test framework with 44+ tests across 4 suites:

| Suite | Tests | What It Validates |
|-------|-------|-------------------|
| `state.test.js` | 9 | State getters/setters, event bus, immutability |
| `security.test.js` | 14 | XSS escaping, input sanitization, HTML whitelist, index validation |
| `data.test.js` | 10 | Phase/quiz alignment, timeline structure, i18n completeness |
| `accessibility.test.js` | 11 | ARIA roles, skip-link, button labels, form labels, live regions |

Run tests at: `http://localhost:3000/tests/index.html`

### 📊 Google Services Integration
- **Google Analytics 4** — custom event tracking (`level_selected`, `phase_completed`, `quiz_completed`, `region_selected`, `language_changed`)
- **Privacy-respecting** — honors Do Not Track, anonymizes IP, no PII
- **JSON-LD Structured Data** — `WebApplication` + `EducationalApplication` schema for SEO
- **Google Fonts** — optimized loading with `preconnect` and `display=swap`
- **Google Cloud Run** — containerized deployment with CI/CD via Cloud Build

---

## 🏗️ Architecture

```
election-navigator/
│
├── index.html                  ← Slim HTML shell (CSP, ARIA, JSON-LD, GA4)
├── README.md
├── Dockerfile                  ← Alpine Nginx container for Cloud Run
├── nginx.conf                  ← Security headers, gzip, caching
├── cloudbuild.yaml             ← CI/CD pipeline for Cloud Build
├── .eslintrc.json              ← ESLint config (ES2020 modules)
├── .dockerignore
│
├── css/                        ← Presentation Layer
│   ├── tokens.css              ← Design tokens (colors, fonts, spacing)
│   ├── base.css                ← Reset, a11y (skip-link, focus, reduced-motion)
│   ├── layout.css              ← Header, hero, grids, language dropdown, responsive
│   ├── components.css          ← Buttons, cards, modals, quiz UI
│   └── neon-grid.css           ← Terminal aesthetics (glow-tab, unicode bar)
│
├── js/                         ← Logic Layer (ES Modules)
│   ├── main.js                 ← Entry point — wires all modules
│   ├── state.js                ← Centralized state with pub/sub event bus
│   ├── renderer.js             ← Safe DOM rendering (DocumentFragment, escapeHTML)
│   ├── quiz.js                 ← Quiz engine with i18n and validation
│   ├── navigation.js           ← Scroll, modals, focus trap, announcements
│   ├── i18n.js                 ← Language manager (get/set, persistence)
│   ├── security.js             ← Input sanitization, XSS prevention
│   └── analytics.js            ← GA4 event tracking (DNT-aware)
│
├── data/                       ← Data Layer (pure content, frozen)
│   ├── phases.js               ← Phase content (Object.freeze)
│   ├── quizzes.js              ← Quiz questions (Object.freeze)
│   ├── timelines.js            ← Region-specific timelines
│   └── i18n.js                 ← Translations for 5 languages
│
├── tests/                      ← Test Suite
│   ├── test-runner.js          ← Custom framework (describe/it/expect)
│   ├── state.test.js
│   ├── security.test.js
│   ├── data.test.js
│   ├── accessibility.test.js
│   └── index.html              ← Browser-based test runner page
│
└── screenshots/
    └── hero.png
```

### Module Dependency Graph

```
main.js
├── state.js
├── renderer.js ──→ data/phases.js, data/timelines.js, security.js, i18n.js
├── quiz.js ──→ data/quizzes.js, security.js, i18n.js, analytics.js
├── navigation.js (focus trap, announcements)
├── i18n.js ──→ data/i18n.js
├── security.js
└── analytics.js
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 Semantic | Accessible document with ARIA, JSON-LD |
| **Styling** | Vanilla CSS + Custom Properties | Full design system, a11y media queries |
| **Logic** | Vanilla JS ES Modules | Modular, zero-dependency architecture |
| **Typography** | Google Fonts | Inter, Outfit, JetBrains Mono |
| **Analytics** | Google Analytics 4 | Privacy-respecting event tracking |
| **Deployment** | Google Cloud Run | Containerized, auto-scaling |
| **CI/CD** | Google Cloud Build | Automated build & deploy pipeline |
| **Testing** | Custom framework | 44+ tests, browser-based runner |
| **Security** | CSP + Nginx headers | XSS prevention, HSTS, frame protection |
| **i18n** | Custom module | 5 languages, localStorage persistence |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (optional — only for the local dev server)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yadavkanishk007/election-navigator.git
cd election-navigator

# Serve locally
npx -y serve .
```

Then open **http://localhost:3000** in your browser.

### Run Tests

Open **http://localhost:3000/tests/index.html** in your browser to run all 44+ tests.

---

## ☁️ Deploy to Google Cloud

### One-Command Deploy (Cloud Run)

```bash
gcloud run deploy election-navigator \
  --source . \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080
```

### CI/CD with Cloud Build

Push to your connected repo — `cloudbuild.yaml` automatically builds and deploys:

```bash
gcloud builds submit --config cloudbuild.yaml
```

---

## 🔧 Customization Guide

### Adding a New Learning Phase

**1.** Add content in `data/phases.js`:
```js
5: { title: "Post-Election Governance", icon: "🏛️", label: "Phase 5", sections: [...] }
```

**2.** Add quiz questions in `data/quizzes.js`:
```js
5: [{ q: "...", options: ["A","B","C","D"], correct: 1, explanation: "..." }]
```

That's it — progress bar, phase cards, and quiz engine auto-scale.

### Adding a New Region Timeline

Add to `data/timelines.js`:
```js
"australia": [
  { title: "📋 Enrolment", date: "Ongoing", desc: "Enrol via the AEC." },
  ...
]
```

### Adding a New Language

Add a new key in `data/i18n.js`:
```js
mr: {
  meta: { name: "मराठी", dir: "ltr" },
  header: { phases: "टप्पे", timeline: "कालरेषा", quiz: "प्रश्नमंजुषा" },
  // ... all required keys
}
```

### Changing the Theme

Edit `css/tokens.css`:
```css
:root {
  --accent-1: #e11d48;    /* Your brand color */
  --bg-primary: #0f0a0c;  /* Background */
}
```

---

## 📱 Responsive Design

| Breakpoint | Behavior |
|-----------|----------|
| **Desktop** (1024px+) | Full grid, side-by-side hero, all nav buttons |
| **Tablet** (768px–1024px) | 2-column grid, stacked hero |
| **Mobile** (< 480px) | Single column, only language selector in header |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate between interactive elements |
| `Enter` / `Space` | Activate buttons, open phase cards |
| `Escape` | Close any modal, dropdown, or celebration overlay |

---

## 🔐 Security Headers (Production)

When deployed via the included `nginx.conf`, the following headers are set:

| Header | Value |
|--------|-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `X-XSS-Protection` | `1; mode=block` |
| `Referrer-Policy` | `no-referrer` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Kanishk Yadav**

Built with ❤️ as an interactive civic education tool to make democracy accessible and understandable for everyone — in every language.

---

<p align="center">
  <strong>🗳️ Election Navigator</strong> — Making democracy easy to understand, one phase at a time.
</p>
