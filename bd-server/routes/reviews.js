const router = require("express").Router();
const { movies, reviews, conn } = require("../db");

const success = { success: true };

router.get("/:idPelicula", async (req, res) => {
  const { idPelicula } = req.params;

  const peliConReviews = await conn.models.movies.findByPk(Number(idPelicula));

  res.json(peliConReviews ? await peliConReviews.getReviews() : []);
});

/*
    {
        "score":99,
        "content:"...blablabla...",
    }
*/

router.post("/:idPelicula/add", async (req, res) => {
  const { idPelicula } = req.params;
  const { score, content } = req.body;
  // TODO: obtener la película por su id, agragar la crítica y asociarla a la pelicula y al usuario
  try {
    const peli = await movies.findByPk(Number(idPelicula));
    const newReview = await reviews.create({ score, content, date_created: new Date() });
    peli.addReview(newReview);
    res.json(success);
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { score, content } = req.body;
  try {
    await reviews.update({ score, content }, { where: { id } });
    res.status(200).json(success);
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idDeletedReview = await reviews.destroy({ where: { id } });
    success.success = idDeletedReview !== 0;
    success.msg = success.success ? "pelicula borrada" : "no existe la peli con ese id";
    res.json(success);
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
