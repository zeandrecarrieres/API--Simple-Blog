const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('./models/Posts.js')
const Posts = mongoose.model('posts')
const cors = require('cors')

app.use(express.json())
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE')
    app.use(cors())
    next()
})

//DB Connection
mongoose.connect('mongodb://localhost/simpleblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB connected")
}).catch((error)=>{
    console.log("Connection DB fail!")
})


//List Posts Route
app.get('/posts', (req, res)=>{
    Posts.find().then((posts)=>{
        return res.json(posts)
    }).catch((error)=>{
        return res.status(400).json({
            error: true,
            message: "Document not found!"
        })
    })
})

//Create Post Route
app.post('/posts', (req, res)=> {
    const posts = Posts.create(req.body, (error)=>{
        if(error) return res.status(400).json({
            error: true,
            message: "Error: Fail to save, try again!"
        })
        return res.status(200).json({
            error: false,
            message: "Sucess! Document Saved"
        })
    })
})

//Update Posts Route
app.put('/posts/:id', (req, res)=>{
    const posts = Posts.updateOne({_id: req.params.id}, req.body, (error)=>{
        if(error) return res.status(400).json({
            error: true,
            message: "Error: Document not updated! Try again!"
        })
        return res.json({
            error: false,
            message: "Sucess! Document updated!"
        })
    })
})

//Delete Posts Route
app.delete("/posts/:id", (req, res)=>{
	const posts = Posts.deleteOne({_id: req.params.id}, (error)=>{
		if(error) return res.status(400).json({
			error:true,
			message: "Error: Documment is not deleted, try again!"
			})
		return res.json({
			error: true,
			message: "Sucess! Document deleted!"
		})
	})
})

app.listen(3001)