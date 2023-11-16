import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PokemonList from "./pokemonList";

const mockStore = configureStore([]);

describe("PokemonList", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      pokemons: [
        { id: 1, name: "Bulbasaur", sprites: { front_default: "bulbasaur.jpg" } },
        { id: 2, name: "Charmander", sprites: { front_default: "charmander.jpg" } },
      ],
    });
  });

  it("renders the component", () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute("src", "bulbasaur.jpg");
    expect(screen.getByAltText("Charmander")).toHaveAttribute("src", "charmander.jpg");
  });
});
