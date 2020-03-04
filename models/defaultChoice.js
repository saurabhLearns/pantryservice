const mongoose = require('mongoose')
const schema = mongoose.Schema

const DefaultSchema = new schema({
	email:{
		type:String,
		required: true,
		unique: true
	},
	defaultchoice:{
		type: String,
		default: "not selected",
	}
})

module.exports = DefaultChoice = mongoose.model('defaultchoice', DefaultSchema)