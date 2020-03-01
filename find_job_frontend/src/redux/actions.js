import { SET_API_KEYS, SET_USER, LOGOUT, SET_JOBS_RETURNED_FROM_SEARCH, SET_CURRENT_JOB, SET_USER_JOBS, SET_FAVORITE_CHECK, RESET_FAVORITE_CHECK, SET_APPLIED_CHECK, RESET_APPLIED_CHECK, SET_CURRENT_FAVORITE_JOB, SET_NOTES, SET_VIEW_NOTE, RESET_VIEW_NOTE, SET_NEW_NOTE_JOB_ID, SET_CURRENT_NOTE, SET_VIEW_TODO, RESET_VIEW_TODO, SET_NEW_TODO_JOB_ID, SET_CURRENT_TODO, SET_TODOS, SET_CURRENT_APPLIED_JOB, SET_PREFERENCES, SET_CURRENT_PREFERENCE, SET_CURRENT_COUNTRY_ID, SET_CURRENT_STATE_ID, SET_CURRENT_CITY_ID, RESET_LOCATION_IDS, SET_VIEW_PERSONAL_INFO, RESET_VIEW_PERSONAL_INFO, SET_SKILLS, SET_VIEW_SKILLS, RESET_VIEW_SKILLS, SET_VIEW_MEMBERSHIPS, RESET_VIEW_MEMBERSHIPS, SET_MEMBERSHIPS, SET_VIEW_EMPLOYMENTS, RESET_VIEW_EMPLOYMENTS, SET_EMPLOYMENTS, SET_EDUCATIONS, SET_VIEW_EDUCATIONS, RESET_VIEW_EDUCATIONS, SET_VIEW_CERTIFICATIONS, RESET_VIEW_CERTIFICATIONS, SET_CERTIFICATIONS, SET_SHOW_SHARE_OPTIONS, RESET_SHOW_SHARE_OPTIONS, SET_CURRENT_SKILL, SET_CURRENT_MEMBERSHIP, SET_CURRENT_EMPLOYMENT, SET_CURRENT_EDUCATION, SET_CURRENT_CERTIFICATION, SET_APP_USER_LOCATION, SET_FROM_FAVORITE_JOBS, SET_FROM_APPLIED_JOBS, RESET_FROM_FAVORITE_AND_FROM_APPLIED_JOBS } from './actionTypes'
import axios from 'axios'
import Geocode from 'react-geocode'

//APP-WIDE STUFF
export const setAppUserLocation = (dispatch, Google_mapsAPIKey, push) => {
    console.log(dispatch, Google_mapsAPIKey)
    const queryConditions= { considerIp: true };

    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${Google_mapsAPIKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(queryConditions),
      })
      .then((response) => response.json())
      .then((data) => {
          let lat= data.location.lat
          let lng = data.location.lng
          Geocode.setApiKey(Google_mapsAPIKey)
          Geocode.fromLatLng(lat, lng).then(
            response => {
              let responseCity = response.results[0].address_components[2].long_name
              let responseState = response.results[0].address_components[5].long_name
            //   console.log(response, city, state)
              let userLocation = {city: responseCity, state: responseState}
              console.log(userLocation)
              dispatch({type: SET_APP_USER_LOCATION, payload: userLocation})
              push('/search-for-jobs')
            },
            error => {
              console.error(error);
            }
          )
      })
      .catch((error) => {
        console.error('Error:', error);
      })
}

export const resetLocations = (dispatch) => {
    dispatch({type: RESET_LOCATION_IDS})
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

export const resetAllView = (dispatch) => {
    dispatch({type: RESET_VIEW_CERTIFICATIONS})
    dispatch({type: RESET_VIEW_EDUCATIONS})
    dispatch({type: RESET_VIEW_EMPLOYMENTS})
    dispatch({type: RESET_VIEW_MEMBERSHIPS})
    dispatch({type: RESET_VIEW_SKILLS})
    dispatch({type: RESET_VIEW_PERSONAL_INFO})
}

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
            alert('')
        })
}

