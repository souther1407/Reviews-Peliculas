require("dotenv").config();
const { createHash } = require("crypto");

const { SECRET_KEY } = process.env;

const hashPassword = (value) => createHash("sha256").update(value + SECRET_KEY).digest("hex");
const categoryBelongs = (array, element) => {
  for (const category of array) {
    if (category.name === element) return true;
  };
  return false;
};
module.exports = {
  hashPassword,
  categoryBelongs,
};
