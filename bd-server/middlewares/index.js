require("dotenv").config();
const jwt = require("jsonwebtoken");
const { conn, users, user_role} = require("../db");

const { SECRET_KEY } = process.env;

const esAdmin = (req, res, next) => {
  if (req.user.role === "admin") return next();
  res.status(403).json({ forbidden: true, adminRequired: true });
};

const verificarToken = (req, res, next) => {
  try {
    const payloadValido = jwt.verify(req.token, SECRET_KEY);
    req.user = payloadValido;
    next();
  } catch (error) {
    res.status(403).json({ forbidden: true, invalidToken: true });
  }
}

const loggeado = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === "string") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else res.status(403).json({ forbidden: true, notLogged: true });
};

module.exports = {
  esAdmin,
  loggeado,
  verificarToken,
};
