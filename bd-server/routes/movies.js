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

    const newMovieDirector = await directors.findAll({
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

module.exports = router;
