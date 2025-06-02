/**
 * contacts.js
 *
 * Smartomato storefront — runtime patch for /contacts.
 * Duplicates the address section with a second branch (ул. Шмидта 20)
 * and inserts a separator, keeping Nuxt client‑side navigations in mind.
 */

;(function () {
	const STREET_TEXT = 'ул. Шмидта, д. 20'

	function injectSecondAddress() {
		if (!location.pathname.startsWith('/contacts')) return

		const card = document.querySelector('.sp-left .sp-card')
		if (!card) return

		// Already injected?
		if (card.textContent.includes(STREET_TEXT)) return

		// Reference: the first address block (Маяковского)
		const ref = Array.from(card.querySelectorAll('.sp-condition-2')).find(el =>
			el.textContent.includes('ул. Маяковского')
		)
		if (!ref) return

		// Build new DOM nodes
		const address = document.createElement('div')
		address.className = 'sp-condition-2'
		address.innerHTML =
			`<span>Адрес</span>` +
			`<span class="sp-condition-value">г. Ейск, ${STREET_TEXT}</span>`

		const separator = document.createElement('div')
		separator.className = 'sp-separator'

		// Insert right after the original address
		ref.after(address)
		address.after(separator)
	}

	// Run once on ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', injectSecondAddress, {
			once: true,
		})
	} else {
		injectSecondAddress()
	}

	// Observe DOM mutations (Nuxt updates)
	const observer = new MutationObserver(injectSecondAddress)
	observer.observe(document.body, { childList: true, subtree: true })

	// Attach to Nuxt router (extra guarantee)
	const nuxtPoll = setInterval(() => {
		if (window.$nuxt && window.$nuxt.$router) {
			window.$nuxt.$router.afterEach(() => {
				requestAnimationFrame(injectSecondAddress)
			})
			clearInterval(nuxtPoll)
		}
	}, 150)
})()
