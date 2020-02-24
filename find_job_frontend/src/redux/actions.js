import { SET_API_KEYS, SET_USER, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB, SET_USER_JOBS, SET_FAVORITE_CHECK, RESET_FAVORITE_CHECK, SET_APPLIED_CHECK, RESET_APPLIED_CHECK, SET_CURRENT_FAVORITE_JOB, SET_NOTES, SET_VIEW_NOTE, RESET_VIEW_NOTE, SET_NEW_NOTE_JOB_ID, SET_CURRENT_NOTE, SET_VIEW_TODO, RESET_VIEW_TODO, SET_NEW_TODO_JOB_ID, SET_CURRENT_TODO, SET_TODOS, SET_CURRENT_APPLIED_JOB, SET_PREFERENCES, SET_CURRENT_PREFERENCE, SET_CURRENT_COUNTRY_ID, SET_CURRENT_STATE_ID, SET_CURRENT_CITY_ID, RESET_LOCATION_IDS, SET_VIEW_PERSONAL_INFO, RESET_VIEW_PERSONAL_INFO, SET_SKILLS, SET_VIEW_SKILLS, RESET_VIEW_SKILLS, SET_VIEW_MEMBERSHIPS, RESET_VIEW_MEMBERSHIPS, SET_MEMBERSHIPS, SET_VIEW_EMPLOYMENTS, RESET_VIEW_EMPLOYMENTS, SET_EMPLOYMENTS, SET_EDUCATIONS, SET_VIEW_EDUCATIONS, RESET_VIEW_EDUCATIONS, SET_VIEW_CERTIFICATIONS, RESET_VIEW_CERTIFICATIONS, SET_CERTIFICATIONS } from './actionTypes'
import axios from 'axios'

