import React from 'react'
import AllJobsJobCard from '../components/AllJobsJobCard'
import {connect} from 'react-redux'

const AllJobs = (props) => {
    const {jobsReturnedFromSearch, fromDashboard, showFavoriteJobs, showAppliedJobs, allJobs } = props

      
    const jobsToMap = () =>{
  
            if(fromDashboard && showFavoriteJobs){
                  return allJobs.filter(job => job.favorite_key === true)
              }else if(fromDashboard && showAppliedJobs){
                  return allJobs.filter(job => job.applied_key === true)
              }else{
                  return jobsReturnedFromSearch
              }
            }
    // console.log(jobsToMap(), showAppliedJobs, showFavoriteJobs)

    return (
        
        <div className='job-card-div'>
            <div className='main-container'>
                {jobsToMap().map(job => <AllJobsJobCard key={job.usaJobs_job_id} job={job} push={props.push} dispatch={props.dispatch} fromDashboard={fromDashboard}/>)}    
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
