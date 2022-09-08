const e = require("express");
const { response } = require("express");
const { Pokemon, Type } = require("../db");
const { evolutionGroups } = require("./EvolutionGroups");

let getApiData = async () => {
  // let currentGroups = [];
  // for (let i = 0; i < 12; i++) {
  //   let num = i + 12 * page - 12;
  //   currentGroups.push(evolutionGroups[num]);
  // }
  // try {
  //   let pokemonGroups = [];
  //   let res;
  //   for (let i = 0; i < currentGroups.length; i++) {
  //     if (currentGroups[i] === undefined) return pokemonGroups;
  //     res = currentGroups[i].map(async (pokeId) => {
  //       let x = await fetch(
  //         `https://pokeapi.co/api/v2/pokemon/${pokeId}/`
  //       ).then((p) => p.json());
  //       return x;
  //     });
  //     const response = await Promise.all(res);
  //     pokemonGroups.push(response);
  //   }
  try {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=40`;

    let x = await fetch(url).then((p) => p.json());

    return await x;
  } catch (err) {
    throw Error(err);
  }
};
let fetchPokemonData = async (url) => {
  return await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });
};

let fetchTypesData = async () => {
  return await fetch("https://pokeapi.co/api/v2/type")
    .then((res) => res.json())
    .catch((err) => {
      throw Error(err);
    });
};

let getDbData = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getSinglePokemon = async (id_or_name) => {
  try {
    let x = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_or_name}/`);
    if (x.status === 404) {
      return false;
    } else return x.json();
  } catch (err) {
    throw Error(err);
  }
};

let getAllPokemon = async () => {
  try {
    let api = await getApiData();
    let db = await getDbData();
    let allNames = api.results.map(async (el) => {
      let pokeData = await fetchPokemonData(el.url);
      return pokeData;
    });
    const results = await Promise.all(allNames);
    return results.concat(db);
  } catch (err) {
    throw Error(err);
  }
};

module.exports = { getAllPokemon, getSinglePokemon, fetchTypesData };
