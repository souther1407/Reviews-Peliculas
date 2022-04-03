
const express = require("express")
const {conn,users,categories,directors,movies} = require("./db")
const server = express()

const reviewsRouter = require("./routes/reviews")
const moviesRouter = require("./routes/movies")
const categoriesRouter = require("./routes/categories")

const morgan = require("morgan")

server.use(express.json())

server.use(express.urlencoded())

server.use(morgan("dev"))

server.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next()
})


server.use("/reviews",reviewsRouter)
server.use("/movies",moviesRouter)
server.use("/categories",categoriesRouter)



server.listen(8080,async ()=>{
    await conn.sync({force:true})

    //Usuario de prueba
    await users.create({name:"admin",password:"12345",date_sign_up:new Date().toUTCString()})
    
    const categorias = ["accion","comedia","drama","ciencia ficcion"]

    //Categorias de prueba
    await Promise.all(categorias.map(c=>categories.create({name:c})))
    
    //Director de prueba
    const tarantino = await directors.create({name:"Quentin",lastName:"Tarantino"})

    //Película de prueba 1
    const pulpFiction = await movies.create(
        {title:"Pulp Fiction",
         year:1994,
         description:"Una pelicula basada en la vida de tu hermana",
         img:"https://pics.filmaffinity.com/Pulp_Fiction-210382116-large.jpg"})

    
    const pulpFictionCategory1 = await categories.findAll({where:{name:"accion"}})
    const pulpFictionCategory2 = await categories.findAll({where:{name:"comedia"}})

    pulpFiction.setDirector(tarantino)
    pulpFiction.setCategories(pulpFictionCategory1)
    pulpFiction.setCategories(pulpFictionCategory2)

    //Película de prueba 2
    

    

    console.log("server funcionando")
})

