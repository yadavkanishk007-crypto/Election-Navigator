<p align="center">
  <img src="https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge" alt="Status: Live" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License: MIT" />
  <img src="https://img.shields.io/badge/Vanilla-JS-yellow?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
  <img src="https://img.shields.io/badge/ES-Modules-orange?style=for-the-badge" alt="ES Modules" />
  <img src="https://img.shields.io/badge/Zero-Dependencies-red?style=for-the-badge" alt="Zero Dependencies" />
</p>

<h1 align="center">🗳️ Election Navigator</h1>

<p align="center">
  <strong>A non-partisan, interactive web application that guides users through the entire election process — from voter registration to the final inauguration.</strong>
</p>

<p align="center">
  Built with a custom <strong>Neon Grid Protocol</strong> design system featuring glassmorphism, animated backgrounds, and terminal-inspired aesthetics.
</p>

---

## 📸 Preview

<p align="center">
  <img src="./screenshots/hero.png" alt="Election Navigator — Hero Section" width="90%" />
</p>

> **Live Demo:** Open `index.html` with any modern browser or serve locally with `npx serve .`

---

## ✨ Features

### 🎓 Adaptive Learning System
- **Three knowledge levels** — Beginner, Intermediate, and Expert — so users engage at their comfort level.
- **Progressive phase unlocking** — Complete a quiz to unlock the next phase, enforcing genuine learning.
- **Real-time progress tracking** — Unicode progress bar (`[████░░░░░░]`) and step-dot tracker update live as phases are completed.

### 📚 Four Comprehensive Learning Phases
| # | Phase | Topics Covered |
|---|-------|---------------|
| 1 | **Registration & Eligibility** | Who can vote, how to register, key deadlines |
| 2 | **Candidates & Platforms** | Ballot access, party platforms, candidate research |
| 3 | **Voting Mechanics** | In-person, early, absentee & electronic voting, ballot security |
| 4 | **Counting & Results** | Vote counting, certification, recounts, transition of power |

### 🧠 Interactive Quiz Engine
- **12 quiz questions** across all phases (3 per phase).
- Instant feedback with explanations on every answer.
- **66% pass threshold** — fail gracefully with a retry option and material review link.
- Celebration animation triggers when all phases are completed.

### 📅 Region-Aware Election Timelines
Pre-built timelines for:
- 🇺🇸 **United States** — Primaries → Conventions → Debates → Election Day → Electoral College → Inauguration
- 🇮🇳 **India** — Multi-phase EVM voting, Election Commission announcements, government formation
- 🇬🇧 **United Kingdom** — Parliament dissolution, postal votes, overnight counts

Plus a **universal default timeline** for users from any other country.

### 🎨 Neon Grid Protocol Design
A custom design language featuring:
- **Terminal-inspired typography** — Small caps, monospace headers, unicode decorators (`▌║ ... ║▌`)
- **Glassmorphism cards** — Frosted glass surfaces with backdrop blur
- **Animated background** — Floating orbs with gradient blending and a subtle grid overlay
- **Neon glow effects** — Rose/magenta accent palette with glowing status tabs
- **Micro-animations** — Hover transforms, smooth transitions, and a celebration overlay

---

## 🏗️ Architecture

The codebase follows a strict **separation of concerns** — data, logic, and presentation are fully decoupled.

```
election-navigator/
│
├── index.html                  ← Slim HTML shell (no hardcoded content)
├── README.md                   ← You are here
│
├── css/                        ← Presentation Layer
│   ├── tokens.css              ← Design tokens (colors, fonts, spacing, shadows)
│   ├── base.css                ← CSS reset, body styles, utility classes
│   ├── layout.css              ← Header, hero, grids, footer, responsive breakpoints
│   ├── components.css          ← Buttons, cards, modals, quiz UI, progress tracker
│   └── neon-grid.css           ← Neon Grid Protocol (terminal, glow-tab, unicode bar)
│
├── js/                         ← Logic Layer (ES Modules)
│   ├── main.js                 ← Entry point — imports, event wiring, initialization
│   ├── state.js                ← Centralized state store with pub/sub event bus
│   ├── renderer.js             ← Dynamic DOM rendering (phases, progress, timeline, modals)
│   ├── quiz.js                 ← Self-contained quiz engine (start, answer, score, results)
│   └── navigation.js           ← Scroll management, modal controls, keyboard shortcuts
│
└── data/                       ← Data Layer (pure content, no logic)
    ├── phases.js               ← Phase content (titles, sections, lists, info boxes)
    ├── quizzes.js              ← Quiz questions, options, correct answers, explanations
    └── timelines.js            ← Region-specific election timelines
```

