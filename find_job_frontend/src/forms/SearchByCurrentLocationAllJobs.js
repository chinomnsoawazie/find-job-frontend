import React, { Component } from 'react'
import { searchNearestJobs } from '../redux/actions'

export class SearchByCurrentLocationAllJobs extends Component {

    state = {
        radius: '',
        days: ''
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let radius = this.state.radius
        let city = this.props.appUserLocation.city
        let state =this.props.appUserLocation.state
        let days = this.state.days
        searchNearestJobs(radius, state, days, city, this.props)
    }

    render() {
        console.log(this.props)
        return (
            <div className='logged-in-page'>
                <h2><strong>Find Nearest jobs</strong></h2>

                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>Radius (in miles): </strong>
                        </label><input name='radius' type='number' placeholder='numbers only' value={this.state.radius} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Posted when?: </strong>
                        </label><input name='days' type='number' placeholder='numbers only' value={this.state.days} onChange={this.handleChange} /> days ago.
                    </div><br/>

                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchByCurrentLocationAllJobs
