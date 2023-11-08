import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        const pokemonList = response.data.results;
        const detailedPokemonList = await Promise.all(
          pokemonList.map(async (pokemon) => {
            const result = await axios.get(pokemon.url);
            return result.data;
          })
        );
        setPokemons(detailedPokemonList);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokemons</h1>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;

