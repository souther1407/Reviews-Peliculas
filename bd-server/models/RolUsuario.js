const { DataTypes } = require("sequelize");

const modelCriticas = (sequelize) => sequelize.define("user_role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = modelCriticas;
