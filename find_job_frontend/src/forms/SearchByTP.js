import React, { Component } from 'react'
import {connect} from 'react-redux'
import { searchJobsByTP, logout } from '../redux/actions'
import Geocode from 'react-geocode'
export class SearchByTP extends Component {

    state ={
        minimumPay: '',
        title: '',
        location: '',

    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let minimumPay = this.state.minimumPay
        let title = this.state.title
        let location = this.state.location
        searchJobsByTP(title, minimumPay, location, this.props)
        // console.log(this.state.minimumPay, this.state.title, this.state.location)
    }

    getAddress = () =>{
        Geocode.setApiKey("AIzaSyDTYe3BNzMfrNt4NgWIfSnyax-awS9mq7U");
        Geocode.fromLatLng("39.4135", "-77.97927").then(
            response => {
              const address = response.results[0].address_components[7].long_name;
              console.log(address);
            },
            error => {
              console.error(error);
            }
          );

    }
    render() {
        return (
            <div className='entry-pg'>
                <button onClick={this.getAddress}>Get address</button>
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
                        <button className='login-buttons' type='submit' value='login'>Find jobs</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => { 
    return { 
        USAJobsAPIKey: state.allInfoOnJobs.USAJobsAPIKey,
        myEmail: state.allInfoOnJobs.myEmail
    }
}

export default connect(mapStateToProps)(SearchByTP)
