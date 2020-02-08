import React from 'react'
import {connect} from 'react-redux'
import AllJobsJobCard from '../components/AllJobsJobCard'

const FavoriteJobs = (props) => {
    console.log(props)
    return (
        <>
            {props.userJobs.map(job => <AllJobsJobCard key={job.id} fromDashboard={true} job={job} push={props.push} dispatch={props.dispatch}/>)}    
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userJobs: state.allInfoOnUser.userJobs
    }
}

export default connect(mapStateToProps)(FavoriteJobs)