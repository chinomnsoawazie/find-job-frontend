import React from 'react'
import AllJobsJobCard from '../components/AllJobsJobCard'

const AllJobs = (props) => {
    const {allJobs, fromDashboard, showFavoriteJobs, showAppliedJobs, showJob } = props

      
    const jobsToMap = () =>{
  
            if(fromDashboard && showFavoriteJobs){
                  return allJobs.filter(job => job.favorite_key === true)
              }else if(fromDashboard && showAppliedJobs){
                  return allJobs.filter(job => job.applied_key === true)
              }else{
                  return allJobs
              }
            }
    console.log(jobsToMap(), showAppliedJobs, showFavoriteJobs)

    return (
        
        <div className='job-card-div'>
            <div className='main-container'>
                {jobsToMap().map(job => <AllJobsJobCard key={job.id + 'view'} job={job} fromDashboard={fromDashboard} showJob={showJob}/>)}    
            </div>
        </div>
    )
}

export default AllJobs
