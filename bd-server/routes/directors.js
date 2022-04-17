const router = require("express").Router();
const { directors } = require("../db");

router.get("/", async (req, res) => {
  const directores = await directors.findAll();
  res.json(directores);
});

/*
    {
        "name":"Ignacio",
        "lastName:"Lestrada"
    }
*/
router.post("/add", async (req, res) => {
  const { name, lastName } = req.body;
  const newDirector = await directors.create({ name, lastName });
  res.status(201).json({ success: true, newDirector });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, lastName } = req.body;
  try {
    await directors.update({ name, lastName }, { where: { id } });
    res.json({ success: true, msg: "director modificado con exito" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const borrado = await directors.destroy({ where: { id } });
    res.json({ success: borrado > 0, msg: borrado > 0 ? "director borrado" : "el director no existe" });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
});

module.exports = router;
