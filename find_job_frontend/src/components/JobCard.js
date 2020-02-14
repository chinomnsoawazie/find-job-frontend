import React from 'react'
import JobCardNav from '../containers/JobCardNav'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const JobCard = (props) => {
    const job = props.currentJob

    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4><strong>Job Title: </strong>{job.job_title}</h4>
            </div>

            <div className='row' >
                <div className='column job-card-row' >
                    <p><strong>Organization:</strong> {job.organization_name}</p> 
                </div>
                <div className='column job-card-row'>
                    <p><strong>Location: </strong>{job.location}</p>
                </div>
            </div>

            <div className='row' >
                <div className='column job-card-row'>
                    <p> <strong>Min. pay:</strong> ${job.minimum_pay}</p>
                </div>
                <div className='column job-card-row'>
                    <p> <strong>Max. pay:</strong> ${job.maximum_pay}</p>
                </div>
                <div className='column job-card-row'>
                    <p> <strong>Pay period:</strong> ${job.pay_period}</p>
                </div>
            </div>

            <div className='row'>
                <div className='column job-card-row'>
                    <p><strong>Job Type:</strong> {job.job_type}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Hiring path: </strong> {job.hiring_path}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Job posting date:</strong> {job.job_posting_date}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Applications close date:</strong> {job.application_close_date}</p>
                </div>
            </div>

            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Schedule:</strong></p>
                </div>
                <div className='column'>
                    <p>{job.schedule}</p>
                </div>
            </div>

            <div className='row job-card-row'>
                <strong>Summary:</strong>
            </div>
            <div className='row'>
                <p>{job.employer_strongpoints}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Description:</strong>
            </div>
            <div className='row'>
                <p>{job.description}</p> 
            </div>
        
            <div className='row job-card-row'>
                <strong>Requirements:</strong>
            </div>
            <div className='row'>
                <p>{job.requirement}</p>
            </div>
          
            <div className='row'>
                <JobCardNav />
            </div>
           
            <div className='row'>
                {job.user_id ?
                <>
                    <button onClick = {() => props.history.push('/my-dashboard')} className='button'>Back to Dashboard</button>
                    <button onClick={props.history.push('/search-jobs-results')} className='button'>Back to All Jobs</button>
                </>
                :
                    <button onClick={() => props.history.push('/search-jobs-results')} className='button'>Back to All Jobs</button>
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

