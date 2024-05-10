const { html } = require('../util/htmlTemplates')
const layout = require('../layouts/default')
const { Modal } = require('../components/modal')

module.exports = async function(app, options) {

  app.get('/', async (req, res) => {
    res.header('Content-Type', 'text/html')
    return layout(html`
      <div>Hello World</div>
      <my-modal>
        <div slot="header">George</div>
        <div slot="body">George</div>
        <div slot="footer">George</div>
      </my-modal>
      ${Modal({ name: 'George from a function' })}
    `)
  })
}