### Module Dependency Graph

```
main.js
├── state.js            (state management)
├── renderer.js         (DOM rendering)
│   ├── data/phases.js
│   ├── data/timelines.js
│   └── state.js
├── quiz.js             (quiz engine)
│   ├── data/quizzes.js
│   ├── data/phases.js
│   ├── state.js
│   ├── navigation.js
│   └── renderer.js
└── navigation.js       (scroll, modals, keyboard)
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Structure** | HTML5 Semantic | Accessible document structure |
| **Styling** | Vanilla CSS + Custom Properties | Full design system with zero dependencies |
| **Logic** | Vanilla JavaScript (ES Modules) | Modular architecture with native `import/export` |
| **Typography** | Google Fonts | [Inter](https://fonts.google.com/specimen/Inter), [Outfit](https://fonts.google.com/specimen/Outfit), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) |
| **Build** | None | Zero build step — runs directly in the browser |
| **Dependencies** | None | Completely self-contained |

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari)
- [Node.js](https://nodejs.org/) (optional, only for the local dev server)

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/election-navigator.git
cd election-navigator

# Serve locally (any static server works)
npx -y serve .
```

Then open **http://localhost:3000** in your browser.

> **Alternative:** Simply open `index.html` directly in your browser — no server required for basic functionality.

---

## 🔧 Customization Guide

### Adding a New Learning Phase

**Step 1:** Add phase content in `data/phases.js`:

```js
5: {
  title: "Post-Election Governance",
  icon: "🏛️",
  label: "Phase 5",
  sections: [
    {
      heading: "What Happens After? 📋",
      text: "The transition period involves several critical steps...",
      list: ["Cabinet appointments", "Policy briefings", "Inaugural preparations"]
    }
  ]
}
```

**Step 2:** Add matching quiz questions in `data/quizzes.js`:

```js
5: [
  {
    q: "What happens during the transition of power?",
    options: ["Nothing", "Briefings and appointments", "A new election", "Vacation"],
    correct: 1,
    explanation: "The transition includes briefings, appointments, and preparation for governance."
  }
]
```

**That's it.** The progress bar, phase cards, navigation, and quiz engine all auto-scale.

---

### Adding a New Region Timeline

Add a new entry in `data/timelines.js`:

```js
"australia": [
  { title: "📋 Electoral Enrolment", date: "Ongoing", desc: "Enrol through the AEC website." },
  { title: "🗳️ Election Day", date: "Always a Saturday", desc: "Voting is compulsory in Australia." },
  // ...
]
```

The region input auto-detects and displays it.

---

### Changing the Theme

Edit `css/tokens.css` — every color, font, spacing value, and shadow is defined there as a CSS custom property:

```css
:root {
  --accent-1: #e11d48;    /* Change to your brand color */
  --accent-2: #f43f5e;
  --bg-primary: #0f0a0c;  /* Dark background */
  --font-display: 'Outfit', sans-serif;
}
```

---

## 📱 Responsive Design

The application is fully responsive across all device sizes:

| Breakpoint | Layout |
|-----------|--------|
| **Desktop** (1024px+) | Full grid layout, side-by-side hero |
| **Tablet** (768px–1024px) | 2-column phase grid, stacked hero |
| **Mobile** (< 768px) | Single column, compact cards, touch-friendly buttons |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Escape` | Close any open modal or celebration overlay |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Kanishk Yadav**

Built with ❤️ as an interactive civic education tool to make democracy accessible and understandable for everyone.

---

<p align="center">
  <strong>🗳️ Election Navigator</strong> — Making democracy easy to understand, one phase at a time.
</p>
