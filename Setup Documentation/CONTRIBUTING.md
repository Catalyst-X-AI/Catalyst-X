# Contributing to Catalyst X

Welcome. This doc is for anyone joining the project — a hired developer, a collaborator Aayan has invited, or a future version of Tim — to get from "I have GitHub access" to "I can actually make changes," including if you're doing that work through your own Claude (Code or Cowork) session.

## Important: there is no "connect your Claude to our Claude" step

Every Claude session — Aayan's, Sam/Harry/Tim's, yours — runs in its own separate, private environment. They cannot see each other's files, sessions, or credentials, and there is no way to "link" two Claude accounts together. If you're using your own Claude session to work on this repo, treat it exactly like using your own laptop's terminal: it needs its own copy of the code and its own GitHub authentication. The steps below are the same whether you're typing `git clone` yourself or asking your Claude to do it for you.

## 1. Get repo access

You should have been added to the `catalystx-ai` GitHub organization or as a direct collaborator on `catalystx-ai/Catalyst-X`. **Being added isn't enough by itself — check your email (or github.com's notification bell) for an invitation and accept it.** Until you accept, you won't actually be able to clone or push, even though it may look like you have access.

Confirm you're in by visiting: https://github.com/catalystx-ai/Catalyst-X — if you can see the code, you're set.

## 2. Set up authentication (this is almost always the actual blocker)

GitHub doesn't allow plain username/password git operations anymore. You need one of:

**Option A — Personal Access Token (simplest, works everywhere):**
1. GitHub → your avatar → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
2. Scope it to just the `Catalyst-X` repository, with **Contents: Read and write** permission. Set a reasonable expiration.
3. Clone using the token in the URL, or when prompted for a password during `git push`, paste the token instead:
   ```
   git clone https://github.com/catalystx-ai/Catalyst-X.git
   ```
   (Git will prompt for a username and password on push — username is your GitHub username, password is the token.)
4. Treat this token like a password. Don't commit it, don't paste it anywhere public, and revoke it if you're done working or it's no longer needed.

**Option B — SSH key**, if you already have one set up with GitHub — clone with the `git@github.com:catalystx-ai/Catalyst-X.git` form instead.

If you're working inside a Claude session (Cowork or Code) rather than your own machine, the same options apply — generate the token, and either hand it to your Claude session for that one clone/push (the same way Aayan did for Tim), or configure it yourself if you have terminal access outside the AI session.

## 3. Local setup

```
npm install
npm run dev       # http://localhost:4321, hot reload
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## 4. Making changes

- Create a branch off `main` for your change (`git checkout -b your-name/short-description`).
- Push it and open a Pull Request against `main`. Netlify automatically builds a preview deploy for every PR (since continuous deployment is already linked) — the preview URL shows up as a check on the PR, so you can see your change live before it merges.
- `main` auto-deploys to https://catalyst-x.netlify.app on merge.

## 5. If you just want to edit page content, not code

You may not need any of the above. Once Netlify Identity + Git Gateway are enabled (ask Tim/Aayan if unsure) and you've been invited as an Identity user, you can log into **https://catalyst-x.netlify.app/admin** and edit page content directly through a form-based editor — no git, no local setup, no Claude session required. This is the intended path for Sam and Harry's day-to-day content work; the git-based workflow above is for actual code/design changes.

## Who owns what

- **Aayan** — vision, final direction, approval.
- **Sam** — requirements, prioritization, reviews content against the vision. Recommends content changes; doesn't write them directly.
- **Harry** — writes/edits all on-site copy.
- **Tim** — technical architecture, code review, deployment. Leads the developer team as it grows.

See `BUILD_LOG.md` in this repo for the full technical history and current infrastructure status.
