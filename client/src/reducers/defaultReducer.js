import {GET_DEFAULTS, CHANGE_DEFAULTS} from '../actions/types'

const initialState = {
	defaultChoices:null
}

export default function(state = initialState, action){
	switch(action.type){
		case GET_DEFAULTS:
			return{
				...state,
				defaultChoices: action.payload
			}
		case CHANGE_DEFAULTS:
			return{}
		default:
			return{
				...state
			}
	}
}