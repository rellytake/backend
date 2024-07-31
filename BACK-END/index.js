const express = require('express')
const { Server } = require('http')
const app = express()
const PORT = 4000

const database = require('./database')
const relations = require('./models/relations')
relations()
database.sync()
const bcrypt = require('bcryptjs')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const SECRET ='1234@secret'

app.use(express.json())
app.use(express.urlencoded() )

app.post('/register', async(req, res)=>{
    const{first_name, last_name, username, password } = req.body
    if(password.length < 6) return res.json({success: false,message:'password length is less than 6 '})
    let hashed = bcrypt.hashSync(password, 10)
    await User.create({first_name, last_name, username, password: hashed})
    res.json({success:true})
})

app.post('/login',async (req, res)=>{
    const {username, password}= req.body
    const user = await User.findOne({ where:{username}})
    if(!user) return res.json({success: false, massage:'incorrect username or password'})
        console.log(user.password)
    if(bcrypt.compareSync(password, user.password)){
        let token = jwt.sign(user.id, SECRET,)
        res.json({success:true,token})
    }
    else return res.json({success: false, massage:'incorrect username or password'})
})

app.use((req, res, next)=>{
    let header = req.headers['authorization']
    if(!header) return res.sendStatus(403)
    let token = header.split(' ')[1]
    if(!token) return res.sendStatus(403)
        try{
    let id = jwt.verify(token, SECRET)
    req.id=id
    next()
} catch(e){
    return res.sendStatus(403)
}   
})

app.post('/add-product', async (req, res)=>{
    res.json({success: true})
})

app.listen(PORT, ()=> console.log('Server is running'))