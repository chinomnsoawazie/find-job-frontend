import React from 'react'
import {Route, withRouter, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import AppEntryPoint from '../components/AppEntryPoint'
import { Login } from '../forms/Login'
import LoggedInOptions from '../components/LoggedInOptions'
import SearchEntryPoint from '../components/SearchEntryPoint'

const MainContainer = (props) => {
    const {loggedIn} = props

    return (
        <>
        <Switch>
            <Route exact path='/' render = { () => <AppEntryPoint />} />
            {/*USER STUFF*/}
            <Route exact path='/login' render = { () => <Login push={props.history.push} dispatch={props.dispatch}/>}/>
            <Route exact path='/logged-in-options' render = {() => <LoggedInOptions />} />


            {/*JOB STUFF */}
            <Route exact path='/search-for-jobs' render = { () => <SearchEntryPoint />} />




            


        </Switch>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.allUserInfo.loggedIn
    }
}
export default connect(mapStateToProps)(withRouter(MainContainer))