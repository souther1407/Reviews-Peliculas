const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { users, user_role } = require("../db");
const { hashPassword } = require("../utils");
require("dotenv").config();

const { SECRET_KEY } = process.env;
/*
    {
        "name":"lestra92",
        "password":"12345",
    }
*/
router.post("/add", async (req, res) => {
  // TODO: crear un usuario nuevo agregando el user y su contraseña
  const { name, password } = req.body;

  const newUser = await users.create({ name, password, date_sign_up: new Date().toUTCString() });
  const userRole = await user_role.findOne({raw: true, where: { name: "user" } });
  newUser.setUser_role(userRole.id);
  res.status(201).json({ success: true });
});

router.get("/exist", async (req, res) => {
  const { name } = req.query;

  const existe = await users.findAll({
    where: {
      name,
    },
  });
  res.json({ existe: existe.length > 0 });
});

router.post("/login", async (req, res) => {
  // TODO:devolver si las credenciales son correctas
  const { user, password } = req.body;

  const existeUsuario = await users.findOne({
    where: {
      name: user, password: hashPassword(password),
    },
    include: user_role
  });

  if (existeUsuario) {
    return res.json({
      success: true,
      token: jwt.sign({ id: existeUsuario.id }, SECRET_KEY),
    });
  }
  res.json({ success: false });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const idBorrado = await users.destroy({ where: { id } });
    if (idBorrado === 0) return res.json({ success: false, notExist: true });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error });
  }
});


module.exports = router;
