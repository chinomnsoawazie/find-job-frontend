import React from 'react'
import {connect} from 'react-redux'
import SearchResultsJobCard from '../cards/SearchResultsJobCard'

const JobsSearchResults = (props) => {
    const {jobsReturnedFromSearch} = props

    return (
        <div className='job-card-div'>
            <div className='main-container'>
                {jobsReturnedFromSearch.map(job => <SearchResultsJobCard key={job.usaJobs_job_id} job={job}/>)}    
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jobsReturnedFromSearch: state.allJobInfo.jobsReturnedFromSearch
    }
}

export default connect(mapStateToProps)(JobsSearchResults)