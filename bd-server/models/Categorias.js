const { DataTypes } = require("sequelize");

const modelCategorias = (sequelize) => sequelize.define("categories", {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = modelCategorias;
