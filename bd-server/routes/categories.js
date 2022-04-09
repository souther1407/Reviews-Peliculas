const router = require("express").Router();
const { categories } = require("../db");
const { esAdmin, loggeado } = require("../middlewares")

router.get("/", loggeado, esAdmin, async (req, res) => {
  const categorias = await categories.findAll();
  res.json(categorias);
});

router.post("/add", async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = await categories.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
