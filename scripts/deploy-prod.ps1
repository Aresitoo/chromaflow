# Deploy the production build to H:\www\ares-energy-flow-card.js.
#
#   scripts\deploy-prod.ps1
#
# Refuses anything that is not a clean, tagged commit on main, so what runs on
# production is always a thing you can point at on GitHub.
[CmdletBinding()]
param(
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Fail($msg) { Write-Host "ABORT: $msg" -ForegroundColor Red; exit 1 }

if (-not (Test-Path 'H:\www')) { Fail 'H:\www is not reachable. Is the Home Assistant share mounted?' }

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
if ($branch -ne 'main' -and -not $Force) { Fail "on branch '$branch'. Production deploys come from main only (use -Force to override)." }

$dirty = git status --porcelain
if ($dirty -and -not $Force) {
  Write-Host $dirty
  Fail 'working tree is dirty. Commit or stash first so the deployed file matches a commit.'
}

$tag = ''
try { $tag = (git describe --tags --exact-match HEAD 2>$null).Trim() } catch { $tag = '' }
if (-not $tag -and -not $Force) { Fail 'HEAD is not tagged. Tag the release first: git tag -a vX.Y.Z -m "vX.Y.Z"' }

$head = (git rev-parse --short HEAD).Trim()
Write-Host "branch: $branch   commit: $head   tag: $(if ($tag) { $tag } else { '(none, forced)' })"

node --check ares-energy-flow-card.js
if ($LASTEXITCODE -ne 0) { Fail 'syntax check failed' }

node scripts/check-tags.mjs ares-energy-flow-card.js --expect prod
if ($LASTEXITCODE -ne 0) { Fail 'build does not register exactly the production tags, refusing to deploy' }

$target = 'H:\www\ares-energy-flow-card.js'
$stamp = Get-Date -Format 'yyyyMMdd_HHmm'
Copy-Item $target "$target.bak_$stamp"

# Normalise to LF so the deployed file is byte-identical to the git blob, whatever
# line endings the Windows checkout is using.
$text = [IO.File]::ReadAllText((Join-Path $root 'ares-energy-flow-card.js')) -replace "`r`n", "`n"
[IO.File]::WriteAllText($target, $text, (New-Object Text.UTF8Encoding($false)))

$sha = (Get-FileHash $target -Algorithm SHA256).Hash.Substring(0, 16)
$size = (Get-Item $target).Length
$version = if ($tag) { $tag } else { "pushed-$head" }

Write-Host ""
Write-Host "deployed production -> $target" -ForegroundColor Green
Write-Host "  sha256 $sha  $size bytes"
Write-Host "  backup $target.bak_$stamp"
Write-Host ""
Write-Host 'REMAINING STEP: browsers still hold the old file for 31 days, so bump the resource URL.'
Write-Host "  /local/ares-energy-flow-card.js?v=$version"
Write-Host '  Live via the HA UI (Settings > Dashboards > Resources) or the agent tool'
Write-Host '  ha_config_set_dashboard_resource. No Home Assistant restart is needed.'
Write-Host ''
Write-Host 'then: scripts\check-lanes.ps1'
