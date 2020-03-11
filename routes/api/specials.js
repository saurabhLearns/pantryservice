const express = require('express')

const router = express.Router()
 
const Special = require('../../models/special')
const User = require('../../models/user')
const auth = require('../../middleware/auth')

//ACTION: get special requirements of users
router.get('/get-special', auth, function(req, res){
	if(req.user.role<3){
		//return check?
		Special.find().sort({date: -1}).then(specials => res.json(specials))
	}
	else return res.status(400).json({msg:"Unauthorised access!"})
})


//ACTION: Post special requirements by users
router.post('/post-special', auth, function(req, res){
	User.findById(req.user.id).select('email').then(postUser => {
		var NewSpecials = new Special({
			email: postUser.email,
			value: req.body.specialRequest,
		})
		NewSpecials.save().then(NewSpecials => res.json(NewSpecials))
	})

})


module.exports = router