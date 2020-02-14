import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import applyIcon from '../pictures/applyIcon.png'
import favoriteIcon from '../pictures/favoriteIcon.png'
import shareIcon from '../pictures/shareIcon.png'
import {connect} from 'react-redux'
import {addNewJobToFavorites, addExistingJobToFavorites, applyToExistingJob, applyToNewJob} from '../redux/actions'
export class JobCardNav extends Component {
    state = {
        job: '',
        userJobs_USAJobIDs: []
    }

    componentDidMount() {
        let userJobsUSAJobsIDs = this.props.userJobs.map(job => job.usaJobs_job_id)
        this.setState({
            job: this.props.currentJob,
            userJobs_USAJobIDs: userJobsUSAJobsIDs
        })
    }

    handleApply = () => {
        // debugger
        if(this.state.userJobs_USAJobIDs.includes(this.state.job.usaJobs_job_id)){
            let job = this.state.job
            job.applied_key = true
            applyToExistingJob(job, this.props)
            this.componentDidMount()
        }else{
            let job = this.state.job
            job.user_id = this.props.user_id
            job.applied_key = true
            applyToNewJob(job, this.props)
            this.componentDidMount()
        }
    }

    handleFavoriting = () => {
        if(!this.state.userJobs_USAJobIDs.includes(this.state.job.usaJobs_job_id)){
                let job = this.state.job
                job.user_id = this.props.user_id
                job.favorite_key = true
                addNewJobToFavorites(job, this.props)
                this.componentDidMount()            
        }else{
            let job = this.state.job
                job.favorite_key = true
                addExistingJobToFavorites(job, this.props)
                this.componentDidMount()            

        }
    }

    applyButtonText = () => {
        // debugger 
        if(this.props.userJobs.map(job => job.usaJobs_job_id).includes(this.props.currentJob.usaJobs_job_id) && this.props.currentJob.applied_key){
            return true
        }else{
            return false
        }       
    }

    backToSearchButtonText = () => {
        return 'Remove Job'
    }
    render() {
        console.log('current job', this.props.currentJob, 'user jobs', this.props.userJobs, 'UserJobsIDs', this.props.userJobs.map(job => job.usaJobs_job_id), 'current job Id in user jobs ID?', (this.props.userJobs.map(job => job.usaJobs_job_id).includes(this.props.currentJob.usaJobs_job_id)), 'current job applied_key is', this.props.currentJob.applied_key)
        // console.log(this.props.userJobs.find(job => job.usaJobs_job_id === this.props.currentJob.usaJobs_job_id).applied_key)
        return (

            <>
                {this.props.loggedIn ? 
                    <div className='row'>
                        {!this.state.job.favorite_key ? 
                            <button onClick={this.handleFavoriting} className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/> Add to favorites </button>
                            :
                            <div className='column job-card-row'>
                                {/*change below so they can view in dashboard */}
                                <button className='job-card-button'> <img src={favoriteIcon} alt='add to favorites'/>Job already in favorites</button>
                            </div>
                        }

                        {(this.props.userJobs.map(job => job.usaJobs_job_id).includes(this.props.currentJob.usaJobs_job_id) && this.props.userJobs.find(job => job.usaJobs_job_id === this.props.currentJob.usaJobs_job_id).applied_key)? 
                            <div className='column job-card-row'>
                                <button className='job-card-button'> <img src={applyIcon} alt='add to favorites'/>Job already applied</button>
                            </div>  
                            :
                            <div className='column job-card-row'>
                            <button  onClick={this.handleApply}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                                {/*change below so they can view in dashboard */}
                            </div>
                        }

                        {/**use a conditional to show notes and Todo only if from dashboard (and then either favorites or applied
                         * ) do the switching of the 'from dashboard' while handling 'view job' from either favorites or applied jobs*/}
        
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> Notes</button> 
                                <select>
                                    <option value="add">Add</option>
                                    <option value="delete">Delete</option>
                                    <option value="update">Update</option>
                                </select>
                        </div>
        
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> ToDo</button> 
                            <select>
                                <option value="add">Add</option>
                                <option value="delete">Delete</option>
                                <option value="update">Update</option>
                            </select>
                        </div>
        
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                        </div> 
                    </div>
                    :
                    <div className='row'>
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> <img src={applyIcon} alt='apply'/> Apply</button> 
                        </div>  
                        <div className='column job-card-row'>
                            <button  onClick={this.handleClick}   className='job-card-button'> <img src={shareIcon} alt='apply'/> Share</button> 
                        </div> 
                    </div>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.allInfoOnUser.loggedIn,
        user_id: state.allInfoOnUser.user_id,
        userJobs: state.allInfoOnUser.userJobs,
        token: state.allInfoOnUser.token,
        currentJob: state.allInfoOnJobs.currentJob
    }
}

export default connect(mapStateToProps)(withRouter(JobCardNav))