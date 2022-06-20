import './App.css'
import create from "zustand";
import { devtools } from 'zustand/middleware'


const POKEMON_URL =
  "https://gist.githubusercontent.com/jherr/23ae3f96cf5ac341c98cd9aa164d2fe3/raw/0658aeff401d196dece7ec6fe6c726c6adc1cc00/gistfile1.txt";

const useStore = create(devtools((set) => ({
  filter: "",
  pokemon: [],
  setFilter: (filter) => set((state) => ({
    ...state,
    filter
  })),
  setPokemon: (pokemon) => set((state) => ({
    ...state,
    pokemon
  }))
}), { name: "MyStore" }));

const FilterInput = () => {
  const filter = useStore((state) => state.filter);
  const setFilter = useStore((state) => state.setFilter);

  return (
    <input type="text" value={filter} onChange={(evt) => setFilter(evt.target.value)}/>
  )
};

const PokemonTable = () => {
  const pokemon = useStore((state) => state.pokemon);
  const filter = useStore((state) => state.filter);

  return (
    <table width="100%">
      <tbody>
      {pokemon
        .filter(({ name: { english } }) => english.toLowerCase().includes(filter.toLowerCase()))
        .map(({ id, name: { english }, type }) => (
          <tr key={id}>
            <td>{english}</td>
            <td>{type.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
};

fetch(POKEMON_URL)
  .then(response => response.json())
  .then(pokemon => useStore.setState((state) => ({
    ...state,
    pokemon
  })))

function App() {
  // const setPokemon = useStore((state) => state.setPokemon);
  //
  // useEffect(() => {
  //   fetch(POKEMON_URL)
  //     .then(response => response.json())
  //     .then(pokemon => setPokemon(pokemon))
  // }, []);

  return (
    <div className="App">
      <div>
        <FilterInput/>
      </div>
      <h1>List of Pokemon</h1>
      <PokemonTable/>
    </div>
  )
}

export default App
