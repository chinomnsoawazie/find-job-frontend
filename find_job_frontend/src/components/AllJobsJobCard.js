import React from 'react'
import {setCurrentJob} from '../redux/actions'

const AllJobsJobCard = (props) => {
    const {job} =props

    const viewJob = () => {
        setCurrentJob(job, props)
    }
   
    return (

        <div>
        {/*add a remove button later to remove a job from results */}
        {/* {console.log(job)} */}
            <div  className='row'><strong>Title: </strong> {job.job_title}</div>
                        <div  className='row job-card-row'><strong>Pay: </strong> ${job.pay}</div> 
                        <div  className='row job-card-row'><strong>Location: </strong> {job.city}, {job.state} </div>
                        <button onClick={viewJob} className='side-bar-button'>View Job</button>
        </div>
    )
}

export default AllJobsJobCard
