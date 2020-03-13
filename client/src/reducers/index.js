import {combineReducers} from 'redux'
import specialReducer from './specialReducer'
import defaultReducer from './defaultReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
	default : defaultReducer,
	special : specialReducer, 
	error : errorReducer,
	auth : authReducer
})