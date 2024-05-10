const { html } = require('../util/htmlTemplates')

function Modal(props) {
  return html`
    Hello ${props.name}
  `
}

module.exports = {
  Modal
}
