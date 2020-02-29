import React, { Component } from 'react'
import { searchJobsByKeyword } from '../redux/actions'

export class SearchByKL extends Component {
    state ={
        keyword: '',
        city: '',
        state: '',
        days: ''
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let keyword = this.state.keyword
        let city = this.state.city
        let state = this.state.state
        let days = this.state.days
        searchJobsByKeyword(keyword, city, state, days, this.props)
    }

    render() {
        return (
            <div className='logged-in-page'>
                <h2>Find jobs by keyword and location</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>keyword: </strong>
                        </label>
                        <input type="text" name='keyword' placeholder='Eg. software' value={this.state.keyword} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>City: </strong>
                        </label>
                        <input type="text" name='city' className='location' placeholder='Eg. Buffalo' value={this.state.city} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>State: </strong>
                        </label>
                        <input type="text" name='state' className='location' placeholder='New York' value={this.state.state} onChange={this.handleChange} />
                    </div><br/>

                    <div className='row'>
                        <label>
                            <strong>Jobs posted when?: </strong>
                        </label>
                        <input type="text" name='days' className='location' placeholder='numbers only' value={this.state.days} onChange={this.handleChange} /> days ago
                    </div><br/>

                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchByKL
