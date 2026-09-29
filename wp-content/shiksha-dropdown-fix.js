/*
 * Shiksha Infotech - Dropdown behavior for the static/exported site.
 *
 * Fixes two problems that appear when the theme's own JS does not run:
 *  1. Menu triggers with href="#" scroll the page (jump to top / footer)
 *     when clicked. We stop that.
 *  2. Dropdowns open on hover, and also toggle on click/tap for touch.
 *
 * IMPORTANT: Only opens dropdowns when the header/navbar is actually visible.
 * This prevents ghost interactions when the header is scrolled out of view.
 *
 * Scoped to horizontal desktop menus only.
 * The Solutions mega menu (.shiksha-mega) is handled by shiksha-mega-menu.js.
 */
(function () {
	"use strict";

	var DESKTOP_MIN = 1025;

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
	 */
	function isHeaderVisible(element) {
		// Find the closest header section (the sticky header container)
		var header = element.closest('.vamtam-sticky-header');
		if (!header) {
			header = element.closest('.elementor-nav-menu--main');
		}
		if (!header) {
			header = element.closest('header');
		}
		if (!header) return true; // If we can't find a header, assume visible

		// Check if the header is in the viewport
		var rect = header.getBoundingClientRect();
		var isInViewport = rect.bottom > 0 && rect.top < window.innerHeight;

		// Check computed styles for visibility
		var style = window.getComputedStyle(header);
		var isVisible = style.display !== 'none' &&
		                style.visibility !== 'hidden' &&
		                parseFloat(style.opacity) > 0;

		return isInViewport && isVisible;
	}

	ready(function () {
		var parents = document.querySelectorAll(
			".elementor-nav-menu--layout-horizontal ul.elementor-nav-menu > li.menu-item-has-children"
		);

		// Track scrolling state to prevent menu opening during scroll
		var isScrolling = false;
		var scrollTimeout = null;

		parents.forEach(function (li) {
			var trigger = li.querySelector(":scope > a");
			var submenu = li.querySelector(":scope > ul.sub-menu");
			if (!submenu) return;

			// The Solutions mega menu is handled by shiksha-mega-menu.js
			// (needs visibility checks and delayed close), so skip here.
			var isMega = li.classList.contains("shiksha-mega");

			// Hover open/close (desktop) - with header visibility check
			if (!isMega) {
				var closeTimer = null;
				var CLOSE_DELAY = 220; // ms

				var open = function () {
					// Don't open during scroll
					if (isScrolling) return;
					
					// Only open on desktop
					if (!isDesktop()) return;
					
					// CRITICAL: Only open if header is visible
					if (!isHeaderVisible(li)) return;
					
					if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
					li.classList.add("shiksha-open");
				};

				var scheduleClose = function () {
					if (closeTimer) clearTimeout(closeTimer);
					closeTimer = setTimeout(function () {
						li.classList.remove("shiksha-open");
						closeTimer = null;
					}, CLOSE_DELAY);
				};

				var immediateClose = function () {
					if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
					li.classList.remove("shiksha-open");
				};

				if (trigger) {
					trigger.addEventListener("mouseenter", function() {
						if (isHeaderVisible(li)) {
							open();
						}
					});
					trigger.addEventListener("mouseleave", scheduleClose);
				}
				
				submenu.addEventListener("mouseenter", function() {
					if (isHeaderVisible(li)) {
						open();
					} else {
						immediateClose();
					}
				});
				submenu.addEventListener("mouseleave", scheduleClose);
			}

			// Click on the trigger:
			// - if it is a placeholder link (href="#" or empty), never navigate
			//   or scroll; just toggle the dropdown.
			// - if it points to a real page, let the click through (navigate),
			//   but on touch devices open the dropdown first.
			if (trigger) {
				trigger.addEventListener("click", function (e) {
					var href = trigger.getAttribute("href") || "";
					var isPlaceholder = href === "" || href === "#" ||
						trigger.classList.contains("elementor-item-anchor");

					if (isPlaceholder) {
						e.preventDefault();
						e.stopPropagation();
						// Only toggle if header is visible
						if (isHeaderVisible(li)) {
							li.classList.toggle("shiksha-open");
						}
					}
				});
			}
		});

		// Click elsewhere closes any open dropdown
		document.addEventListener("click", function (e) {
			parents.forEach(function (li) {
				if (!li.contains(e.target)) {
					li.classList.remove("shiksha-open");
				}
			});
		});

		// Scrolling closes any open dropdown so a panel never lingers on
		// screen while the page scrolls.
		window.addEventListener("scroll", function () {
			// Close all dropdowns
			parents.forEach(function (li) {
				li.classList.remove("shiksha-open");
			});
			
			// Mark that we're scrolling
			isScrolling = true;
			if (scrollTimeout) {
				clearTimeout(scrollTimeout);
			}
			scrollTimeout = setTimeout(function() {
				isScrolling = false;
			}, 150);
		}, { passive: true });

		// Additional safety: close dropdowns if cursor is in top area
		// but header isn't visible (scrolled away)
		document.addEventListener("mousemove", function(e) {
			if (e.clientY < 100) { // Top 100px of viewport
				parents.forEach(function(li) {
					if (li.classList.contains('shiksha-open') && !isHeaderVisible(li)) {
						li.classList.remove('shiksha-open');
					}
				});
			}
		}, { passive: true });

		// Extra safety: block any menu link whose href is just "#"
		// from scrolling the page, anywhere in the header nav.
		var hashLinks = document.querySelectorAll(
			".elementor-nav-menu--main a[href='#'], .elementor-nav-menu--main a[href='']"
		);
		hashLinks.forEach(function (a) {
			a.addEventListener("click", function (e) {
				e.preventDefault();
			});
		});
	});
})();
