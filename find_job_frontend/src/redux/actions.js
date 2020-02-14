import {SET_USER, LOGOUT,
        
        SET_CURRENT_JOB,
    SET_JOBS_RETURNED_FROM_SEARCH,
    SET_API_KEYS,
    SET_JOB_FROM_MY_DASHBOARD,
    RESET_JOB_FROM_MY_DASHBOARD, SET_USER_JOBS} from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            dispatch({type: SET_USER, payload: r.data})
            push('/logged-in-options')
        })
}

export const logout = (props) => {
    props.dispatch({type: LOGOUT})
    props.history.push('/')
}

//JOBS STUFF
export const setAPIKeys = (props) =>{
    axios.get('http://localhost:3000/apikeys')
    .then(r =>{
        props.dispatch({type: SET_API_KEYS, payload: r.data })
    })
}

export const searchJobsByTP = (title, minimumPay, location, props) =>{
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
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.push('/search-jobs-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })

}

export const setCurrentJob = (job, props) =>{
    props.dispatch({type: SET_CURRENT_JOB, payload: job})
    props.push(`/jobs/${job.usaJobs_job_id}`)
}

export const setJobFromMyDashboard = (props) =>{
    props.dispatch({type: SET_JOB_FROM_MY_DASHBOARD})
}

export const resetJobFromMyDashboard = (props) =>{
    props.dispatch({type: RESET_JOB_FROM_MY_DASHBOARD})
}

export const addNewJobToFavorites = (job, props) => {
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        console.log(returnedJobs)
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        props.dispatch({type: SET_CURRENT_JOB, payload: returnedJobs.data.job})
        alert(`${job.job_title} has been added to your favorites`)
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const addExistingJobToFavorites = (job, props) => {
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {favorite_key: true}
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(r => {
        props.dispatch({type: SET_CURRENT_JOB, payload: r.data.currentJob})
        props.dispatch({type: SET_USER_JOBS, payload: r.data.userJobs})
        alert(`${job.job_title} has been added to your favorites`)
    })
}

export const applyToNewJob = (job, props) => {
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        console.log(returnedJobs)
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        props.dispatch({type: SET_CURRENT_JOB, payload: job})
        alert(`You have started applying to ${job.job_title}. Please continue the application on the employer website that will open in new tab`)
        // window.open(job.url)
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}


export const applyToExistingJob = (job, props) => {
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = job.applied_key
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    //make the response to have both the current job and all userJobs so I can use them below
    .then(r => {
        props.dispatch({type: SET_CURRENT_JOB, payload: job})
        props.dispatch({type: SET_USER_JOBS, payload: r.data.userJobs})
        alert(`You have started applying to ${job.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(job.url)
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}







