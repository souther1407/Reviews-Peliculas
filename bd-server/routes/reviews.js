const router = require("express").Router()
const {movies,reviews} = require("../db")

router.get("/:idPelicula",async (req,res)=>{
    const {idPelicula} = req.params

    //TODO:Obtener el listado de críticas asociadas a el id de la pélicula
    const peliConReviews = await movies.findByPk(Number(idPelicula))
    res.json(peliConReviews.getReviews())
})

/*
    {
        "score":99,
        "content:"...blablabla...",

    }
*/ 
router.post("/:idPelicula/add",async (req,res)=>{
    const {idPelicula} = req.params
    const {score,content,idUsuario} = req.body
    //TODO: obtener la película por su id, agragar la crítica y asociarla a la pelicula y al usuario
    const peli = await movies.findByPk(Number(idPelicula))



})





module.exports = router