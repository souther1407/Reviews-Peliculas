const { DataTypes } = require("sequelize");

const modelPeliculas = (sequelize) => sequelize.define("movies", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,

  },
  year: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING(512),
  },
  img: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },

}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = modelPeliculas;
