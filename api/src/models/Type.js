const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    name: {
      type: DataTypes.ENUM(
        "Normal",
        "Fighting",
        "Flying",
        "Poison",
        "Groung",
        "Rock",
        "Bug",
        "Ghost",
        "Steel",
        "Fire",
        "Water",
        "Grass",
        "Electric",
        "Psychic",
        "Ice",
        "Dragon",
        "Dark",
        "Fairy",
        "Unknown",
        "Shadow"
      ),
      allowNull: false,
    },
  });
};
