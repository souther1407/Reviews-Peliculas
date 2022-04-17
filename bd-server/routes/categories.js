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
    await categories.update({ name }, { where: { id: Number(id) } });
    res.json({ success: true, msg: "categoria modificada" });
  } catch (error) {
    res.json({ success: false, error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await categories.destroy({ where: { id } });
    res.json({ success: true, msg: "categoria borrada con éxito" });
  } catch (error) {
    res.json({ success: false, error });
  }
})

module.exports = router;
