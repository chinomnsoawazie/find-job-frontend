import {SET_USER,
        
        SET_CURRENT_JOB, JOB_FROM_MY_DASHBOARD} from './actionTypes'
import axios from 'axios'


export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            // console.log(r.data)
            dispatch({type: SET_USER, payload: r.data})
            push('/logged-in-options')
        })
}

export const setCurrentJob = (job, props) =>{
    props.dispatch({type: SET_CURRENT_JOB, payload: job})
    props.push(`/jobs/${job.id}`)
}

export const setJobFromMyDashboard = (props) =>{
    props.dispatch({type: JOB_FROM_MY_DASHBOARD})
}


