import React from 'react'
// import JobCardNav from '../containers/JobCardNav'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addNewJobToFavorites, addExistingJobToFavorites, applyToExistingJob, applyToNewJob, setCurrentJob} from '../redux/actions'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'


const JobCard = (props) => {

    const {userJobs, currentJob, loggedIn, user_id, appliedCheck, favoriteCheck} = props

    const handleUserApply = () => {
        let userJobsUSAJobsIDs = userJobs.map(job => job.usaJobs_job_id)
        if(userJobsUSAJobsIDs.includes(currentJob.usaJobs_job_id)){
            // setCurrentJob(currentJob, props)
            let job = userJobs.find(job => job.usaJobs_job_id === currentJob.usaJobs_job_id)
            applyToExistingJob(job, props)
        }else{
            // setCurrentJob(currentJob, props)
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

    const handleClick = () => {

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
                <div className='column job-card-row'>
                    <p> <strong>Min. pay:</strong> ${currentJob.minimum_pay}</p>
                </div>
                <div className='column job-card-row'>
                    <p> <strong>Max. pay:</strong> ${currentJob.maximum_pay}</p>
                </div>
                <div className='column job-card-row'>
                    <p> <strong>Pay period:</strong> ${currentJob.pay_period}</p>
                </div>
            </div>

            <div className='row'>
                <div className='column job-card-row'>
                    <p><strong>Job Type:</strong> {currentJob.job_type}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Hiring path: </strong> {currentJob.hiring_path}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Job posting date:</strong> {currentJob.job_posting_date}</p>
                </div>
                <div className='column job-card-row'>
                    <p><strong>Applications close date:</strong> {currentJob.application_close_date}</p>
                </div>
            </div>

            <div className='row' >
                <div className='column job-card-row'>
                    <p><strong>Schedule:</strong></p>
                </div>
                <div className='column'>
                    <p>{currentJob.schedule}</p>
                </div>
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
                {/* {userJobs.map(job => job.usaJobs_job_id).includes((currentJob.usaJobs_job_id)) && userJobs.find(job => job.usaJobs_job_id === currentJob.usaJobs_job_id).favorite_key ?  */}
                {favoriteCheck ? 
                    <div className='column job-card-row'>
                        <button className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/>Job already in favorites</button>
                    </div>
                    :
                    <div className='column job-card-row'>
                        <button onClick={handleFavoriting} className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/> Add to favorites </button>
                    </div>
                }

                {/* {userJobs.map(job => job.usaJobs_job_id).includes((currentJob.usaJobs_job_id)) && userJobs.find(job => job.usaJobs_job_id === currentJob.usaJobs_job_id).applied_key ?  */}
                {appliedCheck ? 

                    <div className='column job-card-row'>
                        <button className='job-card-button'> <img src={applyIcon} alt='add to favorites'/>Job already applied to</button>
                    </div>  
                    :
                    <div className='column job-card-row'>
                        <button  onClick={handleUserApply}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                    </div>
                }

                {/**use a conditional to show notes and Todo only if from dashboard (and then either favorites or applied
                 * ) do the switching of the 'from dashboard' while handling 'view job' from either favorites or applied jobs*/}

                {/* notes and todos should only show in jobs viewed from dashboard
                <div className='column job-card-row'>
                    <button  onClick={handleClick}   className='job-card-button'> Notes</button> 
                        <select>
                            <option value="add">Add</option>
                            <option value="delete">Delete</option>
                            <option value="update">Update</option>
                        </select>
                </div>

                <div className='column job-card-row'>
                    <button  onClick={handleClick}   className='job-card-button'> ToDo</button> 
                    <select>
                        <option value="add">Add</option>
                        <option value="delete">Delete</option>
                        <option value="update">Update</option>
                    </select>
                </div> */}

                <div className='column job-card-row'>
                    <button  onClick={handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                </div> 
            </div>
            :
            <div className='row'>
                <div className='column job-card-row'>
                    <button  onClick={handleClick}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                </div>  
                <div className='column job-card-row'>
                    <button  onClick={handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                </div> 
            </div>
        }
    
            </div>

            <div className='row'>
                {loggedIn ?
                <>
                    <button onClick = {() => props.history.push('/my-dashboard')} className='button'>Back to Dashboard</button>
                    <button onClick={props.history.push('/search-jobs-results')} className='button'>Back to search results</button>
                </>
                :
                    <button onClick={() => props.history.push('/search-jobs-results')} className='button'>Back to search results</button>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.allInfoOnUser.loggedIn,
        user_id: state.allInfoOnUser.user_id,
        userJobs: state.allInfoOnUser.userJobs,
        token: state.allInfoOnUser.token,
        currentJob: state.allInfoOnJobs.currentJob,
        appliedCheck: state.allInfoOnJobs.appliedCheck,
        favoriteCheck: state.allInfoOnJobs.favoriteCheck
    }
}

export default connect(mapStateToProps)(withRouter(JobCard))

