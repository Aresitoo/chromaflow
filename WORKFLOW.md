# Working on the card: two lanes

Two files, two dashboards, one source. The sandbox exists so a half-finished card never
lands on the dashboard your family uses.

| | Sandbox | Production |
|---|---|---|
| File | `H:\www\ares-energy-flow-card-dev.js` | `H:\www\ares-energy-flow-card.js` |
| Card tag | `custom:ares-energy-flow-card-dev` | `custom:ares-energy-flow-card` |
| Dashboard | `/dev-lab/flow-studio` | `/lovelace` |
| Built from | your branch | tagged `main` |
| Deploy | `scripts\deploy-dev.ps1` | `scripts\deploy-prod.ps1` |

## Why the flag matters

Both files are the same source. Home Assistant loads every resource on every page, and
whichever file calls `customElements.define(tag, ...)` first owns that tag for the page.
If both files claim `ares-energy-flow-card-dev`, production wins (it loads first) and the
sandbox silently runs production code. That is exactly what happened from 2.0.0 to 2.3.7.

So the sandbox build is the source with one line prepended:

```
const __ARES_DEV_BUILD = true;
```

`tools/make-dev-build.sh` does that, and the file then registers only the `-dev` tags.
Never copy the source over the sandbox file by hand.

## Everyday loop

```powershell
git switch -c feat/whatever          # experiments live on a branch
# edit ares-energy-flow-card.js
scripts\deploy-dev.ps1               # builds, checks tags, backs up, copies
# Ctrl+Shift+R on /dev-lab/flow-studio
```

Uncommitted work is fine here. Production is not touched, Home Assistant is not restarted.

## Promote

```powershell
git switch main
git merge --no-ff feat/whatever
git tag -a v2.3.9 -m "v2.3.9"
git push origin main --tags
scripts\deploy-prod.ps1              # refuses dirty tree, other branches, untagged HEAD
```

Then bump the production resource:

```
/local/ares-energy-flow-card.js?v=v2.3.9
```

Live through the HA UI (Settings > Dashboards > Resources) or `ha_config_set_dashboard_resource`.
No restart needed. Only hand-editing `.storage/lovelace_resources` needs one, because HA
reads that file at startup.

## Why the cache keeps biting

`/local/` is served with `Cache-Control: public, max-age=2678400` (31 days). A plain file
copy reaches nobody who has already loaded the page. Two remedies:

- **Ctrl+Shift+R** for one device, which is all the sandbox needs.
- **Change the `?v=`** to reach every device, which is what production uses.

## When someone writes to H:\www directly

Antigravity does this. It is not the end of the world, but it has to be caught, or git
stops describing production:

```powershell
scripts\check-lanes.ps1                      # reports drift and lane violations, exit 1 on failure
scripts\adopt-deployed.ps1 -Lane prod        # pull the live file into git, staged for review
```

`adopt-deployed.ps1` never commits. It strips the flag line when adopting the sandbox
build, runs `node --check`, and leaves the change staged so you can read the diff.

## Gates

| Gate | Runs | Blocks |
|---|---|---|
| `.githooks/pre-commit` | every commit touching the card | syntax errors, wrong tag registration |
| `.github/workflows/validate.yaml` `guard` job | every push and PR | same checks, unskippable |
| `deploy-dev.ps1` / `deploy-prod.ps1` | manual deploy | wrong branch, dirty tree, untagged HEAD, wrong tags |
| `check-lanes.ps1` | on demand | reports, does not block |

Enable the hook once per clone:

```powershell
git config core.hooksPath .githooks
```

## Telling which build a page runs

```js
[customElements.get('ares-energy-flow-card')?.BUILD, customElements.get('ares-energy-flow-card-dev')?.BUILD]
```

`'prod'` or `'dev'` per registered tag, `undefined` if that tag is not registered at all.
