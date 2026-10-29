# Deploy the sandbox build to the dev-lab file.
#
#   scripts\deploy-dev.ps1
#
# Copies to H:\www\ares-energy-flow-card-dev.js only. Production is never touched.
# Uncommitted work is fine here: this lane exists to look at half-finished things.
[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Fail($msg) { Write-Host "ABORT: $msg" -ForegroundColor Red; exit 1 }

if (-not (Test-Path 'H:\www')) { Fail 'H:\www is not reachable. Is the Home Assistant share mounted?' }

$branch = (git rev-parse --abbrev-ref HEAD).Trim()
$dirty = git status --porcelain
Write-Host "branch: $branch"
if ($branch -eq 'main') {
  Write-Host 'note: deploying the sandbox from main. Experiments belong on a branch.' -ForegroundColor Yellow
}
if ($dirty) {
  Write-Host 'note: uncommitted changes are included in this sandbox deploy:' -ForegroundColor Yellow
  git --no-pager diff --stat
}

$bash = 'C:\Program Files\Git\bin\bash.exe'
if (-not (Test-Path $bash)) { Fail 'Git bash not found at C:\Program Files\Git\bin\bash.exe' }

& $bash -lc "cd '$(($root -replace '\\','/'))' && tools/make-dev-build.sh ares-energy-flow-card.js .git/deploy-dev.js"
if ($LASTEXITCODE -ne 0) { Fail 'make-dev-build.sh failed' }

node scripts/check-tags.mjs .git/deploy-dev.js --expect dev
if ($LASTEXITCODE -ne 0) { Fail 'sandbox build does not register the dev tags, refusing to deploy' }

# Normalise to LF so a deploy from a Windows checkout is byte-identical to one built
# on the server, and so check-lanes hashes line up exactly.
$tmp = Join-Path $root '.git\deploy-dev.js'
[IO.File]::WriteAllText($tmp, ([IO.File]::ReadAllText($tmp) -replace "`r`n", "`n"), (New-Object Text.UTF8Encoding($false)))

$target = 'H:\www\ares-energy-flow-card-dev.js'
$stamp = Get-Date -Format 'yyyyMMdd_HHmm'
Copy-Item $target "$target.bak_$stamp"
Copy-Item $tmp $target -Force
Remove-Item $tmp -Force

$sha = (Get-FileHash $target -Algorithm SHA256).Hash.Substring(0, 16)
$size = (Get-Item $target).Length
Write-Host ""
Write-Host "deployed sandbox -> $target" -ForegroundColor Green
Write-Host "  sha256 $sha  $size bytes"
Write-Host "  backup $target.bak_$stamp"
Write-Host ""
Write-Host 'reload http://homeassistant.local:8123/dev-lab/flow-studio with Ctrl+Shift+R'
Write-Host 'production file untouched. Verify with: scripts\check-lanes.ps1'
