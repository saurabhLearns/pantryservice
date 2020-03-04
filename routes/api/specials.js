const express = require('express')

const router = express.Router()

const Special = require('../../models/special')
const Admin = require('../../models/admin')
const User = require('../../models/user')
const auth = require('../../middleware/auth')

//METHOD: @GET
//ACTION: get special requirements of users
//AUTH: private (admin)
router.get('/', auth, function(req, res){
	Admin.findById(req.user.id)
	.then(()=>{
		Special.find().sort({date: -1})
		.then(specials => res.json(specials))
	})
	.catch(err=>res.status(401).json({msg:"Unauthorised access!"}))
})


//METHOD: @POST
//ACTION: Post special requirements by users
//AUTH: private(user)
router.post('/', auth, function(req, res){
	//posting with user to track whos default it is
	User.findById(req.user.id).select('email').then(postUser => {
		var NewSpecials = new Special({
			email: postUser.email,
			value: req.body.specialRequest,
		})
		NewSpecials.save().then(NewSpecials => res.json(NewSpecials))
	})
})


module.exports = router