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

const MainContainer = (props) => {
    return (
        <>
        <Switch>
            <Route exact path='/' render = { () => <AppEntryPoint />} />
            {/*USER STUFF*/}
            <Route exact path='/login' render = { () => <Login push={props.history.push} dispatch={props.dispatch}/>}/>
            <Route exact path='/logged-in-options' render = {() => <LoggedInOptions />} />

            {/*JOB STUFF */}
            <Route exact path='/search-for-jobs' render = { () => <SearchEntryPoint push={props.history.push}/>} />
            <Route exact path='/search-by-tp' render = { () => <SearchByTP push={props.history.push} dispatch={props.dispatch} myEmail={props.myEmail} USAJobsAPIKey={props.USAJobsAPIKey}/>} />
            <Route exact path='/individual-job' render = { () => <JobCard  />} />
            <Route exact path='/jobs-search-results' render = { () => <JobsSearchResults push={props.history.push}  />} />


        </Switch>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        myEmail: state.allJobInfo.myEmail,
        USAJobsAPIKey: state.allJobInfo.USAJobsAPIKey
    }
}

export default connect(mapStateToProps)(withRouter(MainContainer))