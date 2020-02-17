import { SET_API_KEYS, SET_USER, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB, SET_USER_JOBS, SET_FAVORITE_CHECK, RESET_FAVORITE_CHECK, SET_APPLIED_CHECK, RESET_APPLIED_CHECK } from './actionTypes'
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
    props.dispatch({type: SET_CURRENT_JOB, payload: job})
    props.history.push('/individual-job')
}

export const setFavoriteCheck = (dispatch) =>{
    console.log('here')
    dispatch({type: SET_FAVORITE_CHECK})
}

export const resetFavoriteCheck = (dispatch) => {
    dispatch({type: RESET_FAVORITE_CHECK})
}

export const setAppliedCheck = (dispatch) => {
    dispatch({type: SET_APPLIED_CHECK})
}

export const resetAppliedCheck = (dispatch) => {
    dispatch({type: RESET_APPLIED_CHECK})
}

export const addNewJobToFavorites = (job, props) => {
    console.log(props)

    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        props.dispatch({type: SET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        alert(`${job.job_title} has been added to your favorites`)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const addExistingJobToFavorites = (job, props) => {
    console.log(props)
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {'favorite_key': true}
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs=> {
        props.dispatch({type: SET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        alert(`${job.job_title} has been added to your favorites`)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const applyToNewJob = (job, props) => {
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        props.dispatch({type: SET_APPLIED_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        alert(`You have started applying to ${job.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(job.url)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const applyToExistingJob = (job, props) => {
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {'applied_key': true}
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs => {
        props.dispatch({type: SET_APPLIED_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        alert(`You have started applying to ${returnedJobs.data.job.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(job.url)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}