# ChromaFlow card: working rules

Read this before touching `ares-energy-flow-card.js` or anything under `H:\www`.

## Two lanes, never shared

| | Sandbox | Production |
|---|---|---|
| File in HA | `H:\www\ares-energy-flow-card-dev.js` | `H:\www\ares-energy-flow-card.js` |
| Built by | `tools/make-dev-build.sh` from your branch | `scripts\deploy-prod.ps1` from a tagged `main` |
| Card tag | `custom:ares-energy-flow-card-dev` | `custom:ares-energy-flow-card` |
| Dashboard | `/dev-lab/flow-studio` only | `/lovelace` only |

## Rules

1. **Build the dev file only with `tools/make-dev-build.sh`.** It prepends
   `const __ARES_DEV_BUILD = true;`, which is what stops both files claiming the same
   custom element tag. Copying the source over the dev file by hand reintroduces the
   collision that silently made the dev lab run production code from 2.0.0 to 2.3.7.
2. **Never put a `-dev` card on a production dashboard, and never put the production tag
   on the dev lab.** That is the only rule that breaks the sandbox, and it fails silently.
3. **Deploy production only through `scripts\deploy-prod.ps1`**, which refuses a dirty
   tree, a branch other than `main`, or an untagged HEAD.
4. **If you write to `H:\www` directly** (Antigravity sometimes does): immediately run
   `scripts\adopt-deployed.ps1 -Lane prod` (or `-Lane dev`), review the diff, commit it on
   a branch. Never leave the share out of sync with git.
5. **A plain file copy does not reach a browser.** HA serves `/local/` with
   `max-age: 2678400` (31 days). Sandbox: Ctrl+Shift+R. Production: bump the resource
   `?v=` (live via `ha_config_set_dashboard_resource`, no HA restart needed).
6. **Do not let HACS install this repo alongside the manual files.** A second copy claims
   the same tags and you are back to first-one-wins.

## Verify

```powershell
node scripts/check-tags.mjs ares-energy-flow-card.js --expect prod
scripts\check-lanes.ps1          # dashboards, deployed files, git drift, resource URLs
```

Which build a page is really running, in one console line:

```js
[customElements.get('ares-energy-flow-card')?.BUILD, customElements.get('ares-energy-flow-card-dev')?.BUILD]
```

## Layout

```
ares-energy-flow-card.js      the card (source of truth)
tools/make-dev-build.sh       ships source -> sandbox build
scripts/check-tags.mjs        which tags does a build register (CI + pre-commit)
scripts/deploy-dev.ps1        sandbox deploy
scripts/deploy-prod.ps1       production deploy
scripts/check-lanes.ps1       audit both lanes
scripts/adopt-deployed.ps1    pull a direct H:\www edit back into git
.githooks/pre-commit          parse + tag check on every commit
```
