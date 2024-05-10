const { html } = require('../util/htmlTemplates')

module.exports = function(contentToWrap) {
  return html`
    <!DOCTYPE html>
    <html lang="">
      <head>
        <script src="https://unpkg.com/htmx.org@1.9.12"
        integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
        crossorigin="anonymous"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"/>
        <link rel="stylesheet" href="/public/main.css" media="all">
        <title>Practice App</title>

        <script type="module" src="/public/modal.js"></script>
        <script type="module" src="/public/pokemon.js"></script>
        <!-- <script src="/include/htmx.js"></script> -->
      </head>
      <body>
        <main class="container">
          <div id="loader"></div>
          <section class="pico">
              ${contentToWrap}
          </section>
        </main>

        <template id="modal-template">
          Hello <slot name="name"></slot>
        </template>
        
      </body>
    </html>
  `.value()
}
