import React from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {addNewJobToFavorites, addExistingJobToFavorites, resetFavoriteCheck, resetAppliedCheck, applyToExistingJob, applyToNewJob, setShowShareOptions, resetShowShareOptions} from '../redux/actions'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'
import {FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon} from 'react-share'

const JobCard = (props) => {

    const {userJobs, currentJob, loggedIn, user_id, favoriteCheck, appliedCheck, showShareOptions} = props

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

    const handleShare = (event) => {
        if(event.target.name === 'open-share'){
            setShowShareOptions(props.dispatch)
        }else{
            resetShowShareOptions(props.dispatch)
        }
    }

    const handleNonUserApply = () => {
        alert(`You have started applying to ${currentJob.job_title}. Please continue the application on the employer website that will open in new tab`)
        window.open(currentJob.url)
    }

    return (
        <div className='job-card-div'>
            <div className='row'>
                 <h4><strong>Job Title: </strong>{currentJob.job_title}</h4>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' >
                    <strong>Organization:</strong> {currentJob.organization_name}
                </div>
                <div className='column job-card-row'>
                    <strong>Location: </strong>{currentJob.location}
                </div>
            </div><br/>

            <div className='row columned-row' >
                <div className='column job-card-row'>
                    <strong>Min. pay: </strong>{currentJob.minimum_pay}
                </div>

                <div className='column job-card-row'>
                    <strong>Max. pay: </strong>{currentJob.maximum_pay}
                </div>

                <div className='column job-card-row'>
                    <strong>Pay period: </strong>{currentJob.pay_period}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row'>
                    <strong>Job type: </strong>{currentJob.job_type}
                </div>

                <div className='column job-card-row'>
                    <strong>Hiring path: </strong>{currentJob.hiring_path}
                </div>
            </div><br/>

            <div className='row columned-row'>
                <div className='column job-card-row'>
                    <strong>Job posting date: </strong>{currentJob.job_posting_date}
                </div>

                <div className='column job-card-row'>
                    <strong>Applications close date: </strong>{currentJob.application_close_date}
                </div>
            </div>

            <div className='row' >
                    <p><strong>Schedule: </strong>
                    {currentJob.schedule}</p>
            </div>

            <div className='row job-card-row'>
                <strong>Summary:</strong>
            </div>
            <div className='row'>
                {currentJob.employer_strongpoints}
            </div><br/>

            <div className='row job-card-row'>
                <strong>Description:</strong>
            </div>

            <div className='row'>
                {currentJob.description}
            </div><br/>
        
            <div className='row job-card-row'>
                <strong>Requirements:</strong>
            </div>
            <div className='row'>
                {currentJob.requirement}
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

                        {showShareOptions ?
                            <>
                           <div className='row'>
                                <button onClick={handleShare} name='close-share' >Close share options</button>
                            </div>        
                            <div className='row'>
                                <FacebookShareButton url={currentJob.url}><FacebookIcon size={25} round /></FacebookShareButton>
                                <LinkedinShareButton url={currentJob.url} ><LinkedinIcon size={25} round /> </LinkedinShareButton>
                                <TwitterShareButton url={currentJob.url} ><TwitterIcon size={25} round /> </TwitterShareButton>
                                <WhatsappShareButton url={currentJob.url} ><WhatsappIcon size={25} round /> </WhatsappShareButton>
                                <EmailShareButton url={currentJob.url} ><EmailIcon size={25} round/> </EmailShareButton>
                            </div>                            
                            </>
                            :
                            <button  onClick={handleShare} name='open-share'  className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                        }

                        {/* <FacebookShareButton url={currentJob.url} /> */}
                    </div>
                    :
                    <div className='row'>
                        <button  onClick={handleNonUserApply}   className='page-buttons'> <img src={applyIcon} height='11vh' alt='apply'/> Apply</button> 
                        {showShareOptions ?
                            <>
                            <div className='row'>
                                <button onClick={handleShare} name='close-share' >Close share options</button>
                            </div>        
                            <div className='row'>
                                <FacebookShareButton url={currentJob.url}><FacebookIcon size={25} round /></FacebookShareButton>
                                <LinkedinShareButton url={currentJob.url} ><LinkedinIcon size={25} round /> </LinkedinShareButton>
                                <TwitterShareButton url={currentJob.url} ><TwitterIcon size={25} round /> </TwitterShareButton>
                                <WhatsappShareButton url={currentJob.url} ><WhatsappIcon size={25} round /> </WhatsappShareButton>
                                <EmailShareButton url={currentJob.url} ><EmailIcon size={25} round/> </EmailShareButton>
                            </div>                            
                            </>
                            :
                            <button  onClick={handleShare}  name='open-share' className='page-buttons'> <img src={shareIcon} height='11vh' alt='share'/> Share</button> 
                        }
                    </div>
                }

            </div><br/>

            {loggedIn ?
                <>
                    <button onClick = {() => props.history.push('/dashboard')} className='page-buttons'>Go to Dashboard</button>
                    <button onClick={handleBackToSearchResultButton} className='page-buttons'>Back to search results</button>
                </>
                :
                <button onClick={() => props.history.push('/jobs-search-results')} className='page-buttons'>Back to search results</button>
            }
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        loggedIn: state.allUserInfo.loggedIn,
        showShareOptions: state.allJobInfo.showShareOptions,
        user_id: state.allUserInfo.user_id,
        userJobs: state.allJobInfo.userJobs,
        token: state.allUserInfo.token,
        currentJob: state.allJobInfo.currentJob,
        favoriteCheck: state.allJobInfo.favoriteCheck,
        appliedCheck: state.allJobInfo.appliedCheck,
    }
}

export default connect(mapStateToProps)(withRouter(JobCard))