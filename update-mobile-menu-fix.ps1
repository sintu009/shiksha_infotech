# PowerShell script to add mobile menu fix CSS and JS to all HTML files
# Run this script from PowerShell in the project root directory

$rootPath = $PSScriptRoot
if (-not $rootPath) {
    $rootPath = "c:\Users\rushi\OneDrive\Desktop\shiksha_Infotech\shiksha_Infotech"
}

Write-Host "Searching for index.htm files in: $rootPath" -ForegroundColor Cyan

# Get all index.htm files that have the mega-menu.css but not the mobile-menu-fix.css
$files = Get-ChildItem -Path $rootPath -Filter "index.htm" -Recurse | Where-Object { 
    $content = Get-Content $_.FullName -Raw
    ($content -like "*shiksha-mega-menu.css*") -and ($content -notlike "*shiksha-mobile-menu-fix.css*")
}

Write-Host "Found $($files.Count) files to update" -ForegroundColor Yellow

$updated = 0
$failed = 0

foreach ($file in $files) {
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Calculate relative path prefix based on directory depth
        $relativePath = $file.DirectoryName.Replace($rootPath, "").TrimStart("\")
        $depth = ($relativePath.Split("\") | Where-Object { $_ -ne "" }).Count
        $prefix = if ($depth -eq 0) { "" } else { ("../" * $depth) }
        
        # Update CSS: Add mobile-menu-fix.css after mega-menu.css
        $cssPattern = "(<link rel='stylesheet' id='shiksha-mega-menu-css' href='[^']*shiksha-mega-menu\.css' media='all'>)`r?`n</head>"
        $cssReplacement = "`$1`n`t<link rel='stylesheet' id='shiksha-mobile-menu-fix-css' href='${prefix}wp-content/shiksha-mobile-menu-fix.css' media='all'>`n</head>"
        
        if ($content -match $cssPattern) {
            $content = $content -replace $cssPattern, $cssReplacement
        }
        
        # Update JS: Add mobile-menu-fix.js after carousel-fix.js
        $jsPattern = "(<script src='[^']*shiksha-carousel-fix\.js' id='shiksha-carousel-fix-js'></script>)`r?`n</body>"
        $jsReplacement = "`$1`n`t<script src='${prefix}wp-content/shiksha-mobile-menu-fix.js' id='shiksha-mobile-menu-fix-js'></script>`n</body>"
        
        if ($content -match $jsPattern) {
            $content = $content -replace $jsPattern, $jsReplacement
        }
        
        # Save the file
        Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
        $updated++
        Write-Host "Updated: $($file.FullName)" -ForegroundColor Green
    }
    catch {
        $failed++
        Write-Host "FAILED: $($file.FullName) - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== Summary ===" -ForegroundColor Cyan
Write-Host "Successfully updated: $updated files" -ForegroundColor Green
Write-Host "Failed: $failed files" -ForegroundColor $(if ($failed -gt 0) { "Red" } else { "Green" })
