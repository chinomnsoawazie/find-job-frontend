import React from 'react'
import {Route, withRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import AppEntryPoint from '../components/AppEntryPoint'
import { Login } from '../forms/Login'
import LoggedInOptions from '../components/LoggedInOptions'
import SearchEntryPoint from '../components/SearchEntryPoint'
import { SearchByTP } from '../forms/SearchByTP'
import JobsSearchResults from './JobsSearchResults'
import JobCard from '../cards/JobCard'
import DashBoard from './DashBoard'
import FavoriteJobs from './FavoriteJobs'
import UserJobCard from '../cards/UserJobCard'
import { CreateNote } from '../forms/CreateNote'
import EditNoteForm from '../forms/EditNoteForm'
import CreateToDo from '../forms/CreateToDo'
import EditToDoForm from '../forms/EditToDo'
import AppliedJobs from './AppliedJobs'
import UserAppliedJobCard from '../cards/UserAppliedJobCard'

const MainContainer = (props) => {
    return (
        <>
        <Switch>
            <Route exact path='/' render = { () => <AppEntryPoint />} />
            {/*USER STUFF*/}
            <Route exact path='/login' render = { () => <Login push={props.history.push} dispatch={props.dispatch}/>}/>
            <Route exact path='/logged-in-options' render = {() => <LoggedInOptions />} />
            <Route exact path='/dashboard' render = { () => <DashBoard />} />

            {/*JOB STUFF */}
            <Route exact path='/search-for-jobs' render = { () => <SearchEntryPoint push={props.history.push}/>} />
            <Route exact path='/search-by-tp' render = { () => <SearchByTP push={props.history.push} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/individual-job' render = { () => <JobCard  />} />
            <Route exact path='/jobs-search-results' render = { () => <JobsSearchResults push={props.history.push}  />} />
            <Route exact path='/favorite-jobs' render = {() => <FavoriteJobs />} />
            <Route exact path='/applied-jobs' render = { () => <AppliedJobs />} />
            <Route exact path='/individual-favorite-job' render = { () => <UserJobCard fromFavoriteJobs={true} />} />
            <Route exact path='/individual-applied-job' render = { () => <UserAppliedJobCard  fromAppliedJobs={true} />} />

            {/*NOTES STUFF */}
            <Route exact path='/create-note' render = { () => <CreateNote user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentFavoriteJobID={props.currentFavoriteJob.id}/>} />
            <Route exact path='/edit-note' render = { () => <EditNoteForm user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentNote={props.currentNote}/>} />

            {/*TODO STUFF */}
            <Route exact path='/create-todo' render = { () => <CreateToDo user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentFavoriteJobID={props.currentFavoriteJob.id}/>} />
            <Route exact path='/edit-todo' render = { () => <EditToDoForm user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentToDo={props.currentToDo}/>} />


        </Switch>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        user_id: state.allUserInfo.user_id,
        myEmail: state.allJobInfo.myEmail,
        USAJobsAPIKey: state.allJobInfo.USAJobsAPIKey,
        currentFavoriteJob: state.allJobInfo.currentFavoriteJob,
        currentNote: state.allNoteInfo.currentNote,
        currentToDo: state.allToDoInfo.currentToDo
    }
}

export default connect(mapStateToProps)(withRouter(MainContainer))