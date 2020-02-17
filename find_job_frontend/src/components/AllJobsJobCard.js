import React from 'react'
import {setCurrentJob, setFavoriteCheck, setAppliedCheck} from '../redux/actions'
import uuid from 'react-uuid'
import {connect} from 'react-redux'





const AllJobsJobCard = (props) => {

    const {job, userJobs} = props
   
   
    const viewJob = (event) => {
        event.preventDefault()
        if(event.target.children[0].value === 'Select a location'){
            alert('Please select a location')
        }else{
            // let job = props.job
          if(userJobs.map(userJob => userJob.usaJobs_job_id).includes((job.usaJobs_job_id)) && userJobs.find(foundJob => foundJob.usaJobs_job_id === job.usaJobs_job_id).favorite_key){
              setFavoriteCheck(props)
            }
        if(userJobs.map(userJob => userJob.usaJobs_job_id).includes((job.usaJobs_job_id)) && userJobs.find(foundJob => foundJob.usaJobs_job_id === job.usaJobs_job_id).applied_key){
                setAppliedCheck(props)
            }

            console.log(event.target.children[0].value)
                job.location = event.target.children[0].value
                console.log(job)
                setCurrentJob(job, props)
    
        }
    }
    
    const uniqueArray = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    
    
    const locations = job.locations.split('; ').filter(uniqueArray).reduce(function(s, a){s.push({name: a}); return s;},[])
    return (
        <div>
        {/*add filters */}
            <div  className='row'><strong>Title: </strong> {job.job_title}</div>
            <div  className='row job-card-row'><strong>Min. pay: </strong> ${job.minimum_pay}</div> 
            <div  className='row job-card-row'><strong>Max. pay: </strong> ${job.maximum_pay}</div> 
            <div  className='row job-card-row'><strong>No of Locations: </strong> {job.locations.split('; ').length} </div>
            <div className='row job-card-row'>


            <form onSubmit={viewJob}>

                <select className='location-select'>
                    <option defaultValue='Select a location'>Select a location</option>
                    {locations.map(location => <option key={uuid()} value={location.name}>{location.name}</option>)}
                </select>
    
                <input type="submit" className='button' value="View" />
            </form>



                {/* <button onClick={this.viewJob} className='side-bar-button'>View Job</button>
            <select value={this.state.location} onChange={this.handleChange} className='location-select'>
                <option defaultValue=''>Select a location</option>
                {locations.map(location => <option key={uuid()} value={location.name}>{location.name}</option>)}
            </select>
                 */}
                </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        user_id: state.allInfoOnUser.user_id,
        userJobs: state.allInfoOnUser.userJobs,

    }
}

export default connect(mapStateToProps)(AllJobsJobCard)