import './style.scss'

const hasTrustPilot = true
const mainWrapper = document.querySelector('main.wrap')

// -------------------------------------------------------------------------
// TRUSTPILOT
// -------------------------------------------------------------------------
if (hasTrustPilot) {
    // <div class="trustpilot-widget" data-locale="it-IT" data-template-id="54197383fd9dceac42a68694" data-businessunit-id="64be4445f0e432908cdebdcd"  data-style-width="100%" data-style-size="M" data-text-color="dark" data-headline="star" data-support-text="word" data-background="light" data-external-elements-color="dark">
    const trustpilotbox = document.createElement('div')
    trustpilotbox.innerHTML = `
        <div class="trustpilot-widget" data-locale="it-IT" data-template-id="54197383fd9dceac42a68694" data-businessunit-id="64be4445f0e432908cdebdcd" data-style-width="100%" data-style-size="L" data-text-color="dark" data-headline="star" data-support-text="word" data-background="light" data-external-elements-color="dark">
            <a href="https://it.trustpilot.com/review/enotecamasi.it" target="_blank" rel="noopener">Trustpilot</a>
        </div>
    `

    // let footerLogo = document.querySelector('.footer__logo')
    mainWrapper.parentNode.insertBefore(trustpilotbox, mainWrapper.nextSibling)

    const script = document.createElement('script')
    script.src = '//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    script.type = 'text/javascript'

    document.head.appendChild(script)
}

// -------------------------------------------------------------------------
// CATEGORY PAGE
// -------------------------------------------------------------------------
if (document.body.classList.contains('category-page')) {
    let title = mainWrapper.querySelector('.category-intro__title')
    if (title) title.title = title.innerText
}

