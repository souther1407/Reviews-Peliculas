const router = require("express").Router()

router.get("/:idPelicula",(req,res)=>{
    const {idPelicula} = req.params

    //TODO:Obtener el listado de críticas asociadas a el id de la pélicula
    res.json({msg:"apa que mujer"})

})





module.exports = router