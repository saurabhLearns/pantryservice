const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const auth = require('../../middleware/auth')
const User = require('../../models/user')


//Authenticate admin depending on frontend's switch bool value 'isadmin'
router.post('/admin-login', function(req, res) {
	const {email, password} = req.body

	if(!email || !password) 
	return res.status(400).json({msg:"Please enter all fields!"})

	User.findOne({email})
	.then(user => {
		if(!user)	return res.status(400).json({msg:"User does not exists!"})
		if(user.role >= 3)	return res.status(400).json({msg:"You are not an admin!"})
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(!isMatch) 
			return res.status(400).json({msg:"Invalid Credentials!"})
			jwt.sign(
				{
					id: user.id,
					role:user.role
				},
				config.get('jwtSecret'),
				{expiresIn: 10800},
				(err, token) => {
					if(err) throw err
					res.json({
						token,
						user:{
							id: user._id,
							name: user.name,
							email: user.email,
							role: user.role
						}
					})
				}
			)
		})
		.catch(err => res.status(400).json({msg:"unknown error"}))
	})
})


//authicate user after login and generate token
router.post('/user-login', function(req, res) {
	const {email, password} = req.body
	if(!email || !password)	return res.status(400).json({msg:"Please enter all fields!"})
	
	User.findOne({email}).then(user => {
		if(!user)	return res.status(400).json({msg:"User does not exists!"})
		if(user.role != 3)	return res.status(400).json({msg:"You are not a user!"})
		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if(!isMatch)	return res.status(400).json({msg:"Invalid Credentials!"})
			jwt.sign(
				{	
					id: user.id,
					role: user.role
				},
				config.get('jwtSecret'),
				{expiresIn: 10800},
				(err, token) => {
					if(err) throw err
					res.json({
						token,
						user:{
							id: user._id,
							name: user.name,
							email: user.email,
							role: user.role
						}
					})
				}
			)
		})
	})
})


//get authenticated user/admin details
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
	.select('-password')
	.then(user => res.json(user))
})


module.exports = router