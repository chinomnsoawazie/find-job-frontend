import React, { Component } from 'react'
import { searchJobsByTP} from '../redux/actions'

export class SearchByTP extends Component {

    state ={
        minimumPay: '',
        title: '',
        location: '',
    }

    handleChange = (event) =>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let minimumPay = this.state.minimumPay
        let title = this.state.title
        let location = this.state.location
        searchJobsByTP(title, minimumPay, location, this.props)
    }

    render() {
        return (
            <div className='logged-in-page'>
                <form onSubmit={this.handleSubmit}>
                    <div className='row'>
                        <label>
                            <strong>Title:</strong>
                        </label>
                    </div>
                    
                    <div className='row'>
                        <input type="text" name='title' placeholder='Eg. Clerk, Engineer' value={this.state.title} onChange={this.handleChange} />
                    </div>
                    
                    <div className='row'>
                        <label>
                            <strong>Minimum pay:</strong>
                        </label>
                    </div>
                    
                    <div className='row'>
                        $<input name='minimumPay' type='number' placeholder='type in numbers only' value={this.state.minimumPay} onChange={this.handleChange} />
                    </div>
                    <div className='row'>
                        <label>
                            <strong>Location:</strong>
                        </label>
                    </div>
                    
                    <div className='row'>
                        <input type="text" name='location' className='location' placeholder='Eg. Country, and/or State and/or City' value={this.state.location} onChange={this.handleChange} />
                    </div><br/>


                    
                    <div className='row'>
                        <button className='page-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchByTP