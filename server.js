const mongoose = require('mongoose')
const config  = require('config')
const path = require('path')
const express = require('express')

const app = express()

const db = config.get('MongoURI')

app.use(express.json())

//routes
app.use('/api/special', require('./routes/api/specials'))
app.use('/api/user', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/defaultchoice', require('./routes/api/defaultChoices'))

//connect db
mongoose.connect(db)
.then(()=>console.log("############		mongoDB connected	#############"))
.catch((err)=>console.log(err))

//after deployment
if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'))
	app.get('*', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

//start server
const port = process.env.PORT || 5000
app.listen(port, ()=> console.log("############		Server started		#############"))