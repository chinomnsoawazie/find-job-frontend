import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCityID, setCurrentCountryID, setCurrentStateID, createUser } from '../redux/actions'



export class CreateUser extends Component {
    state = {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        age: '',
        highest_education: '',
        years_of_experience: '',
        password: '',
        confirmPassword: ''
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
            return 'No country selected'
        }
    }

    displayNewState = (event) => {
        let newState = statesList.find(({id}) => id.toString() === this.props.currentStateID)        
        if(this.props.currentStateID){
            return newState.name
        }else{
            return 'No state selected'
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
            return 'No city selected'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.state.password === this.state.confirmPassword){
            let newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                username: this.state.username,
                email: this.state.email,
                age: this.state.age,
                highest_education: this.state.highest_education,
                years_of_experience: this.state.years_of_experience,
                password: this.state.password,
                country: this.displayNewCountry(),
                state: this.displayNewState(),
                city: this.displayNewCity()
            }
            createUser(newUser, this.props.push, this.props.dispatch)
        }else{
            alert('Passwords do not match. Make sure they do before account can be created')
        }
    }

    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Create Account</strong></h2>
                    <div className='row job-card-row'>
                        <label>
                            <strong>First name: </strong>
                        </label>
                        <input type='text'  value={this.state.first_name} name='first_name' onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Last name: </strong>
                        </label>
                        <input type='text' value={this.state.last_name} name='last_name' onChange={this.handleChange} required/><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Username: </strong>
                        </label>
                        <input type='text' value={this.state.username} name='username' onChange={this.handleChange} required/><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Email: </strong>
                        </label>
                        <input type='email' value={this.state.email} name='email' onChange={this.handleChange} required/><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Age: </strong>
                        </label>
                        <input type='number' value={this.state.age} name='age'  onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Highest education: </strong>
                        </label>

                        <select onChange={this.handleChange} name='highest_education' className='location-select'  required>
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
                            <strong>Years of experience: </strong>
                        </label>
                        <input type='number' value={this.state.years_of_experience} name='years_of_experience' onChange={this.handleChange} required/><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Country: </strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select' required>
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>State: </strong>
                        </label>{this.displayNewState()}
                        <select onChange={this.handleChangeState} className='location-select' required>
                            <option defaultValue='Select state'>change state</option>
                            {states.map(state => <option key={uuid()} value={state.id}>{state.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>City: </strong>
                        </label>{this.displayNewCity()}
                        <select onChange={this.handleChangeCity} className='location-select' required>
                            <option defaultValue='Select city'>change city</option>
                            {cities.length <= 0 ?
                                <option key={uuid()} value={'State has no city'}>State has no cities</option>
                                :
                                cities.map(city => <option key={uuid()} value={city.id}>{city.name}</option>)
                            }                        
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Password: </strong>
                        </label>
                        <input type='password' value={this.state.password} name='password'  onChange={this.handleChange} required /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Confirm password: </strong>
                        </label>
                        <input type='password' value={this.state.confirmPassword} name='confirmPassword'  onChange={this.handleChange} required />{this.state.password === this.state.confirmPassword ? 'Passwords match' :'Passwords do not match'}<br/>
                    </div><br/>
                    <input className='page-buttons' type="submit" value="Create account" />
                </form>
                <button className='page-buttons' onClick={() => this.props.push('/')}>Go to homepage</button>
            </div>
        )
    }
}

export default CreateUser
