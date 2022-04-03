require("dotenv").config()
const {createHash} = require("crypto")
const {SECRET_KEY} = process.env

const hashPassword=(value)=>{
    return createHash("sha256").update(value+SECRET_KEY).digest("hex")
}


module.exports = {
    hashPassword
}