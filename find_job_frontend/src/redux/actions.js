import { SET_API_KEYS, SET_USER, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB, SET_USER_JOBS, SET_FAVORITE_CHECK, RESET_FAVORITE_CHECK, SET_APPLIED_CHECK, RESET_APPLIED_CHECK, SET_CURRENT_FAVORITE_JOB, SET_NOTES, SET_VIEW_NOTE, RESET_VIEW_NOTE, SET_NEW_NOTE_JOB_ID, SET_CURRENT_NOTE } from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            // console.log(r.data.user.notes)
            dispatch({type: SET_NOTES, payload: r.data.user.notes})
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

export const setCurrentFavoriteJob = (job, props) =>{
    props.dispatch({type: SET_CURRENT_FAVORITE_JOB, payload: job})
    props.history.push('/individual-favorite-job')
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
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        props.dispatch({type: SET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
        alert(`${job.job_title} has been added to your favorites`)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const addExistingJobToFavorites = (job, props) => {
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {
        'favorite_key': true,
        user_id: job.user_id
        }
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs=> {
        props.dispatch({type: SET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
        alert(`${job.job_title} has been added to your favorites`)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const removeJobFromFavorites = (job, props) => {
    console.log(props)

    console.log(props)
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {
        'favorite_key': true,
        user_id: job.user_id
        }
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs=> {
        props.dispatch({type: RESET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
        alert(`${job.job_title} has been removed from your favorites and you'll be taken back to favorite jobs`)
        props.history.push('/favorite-jobs')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}



export const applyToNewJob = (job, props) => {
    axios.post('http://localhost:3000/jobs', job)
    .then(returnedJobs => {
        props.dispatch({type: SET_APPLIED_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
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
    let bodyParameters = {
        'applied_key': true,
        user_id: job.user_id
    }
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs => {
        props.dispatch({type: SET_APPLIED_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
        alert(`You have started applying to ${returnedJobs.data.job.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(job.url)
        props.history.push('/individual-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}


//NOTES STUFF
export const setViewNote = (dispatch) => {
    dispatch({type: SET_VIEW_NOTE})
}

export const resetViewNote = (dispatch) => {
    dispatch({type: RESET_VIEW_NOTE})
}

export const setNewNoteJobID = (jobID, dispatch) => {
    dispatch({type: SET_NEW_NOTE_JOB_ID, payload: jobID})
}

export const setCurrentNote = (note, props) =>{
    props.dispatch({type: SET_CURRENT_NOTE, payload: note})
}

export const createNote = (note, props) => {
    axios.post('http://localhost:3000/notes', note)
    .then(returnedNotes => {
        console.log(returnedNotes)
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully created.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })    
}

export const deleteNote = (note, props) => {
    console.log(props)
    let config = { data:{
        user_id: props.user_id
        }
    }
    axios.delete(`http://localhost:3000/notes/${note.id}`, config)
    .then(returnedNotes => {
        console.log(returnedNotes)
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully deleted.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const editNote = (note, props) => {
    console.log(note, props)
    
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {
        user_id: note.user_id,
        text: note.text,
        job_id: note.job_id
    }
    axios.patch(`http://localhost:3000/notes/${note.id}`, bodyParameters, config)
    .then(returnedNotes => {
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully updated.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}