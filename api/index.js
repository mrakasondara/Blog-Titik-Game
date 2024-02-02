const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
// const fs = require('fs')
// const env = require('dotenv')
const User = require('./model/User')
const Post = require('./model/Post')

const app = express()
const port = process.env.port || 4000
  
// const uploadMiddleware = multer({dest: 'uploads/'})

const salt = bcrypt.genSaltSync(10)
const secret = '1dhds9sdfs982snqwiqdh'
mongoose.connect('mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority')            
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials:true,origin:'https://blog-titikgame.vercel.app'}))


const storage = multer.diskStorage({
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

const upload = multer({storage:storage})

cloudinary.config({
    cloud_name:'dxs0jt3xe',
    api_key: '531926252978129',
    api_secret:'DuGN2Yq0sYUfzvCDnAQf9nLhIV4',
})

app.post('/api/register',async (req,res)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    const {fullname,username,password} = req.body
    try{
        const create = await User.create({fullname,username,password:bcrypt.hashSync(password,salt)})
        res.json(create)
        console.log(create)
    }catch(e){
        console.log(e)
        res.status(400).json(e)
    }
    
})


app.post('/api/login',async (req,res)=>{
    const {username,password} = req.body
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    const loginCheck = await User.findOne({username})
    if(loginCheck === null){
        res.status(400).json()
        // console.log('user not found')
    }else{
        const passOk = bcrypt.compareSync(password,loginCheck.password)
        if(passOk){
            jwt.sign({username, id:loginCheck._id},secret,{}, (err,token)=>{
                if(err)throw(err)
                res.cookie('token',token).json({
                    id: loginCheck._id,
                    username
                })
            })
        }else{
            res.status(400).json()
            // console.log('wrong password')
        }
    }

})

app.get('/api/profile', (req,res)=>{
    const {token} = req.cookies
    // if(token){
        jwt.verify(token,secret,{},(err,info)=>{
            if(err)throw err
            res.header("Access-Control-Allow-Origin", "https://blog-titik-game.vercel.app")
            res.json(info)
        } )
    // }
})

app.post('/api/logout', (req,res)=>{
    res.cookie('token','').json('logout')

})



app.post('/api/createpost', upload.single('file'), async (req,res)=>{
    if(req.file === undefined){
        res.status(400).json('fill the thumbnail')
    }else{
        const {originalname,path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const lowerExt = ext.toLowerCase()
        // const newPath = path+'.'+ext
        let postDoc, result
        const {token} = req.cookies
        const {title,summary,tag,content} = req.body
        // fs.renameSync(path, newPath)
        jwt.verify(token,secret,{}, async (err,info)=>{
            if(err)throw err;
            switch(lowerExt){
            case 'jpg':
                result = await cloudinary.uploader.upload(path, {folder: 'uploads'})
                postDoc =  await Post.create({
                    title,
                    summary,
                    tag,
                    thumbnail: result.public_id+ '.' + result.format,
                    content,
                    author:info.id,
                })
            res.header("Access-Control-Allow-Origin", "https://blog-titik-game.vercel.app")
            res.status(200).json(postDoc)
            break;
            case 'jpeg':
                result = await cloudinary.uploader.upload(path, {folder: 'uploads'})
                postDoc =  await Post.create({
                    title,
                    summary,
                    tag,
                    thumbnail: result.public_id+ '.' + result.format,
                    content,
                    author:info.id,
                })
            res.header("Access-Control-Allow-Origin", "https://blog-titik-game.vercel.app")
            res.status(200).json(postDoc)
            break;
            case 'png':
                result = await cloudinary.uploader.upload(path, {folder: 'uploads'})
                postDoc =  await Post.create({
                    title,
                    summary,
                    tag,
                    thumbnail: result.public_id+ '.' + result.format,
                    content,
                    author:info.id,
                })
            res.header("Access-Control-Allow-Origin", "https://blog-titik-game.vercel.app")
            res.status(200).json(postDoc)
            break;
            case 'webp':
                result = await cloudinary.uploader.upload(path, {folder: 'uploads'})
                postDoc =  await Post.create({
                    title,
                    summary,
                    tag,
                    thumbnail: result.public_id+ '.' + result.format,
                    content,
                    author:info.id,
                })
            res.header("Access-Control-Allow-Origin", "https://blog-titik-game.vercel.app")
            res.status(200).json(postDoc)
            break;
            default:
            res.status(400).json('image only')
            }
        })
    }
})

const editBlog = (token,id,title,summary,tag,newPath,content, postDoc)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    jwt.verify(token, secret, {}, async(err,info)=>{
        if(err) throw err
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
        if(!isAuthor){
          return  false
        }
        await postDoc.updateOne({
            title,
            summary,
            tag,
            thumbnail: newPath ? newPath : postDoc.thumbnail,
            content,
        },{
            $set: {id: postDoc._id}
        })
    })    
}

app.put('/api/post',upload.single('file'),async(req,res)=>{
    let newPath = null
    const {token} = req.cookies
    const {id,title,summary,tag,content} = req.body
    const postDoc = await Post.findById(id)
    if(req.file){
        const {originalname,path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const lowerExt = ext.toLowerCase()
        newPath = path+'.'+ext
        // fs.renameSync(path, newPath)
        switch(lowerExt){
            case 'jpg':
            editBlog(token,id,title,summary,tag,newPath,content,postDoc)
            res.status(200).json(postDoc)
            break;
            case 'jpeg':
            editBlog(token,id,title,summary,tag,newPath,content,postDoc)
            res.status(200).json(postDoc)
            break;
            case 'png':
            editBlog(token,id,title,summary,tag,newPath,content,postDoc)
            res.status(200).json(postDoc)
            break;
            case 'webp':
            editBlog(token,id,title,summary,tag,newPath,content,postDoc)
            res.status(200).json(postDoc)
            break;
            default:
            res.status(400).json('image only')
        }
    }
    editBlog(token,id,title,summary,tag,newPath,content,postDoc)
    res.status(200).json(postDoc)
    
})

app.get('/api/post', async (req,res)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    res.json(
        await Post.find()
        .populate('author',['username'])
        .sort({createdAt: -1})
        .limit(20)
        )
    
})
app.get('/api/highlight', async (req,res)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    const posts = await Post.find().populate('author',['username'])
    res.json(posts)
})
app.get('/api/detailpost/:id', async(req,res)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    const {id} = req.params
    try{
        const detail = await Post.findById(id).populate('author',['username'])
        res.json(detail)
    }catch(e){
        res.status(404).json(e)
    }
    
})

app.get('/api/tag/:tagParams', async(req,res)=>{
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    const {tagParams} = req.params
    try{
        res.json(await Post.find({tag: tagParams})
        .populate('author', ['username'])
        .sort({createdAt: -1}))
    }catch(e){
        res.status(404).json(e)
    }
})

app.get('/api/search/:query', async(req,res)=>{
    const {query} = req.params
 
    mongoose.connect("mongodb+srv://rakasondara21:rakasondara21@project.ezg1faq.mongodb.net/?retryWrites=true&w=majority")
    try{
        const searchByTitle = await Post.find({ title: { $regex: query, $options: "i" } }).populate('author', ['username']) 
        const searchBySummary = await Post.find({ summary: { $regex: query, $options: "i" } }).populate('author', ['username']) 
        const removeDuplicate = Object.assign(searchByTitle,searchBySummary)
        res.json(removeDuplicate)

    }catch(e){
        res.json('result not found').status(404)
    }
    

})

app.listen(port, ()=>{
    console.log(`App Listening on Port ${port}`)
})



module.exports = app