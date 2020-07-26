import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from '../reducers/profile'
import posts from '../reducers/posts'
const rootReducer =  combineReducers({
    alert,auth,profile,posts
})

export default rootReducer;
