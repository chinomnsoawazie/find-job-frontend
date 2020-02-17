import {SET_USER, LOGOUT,
        
        SET_CURRENT_JOB,
    SET_JOBS_RETURNED_FROM_SEARCH,
    SET_API_KEYS,
    SET_JOB_FROM_MY_DASHBOARD,
    RESET_JOB_FROM_MY_DASHBOARD, SET_USER_JOBS, SET_APPLY_CHECK, SET_FAVORITE_CHECK} from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            console.log(r.data.user.jobs)
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
    // axios.get(`http://localhost:3000/jobs?user_id=${props.user_id}`)
    // .then(r => {
    //     console.log(r.data)
    // })
    props.dispatch({type: SET_CURRENT_JOB, payload: job})

    props.push('/individual-job')
}

export const setAppliedCheck = (props) =>{
    props.dispatch({type: SET_APPLY_CHECK})
}

export const setFavoriteCheck = (props) =>{
    props.dispatch({type: SET_FAVORITE_CHECK})
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
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        props.dispatch({type: SET_FAVORITE_CHECK})

        alert(`${job.job_title} has been added to your favorites`)
        props.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const addExistingJobToFavorites = (job, props) => {
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {'favorite_key': true}
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs=> {
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        props.dispatch({type: SET_FAVORITE_CHECK})

        alert(`${job.job_title} has been added to your favorites`)
        props.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const applyToNewJob = (job, props) => {
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        alert(`You have started applying to ${job.job_title}. Please continue the application on the employer website that will open in new tab`)
        props.dispatch({type: SET_APPLY_CHECK})

        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        window.open(job.url)
        props.push('/individual-job')
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
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allJobs})
        props.dispatch({type: SET_APPLY_CHECK})

        alert(`You have started applying to ${returnedJobs.data.job.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(job.url)
        props.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}