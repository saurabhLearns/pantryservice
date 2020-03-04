const mongoose = require('mongoose')
const schema = mongoose.Schema

const AdminSchema = new schema({
	name:{
		type : String,
		required : true
	},
	email:{
		type : String,
		required : true,
		unique: true
	},
	password:{
		type : String,
		required : true
	},
	adminRole:{
		type:Boolean,
		default: true
	}
})

module.exports = Admin = mongoose.model('admin', AdminSchema)
