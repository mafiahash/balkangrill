;(function () {
	/**
	 * Injects the address into the 2‑nd .nav-footer-block -> ul
	 * Works on initial load and after Nuxt client‑side navigations.
	 */
	function injectAddress() {
		const blocks = document.querySelectorAll('.nav-footer-block ul')
		if (blocks.length < 2) return

		const ul = blocks[1]
		if (ul.querySelector('li[data-custom-address]')) return // already added

		const li = document.createElement('li')
		li.setAttribute('data-custom-address', '')
		li.innerHTML = '<a href="/">Адрес: ул. Шмидта 20</a>'
		ul.appendChild(li)
	}

	/* --- initial DOM ready --- */
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', injectAddress, { once: true })
	} else {
		injectAddress()
	}

	/* --- observe DOM changes (Nuxt can re‑render footer on navigation) --- */
	const observer = new MutationObserver(injectAddress)
	observer.observe(document.body, { childList: true, subtree: true })

	/* --- Nuxt router hook (extra safety) --- */
	const nuxtPoll = setInterval(() => {
		if (window.$nuxt && window.$nuxt.$router) {
			window.$nuxt.$router.afterEach(() => {
				requestAnimationFrame(injectAddress)
			})
			clearInterval(nuxtPoll)
		}
	}, 150)
})()
