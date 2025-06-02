/* smartomato-fixes.js
   ▸ скрывает телефон в футере уже сделано стилями
   ▸ заменяет картинку на /about
*/

;(() => {
	// GTM/analytics dataLayer – если нужно, можно расширять здесь
	window.dataLayer = window.dataLayer || []

	// Подмена картинки на /about
	if (location.pathname === '/about') {
		const oldSrc =
			'https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/organization_common_photo/photo/4763/Group_56__5_.png'
		const img = document.querySelector(`img[src="${oldSrc}"]`)
		if (img) {
			img.src =
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC7gAAAZCCAYAAACky67GAA...' // обрезал-для-краткости
		} else {
			console.warn('[smartomato-fixes] Картинка не найдена:', oldSrc)
		}
	}
})()

// ───────────────────────────────────────────────────────────
// /contacts → вставляем "Адрес: ул. Шмидта, д. 20" в карточку
// ───────────────────────────────────────────────────────────
if (location.pathname === '/contacts') {
	const card = document.querySelector('.sp-left .sp-card')
	// чтобы не плодить дубликаты
	const already = card
		?.querySelector('.sp-condition-value')
		?.textContent.includes('Шмидта')

	if (card && !already) {
		// <div class="sp-separator"></div>
		card.appendChild(
			Object.assign(document.createElement('div'), {
				className: 'sp-separator',
			})
		)

		// <div class="sp-condition-2"><span>Адрес</span> … </div>
		const wrapper = Object.assign(document.createElement('div'), {
			className: 'sp-condition-2',
		})

		const label = document.createElement('span')
		label.textContent = 'Адрес'

		const value = Object.assign(document.createElement('span'), {
			className: 'sp-condition-value',
			textContent: 'г. Ейск, ул. Шмидта, д. 20',
		})

		wrapper.append(label, value)
		card.appendChild(wrapper)
	}
}
