const { DataTypes } = require("sequelize")
require("dotenv").config()
const {hashPassword} = require("../utils")
const modelUsuarios = (sequelize)=>{

    return sequelize.define("users",{

        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(256),
            allowNull:false,
            set(value){
              this.setDataValue("password", hashPassword(value))  
            }
        },
        date_sign_up:{
            type:DataTypes.DATE,
            allowNull:false
        },
        avatar_url:{
            type:DataTypes.STRING,
            validate:{
                isUrl:true
            }
        }
    },{
        freezeTableName:true,
        timestamps:false
    })
}

module.exports = modelUsuarios