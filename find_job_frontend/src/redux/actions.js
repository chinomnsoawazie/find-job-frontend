import { SET_API_KEYS, SET_USER, LOGOUT } from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            console.log(r.data.user.jobs)
            dispatch({type: SET_USER, payload: r.data})
            push('/logged-in-options')
        })
        .catch((error) =>{
            console.log('Error:', error)
        })
}

export const logout = (props) =>{
    props.dispatch({type: LOGOUT})
    props.history.push('/')
}







//JOBS STUFF
export const setAPIKeys = (dispatch) =>{
    axios.get('http://localhost:3000/apikeys')
    .then(returnedAPIKeys =>{
        dispatch({type: SET_API_KEYS, payload: returnedAPIKeys.data })
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}
