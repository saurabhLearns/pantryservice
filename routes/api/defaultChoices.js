const express = require('express')
const router = express.Router()

const defaultChoice = require('../../models/defaultChoice')
const User = require('../../models/user')
const auth = require('../../middleware/auth')

//METHOD: @GET
//ACTION: get default choices of users
//AUTH: private (User and admin, based on content to be retreived)
router.get('/', auth, function(req, res){
	//if admin, then admin can see everyone's default choices
	if(req.user.adminRole){
		defaultChoice.aggregate([
			{
			$group:
				{
				_id: "$defaultchoice",
				total: {$sum: 1},
				name: { $push:  "$email"}
				}
			}
		]).then(items=>res.json(items))	
	}
	else{
		//else user can only see its default choices
		User.findById(req.user.id).select('email').then(getUser => {
			defaultChoice.find({"email":getUser.email}, {"defaultchoice": 1, "_id": 0})
			.then(getItem => res.json(getItem))
		})
	}
})

//METHOD: @PUT
//ACTION: update default choices by users
//AUTH: private
router.put('/:_id', auth, function(req, res){
	//checking if user is changing its own default choice or not
	User.findById(req.user.id).select('email')
	.then(putUser => {
		defaultChoice.findById(req.params._id)
		.then(itemToUpdate=>{
			if (itemToUpdate.email != putUser.email) 
			return res.status(400).json({msg:"unauthorised action!"})
			defaultChoice.findByIdAndUpdate(req.params._id, req.body)
			.then(() => {
				console.log()
				//prevents need for page refresh to display updated vals
				defaultChoice.findById(req.params._id).then((updatedItem)=>{
					res.json(updatedItem)
				})
			})
		})
	})
})



module.exports = router





//METHOD: @POST
//ACTION: Post default choices by users on the first time of login
//AUTH: private
// router.post('/', auth, function(req, res){
// 	//posting with user's email to track whos default it is
// 	const postUser = User.findById(req.user.id).select('email')
// 	const NewdefaultChoice = new defaultChoice({
// 		email: postUser.email,
// 		defaultChoice:req.body.defaultChoice,
// 	})
// 	NewdefaultChoice.save().then(defaultchoice => res.json(defaultchoice))
// })
