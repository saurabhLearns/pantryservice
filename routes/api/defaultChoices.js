const express = require('express')
const router = express.Router()

const defaultChoice = require('../../models/defaultChoice')
const User = require('../../models/user')
const auth = require('../../middleware/auth')

//get default choices of users
router.get('/get-default', auth, function(req, res){
	//if admin, then admin can see everyone's default choices
	if(req.user.role<3){
		defaultChoice.find({}).then(allItems => res.json(allItems))
	}
	//else user can only see its default choices
	else{
		User.findById(req.user.id).select('email').then(getUser => {
			defaultChoice.find({"email":getUser.email})
			.then(getItem => res.json(getItem))
		})
	}
})


//update default choices by users
router.put('/change-default/:_id', auth, function(req, res){
	//checking if user is changing its own default choice or not
	User.findById(req.user.id).select('email')
	.then(putUser => {
		defaultChoice.findById(req.params._id)
		.then(itemToUpdate=>{
			if (itemToUpdate.email != putUser.email) 
			return res.status(400).json({msg:"unauthorised action!"})
			defaultChoice.findByIdAndUpdate(req.params._id, req.body) 
			.then(() => { //body param name= defaultchoice
				//prevents need for page refresh to display updated vals
				defaultChoice.findById(req.params._id).then((updatedItem)=>{
					res.json(updatedItem) 
				})
			})
		})
	})
})

module.exports = router



// defaultChoice.aggregate([{
		// 	$group:{
		// 		_id: "$defaultchoice",
		// 		total: {$sum: 1},
		// 		name: { $push:  "$email"}
		// 		}
		// 	}
		// ]).then(items=>res.json(items))	

		// User.findById(req.user.id).select('email').then(getUser => {
		// 	defaultChoice.find({"email":getUser.email}, {"defaultchoice": 1, "_id": 0})
		// 	.then(getItem => {
		// 		defaultChoice.aggregate([{
		// 			$group:{
		// 				_id: "$defaultchoice",
		// 				total: {$sum: 1},
		// 				name: { $push:  "$email"}
		// 				}
		// 			}
		// 		]).then(items=>res.json({
		// 			all: items,
		// 			own: getItem
		// 		}))	
		// 	})
		// })