
const { users, categories, directors, movies, reviews, user_role } = require("./db");

const mockearData = async () => {
  //   Roles iniciales
  const admin = await user_role.create({ name: "admin" });
  const usuario = await user_role.create({ name: "user" });

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
};

module.exports = mockearData;
