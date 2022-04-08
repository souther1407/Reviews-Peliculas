const router = require("express").Router()
const {users} = require("../db")


/*
    {
        "name":"lestra92",
        "password":"12345",
    }
*/ 
router.post("/add",async (req,res)=>{
    //TODO: crear un usuario nuevo agregando el user y su contraseña
    const {name,password} = req.body
    
    const newUser = await users.create({name,password,date_sign_up:new Date().toUTCString()})

    res.status(201).json({success:true})

})

router.get("/exist", async (req,res)=>{
    const {name} = req.query

    const existe = await users.findAll({where:{
        name
    }})
    res.json({existe:existe.length > 0})
})


router.get("/correct",(req,res)=>{
    //TODO:devolver si las credenciales son correctas
})

module.exports = router