# Taisha Events — agent guide

Marketing site for a Romanian events company (hookah lounges, foto-video, DJ, decor…).
Static single-page app, **no backend**: all content is hardcoded in `src/data/*`, the contact form posts
straight to EmailJS. There is nothing to deploy but `dist/` (built on Render from `master`).

Stack: **Vite 6 + React 19 + TypeScript (strict) + Tailwind v4 + wouter + react-i18next + framer-motion + shadcn/ui (Radix)**.
Small: ~3.3k lines of app code outside `src/components/ui`.

## How the owner wants you to report

**Don't narrate the work.** A short acknowledgement up front, then go quiet and work, then **one** final
message describing what happened. No running commentary between tool calls, no "now I'll check X" play-by-play.
Investigate and verify as thoroughly as the task deserves — just don't stream it.

## Commands

| | |
|---|---|
| dev server | `npm run dev` → http://localhost:5173 (also `.claude/launch.json` → `preview_start` name `taisha-events`) |
| typecheck + build | `npm run build` (= `tsc -b && vite build`) — the only typecheck entry point |
| lint | `npm run lint` |

There are **no tests and no test runner**. Verification = `npm run build` clean + click through the affected
page in the browser.

**Lint baseline (pre-existing, not yours):** 4 errors / 9 warnings — unused `actionTypes` in
`src/hooks/use-toast.ts`, `no-unused-expressions` at `ServiceDetailPage.tsx:54` and
`PackageDetailPage.tsx:51`, plus `react-refresh` / `exhaustive-deps` warnings. Compare against this, don't
chase it. `vite build` also prints ~13 harmless `"use client" was ignored` warnings and a 500 kB chunk-size
warning.

## Layout

```
src/
  App.tsx                 all routes (wouter <Switch>) + provider stack; edit here to add a page
  main.tsx                createRoot + framer-motion LazyMotion
  index.css               Tailwind import, CSS-var theme, ALL custom utilities  ← the design system
  data/
    serviceData.ts        Record<string, Service>; `section: 'b2b'` splits /services vs /b2b
    packageData.ts        Record<string, Package>
    blogData.ts           Record<string, BlogPost> (keyed 'blog-1'…, routed by `slug`)
    reviews.json + reviewsData.ts   reviews carry per-language text: { ro, en }
  translations/en.json, ro.json     every visible string; keys must stay in sync (185 each today)
  lib/i18n.ts             i18next init, lng from localStorage("language"), fallback en
  contexts/LanguageContext.tsx      language state ↔ localStorage ↔ i18n
  pages/                  one file per route, ~50–440 lines
  components/             Header, Footer, ServiceCard, ServiceModal, Reviews, BlogCard, WhatsAppButton, LanguageToggle
  components/ui/          shadcn/ui primitives — generated, treat as vendored; don't restyle by hand
public/                   images/, menu.pdf, logos — referenced by absolute path ("/images/…")
```

Routes: `/`, `/packages`, `/packages/:id`, `/services`, `/services/:id`, `/b2b`, `/story`, `/blog`,
`/blog/:slug`, `/contact`, catch-all 404.

## The one rule that explains most of the code

**Data files hold structure + English fallbacks; i18next holds the text that actually renders.**

```tsx
serviceData['dj']            // ids, image paths, section flag — the source of truth for *what exists*
t(`services.dj.title`)       // what the user sees
```

So a content change usually means editing **two or three** places: the data file (if structure/images
change) **and both** `translations/en.json` and `translations/ro.json`. Missing `ro` silently falls back to
`en` — no error, just an English word on a Romanian page.

Array fields (`pricing`, `includes`, `options`) are read via
`t(key, { returnObjects: true, defaultValue: fallback })` — see `translatedList` in
[ServiceDetailPage.tsx:73](src/pages/ServiceDetailPage.tsx:73).

## Recipes

**Add a service** — 1) entry in `src/data/serviceData.ts` (`id`, `title`, `images[]`, `description`,
`pricing[]`, `includes[]`, `options[]`, optional `section: 'b2b'`); 2) `services.<id>.{title,description,pricing,includes,options}`
in **both** translation files; 3) drop images under `public/images/services/<id>/` and reference them as
`/images/services/<id>/x.jpg`. Nothing else — `/services`, `/b2b`, the Header dropdowns and the contact-form
dropdown all derive from `Object.values(serviceData)`. Existing ids: `fotovideo, hookahs, dancers, mirror,
smoke, scenes(b2b), dj, ice(b2b), book, marturii`.

**Add a package** — same shape in `packageData.ts` + `packages.<id>.*` in both translation files.

**Feature a service on the homepage** — edit `FEATURED_SERVICE_IDS` in
[HomePage.tsx:11](src/pages/HomePage.tsx:11) (4 ids, display order).

**Add a blog post** — entry in `blogData.ts` with a unique `slug`. Blog copy is **not** translated; it lives
only in the data file.

**Add a review** — append to `src/data/reviews.json` with `text: { ro, en }`.

**Add a page** — `src/pages/Foo.tsx` (default export) + a `<Route>` in `App.tsx` + a `nav.*` key if it goes
in the Header.

