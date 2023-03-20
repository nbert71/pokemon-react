import { useState } from "react";
import "./App.scss";
import PokemonList from "./components/PokemonList";
import PokemonShow from "./components/PokemonShow";

function App() {
	const [searchedId, setSearchedId] = useState(-1);

	return (
		<div className="app">
			<PokemonShow searchedId={searchedId} />
			<PokemonList emitPokemonIdFromSearch={(id) => setSearchedId(id)} />
		</div>
	);
}

export default App;
