const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const User = require('../../models/user')
const DefaultChoice = require('../../models/defaultChoice')


//METHOD: @POST
//ACTION: register new user
//AUTH: public
router.post('/', function(req, res){
	
	const {name, email, password} = req.body
	if (!name || !email || !password) 
	return res.status(400).json({msg:"Please enter all fields"})
	
	User.findOne({email}).then((user)=>{
		if(user) 
		return res.status(400).json({msg:"User already exists!"})
	})

	//After validations
	const newUser = new User({name, email, password})
	const newChoice = new DefaultChoice({email})
	
	//generate salt and hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err
			newUser.password = hash
			//save default choice (as not selected) of user as soon as new user is created
			newChoice.save()
			//save new user
			newUser.save()
			.then(user => {
				//even after creating new token, it doesnot work unless logged in separately
				jwt.sign(
					{id: user.id,
					adminRole:user.adminRole},
					config.get('jwtSecret'),
					{expiresIn: 10800},
					(err, token)=>{
						if (err) throw err
						res.json({
							token,
							user:{
								id: user._id, 
								name: user.name, 
								email:user.email, 
								adminRole: user.adminRole
							}
						})
					}
				)
			})
		})
	})
})

module.exports = router
