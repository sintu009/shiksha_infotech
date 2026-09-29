# PowerShell script to update navigation across all HTML pages
# This script replaces the navigation menus with the full mega menu version from index.htm

$basePath = "c:\Users\rushi\OneDrive\Desktop\shiksha_Infotech\shiksha_Infotech"

# Define the navigation menu content for menu-1 and menu-3 (desktop main menus with mega menu)
# These use the same structure but different IDs
$desktopMainMenu = @'
<ul id="MENU_ID" class="elementor-nav-menu">

										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4002 shiksha-mega">
											<a href="PREFIX_PLACEHOLDERsolutions/index.htm" class="elementor-item">Solutions</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li class="menu-item shiksha-mega-col">
													<span class="shiksha-mega-heading">App Development</span>
													<ul class="shiksha-mega-links">
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/mobile-app-development/index.htm" class="elementor-sub-item">Mobile App Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/android-development/index.htm" class="elementor-sub-item">Android Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/ios-development/index.htm" class="elementor-sub-item">iOS Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/hybrid-app-development/index.htm" class="elementor-sub-item">Hybrid App Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/mobile-development/index.htm" class="elementor-sub-item">Mobile Development</a></li>
													</ul>
												</li>
												<li class="menu-item shiksha-mega-col">
													<span class="shiksha-mega-heading">Software &amp; Web</span>
													<ul class="shiksha-mega-links">
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/custom-software-development/index.htm" class="elementor-sub-item">Custom Software Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/software-development/index.htm" class="elementor-sub-item">Software Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/web-development/index.htm" class="elementor-sub-item">Web Development</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/erp-solutions/index.htm" class="elementor-sub-item">ERP Solutions</a></li>
													</ul>
												</li>
												<li class="menu-item shiksha-mega-col">
													<span class="shiksha-mega-heading">Cloud &amp; Infrastructure</span>
													<ul class="shiksha-mega-links">
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/cloud-services/index.htm" class="elementor-sub-item">Cloud Services</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/managed-services/index.htm" class="elementor-sub-item">Managed Services</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/network-connectivity/index.htm" class="elementor-sub-item">Network Connectivity</a></li>
													</ul>
												</li>
												<li class="menu-item shiksha-mega-col">
													<span class="shiksha-mega-heading">Security &amp; Emerging Tech</span>
													<ul class="shiksha-mega-links">
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/cyber-security/index.htm" class="elementor-sub-item">Cybersecurity</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/it-consulting-advisory/index.htm" class="elementor-sub-item">IT Consulting &amp; Advisory</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/blockchain/index.htm" class="elementor-sub-item">Blockchain</a></li>
														<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/nft-development/index.htm" class="elementor-sub-item">NFT Development</a></li>
													</ul>
												</li>
												<li class="menu-item shiksha-mega-promo">
													<div>
														<p class="shiksha-promo-title">Explore all our solutions</p>
														<p class="shiksha-promo-text">From apps and cloud to security and blockchain &mdash; find the right fit for your business.</p>
													</div>
													<a href="PREFIX_PLACEHOLDERsolutions/index.htm" class="elementor-sub-item shiksha-promo-btn">View All Solutions</a>
												</li>
											</ul>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4003">
											<a href="PREFIX_PLACEHOLDERabout/index.htm" class="elementor-item">Company</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERabout/index.htm" class="elementor-sub-item">About</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERteam/index.htm" class="elementor-sub-item">Team</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERcareers/index.htm" class="elementor-sub-item">Careers</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERpartnerships/index.htm" class="elementor-sub-item">Partners &amp; Certifications</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERreviews-awards/index.htm" class="elementor-sub-item">Reviews &amp; Awards</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERwhy-us/index.htm" class="elementor-sub-item">Why us</a></li>
											</ul>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-104">
											<a href="PREFIX_PLACEHOLDERcase-studies/index.htm" class="elementor-item">Case studies</a>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-103">
											<a href="PREFIX_PLACEHOLDERblog/index.htm" class="elementor-item">Blog</a>
										</li>
										<li
											class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1595">
											<a href="#" class="elementor-item elementor-item-anchor">Resources</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-7134">
													<a href="PREFIX_PLACEHOLDERcontact/index.htm" class="elementor-sub-item">Schedule a
														Consultation</a>
												</li>
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1491">
													<a href="PREFIX_PLACEHOLDERevents/index.htm" class="elementor-sub-item">Events</a>
												</li>
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1490">
													<a href="PREFIX_PLACEHOLDERfaq/index.htm" class="elementor-sub-item">FAQ</a>
												</li>
											</ul>
										</li>
									</ul>
'@

# Define the navigation menu content for menu-2 and menu-4 (mobile/dropdown menus - simplified list)
$mobileMenu = @'
<ul id="MENU_ID" class="elementor-nav-menu">
										<!-- -->
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4002">
											<a href="PREFIX_PLACEHOLDERsolutions/index.htm" class="elementor-item" tabindex="-1">Solutions</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/android-development/index.htm" class="elementor-sub-item" tabindex="-1">Android Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/blockchain/index.htm" class="elementor-sub-item" tabindex="-1">Blockchain</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/cloud-services/index.htm" class="elementor-sub-item" tabindex="-1">Cloud Services</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/custom-software-development/index.htm" class="elementor-sub-item" tabindex="-1">Custom Software Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/cyber-security/index.htm" class="elementor-sub-item" tabindex="-1">Cybersecurity</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/erp-solutions/index.htm" class="elementor-sub-item" tabindex="-1">ERP Solutions</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/hybrid-app-development/index.htm" class="elementor-sub-item" tabindex="-1">Hybrid App Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/ios-development/index.htm" class="elementor-sub-item" tabindex="-1">iOS Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/it-consulting-advisory/index.htm" class="elementor-sub-item" tabindex="-1">IT Consulting &amp; Advisory</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/managed-services/index.htm" class="elementor-sub-item" tabindex="-1">Managed Services</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/mobile-app-development/index.htm" class="elementor-sub-item" tabindex="-1">Mobile App Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/mobile-development/index.htm" class="elementor-sub-item" tabindex="-1">Mobile Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/network-connectivity/index.htm" class="elementor-sub-item" tabindex="-1">Network Connectivity</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/nft-development/index.htm" class="elementor-sub-item" tabindex="-1">NFT Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/web-development/index.htm" class="elementor-sub-item" tabindex="-1">Web Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/software-development/index.htm" class="elementor-sub-item" tabindex="-1">Software Development</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERsolutions/index.htm" class="elementor-sub-item" tabindex="-1">View All</a></li>
											</ul>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4003">
											<a href="PREFIX_PLACEHOLDERabout/index.htm" class="elementor-item" tabindex="-1">Company</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERabout/index.htm" class="elementor-sub-item" tabindex="-1">About</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERteam/index.htm" class="elementor-sub-item" tabindex="-1">Team</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERcareers/index.htm" class="elementor-sub-item" tabindex="-1">Careers</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERpartnerships/index.htm" class="elementor-sub-item" tabindex="-1">Partners &amp; Certifications</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERreviews-awards/index.htm" class="elementor-sub-item" tabindex="-1">Reviews &amp; Awards</a></li>
												<li class="menu-item"><a href="PREFIX_PLACEHOLDERwhy-us/index.htm" class="elementor-sub-item" tabindex="-1">Why us</a></li>
											</ul>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-104">
											<a href="PREFIX_PLACEHOLDERcase-studies/index.htm" class="elementor-item" tabindex="-1">Case
												studies</a>
										</li>
										<li
											class="menu-item menu-item-type-post_type menu-item-object-page menu-item-103">
											<a href="PREFIX_PLACEHOLDERblog/index.htm" class="elementor-item" tabindex="-1">Blog</a>
										</li>
										<li
											class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-1595">
											<a href="#" class="elementor-item elementor-item-anchor"
												tabindex="-1">Resources</a>
											<ul class="sub-menu elementor-nav-menu--dropdown">
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-7134">
													<a href="PREFIX_PLACEHOLDERcontact/index.htm" class="elementor-sub-item"
														tabindex="-1">Schedule a Consultation</a>
												</li>
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1491">
													<a href="PREFIX_PLACEHOLDERevents/index.htm" class="elementor-sub-item"
														tabindex="-1">Events</a>
												</li>
												<li
													class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1490">
													<a href="PREFIX_PLACEHOLDERfaq/index.htm" class="elementor-sub-item"
														tabindex="-1">FAQ</a>
												</li>
											</ul>
										</li>
									</ul>
'@

# CSS link to add if missing
$megaMenuCssLink = @'
	<link rel='stylesheet' id='shiksha-mega-menu-css' href='PREFIX_PLACEHOLDERwp-content/shiksha-mega-menu.css' media='all'>
'@

# Function to calculate the path prefix based on file depth
function Get-PathPrefix {
    param([int]$depth)
    if ($depth -eq 0) { return "" }
    return ("../" * $depth)
}

