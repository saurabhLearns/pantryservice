const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const auth = require('../../middleware/auth')
const User = require('../../models/user')
const DefaultChoice = require('../../models/defaultChoice')


//ACTION: register new user
router.post('/adduser', auth, function(req, res){
	const {name, email, password, role} = req.body
	if (req.user.role < 3 && req.user.role < role){
		if (!name || !email || !password || !role) 
		return res.status(400).json({msg:"Please enter all fields"})
		
		User.findOne({email}).then((user)=>{
			if(user) 
			return res.status(400).json({msg:"User already exists!"})
		})
	
		//After validations
		const newUser = new User({name, email, password, role})
		const newChoice = new DefaultChoice({email})
		
		//generate salt and hash password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err
				newUser.password = hash	
				newChoice.save()
				newUser.save()
				.then(() => res.status(200).json({msg:"Successfully created!"}))
				.catch(err => res.status(400).json({msg:err.message}))
			})
		})
	}
	else{
		return res.status(400).json({msg:"Unauthorized!"})
	}

})

module.exports = router



/*
			user => {	
				jwt.sign(
					{id: user.id,
					role:user.role},
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
								role: user.role
							}
						})
					}
				)
			}*/