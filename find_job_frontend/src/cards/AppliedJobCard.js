import React from 'react'
import {setFavoriteCheck, setCurrentAppliedJob} from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

const AppliedJobCard = (props) => {

    const {job, userJobs} = props

    const viewJob = (event) => {
        event.preventDefault()
        if(userJobs.map(userJob => userJob.usaJobs_job_id).includes((job.usaJobs_job_id)) && userJobs.find(foundJob => foundJob.usaJobs_job_id === job.usaJobs_job_id).favorite_key){
            setFavoriteCheck(props.dispatch)
            }
            setCurrentAppliedJob(job, props)
    }

    return (
        <div>
        {/*add filters */}
            <div  className='row job-card-row'><strong>Title: </strong> {job.job_title}</div>
            <div  className='row job-card-row'><strong>Min. pay: </strong> ${parseFloat(job.minimum_pay).toLocaleString()}</div> 
            <div  className='row job-card-row'><strong>Max. pay: </strong> ${parseFloat(job.maximum_pay).toLocaleString()}</div> 
            <div  className='row job-card-row'><strong>Location: </strong> {job.location} </div>
            <div className='row job-card-row'>
                <button onClick={viewJob} className='page-buttons'>View Job</button>
                <button onClick={() => props.history.push('/dashboard')} className='page-buttons'>Back to dashboard</button>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        userJobs: state.allJobInfo.userJobs,
    }
}

export default connect(mapStateToProps)(withRouter(AppliedJobCard))