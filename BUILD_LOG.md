# Catalyst X — Production Site Build Log

**Built by:** Tim (Developer), on content from Sam (Product Owner) & Harry (Content Builder)
**Date:** 19 July 2026
**Status:** Working build, verified locally. Not yet deployed — needs a Netlify account + git repo connected (see "What's left" below).

---

## What Aayan asked for

1. Turn the prototype into a real, working website — no longer a single-file mockup.
2. Educational/content-led for now; service offerings are coming later (don't build a services/pricing section yet, but don't paint the architecture into a corner either).
3. Include lead capture.
4. Make it CMS-based, so Sam and Harry can keep publishing without needing Tim for every change.

## What was built

**Stack:** [Astro](https://astro.build) (static site generator, ships zero JS by default) + [Decap CMS](https://decapcms.org) (free, open-source, git-based headless CMS) + Netlify Forms (zero-backend lead capture) + Netlify Identity/Git Gateway (CMS login, once deployed).

This combination was chosen because: it's free at this stage (no CMS subscription), content lives as plain files in the repo (no vendor lock-in), Decap gives Sam/Harry a real point-and-click editing UI once deployed, and Netlify Forms means "lead capture" doesn't require standing up a database or backend — form submissions just appear in the Netlify dashboard (with email notification available).

**Site structure:**
- 13 content pages migrated from the HTML prototype, now as individual Markdown files with structured frontmatter (`src/content/pages/*.md`) — title, nav placement, hero style, stat tiles, callouts, sources, etc. — validated against a schema (`src/content.config.ts`) so a malformed edit fails the build loudly instead of shipping a broken page.
- A home page (`src/pages/index.astro`) that pulls its topic cards directly from the same content collection, so adding a new page to the right nav group automatically adds its card — no duplicate copy to maintain.
- A new **Get in Touch** page (`/contact/`) with a full lead-capture form (name, email, organization, reason, message).
- A lightweight **lead-capture box** (name/email/interest) embedded on the home page and the three "For You" pages, since those are the highest-intent pages for someone who might want to talk to us before service offerings exist.
- Both forms use Netlify's static-form detection (`data-netlify="true"`, a hidden `form-name` field, and a honeypot field for spam) — verified in this build that both forms are present in the static HTML output exactly as Netlify's form-parser expects.
- A `/thank-you/` page as the form's success redirect.
- SEO basics: per-page `<title>` and meta description (the prototype was a single-page app with neither), Open Graph tags, `robots.txt`, and an auto-generated `sitemap-index.xml` via `@astrojs/sitemap`.
- A proper mobile nav: the prototype's sidebar simply stacked above content on small screens, pushing all page content below a full nav dump. This build adds a collapsed-by-default mobile menu behind a toggle (pure CSS, no JS) — verified at 390px width.
- Design system (colors, typography, all component styles — stat tiles, callouts, topic cards, sources blocks, the warm vs. navy hero treatment) ported faithfully from the prototype into `src/styles/global.css`.

**Verified locally:**
- `npm run build` completes cleanly, producing 15 static pages (~224KB total).
- Spot-checked home, an org-facing page, a "For You" page, and the contact page by screenshot at both desktop (1440px) and mobile (390px) widths.
- Confirmed both forms serialize into the static HTML with the exact attributes Netlify's form parser requires.
- Confirmed nav active-state highlighting works via real URL routing (no JS needed, unlike the prototype's `showPage()` approach).

## What's genuinely NOT done yet (needs Aayan / Tim to action outside this environment)

1. **No live deployment.** This build has been verified locally only. It needs to be pushed to a git repository (GitHub/GitLab) and connected to a Netlify site to actually go live — that's an account-creation and repo-connection step that has to happen outside this sandbox.
2. **Decap CMS isn't logged into anything yet.** `public/admin/config.yml` is configured for Netlify's Git Gateway backend, but Git Gateway only activates once the site is deployed on Netlify with Identity enabled. Until then, `/admin` will load but can't authenticate. Steps once deployed: Netlify dashboard → Identity → Enable → Enable Git Gateway → invite Sam and Harry as Identity users.
3. **Domain** — still not decided (open question from the last review). This build is host-agnostic until deployed.
4. **No real email routing for form submissions yet** — Netlify Forms captures submissions in its dashboard by default; if Aayan wants them emailed to a specific inbox, that's a one-checkbox setting in Netlify once the site exists, flagging it so it isn't forgotten.
5. **No analytics** — still open per the last review; easy to add once hosting is decided (Netlify Analytics, Plausible, GA4 all drop in easily to an Astro site).
6. **No images/photography** — the site is still typography/color only, matching the prototype. If Aayan wants a real logo mark or photography, that's new design scope.

## How to run this locally

```
npm install
npm run dev       # http://localhost:4321 with hot reload
npm run build     # outputs static site to dist/
npm run preview   # serve the production build locally to sanity-check
```

To try the CMS locally before a real deployment exists, Decap supports a local proxy backend — see [Decap's local backend docs](https://decapcms.org/docs/working-with-a-local-git-repository/) (run `npx decap-server` alongside `npm run dev`, and temporarily add `local_backend: true` to `public/admin/config.yml`).
