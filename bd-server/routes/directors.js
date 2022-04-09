const router = require("express").Router();
const { directors } = require("../db");

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

module.exports = router;
