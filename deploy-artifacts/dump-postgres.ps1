param(
  [string]$DatabaseUrl,
  [string]$OutFile = ".\\candycraft_dump.sql"
)

$ErrorActionPreference = "Stop"

if (-not $DatabaseUrl) {
  Write-Host "Передайте DATABASE_URL параметром -DatabaseUrl или задайте переменную окружения DATABASE_URL" -ForegroundColor Yellow
  if ($env:DATABASE_URL) {
    $DatabaseUrl = $env:DATABASE_URL
  } else {
    exit 1
  }
}

$pgDump = Get-Command pg_dump -ErrorAction SilentlyContinue
if (-not $pgDump) {
  $fallbacks = @(
    "C:\\Program Files\\PostgreSQL\\18\\bin\\pg_dump.exe",
    "C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe",
    "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe",
    "C:\\Program Files\\PostgreSQL\\15\\bin\\pg_dump.exe"
  )
  $fallbackPath = $fallbacks | Where-Object { Test-Path $_ } | Select-Object -First 1

  if ($fallbackPath) {
    $pgDump = @{ Source = $fallbackPath }
  } else {
    Write-Host "pg_dump не найден в PATH и стандартных каталогах PostgreSQL. Установите PostgreSQL client tools и повторите." -ForegroundColor Red
    exit 1
  }
}

# Prisma uses ?schema=public in DATABASE_URL. pg_dump does not support this query arg.
$pgUrlForDump = $DatabaseUrl
if ($DatabaseUrl -match "\?") {
  $parts = $DatabaseUrl.Split("?", 2)
  $base = $parts[0]
  $query = $parts[1]

  $filtered = @()
  foreach ($pair in $query.Split("&")) {
    if (-not $pair) { continue }
    $kv = $pair.Split("=", 2)
    $key = $kv[0]
    if ($key -ieq "schema") { continue }
    $filtered += $pair
  }

  if ($filtered.Count -gt 0) {
    $pgUrlForDump = "$base?" + ($filtered -join "&")
  } else {
    $pgUrlForDump = $base
  }
}

$env:DATABASE_URL = $pgUrlForDump
& $pgDump.Source --no-owner --no-privileges --clean --if-exists --format=plain --encoding=UTF8 --file=$OutFile $pgUrlForDump
if ($LASTEXITCODE -ne 0) {
  Write-Host "pg_dump завершился с ошибкой (код $LASTEXITCODE)." -ForegroundColor Red
  exit $LASTEXITCODE
}

Write-Host "Дамп создан: $OutFile" -ForegroundColor Green