//USER STUFF
export const login = (user, push, dispatch) =>{
    axios.post('http://localhost:3000/login', user)
        .then(r => {
            console.log(r.data.user)
            dispatch({type: SET_USER_JOBS, payload: r.data.user.jobs})
            dispatch({type: SET_SKILLS, payload: r.data.user.skills})
            dispatch({type: SET_MEMBERSHIPS, payload: r.data.user.memberships})
            dispatch({type: SET_EDUCATIONS, payload: r.data.user.educations})
            dispatch({type: SET_EMPLOYMENTS, payload: r.data.user.employments})
            dispatch({type: SET_CERTIFICATIONS, payload: r.data.user.certifications})
            dispatch({type: SET_NOTES, payload: r.data.user.notes})
            dispatch({type: SET_TODOS, payload: r.data.user.tasks})
            dispatch({type: SET_PREFERENCES, payload: r.data.user.preferences})
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

export const setViewPersonalInfo = (dispatch) => {
    console.log(dispatch)
    dispatch({type: SET_VIEW_PERSONAL_INFO})
}

export const resetViewPersonalInfo = (dispatch) => {
    dispatch({type: RESET_VIEW_PERSONAL_INFO})
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

export const setCurrentAppliedJob = (job, props) =>{
    props.dispatch({type: SET_CURRENT_APPLIED_JOB, payload: job})
    props.history.push('/individual-applied-job')
}

export const setFavoriteCheck = (dispatch) =>{
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
        props.fromAppliedJobs ? props.history.push('/individual-applied-job') : props.history.push('/favorite-jobs')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const removeJobFromFavorites = (job, props) => {
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
        props.fromAppliedJobs ? props.history.push('/individual-applied-job') : props.history.push('/favorite-jobs')
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
        props.fromFavoriteJobs ?  props.history.push('/individual-favorite-job') : props.history.push('/individual-job')
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
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully created.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })    
}

export const deleteNote = (note, props) => {
    let config = { data:{
        user_id: props.user_id
        }
    }
    axios.delete(`http://localhost:3000/notes/${note.id}`, config)
    .then(returnedNotes => {
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully deleted.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const editNote = (note, props) => {    
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

//TODO STUFF
export const setViewToDo = (dispatch) => {
    dispatch({type: SET_VIEW_TODO})
}

export const resetViewToDo = (dispatch) => {
    dispatch({type: RESET_VIEW_TODO})
}

export const setNewToDoJobID = (jobID, dispatch) => {
    dispatch({type: SET_NEW_TODO_JOB_ID, payload: jobID})
}

export const setCurrentToDo = (todo, props) =>{
    props.dispatch({type: SET_CURRENT_TODO, payload: todo})
}

export const createToDo = (todo, props) => {
    axios.post('http://localhost:3000/tasks', todo)
    .then(returnedToDos => {
        props.dispatch({type: SET_TODOS, payload: returnedToDos.data.userToDos})
        alert('ToDo successfully created.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })    
}

export const deleteToDo = (todo, props) => {
    let config = { data:{
        user_id: props.user_id
        }
    }
    axios.delete(`http://localhost:3000/tasks/${todo.id}`, config)
    .then(returnedToDos => {
        props.dispatch({type: SET_TODOS, payload: returnedToDos.data.userToDos})
        alert('ToDo successfully deleted.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const editToDo = (todo, props) => {    
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {
        user_id: todo.user_id,
        description: todo.description,
        job_id: todo.job_id,
        due_date: todo.due_date,
        done_status: todo.done_status
    }
    axios.patch(`http://localhost:3000/tasks/${todo.id}`, bodyParameters, config)
    .then(returnedToDos => {
        props.dispatch({type: SET_TODOS, payload: returnedToDos.data.userToDos})
        alert('ToDo successfully updated.')
        props.push('/individual-favorite-job')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

//PREFERENCES STUFF
export const setCurrentPreference = (preference, dispatch) =>{
    dispatch({type: SET_CURRENT_PREFERENCE, payload: preference})
}

export const setCurrentCountryID = (countryID, dispatch) =>{
    dispatch({type: SET_CURRENT_COUNTRY_ID, payload: countryID})
}

export const setCurrentStateID = (stateID, dispatch) => {
    dispatch({type: SET_CURRENT_STATE_ID, payload: stateID})
}

export const setCurrentCityID = (cityID, dispatch) => {
    dispatch({type: SET_CURRENT_CITY_ID, payload: cityID})
}

export const createPreference = (preference, props) => {
    console.log('preference to be created', preference, 'props', props) 
    axios.post('http://localhost:3000/preferences', preference)
    .then(returnedPreferences => {
        props.dispatch({type: SET_PREFERENCES, payload: returnedPreferences.data.userPreferences})
        alert('Preference successfully created.')
        props.dispatch({type: RESET_LOCATION_IDS})
        props.push('/all-preferences')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 

}

export const editPreference = (preference, props) => {   
    console.log('preference to be edited', preference, 'props', props) 
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    let bodyParameters = {
        user_id: preference.user_id,
        name: preference.name,
        country:preference.country,
        state: preference.state,
        city: preference.city,
        city_population: preference.city_population,
        min_pay: preference.min_pay,
        job_title: preference.job_title,
        industry: preference.industry,
        posting_date_start: preference.posting_date_start,
        application_closing_date: preference.application_closing_date,
    }
    axios.patch(`http://localhost:3000/preferences/${preference.id}`, bodyParameters, config)
    .then(returnedPreferences => {
        props.dispatch({type: SET_CURRENT_PREFERENCE, payload: preference})
        props.dispatch({type: SET_PREFERENCES, payload: returnedPreferences.data.userPreferences})
        alert('Preference successfully updated.')
        props.dispatch({type: RESET_LOCATION_IDS})
        props.push('/individual-preference')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deletePreference = (preference, props) => {
    console.log(props)
    let config = { data:{
        user_id: preference.user_id
        }
    }
    axios.delete(`http://localhost:3000/preferences/${preference.id}`, config)
    .then(returnedPreferences => {
        props.dispatch({type: SET_PREFERENCES, payload: returnedPreferences.data.userPreferences})
        alert('Preference successfully deleted.')
        props.push('/all-preferences')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

//SKILLS STUFF
export const setViewSkills = (dispatch) => {
    dispatch({type: SET_VIEW_SKILLS})
}

export const resetViewSkills = (dispatch) => {
    dispatch({type: RESET_VIEW_SKILLS})
}

//MEMBERSHIPS STUFF
export const setViewMemberships = (dispatch) => {
    dispatch({type: SET_VIEW_MEMBERSHIPS})
}

export const resetViewMemberships = (dispatch) => {
    dispatch({type: RESET_VIEW_MEMBERSHIPS})
}

//EMPLOYMENTS STUFF
export const setViewEmployments = (dispatch) => {
    dispatch({type: SET_VIEW_EMPLOYMENTS})
}

export const resetViewEmployments = (dispatch) => {
    dispatch({type: RESET_VIEW_EMPLOYMENTS})
}

//EDUCATIONS STUFF
export const setViewEducations = (dispatch) => {
    dispatch({type: SET_VIEW_EDUCATIONS})
}

export const resetViewEducations = (dispatch) => {
    dispatch({type: RESET_VIEW_EDUCATIONS})
}

//CERTIFICATIONS STUFF
export const setViewCertifications = (dispatch) => {
    dispatch({type: SET_VIEW_CERTIFICATIONS})
}

export const resetViewCertifications =(dispatch) => {
    dispatch({type: RESET_VIEW_CERTIFICATIONS})
}