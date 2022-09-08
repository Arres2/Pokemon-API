const fs = require("fs");

//Esta app debe agrupar a cada pokemon con sus subsequentes evoluciones en arreglos de objetos de manera de poder hacer un showcase de pokemones
//con cartas donde puedas scrollear entre las diferentes evoluciones de un pokemon
// ENDPOINT DE EVOLUCIONES https://pokeapi.co/api/v2/evolution-chain/{id}/

//CHAIN =>{ EVOLVES TO.{EVOLUTION DETAILS{species{name & url}}}
//Cada pokemon contiene un Evolves to que puede contener otro evolves to

let pokemonGroups = [];

// function safelyParseJSON(json) {
//   // This function cannot be optimised, it's best to
//   // keep it small!
//   var parsed;

//   try {
//     parsed = JSON.parse(json);
//   } catch (e) {
//     // Oh well, but whatever...
//   }
// }

async function pokemonEvolutionGrouper(id) {
  while (id !== 1154) {
    // setTimeout(() =>{
    for (i in pokemonGroups) {
      if (pokemonGroups[i].includes(id)) id++;
    }
    let p = new Object([id]);

    let poki = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });

    current = poki.chain.evolves_to;

    if (current[0] === undefined) current = false;

    while (current) {
      //Extraer con REGEX el ID del pokemon del url
      let res = current[0].species.url.match(/\d+/g)[1];
      p.push(Number(res));

      current = current[0].evolves_to;
      if (current[0] === undefined) current = false;
    }
    console.log(p);
    pokemonGroups.push(p);
    id++;

    // }, 5000);

    // return pokemonGroups;
  }
  fs.writeFile(
    "C:/Users/pc-andres/ProgrammingProjects/Henry-BC/PI-Pokemon-main/api/src/middleware/ev",
    pokemonGroups,
    { flag: "wx" },
    function (err) {
      if (err) throw err;
      console.log("It's saved!");
    }
  );
}

pokemonEvolutionGrouper(205);

// const fetchPokemonGroup = async (page) => {
//   //Dependiendo de la pagina pasada por el get de cliente responderá con un grupo de poquemones
//   //Llamar aproximadamente 20 grupos por pagina
//   const pokemonGroup = await getAllPokemon(page);
//   //Debe devolver un array que contenga arrays de objetos que contengan grupos de pokis relacionados en la cadena de evolucion
//   //[ POKE1: [ {evo1} , {evo2} , {evo3} ] , POKE2: [ {evo1} , {evo2} , {evo3} ] , POKE3:[...]]
//   return pokemonGroup;
// };

// module.exports = { fetchPokemonGroup };
