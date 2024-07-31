const { type } = require('os')
const database = require('../database.js')
const {DataTypes, Model} = require('sequelize')
const { toDefaultValue } = require('sequelize/lib/utils')

const User = database.define('user',{
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name:DataTypes.STRING,
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue:true
    }
})

module.exports = User