import { createStore } from "redux-create-store";
import pokemonReducer from "./reducers/pokemonReducer";

const store = createStore(pokemonReducer);

export default store;
