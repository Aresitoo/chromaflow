# Pull a file that was written straight to H:\www back into git.
#
#   scripts\adopt-deployed.ps1 -Lane prod
#   scripts\adopt-deployed.ps1 -Lane dev
#
# Antigravity sometimes edits the share directly. That is fine as a way to try
# something, but it leaves production and git disagreeing, which is how the tag
# collision stayed invisible. This copies the deployed file into the working tree
# (stripping the sandbox flag line when adopting the dev build), shows the diff and
# stages it. It never commits, so the change still gets reviewed.
[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)][ValidateSet('prod', 'dev')][string]$Lane,
  [switch]$Force
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$flagLine = 'const __ARES_DEV_BUILD = true;'
$source = if ($Lane -eq 'dev') { 'H:\www\ares-energy-flow-card-dev.js' } else { 'H:\www\ares-energy-flow-card.js' }

if (-not (Test-Path $source)) { Write-Host "ABORT: $source not found" -ForegroundColor Red; exit 1 }

$lines = [IO.File]::ReadAllLines($source)
if ($Lane -eq 'dev') {
  if ($lines.Count -gt 0 -and $lines[0].TrimStart([char]0xFEFF) -eq $flagLine) {
    $lines = $lines[1..($lines.Count - 1)]
  } else {
    Write-Host 'note: sandbox file has no flag line; adopting as-is' -ForegroundColor Yellow
  }
}

$content = ($lines -join "`n") + "`n"
$target = 'ares-energy-flow-card.js'

$dirty = git status --porcelain -- $target
if ($dirty -and -not $Force) {
  Write-Host "ABORT: $target has uncommitted changes. Commit or stash them first, or pass -Force to overwrite." -ForegroundColor Red
  exit 1
}

$existing = if (Test-Path $target) { [IO.File]::ReadAllText($target) } else { '' }
if (($existing -replace "`r`n", "`n") -eq $content) {
  Write-Host "$Lane file already matches $target. Nothing to adopt." -ForegroundColor Green
  exit 0
}

[IO.File]::WriteAllText((Join-Path $root $target), $content, (New-Object Text.UTF8Encoding($false)))
node --check $target
if ($LASTEXITCODE -ne 0) {
  Write-Host "$target does not parse. Reverting." -ForegroundColor Red
  git checkout -- $target
  exit 1
}

git add -- $target
Write-Host ""
Write-Host "adopted $Lane file into $target (staged, not committed)" -ForegroundColor Green
git --no-pager diff --cached --stat -- $target
Write-Host ""
Write-Host 'next: review with "git diff --cached", then commit on a branch.'
if ($Lane -eq 'prod') {
  Write-Host 'Production is currently running these un-reviewed bytes. Committing makes them traceable.'
}
