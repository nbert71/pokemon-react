import "./PokemonShow.scss";
import { useState, useEffect } from "react";
import PokemonStats from "./PokemonStats";

function PokemonShow() {
	const [pokemon, setPokemon] = useState(null);
	const [nextPokemon, setNextPokemon] = useState(null);
	const [imageLoaded, setImageLoaded] = useState(false);
	const [isShinyImage, setIsShinyImage] = useState(false);

	const fetchData1 = () => {
		let id = Math.floor(Math.random() * 1009);
		fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setPokemon(data);
			});
	};

	const fetchData2 = () => {
		const id = Math.floor(Math.random() * 1009);
		fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${id}`)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setNextPokemon(data);
			});
	};

	const handleClick = () => {
		setPokemon(nextPokemon);
		fetchData2();
	};

	useEffect(() => {
		fetchData1();
		fetchData2();
	}, []);

	return (
		<>
			{pokemon && (
				<div className="pokemonshow">
					<div className="left">
						{pokemon.sprites && (
							<>
								<img
									style={
										imageLoaded ? {} : { display: "none" }
									}
									src={
										isShinyImage
											? pokemon.sprites.shiny
											: pokemon.sprites.regular
									}
									onLoad={() => setImageLoaded(true)}
									onClick={() =>
										setIsShinyImage(!isShinyImage)
									}
								/>
                                <img src={nextPokemon.sprites.regular} style={{display: 'none'}} />
								<button onClick={handleClick}>Click !</button>
							</>
						)}
					</div>
					<div className="right">
						<h1 className="name">{pokemon.name.fr}</h1>
						<p className="category">{pokemon.category}</p>
						<div className="egg_groups">
							<p>Groupes :</p>
							{pokemon.egg_groups &&
								pokemon.egg_groups.map((g) => (
									<span key={g}>{g}</span>
								))}
						</div>
						<div className="types">
							<p>Types :</p>
							<div className="types_container">
								{pokemon.types.map((type) => (
									<img
										key={type.name}
										src={type.image}
										title={type.name}
									/>
								))}
							</div>
						</div>
						<div className="stats">
							<p>Caractéristiques :</p>
							<PokemonStats stats={pokemon.stats} />
						</div>
						<div className="talents">
							<p>Attaques :</p>
                            
                            <div className="talents-wrapper">
                                {pokemon.talents &&
                                    pokemon.talents.map((talent) => (
                                        <span key={talent.name}>{talent.name}</span>
                                    ))}
                            </div>
						</div>
					</div>
				</div>
			)}
			{/* <button onClick={() => fetchData()}>Click !</button> */}
		</>
	);
}

export default PokemonShow;
