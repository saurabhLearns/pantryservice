





//not needed



const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('config')

const router = express.Router()

const Admin = require('../../models/admin')

//METHOD: @POST
//ACTION: register new admin
//AUTH: public
router.post('/', function(req, res){
	const {name, email, password} = req.body

	if (!name || !email || !password) 
	return res.status(400).json({msg:"Please enter all fields"})
	
	Admin.findOne({email}).then((user)=>{
		if(user) 
		return res.status(400).json({msg:"User already exists!"})
	})
	
	//After validations
	const newAdmin = new Admin({name, email, password})
	//generate salt and hash password
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newAdmin.password, salt, (err, hash) => {
			if (err) throw err
			newAdmin.password = hash
			newAdmin.save()
			.then(admin => {
				//even after creating new token, it doesnot work unless logged in separately
				jwt.sign(
					{id: admin.id,
					adminRole:admin.adminRole},
					config.get('jwtSecret'),
					{expiresIn: 10800},
					(err, token)=>{
						if (err) throw err
						res.json({
							token,
							admin:{
								id: admin._id, 
								name: admin.name, 
								email:admin.email, 
								adminRole: admin.adminRole
							}
						})
					}
				)
			})
		})
	})
})

module.exports = router
