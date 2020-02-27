import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCountryID, setCurrentStateID, setCurrentCityID, editPreference} from '../redux/actions'

export class EditPreference extends Component {
    state = {
        newName: '',
        newJobTitle: '',
        newMinPay: '',
        newPostStartDate: '',
        newApplicationClosingDate: '',
        newCityPopulation: '',
        newIndustry: ''
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
        let newCountry = this.displayNewCountry() === 'No new country selected' ? this.props.currentPreference.country : this.displayNewCountry()
        let newState = this.displayNewState() === 'No new state selected' ? this.props.currentPreference.state : this.displayNewState()
        let newCity = this.displayNewCity() === 'No new city selected' ? this.props.currentPreference.city : this.displayNewCity()
            let changedPreference = {
                id: this.props.currentPreference.id,
                user_id: this.props.currentPreference.user_id,
                name: this.state.newName || this.props.currentPreference.name,
                country: newCountry || this.props.currentPreference.country,
                state: newState || this.props.currentPreference.state,
                city: newCity || this.props.currentPreference.city,
                city_population: this.state.newCityPopulation || this.props.currentPreference.city_population,
                min_pay: this.state.newMinPay || this.props.currentPreference.min_pay,
                job_title: this.state.newJobTitle || this.props.currentPreference.job_title,
                industry: this.state.newIndustry || this.props.currentPreference.industry,
                posting_date_start: this.state.newPostStartDate || this.props.currentPreference.posting_date_start,
                application_closing_date: this.state.newApplicationClosingDate || this.props.currentPreference.application_closing_date,
            }
            editPreference(changedPreference, this.props)
    }
    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        let preference = this.props.currentPreference
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit preference</strong></h2>
                    <p>You can <strong><u>leave old values</u></strong>, or <strong><u>change</u> </strong>them</p>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Name: </strong>
                        </label>
                        <input type='text'  defaultValue={preference.name} name='newName' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job Title: </strong>
                        </label>
                        <input type='text' defaultValue={preference.job_title} name='newJobTitle' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Industry: </strong>
                        </label>
                        <input type='text' defaultValue={preference.industry} name='newIndustry' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Min. Pay: </strong>
                        </label>
                        <input type='number' defaultValue={preference.min_pay} name='newMinPay' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job posting start date: </strong>
                        </label>
                        <input type='date' defaultValue={preference.posting_date_start} name='newPostStartDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job application closing date: </strong>
                        </label>
                        <input type='date' defaultValue={preference.application_closing_date} min={todaysDate} name='newApplicationClosingDate'  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>City population: </strong>
                        </label>
                        <input type='number' defaultValue={preference.city_population} name='newCityPopulation' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current preference country: </strong>
                        </label>{preference.country}
                    </div>
                    <div className='row job-card-row'>
                        <label>
                            <strong>New selected country: </strong>
                        </label>{this.displayNewCountry()} 
                        <select onChange={this.handleChangeCountry} className='location-select'>
                            <option defaultValue='Select country'>change country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current preference state: </strong>
                        </label>{preference.state}
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>New selected state: </strong>
                        </label>
                        {this.displayNewState()}
                        <select onChange={this.handleChangeState} className='location-select'>
                            <option defaultValue='Select state'>change state</option>
                            {states.map(state => <option key={uuid()} value={state.id}>{state.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current preference city: </strong>
                        </label>{preference.city}
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>New selected city: </strong>
                        </label>
                        {this.displayNewCity()}
                        <select onChange={this.handleChangeCity} className='location-select'>
                            <option defaultValue='Select city'>change city</option>
                            {cities.length <= 0 ?
                                <option key={uuid()} value={'State has no city'}>State has no cities</option>
                                :
                                cities.map(city => <option key={uuid()} value={city.id}>{city.name}</option>)
                            }
                        </select>
                    </div><br/>
                    <input className='page-buttons' type="submit" value="Edit Preference" />
                </form>
                <button onClick = {() => this.props.push('/individual-preference')} className='page-buttons'>Back to preference</button>
                <button className='page-buttons' onClick={() => this.props.push('/dashboard')}>Go to dashboard</button>
            </div>
        )
    }
}

export default EditPreference