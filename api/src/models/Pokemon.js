const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// - [ ] Pokemon con las siguientes propiedades:
//   - ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
//   - Nombre *
//   - Vida
//   - Ataque
//   - Defensa
//   - Velocidad
//   - Altura
//   - Peso
// - [ ] Tipo con las siguientes propiedades:
//   - ID
//   - Nombre

module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define("pokemon", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }),
    {
      timestamps: true,
      createdAt: true,
    };
};
