# Beebleet — Frontend (Test Assignment)

**Demo:** [https://beebleet-frontend.vercel.app/](https://beebleet-frontend.vercel.app/)

---

## Overview

This repository contains the frontend part of the test assignment. It provides a page builder-style editor with drag & drop support, image upload and cropping, basic text formatting tools, and custom keyboard shortcuts.

---

## Demo

Live demo: [https://beebleet-frontend.vercel.app/](https://beebleet-frontend.vercel.app/)

---

## Installation

Install dependencies (example using pnpm):

```bash
pnpm install
# or
npm install
# or
yarn install
```

## Run (development)

Start the development server:

```bash
pnpm run dev
# or
npm run dev
# or
yarn dev
```

## Build (production)

To create a production build:

```bash
pnpm run build
# or
npm run build
# or
yarn build
```

To run the production build locally (if applicable):

```bash
pnpm run start
# or
npm run start
# or
yarn start
```

---

## Features / What I implemented

- Interactive rich-text editor with formatting buttons (bold, italic, etc.) and custom keyboard shortcuts.
- Drag & drop support for sections and cards.
- Image upload with client-side cropping.
- Global state managed with React Context (no extra state-management libraries used).
- UI built with component library and Tailwind CSS for easy customization.

---

## Libraries used (and why)

- **[Tiptap](https://tiptap.dev/)** — Rich-text editor. I included the necessary editing controls and wired up keyboard shortcuts for some actions.
- **[dndkit](https://dndkit.com/)** — Drag & drop. Chosen for active maintenance and modern API. I used core `dndkit` methods for general lists/sections, and the official React packages for image dragging which simplified the implementation.
- **react-easy-crop** — Image cropping during upload. Selected because it is up-to-date on npm and simple to integrate.
- **shadcn/ui** ([ui.shadcn.com](https://ui.shadcn.com/)) — UI components with excellent Tailwind CSS support and easy customization.

---

## Notes on image handling

- I did **not** perform client-side image optimization during upload. I believe image optimization is better handled on the server or via a CDN/image proxy to avoid additional load on the user's device and to centralize processing.
- Cropping is performed client-side using `react-easy-crop`; final optimization/compression should be performed server-side before long-term storage or delivery.

---

## State management decisions

I used plain React Context for global state because the application did not require a complex global state manager. This keeps the project lightweight and easy to reason about. If the app grows in complexity, replacing Context with a more feature-rich solution (e.g., Zustand, Jotai, or Redux) would be straightforward.

---

## Keyboard shortcuts

- **Bold:** `Ctrl + B`
- **Italic:** `Ctrl + I`

(On hover, a tooltip shows a hotkey that can also be used)
