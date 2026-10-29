# Audit both lanes: dashboards, deployed files, git drift, resource URLs.
#
#   scripts\check-lanes.ps1
#
# Read-only. Exits 1 if a lane rule is broken, so an agent (or CI, or you) can use it
# as a gate. This is the check that would have caught the 2.0.0-2.3.7 tag collision in
# two seconds instead of two days.
[CmdletBinding()]
param(
  [string]$GitRef = 'HEAD'
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$problems = New-Object System.Collections.Generic.List[string]
$notes = New-Object System.Collections.Generic.List[string]

function Get-NormalizedHash([byte[]]$bytes) {
  $text = [Text.Encoding]::UTF8.GetString($bytes)
  $text = $text -replace "`r`n", "`n"
  $sha = [Security.Cryptography.SHA256]::Create()
  return ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($text))) -replace '-', '')
}

function Get-RepoFile([string]$ref, [string]$path) {
  $psi = New-Object Diagnostics.ProcessStartInfo
  $psi.FileName = 'git'
  $psi.Arguments = "cat-file blob ${ref}:${path}"
  $psi.RedirectStandardOutput = $true
  $psi.UseShellExecute = $false
  $p = [Diagnostics.Process]::Start($psi)
  $stream = $p.StandardOutput.BaseStream
  $ms = New-Object IO.MemoryStream
  $stream.CopyTo($ms)
  $p.WaitForExit()
  if ($p.ExitCode -ne 0) { return $null }
  return $ms.ToArray()
}

Write-Host "=== lane audit (git ref: $GitRef) ===" -ForegroundColor Cyan

# 1. Dashboards: which card tags live where
$dashboards = @(
  @{ file = 'H:\.storage\lovelace.lovelace'; label = 'production (lovelace)'; forbidden = 'custom:ares-energy-flow-card-dev'; required = 'custom:ares-energy-flow-card' },
  @{ file = 'H:\.storage\lovelace.dev_lab'; label = 'dev lab (dev_lab)'; forbidden = 'custom:ares-energy-flow-card(?!-dev)'; required = 'custom:ares-energy-flow-card-dev' }
)

foreach ($d in $dashboards) {
  if (-not (Test-Path $d.file)) { $problems.Add("missing dashboard store: $($d.file)"); continue }
  $raw = [IO.File]::ReadAllText($d.file)
  $bad = [regex]::Matches($raw, $d.forbidden)
  $good = [regex]::Matches($raw, $d.required)
  $state = if ($bad.Count -gt 0) { "$($bad.Count) foreign card(s)" } else { 'clean' }
  Write-Host ("  {0,-24} {1} cards, {2}" -f $d.label, $good.Count, $state)
  if ($bad.Count -gt 0) {
    $problems.Add("$($d.label) uses $($bad.Count) card(s) from the other lane (pattern $($d.forbidden))")
  }
}

# 2. Deployed files: which build is real
$prodPath = 'H:\www\ares-energy-flow-card.js'
$devPath = 'H:\www\ares-energy-flow-card-dev.js'
$flagLine = 'const __ARES_DEV_BUILD = true;'

if (Test-Path $devPath) {
  $first = (Get-Content $devPath -TotalCount 1)
  if ($first -ne $flagLine) { $problems.Add("sandbox file does not start with '$flagLine' (was it copied by hand?)") }
} else { $notes.Add('sandbox file not deployed') }

if (Test-Path $prodPath) {
  $prodText = [IO.File]::ReadAllText($prodPath)
  if ($prodText -match "(?m)^$([regex]::Escape($flagLine))$") { $problems.Add('production file contains the dev flag: it is a sandbox build') }
} else { $problems.Add('production file missing from H:\www') }

# 3. Git drift: deployed bytes vs the build from the git ref
$refProd = Get-RepoFile $GitRef 'ares-energy-flow-card.js'
if ($refProd) {
  $refProdHash = Get-NormalizedHash $refProd
  $refDevHash = Get-NormalizedHash ([Text.Encoding]::UTF8.GetBytes("$flagLine`n" + [Text.Encoding]::UTF8.GetString($refProd)))
  Write-Host ("  git {0}: prod {1}  dev {2}" -f $GitRef, $refProdHash.Substring(0, 12), $refDevHash.Substring(0, 12))

  if (Test-Path $prodPath) {
    $liveProd = Get-NormalizedHash ([IO.File]::ReadAllBytes($prodPath))
    if ($liveProd -eq $refProdHash) { Write-Host "  production file: matches $GitRef" -ForegroundColor Green }
    else { $problems.Add("production file DRIFTED from $GitRef (deployed $($liveProd.Substring(0,12))). Someone wrote H:\www outside git: run scripts\adopt-deployed.ps1 -Lane prod") }
  }
  if (Test-Path $devPath) {
    $liveDev = Get-NormalizedHash ([IO.File]::ReadAllBytes($devPath))
    if ($liveDev -eq $refDevHash) { Write-Host "  sandbox file: matches $GitRef + flag" -ForegroundColor Green }
    else { $notes.Add("sandbox file differs from $GitRef (normal while experimenting; use adopt-deployed.ps1 -Lane dev to capture it)") }
  }
} else {
  $notes.Add("could not read ares-energy-flow-card.js at $GitRef")
}

# 4. Resource URLs
if (Test-Path 'H:\.storage\lovelace_resources') {
  $res = [IO.File]::ReadAllText('H:\.storage\lovelace_resources')
  $urls = [regex]::Matches($res, '"/local/ares-energy-flow-card[^"]*"') | ForEach-Object { $_.Value.Trim('"') }
  foreach ($u in $urls) { Write-Host "  resource: $u" }
  if (-not ($urls | Where-Object { $_ -match 'ares-energy-flow-card\.js\?v=' })) { $problems.Add('production resource URL has no ?v= cache buster') }
  if (-not ($urls | Where-Object { $_ -match 'ares-energy-flow-card-dev\.js\?v=' })) { $problems.Add('sandbox resource URL has no ?v= cache buster') }
}

Write-Host ''
foreach ($n in $notes) { Write-Host "note: $n" -ForegroundColor Yellow }
if ($problems.Count -gt 0) {
  foreach ($p in $problems) { Write-Host "FAIL: $p" -ForegroundColor Red }
  exit 1
}
Write-Host 'both lanes are clean' -ForegroundColor Green
exit 0
