import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addNewJobToFavorites, addExistingJobToFavorites, resetFavoriteCheck, resetAppliedCheck, applyToExistingJob, applyToNewJob} from '../redux/actions'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'

const JobCard = (props) => {

    const {userJobs, currentJob, loggedIn, user_id, favoriteCheck, appliedCheck} = props

    const handleUserApply = () => {
        let userJobsUSAJobsIDs = userJobs.map(job => job.usaJobs_job_id)
        if(userJobsUSAJobsIDs.includes(currentJob.usaJobs_job_id)){
            let job = userJobs.find(job => job.usaJobs_job_id === currentJob.usaJobs_job_id)
            applyToExistingJob(job, props)
        }else{
            let job = currentJob
            job.user_id = user_id
            job.applied_key = true
            applyToNewJob(job, props)
        }
    }

    const handleFavoriting = () => {
            let userJobsUSAJobsIDs = userJobs.map(job => job.usaJobs_job_id)
        if(userJobsUSAJobsIDs.includes(currentJob.usaJobs_job_id)){
            let job = userJobs.find(job => job.usaJobs_job_id === currentJob.usaJobs_job_id)
            addExistingJobToFavorites(job, props)
        }else{
            let job = currentJob
            job.user_id = user_id
            job.favorite_key = true
            addNewJobToFavorites(job, props)
        }
    }

    const handleBackToSearchResultButton = () => {
        resetFavoriteCheck(props.dispatch)
        resetAppliedCheck(props.dispatch)
        props.history.push('/jobs-search-results')
    }

    const handleShare = () => {
        console.log('clicked')
    }

    const handleNonUserApply = () => {
        console.log('clicked')
    }

    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4><strong>Job Title: </strong>{currentJob.job_title}</h4>
            </div>

            <div className='row' >
                <div className='column job-card-row' >
                    <p><strong>Organization:</strong> {currentJob.organization_name}</p> 
                </div>
                <div className='column job-card-row'>
                    <p><strong>Location: </strong>{currentJob.location}</p>
                </div>
            </div>

            <div className='row' >
                <p> <strong>Min. pay:</strong> ${currentJob.minimum_pay}::
                <strong>Max. pay:</strong> ${currentJob.maximum_pay}::
                <strong>Pay period:</strong> ${currentJob.pay_period}</p>
            </div>

            <div className='row'>
                <p><strong>Job Type:</strong> {currentJob.job_type}::
                <strong>Hiring path: </strong> {currentJob.hiring_path}</p>
            </div>

            <div className='row'>
                <p><strong>Job posting date:</strong> {currentJob.job_posting_date}::
                <strong>Applications close date:</strong> {currentJob.application_close_date}</p>
            </div>

            <div className='row' >
                    <p><strong>Schedule:</strong>::
                    {currentJob.schedule}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Summary:</strong>
            </div>
            <div className='row'>
                <p>{currentJob.employer_strongpoints}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Description:</strong>
            </div>

            <div className='row'>
                <p>{currentJob.description}</p> 
            </div>
        
            <div className='row job-card-row'>
                <strong>Requirements:</strong>
            </div>
            <div className='row'>
                <p>{currentJob.requirement}</p>
            </div>
            

            <div className='row'>
                {loggedIn ? 
                    <div className='row'>
                        {favoriteCheck ? 
                            <button className='page-buttons'> <img src={favoriteIcon} height='11vh' alt='already in favorites'/>Job already in favorites</button>
                            :
                            <button onClick={handleFavoriting} className='page-buttons'> <img src={favoriteIcon} height='11vh' alt='add to favorites'/> Add to favorites </button>
                        }

                        {appliedCheck ? 
                            <button className='page-buttons'> <img src={applyIcon} height='11vh' alt='add to favorites'/>Job already applied to. View in Dashboard</button>
                            :
                            <button  onClick={handleUserApply}   className='page-buttons'> <img src={applyIcon} height='11vh' alt='apply'/> Apply</button> 
                        }
                        <button  onClick={handleShare}   className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                    </div>
                    :
                    <>
                        <button  onClick={handleNonUserApply}   className='page-buttons'> <img src={applyIcon} height='11vh' alt='apply'/> Apply</button> 
                        <button  onClick={handleShare}   className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                    </>
                }
            </div>

            {loggedIn ?
                <>
                    <button onClick = {() => props.history.push('/dashboard')} className='page-buttons'>Go to Dashboard</button>
                    <button onClick={handleBackToSearchResultButton} className='page-buttons'>Back to search results</button>
                </>
                :
                <button  className='page-buttons'>Back to search results</button>
            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.allUserInfo.loggedIn,
        user_id: state.allUserInfo.user_id,
        userJobs: state.allUserInfo.userJobs,
        token: state.allUserInfo.token,
        currentJob: state.allJobInfo.currentJob,
        favoriteCheck: state.allJobInfo.favoriteCheck,
        appliedCheck: state.allJobInfo.appliedCheck
    }
}

export default connect(mapStateToProps)(withRouter(JobCard))