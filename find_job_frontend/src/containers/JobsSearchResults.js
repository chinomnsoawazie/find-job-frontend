import React from 'react'
import {connect} from 'react-redux'
import SearchResultsJobCard from '../cards/SearchResultsJobCard'

const JobsSearchResults = (props) => {
    const {jobsReturnedFromSearch} = props

    return (
        <div className='job-card-div'>
            <div className='main-container'>
                {jobsReturnedFromSearch.length < 1 ?
                <>
                <p>There are no results for the search terms or preference you used. Modify the preference or start a new search</p><br/>
                <button onClick = {() => props.push('/all-preferences')} className='page-buttons'>Back to preferences</button><br/>
                <button onClick = {() => props.push('/search-for-jobs')} className='page-buttons'>Start new search</button>
                </>
                :
                jobsReturnedFromSearch.map(job => <SearchResultsJobCard key={job.usaJobs_job_id} job={job}/>)  
            }
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