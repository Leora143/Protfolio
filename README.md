# Jisna P J · Portfolio

Personal portfolio built with **React 19, TypeScript, Vite and Tailwind CSS v4**.

Design direction: plain-spoken, exact, a little warm. A printed résumé in ink and paper: burgundy and cream, a serif for large headlines,
a mono for dates and index marks. Quiet surfaces, hairline borders, no gradients, no glow. Light mode is cream paper with burgundy ink.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build locally
```

Needs Node 20 or newer.

## Where to change things

| What | Where |
| --- | --- |
| Name, email, GitHub, location | `src/data/portfolio.ts` → `profile` |
| Skills, experience, projects, education, certifications | `src/data/portfolio.ts` |
| Project links | add `demo` and `code` URLs to a project in `portfolio.ts`, the buttons appear automatically |
| Your photo | put `profile.jpg` (4:5, at least 800 x 1000) in `public/` and set `photo: "/profile.jpg"` in `portfolio.ts`. `public/profile.svg` is a plain placeholder. |
| Resume PDF | replace `public/Jisna_P_J_React_Developer_Resume.pdf` (keep the name, or update `profile.resume`) |
| Colours | CSS variables at the top of `src/index.css` (`:root` is light, `.dark` is dark, dark is the default) |
| Fonts | Newsreader (large headlines), Inter (interface), JetBrains Mono (dates, tags, index marks), bundled via `@fontsource`, set in `src/index.css` |

## Colours

| Token | Dark | Light | Used for |
| --- | --- | --- | --- |
| `--bg` | `#130A0D` | `#F6EFE3` | page background |
| `--card` | `#1B1015` | `#FDF8EF` | cards |
| `--raise` | `#251820` | `#EFE5D3` | secondary button, hover surface |
| `--ink` | `#F4EBDD` | `#3B0D19` | primary text |
| `--ink-2` | `#BDB0A0` | `#6B4A52` | body text |
| `--ink-3` | `#9A8C7D` | `#7E5F66` | dates, captions |
| `--accent` | `#EFDCB9` cream | `#7A1C2E` burgundy | primary button, selection, status dot |

## Features

- Light and dark mode toggle, remembered between visits, with a colour cross-fade
- One fade-and-rise entrance, no looping motion, no loading screen, scroll progress bar, active nav link
- Contact form with validation. It opens the visitor's email app with the message filled in, so no backend is needed.
  To send straight from the page, swap the `mailto:` line in `src/components/Contact.tsx` for Formspree, EmailJS or your own API.
- Resume download button
- Fully responsive, keyboard friendly, and respects "reduce motion" (animations switch off)

## Project structure

```
src/
  App.tsx                 page layout
  index.css               tokens, cards, buttons, tags, index marks, motion
  data/portfolio.ts       all content
  hooks/                  useTheme, useActiveSection
  components/             Navbar, Hero, Skills, Experience, Projects,
                          Education, Contact, Footer, Reveal, ...
public/                   favicon, placeholder photo, resume PDF
```

## Put it on GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/Leora143/portfolio.git
git push -u origin main
```

## Deploy

- **Vercel or Netlify:** import the GitHub repo. Build command `npm run build`, output directory `dist`.
- **GitHub Pages:** set `base: "/portfolio/"` in `vite.config.ts` (use your repo name), build, and publish `dist`.
