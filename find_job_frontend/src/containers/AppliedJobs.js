import React from 'react'
import {connect} from 'react-redux'
import AppliedJobCard from '../cards/AppliedJobCard'

const AppliedJobs = (props) => {
    const {userJobs} = props

    const AppliedJobs = userJobs.filter(job => job.applied_key === true)

    return (
        <div className='job-card-div'>
            <div className='main-container'>
                {AppliedJobs.map(job => <AppliedJobCard key={job.usaJobs_job_id} job={job}/>)}    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userJobs: state.allJobInfo.userJobs
    }
}

export default connect(mapStateToProps)(AppliedJobs)