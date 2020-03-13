import {GET_SPECIALS, POST_SPECIALS} from '../actions/types'

const initialState = {
	specialItems : [{
		name:null,
		value: null,
	}],
}

export default function (state = initialState, action){
	switch(action.type){
		case GET_SPECIALS:
			return{
				...state, 
				specialItems:action.payload, 
			}
		case POST_SPECIALS:
			return{
				...state, 
				specialItems:[
					action.payload, 
					...state.specialItems
				]
			}
		default:
			return{
				...state
			}
	}
}