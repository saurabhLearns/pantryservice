import {
	USER_LOADED, 
	USER_LOADING, 
	AUTH_ERROR, 
	LOGIN_FAIL, 
	LOGIN_SUCCESS, 
	LOGOUT_SUCCESS, 
	REGISTER_FAIL, 
	REGISTER_SUCCESS
} from './types'
import axios from 'axios'
import {tokenconfig} from './tokenConfig'
import {returnErrors} from './errorActions'

export const loadUser = () => (dispatch, getState) =>{
	dispatch({type:USER_LOADING})
	axios.get('/api/auth/user', tokenconfig(getState))
	.then(res => dispatch({
		type:USER_LOADED,
		payload: res.data
	}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.status))
		dispatch({type:AUTH_ERROR})
	})
}

export const login = ({email, password, isAdmin}) =>(dispatch) => {
	const config = {
		header:{
			"Content-Type":"application/json",
		}
	}
	axios.post('/api/auth/login', {email, password, isAdmin}, config)
	.then(res => dispatch({type:LOGIN_SUCCESS, payload: res.data}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.status))
		dispatch({type:LOGIN_FAIL})
	})	
}

export const register = ({email, name, password, role}) => (dispatch, getState) =>{
	axios.post('/api/users/adduser',{email, name, password, role}, tokenconfig(getState))
	.then(res => dispatch({type:REGISTER_SUCCESS, payload:res.data}))
	.catch(err => {
		dispatch(returnErrors(err.response.data, err.response.data, 'REGISTER_FAIL'))
		dispatch({type:REGISTER_FAIL})
	})
}

export const logout = () =>{
	return{type:LOGOUT_SUCCESS}
}