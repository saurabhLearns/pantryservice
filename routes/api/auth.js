const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const auth = require('../../middleware/auth')
const User = require('../../models/user')
const Admin = require('../../models/admin')

//METHOD: @POST
//ACTION: authenticate admin/user depending on checkbox bool value 'isadmin'
//AUTH: public
router.post('/', function(req, res) {
	const {email, password, isAdmin} = req.body

	if(!email || !password) 
	return res.status(400).json({msg:"Please enter all fields!"})
	
	if (isAdmin){
		Admin.findOne({email})
		.then(admin => {
			if(!admin) 
			return res.status(400).json({msg:"User does not exists!"})
			//compare input pwd and hashed db pwd
			bcrypt.compare(password, admin.password)
			.then(isMatch => {
				if(!isMatch) 
				return res.status(400).json({msg:"Invalid Credentials!"})
				//create token
				jwt.sign(
					{
						id: admin.id,
						adminRole:admin.adminRole
					},
					config.get('jwtSecret'),
					{expiresIn: 10800},
					(err, token) => {
						if(err) throw err
						res.json({
							token,
							admin:{
								id: admin._id,
								name: admin.name,
								email: admin.email,
								adminRole: admin.adminRole
							}
						})
					}
				)
			})
			.catch(err => res.status(400).json({msg:"unknown error"}))
		})
	}

	else{
		//if isadmin == false, authenticate as user
		User.findOne({email}).then(user => {
			if(!user) return res.status(400).json({msg:"User does not exists!"})
			//compare input pwd and hashed db pwd
			bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(!isMatch) return res.status(400).json({msg:"Invalid Credentials!"})
				//create token
				jwt.sign(
					{	
						id: user.id,
						adminRole:user.adminRole
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
								adminRole:user.adminRole
							}
						})
					}
				)
			})
		})
	}
})


//METHOD: @GET
//ACTION: get authenticated user details
//AUTH: private(user)
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
	.select('-password')
	.then(user => res.json(user))
})


//METHOD: @GET
//ACTION: get authenticated admin details
//AUTH: private(admin)
router.get('/admin', auth, (req, res) => {
	Admin.findById(req.user.id)
	.select('-password')
	.then(admin => res.json(admin))
})


module.exports = router