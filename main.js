import './style.scss'

let productHeroContent = document.querySelector('.product-hero__content')

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
