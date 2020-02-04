import React from 'react'
// import React, { Component } from 'react'
import JobCardNav from '../containers/JobCardNav'
import { withRouter, NavLink } from 'react-router-dom'


const JobCard = (props) => {

    const {job, favoriteAJob, user, loggedIn, fromDashboard, resetShowFavJobsAndShowAppliedJobs} = props

    const handleClick = () => {
        props.history.push('my-dashboard')
    }
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
                {fromDashboard ?

                <NavLink to='/my-dashboard'>

                    {/*button below also needs to toggle favorite and applied */}

                    <button onClick={handleClick} className='button'>Back to Dashboard</button>
                </NavLink>

                :
                <NavLink to='/jobs'>
                    <button className='button'>Back to All Jobs</button>
                </NavLink>
                }
            </div>
        </div>
    )
}

export default withRouter(JobCard) 

