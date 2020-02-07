import React from 'react'
import ViewButton from '../buttons/ViewButton'

const AllJobsJobCard = (props) => {
    const {job} =props

    const viewButtonText = () => {
        return 'View Job'
    }

   const removeButtonText = () => {
        return 'Remove Job'
    }


   
    return (

        <div>
        {/*add a remove button later to remove a job from results */}
        {/* {console.log(job)} */}
            <div  className='row'><strong>Title: </strong> {job.job_title}</div>
                        <div  className='row job-card-row'><strong>Pay: </strong> ${job.pay}</div> 
                        <div  className='row job-card-row'><strong>Location: </strong> {job.city}, {job.state} </div>
                        <div  className='row'><ViewButton  key={job.id + 'view'} buttonText={viewButtonText()} showJob={props.showJob} job={props.job}/> </div>
        </div>
    )
}

export default AllJobsJobCard
