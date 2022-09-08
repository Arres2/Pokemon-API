const { Router } = require("express");
const {
  getAllPokemon,
  getSinglePokemon,
  fetchTypesData,
} = require("../middleware/PokemonFetcher");

// const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// const models = require("../models/Pokemon");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// - GET <https://pokeapi.co/api/v2/pokemon>
// - GET <https://pokeapi.co/api/v2/pokemon/{id}>
// - GET <https://pokeapi.co/api/v2/pokemon/{name}>
// - GET <https://pokeapi.co/api/v2/type>
// - [ ] __GET /pokemons/{idPokemon}__:
//   - Obtener el detalle de un pokemon en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de pokemon
//   - Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
// - [ ] __GET /pokemons?name="..."__:
//   - Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
//   - Si no existe ningún pokemon mostrar un mensaje adecuado
// - [ ] __POST /pokemons__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
//   - Crea un pokemon en la base de datos relacionado con sus tipos.
// - [ ] __GET /types__:
//   - Obtener todos los tipos de pokemons posibles
//   - En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

// const cb = (data) => {
//   if (!data.length) return "No more pokemon";
//   let y = [];
//   for (let index = 0; index < data.length; index++) {
//     let x = [];
//     data[index].map((p) => {
//       return x.push({
//         key: p.id,
//         name: p.name,
//         img: p.sprites.other.home.front_default,
//         types: p.types.map((el) => el.type.name),
//       });
//     });
//     y.push(x);
//   }

//   return y;
// };

router.get("/pokemon", async (req, res) => {
  let { name } = req.query;
  if (name) {
    try {
      let pokemonData = [await getSinglePokemon(name)];

      if (pokemonData[0] === false) {
        return res.status(404).send("No pokemon matches that name");
      } else {
        return res.status(200).send(
          pokemonData.map(
            ({ name, types, sprites, id, weight, height, stats }) => {
              return {
                id: id,
                name: name,
                img: sprites.other.home.front_default
                  ? sprites.other.home.front_default
                  : sprites.front_default,
                types: types.map((el) => el.type.name),
                weight: weight,
                height: height,
                stats: stats.map((el) => {
                  return {
                    name: el.stat.name,
                    stat: el.base_stat,
                  };
                }),
              };
            }
          )
        );
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    try {
      let pokemonData = await getAllPokemon();

      // pokemonData = cb(pokemonData[0]).concat(pokemonData[1]);

      res.status(200).send(
        pokemonData.map(
          ({ name, types, sprites, id, weight, height, stats }) => {
            return {
              id: id,
              name: name,
              img: sprites.other.home.front_default
                ? sprites.other.home.front_default
                : sprites.front_default,
              types: types.map((el) => el.type.name),
              weight: weight,
              height: height,
              stats: stats.map((el) => {
                return {
                  name: el.stat.name,
                  stat: el.base_stat,
                };
              }),
            };
          }
        )
      );
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/pokemon/:id", async (req, res) => {
  let { id } = req.params;
  let pokemonData = await getSinglePokemon(id);

  try {
    res.status(200).json(
      pokemonData
      // .map(
      //   ({ name, types, sprites, id, weight, height, stats }) => {
      //     return {
      //       id: id,
      //       name: name,
      //       img: sprites.other.home.front_default,
      //       types: types.map((el) => el.type.name),
      //       weight: weight,
      //       height: height,
      //       stats: stats.map((el) => {
      //         return {
      //           name: el.stat.name,
      //           stat: el.base_stat,
      //         };
      //       }),
      //     };
      //   }
      // )
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/types", async (req, res) => {
  let typesData = await fetchTypesData();
  try {
    res.status(200).send(typesData.results.map((el) => el.name));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.post("/users", (req, res) => {
//   let { email, name } = req.body;

//   try {
//     res.status(201).json({ msg: models.addUser(email, name) });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// router.patch("/users/plan", (req, res) => {
//   let { user } = req.query;

//   try {
//     res.status(200).json({ msg: models.switchPlan(user) });
//   } catch (err) {
//     res.status(404).json({ error: err.message });
//   }
// });

module.exports = router;
