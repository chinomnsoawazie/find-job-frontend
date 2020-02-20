import React from 'react'
import {setCurrentFavoriteJob, setAppliedCheck} from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const FavoritesJobCard = (props) => {

    const {job, userJobs} = props

    const viewJob = (event) => {
        event.preventDefault()
        if(userJobs.map(userJob => userJob.usaJobs_job_id).includes((job.usaJobs_job_id)) && userJobs.find(foundJob => foundJob.usaJobs_job_id === job.usaJobs_job_id).applied_key){
                setAppliedCheck(props.dispatch)
            }
        setCurrentFavoriteJob(job, props)
    }

    return (
        <div>
        {/*add filters */}
            <div  className='row job-card-row'><strong>Title: </strong> {job.job_title}</div>
            <div  className='row job-card-row'><strong>Min. pay: </strong> ${job.minimum_pay}</div> 
            <div  className='row job-card-row'><strong>Max. pay: </strong> ${job.maximum_pay}</div> 
            <div  className='row job-card-row'><strong>Location: </strong> {job.location} </div>
            <div className='row job-card-row'>
                <button onClick={viewJob} className='page-buttons'>View Job</button>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userJobs: state.allUserInfo.userJobs,
    }
}

export default connect(mapStateToProps)(withRouter(FavoritesJobCard))