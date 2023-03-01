import "./PokemonShow.scss";
import { useState, useEffect } from "react";
import PokemonStats from "./PokemonStats";

function PokemonShow() {
    const [pokemon, setPokemon] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const fetchData = () => {
        const id = Math.floor(Math.random() * 1009);
        fetch(`https://api-pokemon-fr.vercel.app/api/v1/pokemon/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPokemon(data);
            });
    };

    useEffect(() => fetchData(), []);

    return (
        <>
            {pokemon && (
                <div className="pokemonshow">
                    <div className="left">
                        {pokemon.sprites && (
                            <img
                                style={imageLoaded ? {} : { display: "none" }}
                                src={pokemon.sprites.regular}
                                onLoad={() => setImageLoaded(true)}
                            />
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

                            {pokemon.talents.map((talent) => (
                                <span key={talent.name}>{talent.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {/* <button onClick={() => fetchData()}>Click !</button> */}
        </>
    );
}

export default PokemonShow;
