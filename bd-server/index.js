
const express = require("express")
const {conn,users} = require("./db")
const server = express()

const morgan = require("morgan")

server.use(express.json())

server.use(express.urlencoded())

server.use(morgan("dev"))


server.listen(8080,async ()=>{
    await conn.sync({force:true})
    //Usuario de prueba
    await users.create({name:"apaa",password:"123",date_sign_up:new Date().toUTCString()})
    console.log("server funcionando")
})

