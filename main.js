import './style.scss'

const hasTrustPilot = true
const mainWrapper = document.querySelector('main.wrap')

// -------------------------------------------------------------------------
// TRUSTPILOT
// -------------------------------------------------------------------------
if (hasTrustPilot) {
    const trustpilotbox = document.createElement('div')
    trustpilotbox.innerHTML = `
        <div class="trustpilot-widget" data-locale="it-IT" data-template-id="5419b637fa0340045cd0c936" data-businessunit-id="64be4445f0e432908cdebdcd" data-style-height="20px" data-style-width="100%" data-theme="light">
            <a href="https://it.trustpilot.com/review/enotecamasi.it" target="_blank" rel="noopener">Trustpilot</a>
        </div>
    `

    mainWrapper.parentNode.insertBefore(trustpilotbox, mainWrapper.nextSibling)

    const script = document.createElement('script')
    script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    script.type = 'text/javascript'

    document.head.appendChild(script)
}

window.addEventListener('visibilitychange', () => {
    let productHeroContent = document.querySelector('.product-hero__content')

    // -------------------------------------------------------------------------
    // PRODUCT
    // -------------------------------------------------------------------------
    if (productHeroContent) {
        let infoOverlay = document.createElement('div')
        infoOverlay.classList.add('product-hero__info-overflay')

        infoOverlay.innerHTML = productHeroContent.innerHTML

        let infoOverlayElement = document.body.appendChild(infoOverlay)

        // -------------------------------------------------------------------------
        let infoOverlayBtn = document.createElement('button')
        infoOverlayBtn.classList.add('product-hero__info-overflay-button')

        infoOverlayBtn.innerHTML = 'Additional info on this wine'

        infoOverlayBtn.addEventListener('click', () => {
            let showing = infoOverlayElement.classList.contains('show')

            // @todo -> click outside

            showing ? infoOverlayElement.classList.remove('show') : infoOverlayElement.classList.add('show')
        })

        productHeroContent.appendChild(infoOverlayBtn)
    }

    let productDetailItems = document.querySelectorAll('.product-detail__item')
    if (productDetailItems.length) {
        productDetailItems.forEach(item => {
            let title = item.querySelector('.product-detail__title')

            if (title.innerText.toLowerCase() == 'immagine') {
                let image = item.querySelector('img')

                if (image) {
                    let media = document.createElement('img')
                    media.src = image.src
                    media.classList.add('product-hero__image__additional')

                    let title = document.querySelector('h1.product-hero__title')

                    title.parentNode.insertBefore(media, title)
                }
            }
        })
    }
})
