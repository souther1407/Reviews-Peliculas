const router = require("express").Router();
const { users, user_role, conn } = require("../db");
const { hashPassword } = require("../utils");
const jwt = require("jsonwebtoken")
require("dotenv").config();

const { loggeado, esAdmin, verificarToken } = require("../middlewares");

const { SECRET_KEY } = process.env;

router.post("/login", async (req, res) => {
    //  TODO:Verifica las credenciales del usuario, si son correctas, devuelve un token
    try {
        
        const { name, password } = req.body;
        const existe = await conn.models.users.findOne({ raw: true,where: { name, password: hashPassword(password) },include: user_role });
        console.log(existe);
        if (existe) {
            const payload = { id: existe.id, role: existe["user_role.name"] };
            const token = jwt.sign(payload, SECRET_KEY);
            res.json({ token });
        }else{
            res.json({ notExist: true });
        }
        
    
    
    
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get("/secreta", loggeado, verificarToken, esAdmin, (req, res) => {
    res.json({ secreto: "Apa, esto es secreto D:" });
})

module.exports = router;