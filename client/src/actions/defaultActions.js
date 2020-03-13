import {GET_DEFAULTS, CHANGE_DEFAULTS} from './types'
import axios from 'axios'
import {tokenconfig} from './tokenConfig'
import {returnErrors} from './errorActions'

export const getDefaults = () => (dispatch, getState) => {
	axios.get('/api/defaultchoices/get-default', tokenconfig(getState))
	.then(res => dispatch({
		type: GET_DEFAULTS, payload: res.data
	}))
	.catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const putDefaults = ({_id, defaultchoice}) => (dispatch, getState) => {
	axios.put(`/api/defaultchoices/change-default/${_id}`, {defaultchoice}, tokenconfig(getState))
	.then(res=>dispatch({
		type:CHANGE_DEFAULTS, 
		payload: res.data
	}))
	.catch(err=>dispatch(returnErrors(err.response.data, err.response.status)))
}
