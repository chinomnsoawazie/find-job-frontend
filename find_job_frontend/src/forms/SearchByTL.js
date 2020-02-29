import React, { Component } from 'react'
import { searchJobsByTCS } from '../redux/actions'

export class SearchByTL extends Component {
    state ={
        title: '',
        city: '',
        state: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let title = this.state.title
        let city = this.state.city
        let state = this.state.state
        searchJobsByTCS(title, city, state, this.props)
    }

    render() {
        return (
            <div className='logged-in-page'>
                <h2>Find jobs by title and location</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>Title:</strong>
                        </label>
                        <input type="text" name='title' placeholder='Eg. Clerk, Engineer' value={this.state.title} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>City:</strong>
                        </label>
                        <input type="text" name='city' className='location' placeholder='Eg. Country, and/or State and/or City' value={this.state.city} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>State:</strong>
                        </label>
                        <input type="text" name='state' className='location' placeholder='Eg. Country, and/or State and/or City' value={this.state.state} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchByTL
