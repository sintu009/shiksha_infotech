/*
 * Shiksha Infotech - Solutions mega menu behavior (desktop / web view).
 *
 * The mega panel is a normal absolute-positioned dropdown anchored under the
 * Solutions item (see shiksha-mega-menu.css). This file handles:
 *   1. Opens it on hovering the Solutions link (not the surrounding padding),
 *      and keeps it open while the cursor is over the link or the panel, with
 *      a short close delay so the cursor can cross the small gap.
 *   2. Closes it on scroll so it never lingers on screen.
 *   3. Nudges the panel left if its wide body would overflow the right edge
 *      of the viewport, so it always stays fully visible.
 *   4. IMPORTANT: Only shows the menu when the header/navbar is actually
 *      visible in the viewport - prevents ghost interactions when scrolled.
 *
 * Runs only at desktop widths; the burger/mobile menu is untouched.
 */
(function () {
	"use strict";

	var DESKTOP_MIN = 1025;
	var CLOSE_DELAY = 260; // ms - forgiving so the cursor can reach the panel

	function ready(fn) {
		if (document.readyState !== "loading") {
			fn();
		} else {
			document.addEventListener("DOMContentLoaded", fn);
		}
	}

	function isDesktop() {
		return window.innerWidth >= DESKTOP_MIN;
	}

	/**
	 * Check if the header containing this menu item is actually visible.
	 * The header must be:
	 *   1. In the viewport (not scrolled away)
	 *   2. Not hidden via CSS (display:none, visibility:hidden, opacity:0)
	 *   3. The specific nav container must be visible
	 */
	function isHeaderVisible(li) {
		// Find the closest header section (the sticky header container)
		var header = li.closest('.vamtam-sticky-header');
		if (!header) {
			// Fallback: find the nav container
			header = li.closest('.elementor-nav-menu--main');
		}
		if (!header) {
			header = li.closest('header');
		}
		if (!header) return true; // If we can't find a header, assume it's visible

		// Check if the header is in the viewport
		var rect = header.getBoundingClientRect();
		
		// Header must be at least partially visible in the viewport
		// and not positioned way above the viewport (scrolled past)
		var isInViewport = rect.bottom > 0 && rect.top < window.innerHeight;
		
		// Also check computed styles for visibility
		var style = window.getComputedStyle(header);
		var isVisible = style.display !== 'none' && 
		                style.visibility !== 'hidden' && 
		                parseFloat(style.opacity) > 0;

		// Check if the nav element itself is visible
		var nav = li.closest('.elementor-nav-menu--main');
		if (nav) {
			var navStyle = window.getComputedStyle(nav);
			var navRect = nav.getBoundingClientRect();
			isVisible = isVisible && 
			            navStyle.display !== 'none' && 
			            navStyle.visibility !== 'hidden' &&
			            navRect.bottom > 0;
		}

		return isInViewport && isVisible;
	}

	/**
	 * Check if the cursor is actually over a visible element.
	 * This prevents showing the menu when hovering over empty space
	 * where the header used to be before scrolling.
	 */
	function isElementUnderCursor(element, event) {
		if (!event) return true;
		
		var rect = element.getBoundingClientRect();
		var x = event.clientX;
		var y = event.clientY;
		
		return x >= rect.left && x <= rect.right && 
		       y >= rect.top && y <= rect.bottom;
	}

	ready(function () {
		var megaItems = Array.prototype.slice.call(
			document.querySelectorAll(
				".elementor-nav-menu--layout-horizontal ul.elementor-nav-menu > li.shiksha-mega"
			)
		);
		if (!megaItems.length) return;

		function closeAll() {
			megaItems.forEach(function (li) {
				li.classList.remove("shiksha-open");
			});
		}

		// Position the mega menu below the nav bar
		// Since we use position:fixed for centering, we need to set top dynamically
		function positionMenu(li, panel) {
			var trigger = li.querySelector(":scope > a");
			if (trigger) {
				var rect = trigger.getBoundingClientRect();
				panel.style.top = (rect.bottom + 10) + "px"; // 10px gap below the link
			}
		}

		// Close on scroll so the dropdown never lingers while the page moves.
		// Also mark that we're scrolling to prevent immediate re-open
		var isScrolling = false;
		var scrollTimeout = null;
		
		window.addEventListener("scroll", function() {
			closeAll();
			isScrolling = true;
			
			// Clear the existing timeout
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
			
			// Set scrolling to false after scroll ends (with a small delay)
			scrollTimeout = setTimeout(function() {
				isScrolling = false;
			}, 150);
		}, { passive: true });
		
		window.addEventListener("resize", closeAll, { passive: true });

		megaItems.forEach(function (li) {
			var closeTimer = null;
			var panel = li.querySelector(":scope > ul.sub-menu");
			var trigger = li.querySelector(":scope > a");
			if (!panel || !trigger) return;

			function open(event) {
				// Don't open if we're currently scrolling
				if (isScrolling) return;
				
				// Must be desktop width
				if (!isDesktop()) return;
				
				// CRITICAL: Check if the header containing this menu is visible
				if (!isHeaderVisible(li)) return;
				
				// Clear any pending close
				if (closeTimer) { 
					clearTimeout(closeTimer); 
					closeTimer = null; 
				}
				
				li.classList.add("shiksha-open");
				// Position the menu below the nav (needed for fixed positioning)
				positionMenu(li, panel);
			}

			function scheduleClose() {
				if (closeTimer) clearTimeout(closeTimer);
				closeTimer = setTimeout(function () {
					li.classList.remove("shiksha-open");
					closeTimer = null;
				}, CLOSE_DELAY);
			}

			function immediateClose() {
				if (closeTimer) {
					clearTimeout(closeTimer);
					closeTimer = null;
				}
				li.classList.remove("shiksha-open");
			}

			// Open ONLY when the cursor is over the "Solutions" link itself
			// (not the surrounding li padding/spacing).
			trigger.addEventListener("mouseenter", function(e) {
				// Additional check: verify the header is visible before opening
				if (isHeaderVisible(li)) {
					open(e);
				}
			});
			trigger.addEventListener("mouseleave", scheduleClose);

			// Keep it open while over the link or the panel.
			// BUT: only if the header is still visible - this prevents
			// ghost interactions when scrolled and hovering the panel area
			panel.addEventListener("mouseenter", function(e) {
				// CRITICAL: Double-check header visibility
				// This prevents the menu from opening when cursor enters
				// the area where the panel WOULD be but header is scrolled away
				if (!isHeaderVisible(li)) {
					immediateClose();
					return;
				}
				// Also verify the menu is actually supposed to be open
				if (!li.classList.contains('shiksha-open')) {
					return; // Don't open if not already open
				}
				open(e);
			});
			panel.addEventListener("mouseleave", scheduleClose);

			// Close immediately if the menu becomes invisible while open
			// (e.g., if the header hides due to scroll behavior)
			var visibilityCheckInterval = null;
			
			// Watch for when the menu opens
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if (mutation.attributeName === 'class') {
						if (li.classList.contains('shiksha-open')) {
							// Menu just opened - start checking visibility
							visibilityCheckInterval = setInterval(function() {
								if (!isHeaderVisible(li)) {
									immediateClose();
									if (visibilityCheckInterval) {
										clearInterval(visibilityCheckInterval);
										visibilityCheckInterval = null;
									}
								}
							}, 100);
						} else {
							// Menu closed - stop checking
							if (visibilityCheckInterval) {
								clearInterval(visibilityCheckInterval);
								visibilityCheckInterval = null;
							}
						}
					}
				});
			});
			
			observer.observe(li, { attributes: true, attributeFilter: ['class'] });
		});

		// Additional safety: close menu if cursor moves to a position where
		// the header should be but isn't visible (scrolled away)
		document.addEventListener("mousemove", function(e) {
			// If cursor is in the top area where header would normally be
			// but header isn't visible, close any open menus
			if (e.clientY < 100) { // Top 100px of viewport
				megaItems.forEach(function(li) {
					if (li.classList.contains('shiksha-open') && !isHeaderVisible(li)) {
						li.classList.remove('shiksha-open');
					}
				});
			}
		}, { passive: true });
	});
})();
