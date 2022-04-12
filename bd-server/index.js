const express = require("express");
const morgan = require("morgan");
const {
  conn, users, categories, directors, movies, reviews,user_role
} = require("./db");

const server = express();

const reviewsRouter = require("./routes/reviews");
const moviesRouter = require("./routes/movies");
const categoriesRouter = require("./routes/categories");
const userRouter = require("./routes/user");
const directorsRouter = require("./routes/directors");

server.use(express.json());

server.use(express.urlencoded());

server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

server.use("/reviews", reviewsRouter);
server.use("/movies", moviesRouter);
server.use("/categories", categoriesRouter);
server.use("/users", userRouter);
server.use("/directors", directorsRouter);

server.listen(8080, async () => {
  await conn.sync({ force: true });

  //Roles iniciales
  const admin = await user_role.create({ name: "admin" });
  const usuario = await user_role.create({name:"user"});

  // Usuario de prueba
  const userAdmin = await users.create({ name: "admin", password: "12345", date_sign_up: new Date().toUTCString() });
  userAdmin.setUser_role(admin);
  const categorias = ["accion", "comedia", "drama", "ciencia ficcion"];

  // Categorias de prueba
  await Promise.all(categorias.map((c) => categories.create({ name: c })));

  // Director de prueba
  const tarantino = await directors.create({ name: "Quentin", lastName: "Tarantino" });
  const jCameron = await directors.create({ name: "James", lastName: "Cameron" });

  // Película de prueba 1
  const pulpFiction = await movies.create(
    {
      title: "Pulp Fiction",
      year: 1994,
      description: "Una pelicula basada en la vida de tu hermana",
      img: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2016/12/pulp-fiction.jpg?itok=3YZ8ygRT",
    },
  );

  const pulpFictionCategory1 = await categories.findAll({ where: { name: "accion" } });
  const pulpFictionCategory2 = await categories.findAll({ where: { name: "comedia" } });
  await pulpFiction.setDirector(tarantino);
  await pulpFiction.addCategories(pulpFictionCategory1);
  await pulpFiction.addCategories(pulpFictionCategory2);

  // Película de prueba 2
  const titanic = await movies.create(
    {
      title: "Titanic",
      year: 1998,
      description: "Una pelicula basada en la vida de tu Prima",
      img: "https://i.blogs.es/4a9cb1/titanic/840_560.jpeg",
    },
  );

  const titanicCategory1 = await categories.findAll({ where: { name: "drama" } });
  titanic.setDirector(jCameron);
  titanic.addCategories(titanicCategory1);

  // Reseñas de prueba
  const review1 = await reviews.create({ score: 99, content: "La mejor peli del mundo :D", date_created: new Date().toUTCString() });
  review1.setMovie(titanic);
  review1.setUser(userAdmin);
  const review2 = await reviews.create({ score: 10, content: "... Nah mentira, alta bosta", date_created: new Date().toUTCString() });
  review2.setMovie(titanic);
  review2.setUser(userAdmin);
  const review3 = await reviews.create({ score: 99, content: "Aguante Tarantino :D", date_created: new Date().toUTCString() });
  review3.setMovie(pulpFiction);
  review3.setUser(userAdmin);
  console.log("server funcionando");
});
