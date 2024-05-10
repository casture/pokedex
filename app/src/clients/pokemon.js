const baseUrl = 'https://pokeapi.co/api/v2'

module.exports = {
  async getPokemon() {
    const response = await fetch(`${baseUrl}/pokemon?limit=150`)
    return await response.json()
  },

  async getPokemonDetails(name) {
    const response = await fetch(`${baseUrl}/pokemon/${name}`)
    return await response.json()
  }
}
