if (window.__SMARTOMATO_FOOTER_APPLIED__) return
window.__SMARTOMATO_FOOTER_APPLIED__ = true
// footer.js — добавляет адрес в футер и следит, чтобы он не пропадал
;(() => {
	let observer // MutationObserver instance
	let footer = null // will hold <footer> element reference

	// одноразовая вставка (если нужен ещё раз — просто вызови снова)
	const ensureFooterAddress = () => {
		// получаем актуальный <footer> каждый раз — Nuxt может пересоздать узел
		footer = document.querySelector('footer')
		if (!footer) return

		const blocks = footer.querySelectorAll('.nav-footer-block')
		if (blocks.length < 2) return

		const ul = blocks[1].querySelector('ul')
		if (!ul) return

		// уже есть — выходим
		const anchor = ul.querySelector('a')
		if (anchor && anchor.textContent.includes('Шмидта')) {
			// адрес уже есть — дальнейшее наблюдение не нужно
			if (observer) observer.disconnect()
			return
		}

		const li = document.createElement('li')
		li.setAttribute('data-v-e83b95b6', '')

		const a = document.createElement('a')
		a.href = '/'
		a.setAttribute('data-v-e83b95b6', '')
		a.textContent = 'Адрес: ул. Шмидта, д. 20'

		li.appendChild(a)
		ul.appendChild(li)
	}

	// первый запуск после загрузки
	ensureFooterAddress()

	// MutationObserver — если Nuxt перерисует футер, добавим адрес снова
	observer = new MutationObserver(ensureFooterAddress)
	// наблюдаем за всем телом — так поймаем появление футера, если его ещё нет
	observer.observe(document.body, { childList: true, subtree: true })
})()
