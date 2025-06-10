;(function () {
	const style = document.createElement('style')
	style.textContent = `
    #site-down-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.85);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      color: white;
      font-family: sans-serif;
      font-size: 1.5rem;
      text-align: center;
      padding: 2rem;
    }
    #site-down-overlay a {
      color: #00d1b2;
      font-weight: bold;
      text-decoration: underline;
      margin-top: 1rem;
      display: inline-block;
      font-size: 1.25rem;
    }
  `
	document.head.appendChild(style)

	const overlay = document.createElement('div')
	overlay.id = 'site-down-overlay'
	overlay.innerHTML = `
    <div>САЙТ ВРЕМЕННО НЕ РАБОТАЕТ</div>
    <a href="tel:+79530925555">+7 (953) 092-55-55</a>
  `

	document.body.appendChild(overlay)
})()
