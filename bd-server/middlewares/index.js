require("dotenv").config();
const jwt = require("jsonwebtoken");
const { conn, users, user_role} = require("../db");

const { SECRET_KEY } = process.env;

const esAdmin = (req, res, next) => {
  console.log("ponele que chi :D, tu token es", req.token);
  jwt.verify(req.token, SECRET_KEY, async (error, data) => {
    if (error) return res.sendStatus(403);
    const user = await users.findByPk(data.id, { raw: true, include: user_role });
    if (user["user_role.name"] === "admin") return next();
    res.sendStatus(403);

  });
};

const loggeado = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else res.sendStatus(403);
};

module.exports = {
  esAdmin,
  loggeado,
};
