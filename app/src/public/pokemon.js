const template = document.createElement('template')
template.innerHTML = `
  <article>
    <slot></slot>
    <img id="front" style="height: 6rem; width: 6rem"/>
    <img id="back" hidden style="height: 6rem; width: 6rem"/>
  </article>
  <style>
    article {
      padding: var(--pico-block-spacing-vertical) var(--pico-block-spacing-horizontal);
      border-radius: var(--pico-border-radius);
      background: var(--pico-card-background-color);
      box-shadow: var(--pico-card-box-shadow);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 8rem;
      min-height: 10rem;
      transition: transform 1000ms;
    }
    article.flip {
      transform: rotateY(180deg);
    }
  </style>
`

class PokemonTile extends HTMLElement {

  static get observedAttributes() {
    return ['frontUrl']
  }

  constructor() {
    super()
    const content = template.content.cloneNode(true)
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(content)

    this.$article = this.shadowRoot.querySelector('article')
    this.$frontImg = this.shadowRoot.querySelector('img#front')
    this.$backImg = this.shadowRoot.querySelector('img#back')
    this.facingFront = true
  }

  connectedCallback() {
    const frontUrl = this.getAttribute('frontUrl')
    const backUrl = this.getAttribute('backUrl')
    this.$frontImg.setAttribute('src', frontUrl)
    this.$backImg.setAttribute('src', backUrl)
    this.$backImg.style.transform = 'rotateY(180deg)'
    this.addEventListener('click', this._flip.bind(this))
  }

  disconnectCallback() {
    this.removeEventListener('click', this._flip.bind(this))
  }

  _flip() {
    this.$article.classList.toggle('flip')
    setTimeout(() => {
      this.$frontImg.toggleAttribute('hidden')
      this.$backImg.toggleAttribute('hidden')
    }, 300)
  }
}

htmx.config.globalViewTransitions = true

customElements.define('pokemon-tile', PokemonTile)



class PokemonCry extends HTMLElement {
  connectedCallback() {
    const audioElement = this.querySelector('audio')
    if (audioElement) {
      console.log({ audioElement })
      this.cry = new Audio(audioElement.getAttribute('src'))
      this.cry.play()
    }
  }
  disconnectedCallback() {
    this.cry?.play()
  }
}

customElements.define('pokemon-cry', PokemonCry)
