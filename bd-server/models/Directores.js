const { DataTypes } = require("sequelize");

const modelDirectores = (sequelize) => sequelize.define("directors", {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = modelDirectores;
