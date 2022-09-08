export const GET_ALL_POKEMON = "GET_ALL_POKEMON";
export const GET_POKEMON = "GET_POKEMON";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_DETAIL = "GET_DETAIL";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const GET_TYPES = "GET_TYPES";
export const FILTER = "FILTER";
export const BY_TYPE = "BY_TYPE";
export const ORDER = "ORDER";
export const SEARCH = "SEARCH";

export const getPokemon = (name) => async (dispatch) => {
  if (name) {
    try {
      let response = await fetch(`http://localhost:3001/pokemon?name=${name}`);
      if (response.status === 404) return alert("No Pokemon found :/");
      let results = await response.json();
      dispatch({ type: GET_POKEMON, payload: results });

      let response2 = await fetch(`http://localhost:3001/pokemon`);
      if (response2.status === 404) return alert("No Pokemon found :/");
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_POKEMON, payload: results2 });
    } catch (err) {
      throw Error(err);
    }
  } else {
    try {
      let response2 = await fetch(`http://localhost:3001/pokemon`);
      if (response2.status === 404) return alert("No Pokemon found :/");
      let results2 = await response2.json();
      dispatch({ type: GET_ALL_POKEMON, payload: results2 });
      dispatch({ type: GET_POKEMON, payload: results2 });
    } catch (err) {
      throw Error(err);
    }
  }
};

export const getPokemonDetail = (id) => async (dispatch) => {
  let url = `http://localhost:3001/pokemon/${id} `;

  try {
    let x = await fetch(url);
    let response = await x.json();

    dispatch({ type: GET_DETAIL, payload: response });
  } catch (err) {
    throw Error(err);
  }
};

export const getTypes = () => async (dispatch) => {
  let url = `http://localhost:3001/types `;

  try {
    let x = await fetch(url);
    let response = await x.json();

    dispatch({ type: GET_TYPES, payload: response });
  } catch (err) {
    throw Error(err);
  }
};

export const isSearching = (search) => {
  return {
    type: SEARCH,
    payload: search,
  };
};

export const order = (ord) => {
  return {
    type: ORDER,
    payload: ord,
  };
};

export const filterByType = (type) => {
  return {
    type: BY_TYPE,
    payload: type,
  };
};

let id = 1154;

export const createPokemon = (data) => async (dispatch) => {
  console.log("actions", data);
  try {
    const crear = await fetch("http://localhost:3001/pokemon", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await crear.json();
    console.log(response);
    dispatch({
      type: CREATE_POKEMON,
      payload: { ...response, id: ++id },
    });
  } catch (err) {
    throw Error(err);
  }
};

export const deletePokemon = (id) => {
  return { type: DELETE_POKEMON, payload: id };
};
