import axios from 'axios'
import {tokenconfig} from './tokenConfig'
import {GET_SPECIALS, POST_SPECIALS} from './types'
import {returnErrors} from './errorActions'

export const getSpecials = () => dispatch=>{
	axios.get('/api/specials/get-special', tokenconfig(getState)
	.then(res=>dispatch({
		type: GET_SPECIALS,
		payload: res.data
	})))
	.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const postSpecials = (NewSpecial) => (dispatch, getState) =>{
	axios.post('/api/specials/post-special', NewSpecial, tokenconfig(getState)
	.then(res=>dispatch({
		type:POST_SPECIALS,
		payload: res.data
	}))).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}