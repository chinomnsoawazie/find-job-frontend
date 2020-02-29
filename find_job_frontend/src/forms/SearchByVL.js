import React, { Component } from 'react'
import { searchVetJobsByLocation } from '../redux/actions'

export class SearchByVL extends Component {
    state ={
        city: '',
        state: '',
        days: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let city = this.state.city
        let state = this.state.state
        let days = this.state.days
        searchVetJobsByLocation(state, days, city, this.props)
    }

    render() {
        return (
            <div className='logged-in-page'>
                <h2>Find Vet jobs by location</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>City:</strong>
                        </label>
                        <input type="text" name='city' placeholder='Eg.Buffalo' value={this.state.city} onChange={this.handleChange} />
                    </div><br/>
                    
                    <div className='row'>
                        <label>
                            <strong>State:</strong>
                        </label>
                        <input type="text" name='state' placeholder='Eg. New York' value={this.state.state} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Job posted how many days ago?:</strong>
                        </label>
                        <input type="number" name='days' placeholder='numbers only' value={this.state.days} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchByVL
