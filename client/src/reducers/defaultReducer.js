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
			let i;
			for(i =0; i<state.defaultChoices.length; i++){
				if (state.defaultChoices[i]._id == action.payload._id){
					state.defaultChoices[i].defaultchoice = action.payload.defaultchoice
					break;
				}
			}
			return{
				...state,
				defaultChoices:state.defaultChoices
			}
		default:
			return{
				...state
			}
	}
}