export const createUser = (user, push, dispatch) => {
    axios.post('http://localhost:3000/users', user)
    .then(r => {
        console.log(r.data)
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
        alert(`Welcome ${r.data.user.first_name}! Account was successfully created.`)
        push('/logged-in-options')        
    })
    .catch((error) =>{
        console.log('Error', error)
    })    
}

export const editUser = (user, push, dispatch, token) => {
    let config ={
        headers: {'Authorization': "bearer " + token}
    }
    axios.patch(`http://localhost:3000/users/${user.id}`, user, config)
    .then(returnedUser=> {
        dispatch({type: RESET_LOCATION_IDS})
        dispatch({type: SET_USER, payload: returnedUser.data})
        alert(`User details have been updated`)
        push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteUser = (user_id, dispatch, push) => {
    console.log(user_id)
    axios.delete(`http://localhost:3000/users/${user_id}`)
    .then(r => {
        alert('Account successfully deleted. Sorry to see you go.')
        dispatch({type: LOGOUT})
        push('/')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const logout = (props) =>{
    props.dispatch({type: LOGOUT})
    props.history.push('/')
}

export const setViewPersonalInfo = (dispatch) => {
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
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&PositionTitle=${title}&LocationName=${location}&RemunerationMinimumAmount=${minimumPay}`, {
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

export const searchJobsByTCS = (title, city, state, props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&PositionTitle=${title}&LocationName=${city},%20${state}`, {
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

export const searchJobsByPreference = (title, minimumPay, location, props, days) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&PositionTitle=${title}&LocationName=${location.city},%20${location.state}&RemunerationMinimumAmount=${minimumPay}&DatePosted=${days}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.history.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}

export const searchJobsByKeyword = (keyword, city, state, days, props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&DatePosted=${days}&LocationName=${city},%20${state}&Keyword=${keyword}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}

export const searchVetJobsNationwide = (props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&HiringPath=vet&DatePosted=30`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.history.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}

export const searchNearestVetJobs = (radius, state, days, city, props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&HiringPath=vet&DatePosted=${days}&Radius=${radius}&LocationName=${city},%20${state}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}

export const searchNearestJobs = (radius, state, days, city, props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&DatePosted=${days}&Radius=${radius}&LocationName=${city},%20${state}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
        props.dispatch({type: SET_JOBS_RETURNED_FROM_SEARCH, payload: json.SearchResult.SearchResultItems})
        props.push('/jobs-search-results')
    })
    .catch((error) =>{
        console.log('Error:', error)
    })
}

export const searchVetJobsByLocation = (state, days, city, props) =>{
    let host = 'data.usajobs.gov'
    let userAgent = props.myEmail
    let authKey = props.USAJobsAPIKey
    fetch(`https://data.usajobs.gov/api/search?ResultsPerPage=500&HiringPath=vet&DatePosted=${days}&LocationName=${city},%20${state}`, {
        method:'GET',
        headers: {
            "Host": host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
        }
    })
    .then(response => response.json())
    .then(json => {

        console.log(json.SearchResult.SearchResultItems)
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

export const setShowShareOptions = (dispatch) => {
    dispatch({type: SET_SHOW_SHARE_OPTIONS})
}

export const resetShowShareOptions = (dispatch) => {
    dispatch({type: RESET_SHOW_SHARE_OPTIONS})
}

export const setFromFavoriteJobs = (dispatch) => {
    dispatch({type: SET_FROM_FAVORITE_JOBS})
}

export const setFromAppliedJobs = (dispatch) => {
    dispatch({type: SET_FROM_APPLIED_JOBS})
}

export const resetFromFavoriteJobAndFromAppliedJob = (dispatch) => {
    dispatch({type: RESET_FROM_FAVORITE_AND_FROM_APPLIED_JOBS})
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
        props.fromAppliedJobs ? props.history.push('/applied-jobs') : props.history.push('/favorite-jobs')
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
        'favorite_key': false,
        user_id: job.user_id
        }
    axios.patch(`http://localhost:3000/jobs/${job.id}`, bodyParameters, config)
    .then(returnedJobs=> {
        props.dispatch({type: RESET_FAVORITE_CHECK})
        props.dispatch({type: SET_USER_JOBS, payload: returnedJobs.data.allUserJobs})
        alert(`${job.job_title} has been removed from your favorites`)
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
        props.fromFavoriteJobs ? props.push('/individual-favorite-job') : props.push('/individual-applied-job')
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
        {props.fromFavoriteJobs ?
            props.push('/individual-favorite-job')
            :
            props.push('/individual-applied-job')
        }
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const editNote = (note, props) => {  
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/notes/${note.id}`, note, config)
    .then(returnedNotes => {
        props.dispatch({type: SET_NOTES, payload: returnedNotes.data.userNotes})
        alert('Note successfully updated.')
        {props.fromFavoriteJobs ?
            props.push('/individual-favorite-job')
            :
            props.push('/individual-applied-job')
        }
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
    axios.patch(`http://localhost:3000/tasks/${todo.id}`, todo, config)
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

export const createPreference = (preference, props) => {
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
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
 
    axios.patch(`http://localhost:3000/preferences/${preference.id}`, preference, config)
    .then(returnedPreferences => {
        console.log(returnedPreferences)
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
    console.log(preference)
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

export const setCurrentSkill = (skill, dispatch) => {
    dispatch({type: SET_CURRENT_SKILL, payload: skill})
}

export const createSkill = (skill, props) => {
    axios.post('http://localhost:3000/skills', skill)
    .then(returnedSkills => {
        props.dispatch({type: SET_SKILLS, payload: returnedSkills.data})
        alert('Skill successfully created.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 
}

export const editSkill = (skill, props) => {   
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/skills/${skill.id}`, skill, config)
    .then(returnedSkills => {
        props.dispatch({type: SET_SKILLS, payload: returnedSkills.data})
        alert('Skill successfully updated.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteSkill = (skill, props) => {
    let config = { data:{
        user_id: skill.user_id
        }
    }
    axios.delete(`http://localhost:3000/skills/${skill.id}`, config)
    .then(returnedSkills => {
        props.dispatch({type: SET_SKILLS, payload: returnedSkills.data})
        alert('Skill successfully deleted.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

//MEMBERSHIPS STUFF
export const setViewMemberships = (dispatch) => {
    dispatch({type: SET_VIEW_MEMBERSHIPS})
}

export const resetViewMemberships = (dispatch) => {
    dispatch({type: RESET_VIEW_MEMBERSHIPS})
}

export const setCurrentMembership = (membership, dispatch) => {
    dispatch({type: SET_CURRENT_MEMBERSHIP, payload: membership})
}

export const createMembership = (membership, props) => {
    axios.post('http://localhost:3000/memberships', membership)
    .then(returnedMemberships => {
        props.dispatch({type: SET_MEMBERSHIPS, payload: returnedMemberships.data})
        alert('Membership successfully created.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 
}

export const editMembership = (membership, props) => {  
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/memberships/${membership.id}`, membership, config)
    .then(returnedMemberships => {
        props.dispatch({type: SET_MEMBERSHIPS, payload: returnedMemberships.data})
        alert('Membership successfully updated.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteMembership = (membership, props) => {
    let config = { data:{
        user_id: membership.user_id
        }
    }
    axios.delete(`http://localhost:3000/memberships/${membership.id}`, config)
    .then(returnedMemberships => {
        props.dispatch({type: SET_MEMBERSHIPS, payload: returnedMemberships.data})
        alert('Membership successfully deleted.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}


//EMPLOYMENTS STUFF
export const setViewEmployments = (dispatch) => {
    dispatch({type: SET_VIEW_EMPLOYMENTS})
}

export const resetViewEmployments = (dispatch) => {
    dispatch({type: RESET_VIEW_EMPLOYMENTS})
}

export const setCurrentEmployment = (employment, dispatch) => {
    dispatch({type: SET_CURRENT_EMPLOYMENT, payload: employment})
}

export const createEmployment = (employment, props) => {
    axios.post('http://localhost:3000/employments', employment)
    .then(returnedEmployments => {
        props.dispatch({type: SET_EMPLOYMENTS, payload: returnedEmployments.data})
        props.dispatch({type: RESET_LOCATION_IDS})
        alert('Employment successfully created.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 
}

export const editEmployment = (employment, props) => {  
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/employments/${employment.id}`, employment, config)
    .then(returnedEmployments => {
        props.dispatch({type: SET_EMPLOYMENTS, payload: returnedEmployments.data})
        props.dispatch({type: RESET_LOCATION_IDS})
        alert('Employment successfully updated.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteEmployment = (employment, props) => {
    let config = { data:{
        user_id: employment.user_id
        }
    }
    axios.delete(`http://localhost:3000/employments/${employment.id}`, config)
    .then(returnedEmployments => {
        props.dispatch({type: SET_EMPLOYMENTS, payload: returnedEmployments.data})
        alert('Employment successfully deleted.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

//EDUCATIONS STUFF
export const setViewEducations = (dispatch) => {
    dispatch({type: SET_VIEW_EDUCATIONS})
}

export const resetViewEducations = (dispatch) => {
    dispatch({type: RESET_VIEW_EDUCATIONS})
}

export const setCurrentEducation = (education, dispatch) => {
    dispatch({type: SET_CURRENT_EDUCATION, payload: education})
}

export const createEducation = (education, props) => {
    axios.post('http://localhost:3000/educations', education)
    .then(returnedEducations => {
        props.dispatch({type: SET_EDUCATIONS, payload: returnedEducations.data})
        props.dispatch({type: RESET_LOCATION_IDS})
        alert('Education successfully created.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 
}

export const editEducation = (education, props) => {  
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/educations/${education.id}`, education, config)
    .then(returnedEducations => {
        props.dispatch({type: SET_EDUCATIONS, payload: returnedEducations.data})
        props.dispatch({type: RESET_LOCATION_IDS})
        alert('Education successfully updated.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteEducation = (education, props) => {
    let config = { data:{
        user_id: education.user_id
        }
    }
    axios.delete(`http://localhost:3000/educations/${education.id}`, config)
    .then(returnedEducations => {
        props.dispatch({type: SET_EDUCATIONS, payload: returnedEducations.data})
        alert('Education item successfully deleted.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

//CERTIFICATIONS STUFF
export const setViewCertifications = (dispatch) => {
    dispatch({type: SET_VIEW_CERTIFICATIONS})
}

export const resetViewCertifications =(dispatch) => {
    dispatch({type: RESET_VIEW_CERTIFICATIONS})
}

export const setCurrentCertification = (certification, dispatch) => {
    dispatch({type: SET_CURRENT_CERTIFICATION, payload: certification})
}

export const createCertification = (certification, props) => {
    axios.post('http://localhost:3000/certifications', certification)
    .then(returnedCertifications => {
        props.dispatch({type: SET_CERTIFICATIONS, payload: returnedCertifications.data})
        alert('Certification successfully created.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    }) 
}

export const editCertification = (certification, props) => {  
    let config ={
        headers: {'Authorization': "bearer " + props.token}
    }
    axios.patch(`http://localhost:3000/certifications/${certification.id}`, certification, config)
    .then(returnedCertifications => {
        props.dispatch({type: SET_CERTIFICATIONS, payload: returnedCertifications.data})
        alert('Certification successfully updated.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}

export const deleteCertification = (certification, props) => {
    let config = { data:{
        user_id: certification.user_id
        }
    }
    axios.delete(`http://localhost:3000/certifications/${certification.id}`, config)
    .then(returnedCertifications => {
        props.dispatch({type: SET_CERTIFICATIONS, payload: returnedCertifications.data})
        alert('Certification item successfully deleted.')
        props.push('/user-profile')
    })
    .catch((error) =>{
        console.log('Error', error)
    })
}