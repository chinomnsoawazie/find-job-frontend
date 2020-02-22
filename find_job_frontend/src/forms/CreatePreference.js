import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { createPreference, setCurrentCityID, setCurrentCountryID, setCurrentStateID } from '../redux/actions'


export class CreatePreference extends Component {
    state = {
        name: '',
        country:'',
        state: '',
        city: '',
        city_population: '',
        min_pay: '',
        job_title: '',
        industry: '',
        posting_date_start: '',
        application_closing_date: ''
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
            return newCity.name
        }else{
            return 'No city selected'
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.displayNewCountry() === 'No country selected' || this.displayNewState() === 'No state selected' || this.displayNewCity() === 'No city selected'){
            alert('Please select country, state, and/or city')
        }else{
            let newPreference = {
                user_id: this.props.user_id,
                name: this.state.name,
                country: this.displayNewCountry(),
                state: this.displayNewState(),
                city: this.displayNewCity(),
                city_population: this.state.city_population,
                min_pay: this.state.min_pay,
                job_title: this.state.job_title,
                industry: this.state.industry,
                posting_date_start: this.state.posting_date_start,
                application_closing_date: this.state.application_closing_date
            }
            createPreference(newPreference, this.props)
        }
    }


    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Create preference</strong></h2>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Name:</strong>
                        </label>
                        <input type='text'  value={this.state.name} name='name' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job Title:</strong>
                        </label>
                        <input type='text' value={this.state.job_title} name='job_title' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Industry:</strong>
                        </label>
                        <input type='text' value={this.state.industry} name='industry' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Min. Pay:</strong>
                        </label>
                        <input type='number' value={this.state.min_pay} name='min_pay' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job posting start date:</strong>
                        </label>
                        <input type='date' value={this.state.posting_date_start} name='posting_date_start' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job application closing date:</strong>
                        </label>
                    </div>
                    <div className='row job-card-row'>
                        <input type='date' value={this.state.application_closing_date} min={todaysDate} name='application_closing_date'  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>City population:</strong>
                        </label>
                        <input type='number' value={this.state.city_population} name='city_population' onChange={this.handleChange} /><br/>
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Country:</strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select'>
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>State:</strong>
                        </label>{this.displayNewState()}
                        <select onChange={this.handleChangeState} className='location-select'>
                            <option defaultValue='Select state'>change state</option>
                            {states.map(state => <option key={uuid()} value={state.id}>{state.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>City:</strong>
                        </label>{this.displayNewCity()}
                        <select onChange={this.handleChangeCity} className='location-select'>
                            <option defaultValue='Select city'>change city</option>
                            {cities.map(city => <option key={uuid()} value={city.id}>{city.name}</option>)}
                        </select>
                    </div><br/>
                    <input className='page-buttons' type="submit" value="Create Preference" />
                </form>
                <button onClick = {() => this.props.push('/all-preferences')} className='page-buttons'>Back to preferences</button>
                <button className='page-buttons' onClick={() => this.props.push('/dashboard')}>Go to dashboard</button>
            </div>
        )
    }
}

export default CreatePreference