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
import AllPreferences from './AllPreferences'
import PreferenceCard from '../cards/PreferenceCard'
import { EditPreference } from '../forms/EditPreference'
import CreatePreference from '../forms/CreatePreference'
import UserProfile from './UserProfile'
import CreateSkill from '../forms/CreateSkill'
import EditSkill from '../forms/EditSkill'
import CreateMembership from '../forms/CreateMembership'
import EditMembership from '../forms/EditMembership'
import CreateEmployment from '../forms/CreateEmployment'
import EditEmployment from '../forms/EditEmployment'
import CreateEducation from '../forms/CreateEducation'
import EditEducation from '../forms/EditEducation'
import CreateCertification from '../forms/CreateCertification'
import EditCertification from '../forms/EditCertification'
import CreateUser from '../forms/CreateUser'
import { EditUser } from '../forms/EditUser'
import SearchByV100 from '../forms/SearchByV100'
import SearchByTL from '../forms/SearchByTL'
import SearchByVL from '../forms/SearchByVL'
import SearchByKL from '../forms/SearchByKL'
import SearchByCurrentLocationAllJobs from '../forms/SearchByCurrentLocationAllJobs'

const MainContainer = (props) => {
    return (
        <>
        <Switch>
            <Route exact path='/' render = { () => <AppEntryPoint />} />
            {/*USER STUFF*/}
            <Route exact path='/login' render = { () => <Login push={props.history.push} dispatch={props.dispatch}/>}/>
            <Route exact path='/logged-in-options' render = {() => <LoggedInOptions />} />
            <Route exact path='/dashboard' render = { () => <DashBoard dispatch={props.dispatch}/>} />
            <Route exact path='/user-profile' render = { () => <UserProfile push={props.history.push}/>} />
            <Route exact path='/create-user' render = { () => <CreateUser dispatch={props.dispatch} push={props.history.push} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID}/>} />
            <Route exact path='/edit-user' render = { () => <EditUser token={props.token} currentUser={props.user} dispatch={props.dispatch} push={props.history.push} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID}/>} />

            {/*JOB STUFF */}
            <Route exact path='/favorite-jobs' render = {() => <FavoriteJobs push={props.history.push} />} />
            <Route exact path='/applied-jobs' render = { () => <AppliedJobs push={props.history.push} />} />
            <Route exact path='/individual-favorite-job' render = { () => <UserJobCard fromFavoriteJobs={props.fromFavoriteJobs} />} />
            <Route exact path='/individual-applied-job' render = { () => <UserAppliedJobCard  fromAppliedJobs={props.fromAppliedJobs} />} />
            <Route exact path='/individual-job' render = { () => <JobCard  />} />
            <Route exact path='/search-for-jobs' render = { () => <SearchEntryPoint push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} />} />
            <Route exact path='/search-by-tp' render = { () => <SearchByTP push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/search-by-vet100' render = { () => <SearchByV100 appUserLocation={props.appUserLocation} push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/search-by-tcs' render = { () => <SearchByTL push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/search-by-vetl' render = { () => <SearchByVL push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/search-by-kl' render = { () => <SearchByKL push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey} />} />
            <Route exact path='/search-by-general-nearby' render = { () => <SearchByCurrentLocationAllJobs appUserLocation={props.appUserLocation} push={props.history.push} Google_mapsAPIKey={props.Google_mapsAPIKey} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/jobs-search-results' render = { () => <JobsSearchResults push={props.history.push}  />} />

            {/*NOTES STUFF */}
            <Route exact path='/create-note' render = { () => <CreateNote fromFavoriteJobs={props.fromFavoriteJobs} fromAppliedJobs={props.fromAppliedJobs}  user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentFavoriteJobID={props.currentFavoriteJob.id}/>} />
            <Route exact path='/edit-note' render = { () => <EditNoteForm fromFavoriteJobs={props.fromFavoriteJobs} fromAppliedJobs={props.fromAppliedJobs}  user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentNote={props.currentNote}/>} />

            {/*TODO STUFF */}
            <Route exact path='/create-todo' render = { () => <CreateToDo fromFavoriteJobs={props.fromFavoriteJobs} fromAppliedJobs={props.fromAppliedJobs}  user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentFavoriteJobID={props.currentFavoriteJob.id}/>} />
            <Route exact path='/edit-todo' render = { () => <EditToDoForm fromFavoriteJobs={props.fromFavoriteJobs} fromAppliedJobs={props.fromAppliedJobs}  user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentToDo={props.currentToDo}/>} />

            {/*PREFERENCES STUFF */}
            <Route exact path='/all-preferences' render = { () => <AllPreferences push={props.history.push}/>} />
            <Route exact path='/individual-preference' render = { () => <PreferenceCard  dispatch={props.dispatch} currentPreference={props.currentPreference}/>} />
            <Route exact path='/edit-preference' render = { () => <EditPreference push={props.history.push}  currentPreference={props.currentPreference} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID} dispatch={props.dispatch}/>} />
            <Route exact path='/create-preference' render = { () => <CreatePreference user_id={props.user_id}  push={props.history.push} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID} dispatch={props.dispatch}/>} />

            {/*SKILLS STUFF */}
            <Route exact path='/create-skill' render = { () => <CreateSkill user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} />} />
            <Route exact path='/edit-skill' render = { () => <EditSkill push={props.history.push} dispatch={props.dispatch} currentSkill={props.currentSkill}/>} />

            {/*MEMBERSHIPS STUFF */}
            <Route exact path='/create-membership' render = { () => <CreateMembership user_id={props.user_id} dispatch={props.dispatch} push={props.history.push}/>} />
            <Route exact path='/edit-membership' render = { () => <EditMembership push={props.history.push} dispatch={props.dispatch} currentMembership={props.currentMembership}/>} />

            {/*EMPLOYMENTS STUFF */}
            <Route exact path='/create-employment' render = {() => <CreateEmployment user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID}/>} />
            <Route exact path='/edit-employment' render = { () => <EditEmployment push={props.history.push} dispatch={props.dispatch} currentEmployment={props.currentEmployment} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID} />} />

            {/*EDUCATIONS STUFF */}
            <Route exact path='/create-education' render = { () => <CreateEducation user_id={props.user_id} dispatch={props.dispatch} push={props.history.push} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID}/>} />
            <Route exact path='/edit-education' render = { () => <EditEducation  push={props.history.push} dispatch={props.dispatch} currentEducation={props.currentEducation} currentCountryID={props.currentCountryID} currentStateID={props.currentStateID} currentCityID={props.currentCityID} />} />

            {/*CERTIFICATIONS STUFF */}
            <Route exact path='/create-certification' render = { () => <CreateCertification  user_id={props.user_id} dispatch={props.dispatch} push={props.history.push}  />} />
            <Route exact path='/edit-certification' render = { () => <EditCertification push={props.history.push} dispatch={props.dispatch} currentCertification={props.currentCertification} /> } />
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
        currentToDo: state.allToDoInfo.currentToDo,
        currentPreference: state.allPreferenceInfo.currentPreference,
        currentCountryID: state.allPreferenceInfo.currentCountryID,
        currentStateID: state.allPreferenceInfo.currentStateID,
        currentCityID: state.allPreferenceInfo.currentCityID,
        currentSkill: state.allSkillInfo.currentSkill,
        currentMembership: state.allMembershipInfo.currentMembership,
        currentEmployment: state.allEmploymentInfo.currentEmployment,
        currentEducation: state.allEducationInfo.currentEducation,
        currentCertification: state.allCertificationInfo.currentCertification,
        user: state.allUserInfo.user,
        token: state.allUserInfo.token,
        Google_mapsAPIKey: state.allJobInfo.Google_mapsAPIKey,
        appUserLocation: state.allJobInfo.appUserLocation,
        fromFavoriteJobs: state.allJobInfo.fromFavoriteJobs,
        fromAppliedJobs: state.allJobInfo.fromAppliedJobs
    }
}

export default connect(mapStateToProps)(withRouter(MainContainer))