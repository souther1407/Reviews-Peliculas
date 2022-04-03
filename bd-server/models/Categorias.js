const { DataTypes } = require("sequelize")


const modelCategorias = (sequelize)=>{

    return sequelize.define("categories",{

        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:false
    })
}

module.exports = modelCategorias