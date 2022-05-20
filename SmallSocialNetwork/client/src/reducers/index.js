import { combineReducers } from "redux"; //cho phep gom tat ca reducer vao 1 root
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'

export default combineReducers({
    alert,
    auth,
    profile,
    post
})