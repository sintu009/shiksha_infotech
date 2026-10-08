/*
 * Shiksha Mobile Menu - Simple Implementation
 */
(function() {
	
	var overlay, currentDropdown, currentToggle;

	// Run when page loads
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
	
	// Also run on window load
	window.addEventListener('load', function() {
		setTimeout(init, 500);
	});

	function init() {
		console.log('SHIKSHA MENU: Init');
		
		// Create overlay
		overlay = document.querySelector('.shiksha-overlay');
		if (!overlay) {
			overlay = document.createElement('div');
			overlay.className = 'shiksha-overlay';
			document.body.appendChild(overlay);
			
			overlay.onclick = function() {
				closeMenu();
			};
		}

		// Find all hamburger buttons
		var hamburgers = document.querySelectorAll('.elementor-menu-toggle');
		console.log('SHIKSHA MENU: Found ' + hamburgers.length + ' hamburgers');

		hamburgers.forEach(function(btn) {
			// Skip if in hidden section
			var section = btn.closest('section');
			if (section && (section.classList.contains('elementor-hidden-tablet') || 
			                section.classList.contains('elementor-hidden-mobile'))) {
				console.log('SHIKSHA MENU: Skipping hidden hamburger');
				return;
			}

			// Skip if already done
			if (btn.dataset.shikshaDone) return;
			btn.dataset.shikshaDone = 'yes';

			// Find dropdown
			var dropdown = btn.nextElementSibling;
			if (!dropdown || !dropdown.classList.contains('elementor-nav-menu--dropdown')) {
				dropdown = btn.parentElement.querySelector('nav.elementor-nav-menu--dropdown');
			}

			if (!dropdown) {
				console.log('SHIKSHA MENU: No dropdown found');
				return;
			}

			console.log('SHIKSHA MENU: Setting up hamburger');

			// Add arrows to submenu parents
			addArrows(dropdown);

			// Clone to remove old handlers
			var newBtn = btn.cloneNode(true);
			newBtn.dataset.shikshaDone = 'yes';
			btn.parentNode.replaceChild(newBtn, btn);

			// Hamburger click
			newBtn.onclick = function(e) {
				e.preventDefault();
				e.stopPropagation();
				
				console.log('SHIKSHA MENU: Hamburger clicked');
				
				if (dropdown.classList.contains('shiksha-open')) {
					closeMenu();
				} else {
					openMenu(newBtn, dropdown);
				}
			};
		});
	}

	function addArrows(dropdown) {
		var parents = dropdown.querySelectorAll('li.menu-item-has-children');
		
		parents.forEach(function(li) {
			if (li.querySelector('.shiksha-arrow')) return;

			var link = li.querySelector(':scope > a');
			var submenu = li.querySelector(':scope > ul.sub-menu');
			
			if (!submenu) return;

			// Create arrow
			var arrow = document.createElement('span');
			arrow.className = 'shiksha-arrow';
			arrow.innerHTML = '▼';
			li.appendChild(arrow);

			// Arrow click - toggle submenu
			arrow.onclick = function(e) {
				e.preventDefault();
				e.stopPropagation();
				toggleSubmenu(li, arrow, submenu);
			};

			// Link click - also toggle submenu on mobile
			if (link) {
				link.onclick = function(e) {
					if (window.innerWidth <= 1024) {
						e.preventDefault();
						e.stopPropagation();
						toggleSubmenu(li, arrow, submenu);
					}
				};
			}
		});
	}

	function toggleSubmenu(li, arrow, submenu) {
		console.log('SHIKSHA MENU: Toggle submenu');
		
		var isOpen = li.classList.contains('shiksha-sub-open');

		// Close all siblings first
		var parent = li.parentElement;
		if (parent) {
			var siblings = parent.querySelectorAll(':scope > li.shiksha-sub-open');
			siblings.forEach(function(sib) {
				sib.classList.remove('shiksha-sub-open');
				var sibArrow = sib.querySelector('.shiksha-arrow');
				if (sibArrow) sibArrow.classList.remove('open');
			});
		}

		if (!isOpen) {
			// Open this one
			li.classList.add('shiksha-sub-open');
			arrow.classList.add('open');
			console.log('SHIKSHA MENU: Submenu opened');
		}
	}

	function openMenu(btn, dropdown) {
		console.log('SHIKSHA MENU: Opening');
		
		currentToggle = btn;
		currentDropdown = dropdown;
		
		btn.classList.add('elementor-active');
		dropdown.classList.add('shiksha-open');
		overlay.classList.add('active');
		document.body.classList.add('shiksha-locked');

		// Add close button if not exists
		if (!dropdown.querySelector('.shiksha-close-btn')) {
			var closeBtn = document.createElement('button');
			closeBtn.className = 'shiksha-close-btn';
			closeBtn.innerHTML = '×';
			closeBtn.setAttribute('aria-label', 'Close menu');
			closeBtn.onclick = function(e) {
				e.preventDefault();
				e.stopPropagation();
				closeMenu();
			};
			dropdown.insertBefore(closeBtn, dropdown.firstChild);
		}

		// Make links clickable
		dropdown.querySelectorAll('a').forEach(function(a) {
			a.tabIndex = 0;
		});
	}

	function closeMenu() {
		console.log('SHIKSHA MENU: Closing');
		
		if (currentToggle) {
			currentToggle.classList.remove('elementor-active');
		}
		if (currentDropdown) {
			currentDropdown.classList.remove('shiksha-open');
			
			// Close all submenus
			currentDropdown.querySelectorAll('li.shiksha-sub-open').forEach(function(li) {
				li.classList.remove('shiksha-sub-open');
				var arrow = li.querySelector('.shiksha-arrow');
				if (arrow) arrow.classList.remove('open');
			});

			// Reset tabindex
			currentDropdown.querySelectorAll('a').forEach(function(a) {
				a.tabIndex = -1;
			});
		}
		
		overlay.classList.remove('active');
		document.body.classList.remove('shiksha-locked');
		
		currentToggle = null;
		currentDropdown = null;
	}

	// ESC key closes menu
	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') closeMenu();
	});

})();
