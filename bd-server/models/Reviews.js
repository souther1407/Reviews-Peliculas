const { DataTypes } = require("sequelize");

const modelCriticas = (sequelize) => sequelize.define("reviews", {
  score: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(1024),
    allowNull: false,
  },
  date_created: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

module.exports = modelCriticas;
