const { html, hfor } = require('../../util/htmlTemplates')
const layout = require('../../layouts/default')
const Pokedex = require('../../clients/pokemon')

module.exports = async function(app, options) {

  app.get('/', async (req, res) => {
    const pokemonList = await Pokedex.getPokemon()
    const search = req.query.search?.toLowerCase() ?? ''
    const filteredPokemon = !search ? [] : pokemonList.results.filter(({ name }) => name.includes(search))
    const pokemon = await Promise.all(filteredPokemon.map(pokemon => Pokedex.getPokemonDetails(pokemon.name)))

    res.header('Content-Type', 'text/html')
    res.send(layout(html`
      <input type="search" name="search" placeholder="Search" 
        hx-get="/pokemon"
        hx-trigger="input changed delay:500ms, search"
        hx-select="#pokemon-list"
        hx-swap="transition:true"
        hx-target="#pokemon-list"
      />
      <h1 id="header-main" hx-swap-oob="true">Pokemon (${pokemon.length})</h1>
      <div class="slide-it">
        <div
          id="pokemon-list"
          style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 1rem;"
        >
          ${hfor(pokemon, p => html`
            <pokemon-tile
              id="${p.name}"
              frontUrl="${p.sprites.front_default}"
              backUrl="${p.sprites.back_default}"
            >
              <h4 style="text-transform:capitalize">${p.name}</h4> 
            </pokemon-tile>
          `)}
        </div>
      </div>
      <style>
        @keyframes fade-in {
         from { opacity: 0; }
        }

        @keyframes fade-out {
         to { opacity: 0; }
        }

        @keyframes slide-from-right {
         from { transform: translateY(90px); }
        }

        @keyframes slide-to-left {
         to { transform: translateY(-90px); }
        }

        .slide-it {
         view-transition-name: slide-it;
        }

        ::view-transition-old(slide-it) {
         animation: 180ms cubic-bezier(0.4, 0, 1, 1) both fade-out,
         600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-to-left;
        }
        ::view-transition-new(slide-it) {
          animation: 420ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,
          600ms cubic-bezier(0.4, 0, 0.2, 1) both slide-from-right;
        }
      </style>
    `))
  })

  app.get('/:id', async (req, res) => {
    const { id } = req.params
    const details = await Pokedex.getPokemonDetails(id)
    const capitalizedName = details.name.charAt(0).toUpperCase() + details.name.slice(1)
    const soundFile = `${String(id).padStart(3, '0')}%20-%20${capitalizedName}.wav`

    res.header('Content-Type', 'text/html').send(layout(html`
      <pokemon-cry>
        <img src="${details.sprites.front_default}" alt="Pokemon"/>
        <audio src="/public/${soundFile.toString()}"></audio>
      </pokemon-cry>
    `))
  })
}
