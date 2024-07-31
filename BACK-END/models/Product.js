const { toDefaultValue } = require('sequelize/lib/utils')
const database = require('../database.js')
const {DataTypes} = require('sequelize')
const Product = database.define('product',{
    title: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.TEXT,
    company: DataTypes.STRING,
    image: DataTypes.STRING,
    sold: {
        type:DataTypes.BOOLEAN,
        toDefaultValue:false
    }
})

module.exports = Product