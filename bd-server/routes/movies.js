const router = require("express").Router();
const { Op } = require("sequelize");
const { categoryBelongs } = require("../utils");

const { movies, categories, directors, reviews, conn } = require("../db");

router.get("/", async (req, res) => {

  const { title, year, max, category } = req.query;

  let results = await movies.findAll({
    where: {
      [Op.and]: {
        title: {
          [Op.like]: title ? `%${title}%` : "%%",
        },
        year: year || { [Op.gt]: -1 },
      },
    },
    include: [directors, categories],
    limit: max || 30,
  });
  if (category) results = results.filter(r => categoryBelongs(r.categories, category));
  res.json({ cantidad_resultados: results.length, results });
});

/*
    {
        "title":"ejemplo",
        "year":1999,
        "description":"apaa",
        "img":"http://sdas.com/apaa.png",
        "genres":["accion","suspense"],
        "director":{ //debe existir en la base
            "name":"Ignacio",
            "lastName":"Lestrada"
        }

    }
*/
router.post("/add", async (req, res) => {
  const {
    title, year, description, img, genres, director,
  } = req.body;

  try {
    const newMovie = await movies.create({
      title, year, description, img,
    });

    const newMovieGenres = await categories.findAll({
      where: {
        name: {
          [Op.in]: genres,
        },
      },
    });
    const newMovieDirector = await directors.findOne({
      where: {
        name: director.name,
        lastName: director.lastName,
      },
    });
    await newMovie.setDirector(newMovieDirector);
    console.log("set director good");
    await newMovie.setCategories(newMovieGenres);

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title, year, description, img, genres, director,
  } = req.body;
  try {
    await movies.update({ title, year, description, img }, { where: { id } });
    const modMovie = await movies.findByPk(id);
    let modMovieGenres;
    let modMovieDirector;

    if (genres) {
      modMovieGenres = await categories.findAll({
        where: {
          name: {
            [Op.in]: genres,
          },
        },
      });
      await modMovie.setCategories(modMovieGenres);
    }
    if (director) {
      modMovieDirector = await directors.findOne({
        where: {
          name: director.name,
          lastName: director.lastName,
        },
      });
      await modMovie.setDirector(modMovieDirector);
    }
    res.json({ success: true, msg: "pelicula modificada con éxito" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idPeliBorrada = await movies.destroy({ where: { id } });
    res.json({ success: idPeliBorrada !== 0, msg: idPeliBorrada !== 0 ? "pelicula borrada con éxito" : `no existe la pelicula con el id ${id}` });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
