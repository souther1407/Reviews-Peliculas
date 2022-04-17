const express = require("express");
const morgan = require("morgan");
const { conn } = require("./db");

const mockearData = require("./mockdata")
const server = express();

const reviewsRouter = require("./routes/reviews");
const moviesRouter = require("./routes/movies");
const categoriesRouter = require("./routes/categories");
const userRouter = require("./routes/user");
const directorsRouter = require("./routes/directors");

server.use(express.json());

server.use(express.urlencoded());

server.use(morgan("dev"));

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

server.use("/reviews", reviewsRouter);
server.use("/movies", moviesRouter);
server.use("/categories", categoriesRouter);
server.use("/users", userRouter);
server.use("/directors", directorsRouter);

server.listen(8080, async () => {
  await conn.sync({ force: true });
  mockearData();
  console.log("server funcionando");
});
