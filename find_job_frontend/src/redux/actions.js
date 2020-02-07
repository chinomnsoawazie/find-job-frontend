import {SET_USER} from './actionTypes'
import axios from 'axios'


export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            // console.log(r.data)
            dispatch({type: SET_USER, payload: r.data})
            push('/logged-in-options')
        })
}