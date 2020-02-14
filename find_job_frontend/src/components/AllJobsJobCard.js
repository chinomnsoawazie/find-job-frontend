import React, { Component } from 'react'
import {setCurrentJob} from '../redux/actions'
import uuid from 'react-uuid'



export class AllJobsJobCard extends Component {

    state = {
        location: ''
    }

    viewJob = () => {
        if(this.state.location){
            let job = this.props.job
            job.location = this.state.location
            setCurrentJob(job, this.props)
        }else{
            alert('Please select a location')
        }
    }

    uniqueArray = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    handleChange = (event) => {
        this.setState({location: event.target.value})
    }    

    render() {
        let locations = this.props.job.locations.split('; ').filter(this.uniqueArray).reduce(function(s, a){s.push({name: a}); return s;},[])
        return (
            <div>
            {/*add filters */}
                <div  className='row'><strong>Title: </strong> {this.props.job.job_title}</div>
                <div  className='row job-card-row'><strong>Min. pay: </strong> ${this.props.job.minimum_pay}</div> 
                <div  className='row job-card-row'><strong>Max. pay: </strong> ${this.props.job.maximum_pay}</div> 
                <div  className='row job-card-row'><strong>No of Locations: </strong> {this.props.job.locations.split('; ').length} </div>
                <div className='row job-card-row'>
                    <button onClick={this.viewJob} className='side-bar-button'>View Job</button>
                <select value={this.state.location} onChange={this.handleChange} className='location-select'>
                    <option defaultValue=''>Select a location</option>
                    {locations.map(location => <option key={uuid()} value={location.name}>{location.name}</option>)}
                </select>
                    
                    </div> 
            </div>
        )
    }
}

export default AllJobsJobCard