# Function to find matching closing tag considering nesting
function Find-MatchingClosingTag {
    param(
        [string]$content,
        [int]$startIndex,
        [string]$tagName
    )
    
    $openTag = "<$tagName"
    $closeTag = "</$tagName>"
    $depth = 1
    $pos = $startIndex
    
    while ($depth -gt 0 -and $pos -lt $content.Length) {
        $nextOpen = $content.IndexOf($openTag, $pos)
        $nextClose = $content.IndexOf($closeTag, $pos)
        
        if ($nextClose -eq -1) {
            return -1
        }
        
        if ($nextOpen -ne -1 -and $nextOpen -lt $nextClose) {
            $depth++
            $pos = $nextOpen + $openTag.Length
        } else {
            $depth--
            if ($depth -eq 0) {
                return $nextClose + $closeTag.Length
            }
            $pos = $nextClose + $closeTag.Length
        }
    }
    
    return -1
}

# Function to replace menu content
function Replace-MenuContent {
    param(
        [string]$content,
        [string]$menuId,
        [string]$newMenuTemplate,
        [string]$pathPrefix
    )
    
    # Create the replacement with correct prefix
    $replacement = $newMenuTemplate -replace "MENU_ID", $menuId
    $replacement = $replacement -replace "PREFIX_PLACEHOLDER", $pathPrefix
    
    # Find the start of the menu
    $startPattern = '<ul id="' + $menuId + '"'
    $startIndex = $content.IndexOf($startPattern)
    
    while ($startIndex -ne -1) {
        # Find the end of the opening tag
        $tagEndIndex = $content.IndexOf('>', $startIndex)
        if ($tagEndIndex -eq -1) { break }
        
        # Find the matching closing </ul> tag
        $endIndex = Find-MatchingClosingTag -content $content -startIndex ($tagEndIndex + 1) -tagName "ul"
        if ($endIndex -eq -1) { break }
        
        # Replace the content
        $content = $content.Substring(0, $startIndex) + $replacement + $content.Substring($endIndex)
        
        # Look for next occurrence (shouldn't be any, but just in case)
        $startIndex = $content.IndexOf($startPattern, $startIndex + $replacement.Length)
    }
    
    return $content
}

# Get all HTML files
$files = Get-ChildItem -Path $basePath -Filter "*.htm" -Recurse | Where-Object { 
    ($_.Name -eq "index.htm" -or $_.Name -eq "index-1.htm") -and 
    $_.FullName -notmatch "\\feed\\" 
}

$totalFiles = $files.Count
$processedFiles = 0
$updatedFiles = 0
$errorFiles = @()

Write-Host "Starting navigation update for $totalFiles files..." -ForegroundColor Cyan
Write-Host ""

foreach ($file in $files) {
    $processedFiles++
    
    # Calculate relative path and depth
    $relativePath = $file.FullName.Substring($basePath.Length + 1).Replace("\", "/")
    $depth = ($relativePath.Split("/").Count - 1)
    $pathPrefix = Get-PathPrefix -depth $depth
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        # Replace all 4 menu instances
        # Menu 1 and 3 are the main desktop menus (with mega menu)
        $content = Replace-MenuContent -content $content -menuId "menu-1-4677853" -newMenuTemplate $desktopMainMenu -pathPrefix $pathPrefix
        $content = Replace-MenuContent -content $content -menuId "menu-3-4677853" -newMenuTemplate $desktopMainMenu -pathPrefix $pathPrefix
        
        # Menu 2 and 4 are the mobile/dropdown menus
        $content = Replace-MenuContent -content $content -menuId "menu-2-4677853" -newMenuTemplate $mobileMenu -pathPrefix $pathPrefix
        $content = Replace-MenuContent -content $content -menuId "menu-4-4677853" -newMenuTemplate $mobileMenu -pathPrefix $pathPrefix
        
        # Add mega menu CSS link if not present
        if ($content -notmatch 'shiksha-mega-menu\.css') {
            $cssLinkWithPrefix = $megaMenuCssLink -replace "PREFIX_PLACEHOLDER", $pathPrefix
            # Insert before </head>
            $content = $content -replace '</head>', "$cssLinkWithPrefix`n</head>"
        }
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            $updatedFiles++
            Write-Host "[$processedFiles/$totalFiles] Updated: $relativePath" -ForegroundColor Green
        } else {
            Write-Host "[$processedFiles/$totalFiles] No changes: $relativePath" -ForegroundColor Yellow
        }
    }
    catch {
        $errorFiles += $relativePath
        Write-Host "[$processedFiles/$totalFiles] ERROR: $relativePath - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Navigation Update Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total files processed: $processedFiles"
Write-Host "Files updated: $updatedFiles" -ForegroundColor Green
Write-Host "Files with no changes: $($processedFiles - $updatedFiles - $errorFiles.Count)" -ForegroundColor Yellow
if ($errorFiles.Count -gt 0) {
    Write-Host "Files with errors: $($errorFiles.Count)" -ForegroundColor Red
    $errorFiles | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}
