import {
	USER_LOADED, 
	USER_LOADING, 
	AUTH_ERROR, 
	LOGIN_FAIL, 
	LOGIN_SUCCESS, 
	LOGOUT_SUCCESS, 
	REGISTER_FAIL, 
	REGISTER_SUCCESS
} from '../actions/types'


const initialState = {
	token: localStorage.getItem('token'),
	isAuth: null,
	user: null,
	isLoading: null,
}

export default function(state = initialState, action){
	switch(action.type){
		case USER_LOADING:
			return{
				...state,
				isLoading: true
			}

		case USER_LOADED:
			return{
				...state,
				isLoading: false,
				isAuth: true,
				user: action.payload
			}
		
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT_SUCCESS:
		case REGISTER_FAIL:
			localStorage.removeItem('token')
			return{
				...state,
				isAuth: false,
				token: null,
				user: null,
				isLoading: false
			}

		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token)
			return{
				...action.payload,
				isAuth: true,
				isLoading: false
			}
		
		//~~~~doubt~~~~
		case REGISTER_SUCCESS:
			return{
				...state,
				...action.payload,
				isAuth: true,
				isLoading: false
			}

		default:
			return{
				...state
			}
	}
}