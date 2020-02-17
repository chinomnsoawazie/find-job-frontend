import React from 'react'
import AllJobsJobCard from '../components/AllJobsJobCard'
import {connect} from 'react-redux'

const AllJobs = (props) => {
    const {jobsReturnedFromSearch} = props

    return (
        
        <div className='job-card-div'>
            <div className='main-container'>
                {jobsReturnedFromSearch.map(job => <AllJobsJobCard key={job.usaJobs_job_id} job={job} push={props.push} dispatch={props.dispatch}/>)}    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jobsReturnedFromSearch: state.allInfoOnJobs.jobsReturnedFromSearch
    }
}

export default connect(mapStateToProps)(AllJobs)