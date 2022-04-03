const router = require("express").Router()
const {categories} = require("../db")

router.get("/",async (req,res)=>{
    //TODO:obtener todas la categorias
    const categorias = await categories.findAll()
    res.json(categorias)
})

router.post("/add",async (req,res)=>{
    //TODO:añadir una categoria nueva
    const {name} = req.body

    try {
        
        const newCategory = await categories.create({name})
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(400).json(error) 
    }
})

module.exports=router