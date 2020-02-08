import React from 'react'
import JobCardNav from '../containers/JobCardNav'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


const JobCard = (props) => {

    const {favoriteAJob, user, loggedIn, resetShowFavJobsAndShowAppliedJobs} = props
    const job = props.currentJob

 
    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4>Job Title: {job.job_title}</h4>
            </div>

            <div className='row' >
                <div className='column job-card-row' >
                    <p><strong>Company:</strong> {job.company_name}</p> 
                </div>
                <div className='column job-card-row'>
                    <p><strong>State: </strong>{job.state} <strong>City:</strong> {job.city} <strong>Zip Code: </strong>{job.zipcode} </p>
                </div>
            </div>

            <div className='row' >
                <div className='column job-card-row'>
                    <p> <strong>Pay:</strong> ${job.pay}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Job Type:</strong> {job.job_type}</p>
                </div>
            </div>
            <div className='row' >
                <div className='column job-card-row'>
                   <p> <strong>Summary:</strong></p>
                </div>
                <div className='column'>
                    {job.intro}
                </div>
            </div>
            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Requirements:</strong></p>
                </div>
                <div className='column'>
                    {job.requirement}
                </div>
            </div>
            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Schedule:</strong></p>
                </div>
                <div className='column'>
                    {job.schedule}
                </div>
            </div>
            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Description:</strong></p>
                </div>
                <div className='column'>
                    {job.description}
                </div>
            </div>
            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Duties:</strong></p>
                </div>
                <div className='column'>
                    {job.duties}
                </div>
            </div>

            <div className='row'>
                <JobCardNav  favoriteAJob={favoriteAJob} user={user} loggedIn={loggedIn} job={job}/>
            </div>

            <div className='row'>
                {job.user_id ?
                <>
                    <button onClick = {() => props.history.push('/my-dashboard')} className='button'>Back to Dashboard</button>
                    <button className='button'>Back to All Jobs</button>
                    
                    //button below also needs to toggle favorite and applied
                    </>

                :
                    <button className='button'>Back to All Jobs</button>
                }
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        currentJob: state.allInfoOnJobs.currentJob
    }
}

export default connect(mapStateToProps)(withRouter(JobCard))

