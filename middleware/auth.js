const config = require('config')
const jwt = require('jsonwebtoken')

function auth(req, res, next){
	//extract token from header
	const token = req.header('x-auth-token')
	if(!token) return res.status(401).json({msg:"No token found!"})
	try{
		//verify token
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		req.user = decoded
		next()
	}catch(e){
		res.status(400).json({msg:"Invalid Token."})
	}
}

module.exports = auth
