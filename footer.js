// update-footer.js  — самодостаточный IIFE, срабатывает после загрузки DOM
;(() => {
	const footer = document.querySelector('footer')
	if (!footer) return

	const blocks = footer.querySelectorAll('.nav-footer-block')
	if (blocks.length < 2) return

	const ul = blocks[1].querySelector('ul')
	if (!ul) return

	const li = document.createElement('li')
	li.setAttribute('data-v-e83b95b6', '')

	const a = document.createElement('a')
	a.href = '/'
	a.setAttribute('data-v-e83b95b6', '')
	a.textContent = 'Адрес: ул. Шмидта 20'

	li.appendChild(a)
	ul.appendChild(li)
})()
