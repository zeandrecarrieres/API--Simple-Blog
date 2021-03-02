const mongoose  = require("mongoose");

const Posts = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

mongoose.model('posts', Posts)