**Add a color / utility** — `src/index.css` only. There is **no `tailwind.config.js`** (Tailwind v4 via the
`@tailwindcss/vite` plugin) — don't create one. Theme values are HSL triples in `:root`. Brand colors are
declared with **`@utility`** (top-level, near the top of the file): `text/bg/border/fill-gold`,
`*-warm-brown`, `*-dark-gray`, `*-light-gray`, `*-custom-gray`, `text-white-gray`, `*-whatsapp`. Everything
else — `*-gold-soft`, `font-playfair / font-montserrat / font-cormorant`, `hover-scale`, `hover-button`,
`services-grid`, `hero-section`, `whatsapp-button`, and the shadcn theme aliases (`bg-background`,
`bg-accent`, `text-muted-foreground`, …) — is still hand-written inside `@layer utilities`. A class that is
neither of those nor stock Tailwind does nothing.

**`hover:` alone is desktop-only.** Tailwind v4 gates `hover:` behind `@media (hover: hover)`, so a
touch-screen tap gets no feedback at all. Pair it with `active:` for anything a phone user presses — the
detail-page back buttons use `hover:bg-gold hover:text-white active:bg-gold active:text-white`. iOS Safari
additionally ignores `:active` until the page has a touch listener, which is what the no-op `touchstart`
listener in [main.tsx](src/main.tsx) exists for — don't delete it as dead code.

**Use `@utility`, never a hand-written class, for anything you need a variant on.** Tailwind only generates
variants for utilities it knows about, so a hand-written `.bg-gold` gives you **no** `hover:bg-gold` — the
class silently emits zero CSS and `!important` can't rescue it. This is why the detail-page "Back to…"
buttons had dead hover states. Note the shadcn aliases are still hand-written, so `hover:bg-accent` (used by
the Button `outline`/`ghost` variants) is likewise inert — converting those would change hover appearance
site-wide, so it was left alone deliberately.

Page conventions worth copying rather than reinventing: `motion.div` fade-in-from-`y` header block, a
`w-24 h-1 bg-gold mx-auto` divider under the title, `container mx-auto px-4`, `min-h-screen pt-24 pb-16`
(the Header is `fixed`), `lucide-react` icons, `Link` from `wouter` (not react-router), `@/` → `src/`.

## Gotchas — check before "fixing"

- **`@vitejs/plugin-react` is deliberately commented out** in `vite.config.ts`. JSX still compiles (esbuild +
  `"jsx": "react-jsx"`), but there is **no React Fast Refresh** — dev edits do a full page reload, and the
  `react-refresh/*` lint warnings are meaningless here. Re-enabling it is a real change, not a cleanup.
- **React Query is commented out** in `App.tsx` and all of `src/lib/queryClient.ts`. There's no API to call.
- **`src/pages/MenuPage.tsx` is unrouted** — fully built, translated (`menu.*`), reads `public/menu.pdf`, but
  no `<Route>` and no nav entry. Intentionally parked; don't delete, don't assume `/menu` works.
- **`bg-dark-purple` / `border-dark-purple` are used but never defined** (Footer, MenuPage, ServiceModal) —
  those classes are silently inert. Define them in `index.css` or switch to an existing token.
- **Placeholder content still shipping:** all three packages use `via.placeholder.com` images; several
  services and every blog post use Unsplash URLs; only `fotovideo` + the homepage background are real local
  images. Phone is `"+40 XXX XXX XXX"` (`contact.phone.number`), `WhatsAppButton` defaults to
  `phoneNumber="123456789"`, and the Footer social links are `href="#"`.
- **EmailJS credentials are inline** in [ContactPage.tsx:124](src/pages/ContactPage.tsx:124) (service
  `zoho_taisha_smtp`, template `template_2x6ikqs`, public key `dL93QDuUB_gKPv1fR`). Client-side by design —
  the public key is not a secret. There is no `.env` and no `import.meta.env` usage anywhere.
- **Reference `public/` assets with a leading slash** (`/logo-white.png`, not `logo-white.png`). Without it
  the URL is relative to the current route, so it 404s on any nested path (`/services/dj/logo-white.png`) —
  and because Header/Footer never remount during client-side navigation, it only breaks on a hard refresh of
  a deep link, which makes it easy to miss.
- **Never put an animated `opacity` on an ancestor of a `backdrop-blur-*` element.** An ancestor with
  `opacity < 1` becomes a *backdrop root*, so the blur silently renders as nothing — computed style still
  reports `blur(8px)`, so this is only visible in a screenshot. The homepage hero hit exactly this: the
  scroll fade sits on each hero block while only the `scale` stays on the container
  ([HomePage.tsx:44](src/pages/HomePage.tsx:44)).
- The contact form deep-links: `/contact?service=<id>` preselects the dropdown. The email body always labels
  the date in Romanian (the Taisha team reads it), regardless of UI language.
- **`package_all.json` is a stale copy** of `package.json` (differs by `@emailjs/browser` / `tw-animate-css`).
  Nothing reads it. `README.md` is the untouched Vite template. `src/App.css` is Vite-template leftover and is
  imported nowhere.
- Default branch is **`master`**. `dist/` is gitignored but present locally.
