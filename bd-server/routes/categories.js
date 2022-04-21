const router = require("express").Router();

const { categories } = require("../db");

router.get("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const [idCategoria] = await categories.update({ name }, { where: { id: Number(id) } });
    const seModificoConExito = idCategoria !== 0;
    res.json({ success: seModificoConExito, msg: seModificoConExito ? "categoria modificada" : "no existe la categoria con ese id" });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idCategoria = await categories.destroy({ where: { id } });
    const seBorroConExito = idCategoria !== 0;
    res.json({ success: seBorroConExito, msg: seBorroConExito ? "categoria borrada con éxito" : "no existe la categoria con ese id" });
  } catch (error) {
    res.json({ success: false, error });
  }
});

module.exports = router;
