# Setup Documentation: GitHub Access for Contributors Using Claude

This documents a real access issue hit while getting a contributor (working through a Claude/Cowork session, no local terminal) set up to push changes to this project, and how it was resolved. If you or your Claude session hits a `403 Permission denied` when pushing despite being invited as a collaborator, read this before re-inviting anyone or regenerating tokens repeatedly.

## Background

This repository originally lived under `catalystx-ai` — which turned out to be a **personal GitHub user account**, not an organization. It has since moved to the `Catalyst-X-AI` **organization**, which is the current home of this repo.

## Root cause of the access failure

1. A contributor was invited as a collaborator on `catalystx-ai/Catalyst-X` (the old personal-account repo) and accepted the invite.
2. They generated a **fine-grained personal access token** to authenticate `git push` from their Claude session.
3. Pushing still failed with `remote: Permission to catalystx-ai/Catalyst-X.git denied to <username>` — a 403 — even after confirming the invite was accepted and the collaborator was listed on the repo's "Manage access" page.
4. The real cause: **fine-grained PATs can only be scoped to repositories owned by yourself or by an organization you belong to.** They cannot be scoped to another individual's personal-account repository, even if you're a collaborator on it. Because `catalystx-ai` was a personal account, the token's repository picker would never show `Catalyst-X` as selectable, and no combination of collaborator permissions could fix this — it's a hard platform limitation, not a misconfiguration.
5. Personal-account repos also don't support graduated collaborator roles (Read/Write/Admin) or Teams — a collaborator on a personal repo simply gets full write access once they accept, which made some of the early troubleshooting (checking role dropdowns, looking for a Teams tab) dead ends.

The fix was migrating the project to the `Catalyst-X-AI` organization. Organizations support proper fine-grained token scoping, graduated roles, and teams, which resolved the issue immediately once a contributor was added there instead.

## Working setup (current, org-based)

1. **Get invited to the `Catalyst-X-AI` organization** (not the old `catalystx-ai` personal account) — either as an org member or as a repo collaborator. Accept the invite via email or github.com/notifications.
2. **Confirm membership**: visit github.com/orgs/Catalyst-X-AI/people while logged in to your GitHub account.
3. **Generate a fine-grained personal access token**:
   - GitHub → your avatar → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
   - **Resource owner**: select `Catalyst-X-AI` (this option only appears once you're actually a member of the org — if you don't see it, your invite likely hasn't gone through yet).
   - **Repository access**: "Only select repositories" → `Catalyst-X`.
   - **Permissions**: Repository permissions → Contents → **Read and write**.
   - Set an expiration and generate. Copy the token immediately — GitHub only shows it once.
4. **Clone / push** using the token:
   ```
   git clone https://<token>@github.com/Catalyst-X-AI/Catalyst-X.git
   ```
   or, when prompted for a password during `git push`, paste the token in place of a password (username is your GitHub username).
5. Treat the token like a password — don't commit it or paste it anywhere public. Revoke it once you're done, or let it expire.

## If you hit a 403 despite all of the above

- Double check you generated the token **after** your org invite was accepted — tokens created before that won't retroactively gain access.
- Confirm `Resource owner` on the token is actually set to `Catalyst-X-AI`, not your personal account. If `Catalyst-X-AI` isn't selectable, you're not yet a recognized org member.
- Confirm the token's Contents permission is **Read and write**, not the default Read-only.
- If you're still stuck, a classic token (Settings → Developer settings → Personal access tokens → Tokens (classic), scope: `repo`) is a reasonable fallback — it authorizes based on your actual account permissions rather than an explicit resource-owner/repo picker, so it sidesteps this whole class of problem.

## Branch, PR, and deploy workflow

Once authenticated, the day-to-day workflow is unchanged from `CONTRIBUTING.md`:

- Branch off `main` (`git checkout -b your-name/short-description`).
- Push the branch and open a PR against `main`. Netlify auto-builds a preview deploy for every PR.
- Merging to `main` auto-deploys to https://catalyst-x.netlify.app.
