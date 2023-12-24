const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const env = require('dotenv')
const User = require('./model/User')
const Post = require('./model/Post')

const app = express()
const port = process.env.port || 4000

const uploadMiddleware = multer({dest: 'uploads/'})

const salt = bcrypt.genSaltSync(10)
const secret = '1dhds9sdfs982snqwiqdh'
// http://localhost:4000
mongoose.connect('mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority')            
app.use(express.json())
app.use(cors({credentials:true,origin:'https://blog-titik-games.vercel.app'}))
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/',(req,res)=>{
    res.send("HEllo WOrld!")
})


app.listen(port, ()=>{
    console.log(`App Listening on Port ${port}`)
})


module.exports = app