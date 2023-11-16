import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setPokemons } from "./actions/pokemonActions";
import axios from "axios";


const PokemonList = ({ pokemons, setPokemons }) => {
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
  }, [setPokemons]);

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

const mapStateToProps = (state) => ({
  pokemons: state.pokemons,
});

const mapDispatchToProps = {
  setPokemons,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonList);
