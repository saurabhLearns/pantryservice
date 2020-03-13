const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const auth = require('../../middleware/auth')
const User = require('../../models/user')


//Authenticate user depending on frontend's switch bool value 'isadmin'
router.post('/login', function(req, res) {
	const {email, password, isAdmin} = req.body

	if(!email || !password) 
	return res.status(400).json({msg:"Please enter all fields!"})

	User.findOne({email})
	.then(user => {
		if(!user)	return res.status(400).json({msg:"User does not exists!"})
		if(isAdmin){
			if(user.role >= 3)	return res.status(400).json({msg:"You are not an admin!"})
		}
		else if(user.role != 3){
			return res.status(400).json({msg:"You are not a user!"})
		}
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
	}).catch(err => res.status(400).json({msg:"unknown error"}))
})


//change password
router.put('/change-password', auth, (req, res)=>{
	var {oldPassword, password} = req.body
	User.findById(req.user.id).then(getUser=>{
		bcrypt.compare(oldPassword, getUser.password)
		.then(isMatch=>{
			if(!isMatch) return res.status(400).json({msg:"Old password is incorrect."})
			else{
				bcrypt.genSalt(10, (err, salt) =>{
					if(err) throw err
					bcrypt.hash(password, salt, (err, hash) =>{
						if(err) throw err
						password = hash
						User.findByIdAndUpdate(getUser._id, {password: password})
						.then(() => res.status(200).json({msg:"Password updated!"}))
						.catch((err)=>console.log(err.message))		
					})
				})
			}
		}).catch((err)=>console.log(err.message))
	}).catch((err)=>console.log(err.message))
})


//get authenticated user/admin details
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
	.select('-password')
	.then(user => res.json(user))
})


module.exports = router