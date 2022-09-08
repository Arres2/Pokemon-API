import {
  // Importa las actions types que necesites acá:
  GET_ALL_POKEMON,
  GET_POKEMON,
  GET_DETAIL,
  DELETE_POKEMON,
  CREATE_POKEMON,
  GET_TYPES,
  FILTER,
  BY_TYPE,
  ORDER,
  SEARCH,
} from "../actions/index";

const initialState = {
  // Tus estados acá
  all_pokemon: [],
  pokemon: [],
  detail: {},
  types: [],
  type: "",
  order: "",
  searching: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Acá va tu código
    case GET_ALL_POKEMON:
      return {
        ...state,
        all_pokemon: action.payload,
      };
    case GET_POKEMON:
      return {
        ...state,
        pokemon: action.payload,
      };
    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };
    case DELETE_POKEMON:
      return {
        ...state,
        pokemon: state.pokemon.filter((H) => H.id !== action.payload),
      };
    // case CREATE_POKEMON:
    //   if(state.team.length === 8) state.team.shift();
    //   return {
    //     ...state,
    //     team: [...state.team, action.payload]
    //   };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case FILTER:
      return {
        ...state,
        pokemon: action.payload,
      };
    case BY_TYPE:
      state.pokemon = state.all_pokemon;
      return {
        ...state,
        type: action.payload,
      };
    case ORDER:
      state.pokemon = state.all_pokemon;
      return {
        ...state,
        order: action.payload,
      };
    case SEARCH:
      state.pokemon = state.all_pokemon;
      return {
        ...state,
        searching: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
