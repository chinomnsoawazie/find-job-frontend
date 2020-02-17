import { SET_API_KEYS, SET_USER, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB } from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            // console.log(r.data.user.jobs)
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

export const searchJobsByTP = (title, minimumPay, location, props) =>{
    // console.log(props)
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey

    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage= 500&PositionTitle=${title}&LocationName=${location}&RemunerationMinimumAmount=${minimumPay}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {
        // console.log(json)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}


export const setCurrentJob = (job, props) =>{
    console.log(props)
    // props.dispatch({type: SET_CURRENT_JOB, payload: job})
    // props.push('/individual-job')
}
