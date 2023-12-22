const mongoose = require('mongoose')
const {model,Schema} = mongoose

const PostSchema = new Schema({
	title: {type: String, min: 5},
	summary: {type: String, min: 10},
	tag: {type: String},
	thumbnail: {type: String},
	content:{type: String},
	author:{type: Schema.Types.ObjectId, ref:'User'}
},{
	timestamps: true,
})

const PostModel = model("Post", PostSchema)

module.exports = PostModel