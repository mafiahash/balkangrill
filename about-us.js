/**
 * about-us.js
 *
 * Smartomato storefront — runtime patch.
 * Replaces the hero background <img> on the `/about` route
 * with the provided base64‑encoded picture.
 *
 * Works on initial load and after any Nuxt client‑side navigation.
 */

;(function () {
	const NEW_SRC =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC7gAAAZCCAYAAACky67GAAAACXBIWXMAAAsTAAALEwEAmpwYAACgvElEQVR4nOzdQW7jyNat0SPBAqwxsBG9mP942GMjxiACIqDXSN/3572VWWk7FTpUaC2gALcqd9fBD8eH2+0WAAAAAAAAMJJW6iUi3rN3AAAAAMCIpmU+9Pp/v/X6HwMAAAAAAEAGcTsAAAAAdLN9/NeNwB0AAAAAAIBhtFKv4RsYAAAAAPSwTst87v2PeNwDAAAAAABgCK3UW/YGAAAAABjUQ+L2CIE7AAAAAAAAT66VeomI9+wdAAAAADCiaZkPj/z3jo/8xwAAAAAAAOCeWqnXELcDAAAAQA/ro+P2CBfcAQAAAAAAeFKt1Fv2BgAAAAAY1Dot8znjHxa4AwAAAAAA8FRaqZdwtR0AAAAAekmL2yME7gAAAAAAADyRVuo1fOMCAAAAgB5Sw/b/8PgHAAAAAADAU2il3rI3AAAAAMCgdhG3RwjcAQAAAAAA2LlW6iUi3rN3AAAAAMCIpmU+ZG/42TF7AAAAAAAAAPyOuB0AAAAAutn2FrdHuOAOAAAAAAAAAAAAAAAAAAAAAAAAAAAA' // truncated for brevity

	/**
	 * Try to swap the image on the current page
	 */
	function swapAboutHero() {
		if (!location.pathname.startsWith('/about')) return

		const img = document.querySelector('img.background-image')
		if (!img || img.getAttribute('data-patched') === 'true') return

		img.src = NEW_SRC
		img.setAttribute('data-patched', 'true')
	}

	// Run once on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', swapAboutHero, { once: true })
	} else {
		swapAboutHero()
	}

	// Observe DOM updates because Nuxt may re‑render the page
	const observer = new MutationObserver(swapAboutHero)
	observer.observe(document.body, { childList: true, subtree: true })

	// Hook Nuxt router changes for extra safety
	const nuxtPoll = setInterval(() => {
		if (window.$nuxt && window.$nuxt.$router) {
			window.$nuxt.$router.afterEach(() => {
				requestAnimationFrame(swapAboutHero)
			})
			clearInterval(nuxtPoll)
		}
	}, 150)
})()
