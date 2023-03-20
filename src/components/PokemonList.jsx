import React, { useEffect, useRef, useState } from "react";
import "./PokemonList.scss";

function PokemonList(props) {
	const [pokemons, setPokemons] = useState([]);
	const [matchedPokemons, setMatchedPokemons] = useState([]);
	const inputSearch = useRef(null);

	useEffect(() => {
		fetch("https://api-pokemon-fr.vercel.app/api/v1/pokemon")
			.then((response) => response.json())
			.then((data) => {
				const toDelete = data.shift();
				setPokemons(data);
			});
	}, []);

	const handleSearch = (text) => {
		if (text.length > 0) {
			console.log(text);
			let results = pokemons.filter((pokemon) => {
				return pokemon.name.fr.toLowerCase().indexOf(text) !== -1;
			});
			setMatchedPokemons(results);
		} else {
			setMatchedPokemons([]);
		}
	};

	const emitPokemonIdFromSearch = (id) => {
		props.emitPokemonIdFromSearch(id);
		inputSearch.current.value = ""; // erase input content
		setMatchedPokemons([]); // delete suggestions
	};

	return (
		pokemons && (
			<div className="search-container">
				<h2>
					Cherche ton pokémon préféré et clique pour obtenir des
					inforamtions sur lui !
				</h2>
				<div className="input-container">
					<input
						type="text"
						onChange={(e) => handleSearch(e.target.value)}
						placeholder="Pikachu"
						className="search-input"
						ref={inputSearch}
					/>
					<svg
						className="search-icon"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</div>

				<ul className="suggestions">
					{matchedPokemons.map((matchPokemon) => (
						<li
							key={matchPokemon.pokedexId}
							onClick={() =>
								emitPokemonIdFromSearch(matchPokemon.pokedexId)
							}
						>
							{matchPokemon.name.fr}
						</li>
					))}
				</ul>
			</div>
		)
	);
}

export default PokemonList;