// -------------------------------------------------------------------------
// PRODUCT
// -------------------------------------------------------------------------
function makeAdditionalProductInfoBox () {
    let productHeroContent = document.querySelector('.product-hero__content')
    let productInfoOverlay = document.querySelector('.product-hero__info-overlay')

    if (! productHeroContent || productInfoOverlay) return

    if (productHeroContent) {
        const toggleView = (el) => {
            let showing = el.classList.contains('show')
            showing ? el.classList.remove('show') : el.classList.add('show')
        }

        let infoOverlay = document.createElement('div')
        infoOverlay.classList.add('product-hero__info-overlay')

        infoOverlay.innerHTML += `<button class="product-hero__info-overlay-action">x</button>`
        infoOverlay.innerHTML += productHeroContent.innerHTML

        let infoOverlayElement = document.body.appendChild(infoOverlay)

        // -------------------------------------------------------------------------
        let infoOverlayBtn = document.createElement('button')
        infoOverlayBtn.classList.add('product-hero__info-overlay-button')

        let labels = {
            it: 'Informazioni aggiuntive',
            en: 'Additional info on this wine',
            de: 'Zusätzliche Informationen zu diesem Wein',
        }

        let language = document.documentElement.lang

        infoOverlayBtn.innerHTML = labels[language]

        infoOverlayBtn.addEventListener('click', () => toggleView(infoOverlayElement))
        infoOverlayElement.querySelector('.product-hero__info-overlay-action').addEventListener('click', () => toggleView(infoOverlayElement))

        let productHeroContentLinksWrap = document.querySelector('.product-hero__content-links-wrap')

        if (productHeroContentLinksWrap) productHeroContentLinksWrap.appendChild(infoOverlayBtn)
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
}

function checkProductDetailsLink () {
    let productHeroContent = document.querySelector('.product-hero__content')
    if (! productHeroContent) return

    let productHeroContentLinksWrap = document.querySelector('.product-hero__content-links-wrap')
    let productDetailItemsLinks = [...document.querySelectorAll('.product-detail__item')]

    productHeroContentLinksWrap = document.createElement('div')
    productHeroContentLinksWrap.classList.add('product-hero__content-links-wrap')

    productHeroContent.appendChild(productHeroContentLinksWrap)

    // controllo se esiste il blocco specialpack -> se esiste viene messo in evidenza sotto al campo "aggiungi al carrello"
    productDetailItemsLinks.forEach((item, i) => {
        let title = item.querySelector('.product-detail__title')
        let search = ['specialpack', 'confezione 6 bottiglie']

        if (search.includes(title.innerText.toLowerCase())) {
            let link = item.querySelector('.product-detail__content a')

            if (link) {
                let e = document.createElement('div')
                e.classList.add('product-hero__content-link')
                e.innerHTML = link.closest('div').innerHTML

                productHeroContent.appendChild(e)
            }

            productDetailItemsLinks.splice(i, 1)
        }
    })

    if (! productHeroContent || ! productDetailItemsLinks.length) return clearInterval(intervalProductDetails)

    if (productDetailItemsLinks.length) {
        productDetailItemsLinks.forEach(item => {
            let a = item.querySelector('a')

            if (a && a.innerText.trim().length) {
                a.target = '_blank'
                productHeroContentLinksWrap.innerHTML += a.outerHTML
            }
        })
    }

    if (productHeroContentLinksWrap) return clearInterval(intervalProductDetails)
}

const intervalProductDetails = setInterval(() => checkProductDetailsLink(), 250)
const intervalProduct = setInterval(() => makeAdditionalProductInfoBox(), 300)

function headerMenu() {
    let customMenuCointainer = document.querySelector('.cust_menu_container')

    if (customMenuCointainer) return false

    customMenuCointainer = document.createElement('div')
    customMenuCointainer.classList.add('cust_menu_container')

    let menuList = document.querySelector(".site-nav__menu ul.site-nav__menu__list")

    if (menuList) {
        customMenuCointainer.innerHTML = menuList.innerHTML
        document.querySelector("header > .wrap > .nav").append(customMenuCointainer)
    }
}

const intervalHeader = setInterval(() => headerMenu(), 200)

function checkForBanner() {
    //
    let main = document.querySelector('main')
    let banner = main.querySelector('.em-special-banner')
    let country = localStorage.getItem('masiagricola_prod_countryCode')

    if (banner) {
        if (country == 'IT') return false;
        else {
            banner.remove()
            let bannerAfter = main.querySelector('.em-special-banner-after')
            bannerAfter.remove()

            return false
        }
    } else if (country != 'IT') {
        return false
    };

    const bannerHtml = `
        <div class="em-special-banner">
            <p>Inserisci il tuo ordine entro le <span class="blink">12:00 del 19.12</span></p>
            <p>per ricevere il tuo vino <span class="blink">entro Natale</span></p>
        </div>
    `

    const bannerElement = document.createElement('div')
    const bannerElementAfter = document.createElement('p')
    bannerElementAfter.classList.add('em-special-banner-after')

    bannerElement.innerHTML = bannerHtml

    let block = main.querySelector('.text_block')
    if (block) block.after(bannerElement)
    if (block) block.after(bannerElementAfter)
}

function showItBanner() {
    //
    let main = document.querySelector('main')
    let banner = document.querySelector('.em-special-banner')
    let country = localStorage.getItem('masiagricola_prod_countryCode')

    if (banner) {
        if (country == null || country == 'IT') return clearInterval(intervalBanner)
        else {
            banner.remove()

            return clearInterval(intervalBanner)
        }
    } else if (country !== null && country != 'IT') {
        return clearInterval(intervalBanner)
    }

    // console.log(country);

    const bannerHtml = `
        <div class="em-special-banner header-banner">
            <p>Spese di <b>spedizione gratuita</b> da 129,90 €</p>
        </div>
    `

    const bannerElement = document.createElement('div')

    bannerElement.innerHTML = bannerHtml

    let header = document.querySelector('header')
    if (header) header.before(bannerElement)
}

const intervalBanner = setInterval(() => showItBanner(), 200)

function setup() {
    let page = window.__NEXT_DATA__ ? window.__NEXT_DATA__.query.page : false
    page ? document.body.classList.add(page) : null

    // if ((document.body.classList.contains('home-page') || document.body.classList.contains('black-friday')) && (new Date() < new Date(1732921200000))) {
    //     document.body.classList.add('is-black-friday')
    // }
    if (new Date() < new Date(1734606000000)) {
        setInterval(() => checkForBanner(), 2000)
    }
}

setup()
