const mongoose = require('mongoose');
const schema = mongoose.Schema

const SpecialSchema = new schema({
	email:{
		type: String,
		required: true,
	},
	value:{
		type : String,
		required : true
	},
	date:{
		type: Date,
		default: Date()
	},
})

module.exports = Special = mongoose.model('special', SpecialSchema);