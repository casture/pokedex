class MyModal extends HTMLElement {
  constructor() {
    super()
    const modalContent = document.getElementById('modal-template').content
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.appendChild(modalContent)
  }
  connectedCallback() {
    // this.innerHTML = document.getElementById('modal-template')?.content ?? ''
  }
}

customElements.define('my-modal', MyModal)
