param(
  [string]$Server = "root@95.163.220.40",
  [string]$KeyPath = "$env:USERPROFILE\.ssh\id_ed25519",
  [string]$RemotePath = "/var/www/candycraft/",
  [string]$FrontendDir = (Join-Path $PSScriptRoot "..\frontend"),
  [string]$ReloadCommand = "systemctl reload nginx",
  [switch]$SkipBuild,
  [switch]$NoReload,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Invoke-Step {
  param(
    [string]$Title,
    [scriptblock]$Action
  )

  Write-Host "==> $Title" -ForegroundColor Cyan
  & $Action
}

$resolvedFrontendDir = (Resolve-Path $FrontendDir).Path
$distDir = Join-Path $resolvedFrontendDir "dist"
$resolvedKeyPath = (Resolve-Path $KeyPath).Path
$target = "${Server}:$RemotePath"

if (-not $SkipBuild) {
  Invoke-Step "Build frontend" {
    Push-Location $resolvedFrontendDir
    try {
      npm run build
      if ($LASTEXITCODE -ne 0) {
        throw "Frontend build failed with exit code $LASTEXITCODE."
      }
    }
    finally {
      Pop-Location
    }
  }
}

if (-not (Test-Path $distDir)) {
  throw "Dist directory not found: $distDir"
}

$sourcePattern = Join-Path $distDir "*"
$scpArgs = @("-i", $resolvedKeyPath, "-r", $sourcePattern, $target)

Invoke-Step "Upload dist via scp" {
  if ($DryRun) {
    Write-Host ("scp " + ($scpArgs -join " "))
    return
  }

  & scp @scpArgs
  if ($LASTEXITCODE -ne 0) {
    throw "scp failed with exit code $LASTEXITCODE."
  }
}

if (-not $NoReload) {
  $sshArgs = @("-i", $resolvedKeyPath, $Server, $ReloadCommand)

  Invoke-Step "Reload nginx" {
    if ($DryRun) {
      Write-Host ("ssh " + ($sshArgs -join " "))
      return
    }

    & ssh @sshArgs
    if ($LASTEXITCODE -ne 0) {
      throw "ssh reload failed with exit code $LASTEXITCODE."
    }
  }
}

Write-Host "Done." -ForegroundColor Green
