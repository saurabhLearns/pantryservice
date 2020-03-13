import axios from 'axios'

export const tokenconfig = (getState) =>{
	const tok = getState().auth.token
	const config = {
		headers: {
			"Content-Type" : "application/json",
		}
	}
	if (tok){
		config.headers['x-auth-token'] = tok
	}
	return (config)
}