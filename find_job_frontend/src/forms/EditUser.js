import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCountryID, setCurrentStateID, setCurrentCityID, editUser} from '../redux/actions'

export class EditUser extends Component {
    state = {
        newFirstName: '',
        newLastName: '',
        newUsername: '',
        newEmail: '',
        newAge: '',
        newHighestEducation: '',
        newYearsOfExperience: '',
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleChangeCountry = (event) => {
        setCurrentCountryID(event.target.value, this.props.dispatch)
    }

    handleChangeState = (event) => {
        setCurrentStateID(event.target.value, this.props.dispatch)
    }

    handleChangeCity = (event) => {
        setCurrentCityID(event.target.value, this.props.dispatch)
    }

    displayNewCountry = (event) => {
        let newCountry = countriesList.find(({id}) => id.toString() === this.props.currentCountryID)
        if(this.props.currentCountryID){
            return newCountry.name
        }else{
            return 'No new country selected'
        }
    }

    displayNewState = (event) => {
        let newState = statesList.find(({id}) => id.toString() === this.props.currentStateID)        
        if(this.props.currentStateID){
            return newState.name
        }else{
            return 'No new state selected'
        }
    }

    displayNewCity = (event) => {
        let newCity = citiesList.find(({id}) => id.toString() === this.props.currentCityID)        
        if(this.props.currentCityID){
            if(newCity){
                return newCity.name
            }else{
                return 'State has no city'
            }
        }else{
            return 'No new city selected'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let newCountry = this.displayNewCountry() === 'No new country selected' ? this.props.currentUser.country : this.displayNewCountry()
        let newState = this.displayNewState() === 'No new state selected' ? this.props.currentUser.state : this.displayNewState()
        let newCity = this.displayNewCity() === 'No new city selected' ? this.props.currentUser.city : this.displayNewCity()
            let newUser = {
                id: this.props.currentUser.id,
                first_name: this.state.newFirstName || this.props.currentUser.first_name,
                last_name: this.state.newLastName || this.props.currentUser.last_name,
                username: this.state.newUsername || this.props.currentUser.username,
                email: this.state.newEmail || this.props.currentUser.email,
                age: this.state.newAge || this.props.currentUser.age,
                highest_education: this.state.newHighestEducation || this.props.currentUser.highest_education,
                years_of_experience: this.state.newYearsOfExperience || this.props.currentUser.years_of_experience,
                country: newCountry,
                state: newState,
                city: newCity
            }
            editUser(newUser, this.props.push, this.props.dispatch, this.props.token )
    }

    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        let user = this.props.currentUser
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit account details</strong></h2>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Current first name: </strong>
                        </label>{user.first_name}<br/>
                        <label>
                            <strong>New first name: </strong>
                        </label>
                        <input type='text'  value={this.state.newFirstName} name='newFirstName' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current last name: </strong>
                        </label>{user.last_name}<br/>
                        <label>
                            <strong>Last name: </strong>
                        </label>
                        <input type='text' value={this.state.newLastName} name='newLastName' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current username: </strong>
                        </label>{user.username}<br/>
                        <label>
                            <strong>New username: </strong>
                        </label>
                        <input type='text' value={this.state.newUsername} name='newUsername' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current email: </strong>
                        </label>{user.email}<br/>
                        <label>
                            <strong>New email: </strong>
                        </label>
                        <input type='newEmail' value={this.state.newEmail} name='newEmail' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current age: </strong>
                        </label>{user.age}<br/>
                        <label>
                            <strong>New age: </strong>
                        </label>
                        <input type='number' value={this.state.newAge} name='newAge'  onChange={this.handleChange}  /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current highest education: </strong>
                        </label>{user.highest_education}<br/>
                        <label>
                            <strong>New highest education: </strong>
                        </label>
                        <select onChange={this.handleChange} name='newHighestEducation' className='location-select'  >
                             <option defaultValue={'select'} >Select</option>
                            <option value={'GED'}>GED</option>
                            <option value={'Diploma'} >Diploma</option>
                            <option value={'Bachelors'} >Bachelors</option>
                            <option value={'Masters'} >Masters</option>
                            <option value={'Ph.D'} >Ph.D</option>
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current years of experience: </strong>
                        </label>{user.years_of_experience}<br/>
                        <label>
                            <strong>New years of experience: </strong>
                        </label>
                        <input type='number' value={this.state.newYearsOfExperience} name='newYearsOfExperience' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current country: </strong>
                        </label>{user.country}<br/>
                        <label>
                            <strong>New country: </strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select' >
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    {this.props.currentCountryID ? 
                    <div className='row job-card-row'>
                        <label>
                            <strong>Current state: </strong>
                        </label>{user.state}<br/>
                        <label>
                            <strong>New state: </strong>
                        </label>{this.displayNewState()}
                        <select onChange={this.handleChangeState} className='location-select' >
                            <option defaultValue='Select state'>change state</option>
                            {states.map(state => <option key={uuid()} value={state.id}>{state.name}</option>)}
                        </select>
                    </div>
                    :
                    null
                    }<br/>

                    {this.props.currentCountryID ? 
                        <div className='row job-card-row'>
                            <label>
                                <strong>Current city: </strong>
                            </label>{user.city}<br/>
                            <label>
                                <strong>New city: </strong>
                            </label>{this.displayNewCity()}
                            <select onChange={this.handleChangeCity} className='location-select' >
                                <option defaultValue='Select city'>change city</option>
                                {cities.length <= 0 ?
                                    <option key={uuid()} value={'State has no city'}>State has no cities</option>
                                    :
                                    cities.map(city => <option key={uuid()} value={city.id}>{city.name}</option>)
                                }
                            </select>
                        </div>
                        :
                        null
                    }<br/>

                    <input className='page-buttons' type="submit" value="Edit account" />
                </form>
                <button className='page-buttons' onClick={() => this.props.push('/user-profile')}>Go to profile</button>
            </div>
        )
    }
}

export default EditUser