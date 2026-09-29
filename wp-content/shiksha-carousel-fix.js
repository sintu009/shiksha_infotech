/*
 * Shiksha Infotech - Lightweight carousel for the static/exported site.
 *
 * Elementor testimonial / image carousels normally run on Swiper JS, which
 * does not initialize in this static export, so the slides appear broken or
 * stacked. This script turns every ".elementor-main-swiper.swiper" into a
 * simple, responsive, working slider (prev/next arrows + drag + autoplay).
 */
(function () {
	"use strict";

	// Run AFTER window load so we override any partial native Swiper init.
	function ready(fn) {
		if (document.readyState === "complete") {
			setTimeout(fn, 300);
		} else {
			window.addEventListener("load", function () { setTimeout(fn, 300); });
		}
	}

	function perView() {
		// Show one review at a time on all screen sizes.
		return 1;
	}

	// Swiper lazy-load leaves images in data-src and shows a spinner
	// (.swiper-lazy-preloader). Load the real images and remove spinners.
	function loadLazyImages(root) {
		var lazyImgs = root.querySelectorAll("img.swiper-lazy[data-src]");
		lazyImgs.forEach(function (img) {
			var src = img.getAttribute("data-src");
			if (src) {
				img.src = src;
				var srcset = img.getAttribute("data-srcset");
				if (srcset) img.srcset = srcset;
				img.classList.add("swiper-lazy-loaded");
				img.classList.remove("swiper-lazy");
			}
		});
		var preloaders = root.querySelectorAll(".swiper-lazy-preloader");
		preloaders.forEach(function (p) { p.parentNode && p.parentNode.removeChild(p); });
	}

	// =========================================================
	// Read More / Read Less toggle for testimonial text
	// =========================================================
	function initReadMoreToggle() {
		var testimonials = document.querySelectorAll(".elementor-testimonial__content");
		
		testimonials.forEach(function (content) {
			var textContainer = content.querySelector(".elementor-testimonial__text");
			
			if (!textContainer) return;
			
			// Check if button already exists
			if (content.querySelector(".shiksha-read-more-btn")) return;
			
			// Create the Read More button
			var btn = document.createElement("button");
			btn.className = "shiksha-read-more-btn";
			btn.textContent = "Read more →";
			btn.type = "button";
			
			// Insert button after the text container (inside content, but after text)
			textContainer.insertAdjacentElement('afterend', btn);
			
			// Toggle expand/collapse on click
			btn.addEventListener("click", function (e) {
				e.preventDefault();
				e.stopPropagation();
				
				var isExpanded = textContainer.classList.contains("expanded");
				
				if (isExpanded) {
					textContainer.classList.remove("expanded");
					btn.textContent = "Read more →";
				} else {
					textContainer.classList.add("expanded");
					btn.textContent = "Read less ↑";
				}
			});
		});
	}

	function initCarousel(swiper) {
		var wrapper = swiper.querySelector(":scope > .swiper-wrapper");
		if (!wrapper) return;
		var slides = Array.prototype.slice.call(
			wrapper.querySelectorAll(":scope > .swiper-slide")
		);
		if (slides.length === 0) return;

		// The whole carousel widget (to find its arrows, which are siblings
		// of .elementor-swiper, outside .swiper).
		var widget = swiper.closest(".elementor-widget") || swiper.parentNode;

		// Fix Swiper lazy-load: without native Swiper the images stay in
		// data-src and the preloader spinner spins forever. Load them now
		// and remove the spinners.
		loadLazyImages(swiper);

		var state = { index: 0 };

		function layout() {
			var pv = perView();
			var gap = 20;
			var slideW = (100 / pv);
			slides.forEach(function (s) {
				// reset any native Swiper inline state, then apply ours
				s.style.setProperty("flex", "0 0 " + slideW + "%", "important");
				s.style.setProperty("width", slideW + "%", "important");
				s.style.setProperty("max-width", slideW + "%", "important");
				s.style.setProperty("box-sizing", "border-box", "important");
				s.style.setProperty("padding", "0 " + (gap / 2) + "px", "important");
				s.style.setProperty("margin", "0", "important");
				s.style.setProperty("height", "auto", "important");
			});
			// clamp index
			var maxIndex = Math.max(0, slides.length - pv);
			if (state.index > maxIndex) state.index = maxIndex;
			move();
		}

		function move() {
			var pv = perView();
			var offset = -(state.index * (100 / pv));
			wrapper.style.setProperty("transform", "translate3d(" + offset + "%,0,0)", "important");
		}

		function next() {
			var pv = perView();
			var maxIndex = Math.max(0, slides.length - pv);
			state.index = state.index >= maxIndex ? 0 : state.index + 1;
			move();
		}

		function prev() {
			var pv = perView();
			var maxIndex = Math.max(0, slides.length - pv);
			state.index = state.index <= 0 ? maxIndex : state.index - 1;
			move();
		}

		// Base styles for a working track (override native Swiper inline styles)
		swiper.style.setProperty("overflow", "hidden", "important");
		wrapper.style.setProperty("display", "flex", "important");
		wrapper.style.setProperty("flex-wrap", "nowrap", "important");
		wrapper.style.setProperty("transition", "transform 0.45s ease", "important");
		wrapper.style.setProperty("transform", "translate3d(0,0,0)", "important");
		wrapper.style.setProperty("height", "auto", "important");
		wrapper.style.willChange = "transform";

		layout();

		// Wire up arrows (may be more than one pair; use the ones in this widget)
		var nextBtn = widget.querySelector(".elementor-swiper-button-next");
		var prevBtn = widget.querySelector(".elementor-swiper-button-prev");
		if (nextBtn) {
			nextBtn.style.cursor = "pointer";
			nextBtn.addEventListener("click", function (e) { e.preventDefault(); next(); });
		}
		if (prevBtn) {
			prevBtn.style.cursor = "pointer";
			prevBtn.addEventListener("click", function (e) { e.preventDefault(); prev(); });
		}

		// Basic touch / drag support
		var startX = null;
		swiper.addEventListener("touchstart", function (e) {
			startX = e.touches[0].clientX;
		}, { passive: true });
		swiper.addEventListener("touchend", function (e) {
			if (startX === null) return;
			var dx = e.changedTouches[0].clientX - startX;
			if (dx > 40) prev();
			else if (dx < -40) next();
			startX = null;
		});

		// Autoplay (pauses on hover)
		var timer = setInterval(next, 5000);
		swiper.addEventListener("mouseenter", function () { clearInterval(timer); });
		swiper.addEventListener("mouseleave", function () {
			clearInterval(timer);
			timer = setInterval(next, 5000);
		});

		// Re-layout on resize
		var rt;
		window.addEventListener("resize", function () {
			clearTimeout(rt);
			rt = setTimeout(layout, 150);
		});
	}

	ready(function () {
		var carousels = document.querySelectorAll(".elementor-main-swiper.swiper");
		carousels.forEach(initCarousel);
		
		// Initialize Read More toggles for testimonials
		initReadMoreToggle();
	});
})();
