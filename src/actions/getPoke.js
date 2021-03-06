import axios from 'axios'

export const fetchPokemon = (first, count) => async (dispatch) => {
  const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${first}&limit=${count}`)
  const pokeBase = pokemons.data.results.map(async (pokemon) => await axios(pokemon.url))
  const pokeInfo = await (await Promise.all(pokeBase)).map(element => element.data)
  dispatch({ type: 'FETCH_POKEMON', payload: pokeInfo })
}
export const changeCount = (count) => (dispatch) => {
  dispatch({ type: 'CHANGE_COUNT', payload: count })
}
export const changePage = (first) => async (dispatch) => {
  const newFirst = first
  await dispatch({ type: 'CHANGE_PAGE', payload: newFirst })
}
export const generatePage = (page, count) => (dispatch) => {
  const newPage = page * count
  dispatch({ type: 'G_PAGE', payload: newPage })
}
