import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import AllJobs from './AllJobs'
import JobCard from '../components/JobCard'
import Apply from '../components/Apply'
import AllTODo from '../components/AllToDo'
import LoginForm from '../forms/LoginForm'
import EntryPoint from '../components/EntryPoint'
import SearchPage from '../components/SearchPage'
import LoggedInEntryOptions from '../components/LoggedInEntryOptions'
import SignUPForm from '../forms/SignUpForm'
import PersonalInfoCard from '../components/PersonalInfoCard'
import ProfileEntryPoint from '../components/ProfileEntryPoint'
import AllWorkHistory from './AllWorkHistory'
import AllEducationHistory from '../containers/AllEducationHistory'
import AllSkills from './AllSkills'
import AllMemberships from './AllMemberships'
import AllCertifications from './AllCertifications'
import MyDashBoard from './MyDashBoard'
import FavoriteJobs from './FavoriteJobs'

const PageMainContainer = (props) => {

    const {allJobs, userJobs, userSkills, userMemberships, userCertifications,
         userEmployments, userEducations, favoriteAJob, getUser, 
         searchResults, jobToShow, loggedIn, setJobSearchResults, showJob, user,
        toggleFromDashboard, fromDashboard, showFavoriteJobs, showAppliedJobs,
        resetShowFavJobsAndShowAppliedJobs} = props

    const monthDisplay = (monthNo) =>{

    
        

        if(monthNo === 1){
            return 'Jan'
        }else if(monthNo === 2){
            return 'Feb'
        }else if(monthNo === 3){
            return 'March'
        }else if(monthNo === 4){
            return 'April'
        }else if(monthNo === 5){
            return 'May'
        }else if(monthNo === 6){
            return 'June'
        }else if(monthNo === 7){
            return 'July'
        }else if(monthNo === 8){
            return 'Aug'
        }else if(monthNo === 9){
            return 'Sept'
        }else if(monthNo === 10){
            return 'Oct'
        }else if(monthNo === 11){
            return 'Nov'
        }else if(monthNo === 12){
            return 'Dec'
        }
    }

        return (
        <>
        <Switch>
            
            {/*App entry point */}
            <Route exact path='/'>
                <EntryPoint />
            </Route>

                        {/*JOBS */}

            <Route  path="/jobs/:id/apply">
                <Apply />
            </Route>

            <Route  path='/jobs/id/todos'>
                <AllTODo />
            </Route>

            <Route exact path='/favorite-jobs'>
                <FavoriteJobs/>
            </Route>


            {/*JobSearch*/}
            <Route exact path='/search-jobs'>
                <SearchPage loggedIn={loggedIn} allJobs={allJobs} setJobSearchResults={setJobSearchResults}/>
            </Route>

            <Route exact path='/search-jobs-results'>
                <AllJobs allJobs={searchResults} showJob={showJob}/>
            </Route>


            {/*Profile */}
            <Route exact path='/profile-entry-point'>
                <ProfileEntryPoint />
            </Route>

            <Route exact path='/profile-info'>
                <PersonalInfoCard user={user}/>
            </Route>

            <Route exact path='/profile-work-history'>
                <AllWorkHistory userEmployments={userEmployments} monthDisplay={monthDisplay}/>
            </Route>

            <Route exact path='/profile-education-history'>
                <AllEducationHistory userEducations={userEducations} monthDisplay={monthDisplay}/>
            </Route>

            <Route  exact path='/profile-skills'>
                <AllSkills userSkills={userSkills}/>
            </Route>

            <Route exact path='/profile-memberships'>
                <AllMemberships userMemberships={userMemberships} monthDisplay={monthDisplay}/>
            </Route>

            <Route exact path='/profile-certifications'>
                <AllCertifications userCertifications={userCertifications} monthDisplay={monthDisplay}/>
            </Route>



            {/*Login issues */}

            <Route  exact path='/login'>
              {loggedIn ?  <Redirect to="/logged-in-options" /> : <LoginForm  getUser={getUser}/>}  
            </Route>

            <Route exact path='/signup'>
                <SignUPForm getUser={getUser}/>
            </Route>


            <Route exact path='/logged-in-options'>
                <LoggedInEntryOptions user={user} />
            </Route>

            <Route  exact path="/jobs">
                <AllJobs allJobs={allJobs} showJob={showJob} />
            </Route>

            <Route exact path="/jobs/:id">
                <JobCard  user={user} favoriteAJob={favoriteAJob} loggedIn={loggedIn} job={jobToShow}
                fromDashboard={fromDashboard} resetShowFavJobsAndShowAppliedJobs={resetShowFavJobsAndShowAppliedJobs} />
            </Route>






            {/*My Dashboard */}

            <Route exact to='/my-dashboard'>
                <MyDashBoard toggleFromDashboard={toggleFromDashboard} showFavoriteJobs={showFavoriteJobs}
                showAppliedJobs={showAppliedJobs}/>
            </Route>





















        </Switch>
        </>
        )
    
}

export default PageMainContainer





