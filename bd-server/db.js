require("dotenv").config();

const { Sequelize } = require("sequelize");

const {
  modelPeliculas, modelCategorias, modelDirectores, modelCriticas, modelUsuarios,
} = require("./models");

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME,
} = process.env;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_NAME}`, {
  logging: false,
});

const modelos = [];

const Categorias = modelCategorias(db);
modelos.push(Categorias);

const Peliculas = modelPeliculas(db);
modelos.push(Peliculas);

const Directores = modelDirectores(db);
modelos.push(Directores);

const Criticas = modelCriticas(db);
modelos.push(Criticas);

const Usuarios = modelUsuarios(db);
modelos.push(Usuarios);

Categorias.belongsToMany(Peliculas, { through: "categories_movies_belongs", timestamps: false });
Peliculas.belongsToMany(Categorias, { through: "categories_movies_belongs", timestamps: false });

Directores.hasMany(Peliculas);
Peliculas.belongsTo(Directores);

Peliculas.hasMany(Criticas);
Criticas.belongsTo(Peliculas);

Usuarios.hasMany(Criticas);
Criticas.belongsTo(Usuarios);

const obj = {
  ...db.models,
};
module.exports = {
  conn: db,
  ...obj,
};
