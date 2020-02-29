import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCountryID, setCurrentStateID, setCurrentCityID, editPreference, resetLocations} from '../redux/actions'

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
                country: newCountry,
                state: newState,
                city: newCity,
                city_population: this.state.newCityPopulation || this.props.currentPreference.city_population,
                min_pay: this.state.newMinPay || this.props.currentPreference.min_pay,
                job_title: this.state.newJobTitle || this.props.currentPreference.job_title,
                industry: this.state.newIndustry || this.props.currentPreference.industry,
                posting_date_start: this.state.newPostStartDate || this.props.currentPreference.posting_date_start,
                application_closing_date: this.state.newApplicationClosingDate || this.props.currentPreference.application_closing_date,
            }
            editPreference(changedPreference, this.props)
    }

    handleBackToPreferences = () => {
        resetLocations(this.props.dispatch)
        this.props.push('/individual-preference')
    }

    handleBackToDashboard = () => {
        resetLocations(this.props.dispatch)
        this.props.push('/dashboard')
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
                    <div className='row job-card-row'>
                        <label>
                            <strong>Current preference name: </strong>
                        </label>{preference.name}<br/>
                        <label>
                            <strong>New preference name: </strong>
                        </label>
                        <input type='text'  value={this.state.newName} name='newName' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current Job Title: </strong>
                        </label>{preference.job_title}<br/>
                        <label>
                            <strong>New Job Title: </strong>
                        </label>
                        <input type='text' value={this.state.newJobTitle} name='newJobTitle' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current industry: </strong>
                        </label>{preference.industry}<br/>
                        <label>
                            <strong>New industry: </strong>
                        </label>
                        <input type='text' value={this.state.newIndustry} name='newIndustry' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current min. Pay: </strong>
                        </label>${parseFloat(preference.min_pay).toLocaleString()}<br/>
                        <label>
                            <strong>New min. Pay: </strong>
                        </label>
                        <input type='number' value={this.state.newMinPay} name='newMinPay' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current jobs posting start date: </strong>
                        </label>{preference.posting_date_start}<br/>
                        <label>
                            <strong>New jobs posting start date: </strong>
                        </label>
                        <input type='date' value={this.state.newPostStartDate} name='newPostStartDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current jobs application closing date: </strong>
                        </label>{preference.application_closing_date}<br/>
                        <label>
                            <strong>New jobs application closing date: </strong>
                        </label>
                        <input type='date' value={this.state.newApplicationClosingDate} min={todaysDate} name='newApplicationClosingDate'  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current city population: </strong>
                        </label>{preference.city_population}<br/>
                        <label>
                            <strong>New city population: </strong>
                        </label>
                        <input type='number' value={this.state.newCityPopulation} name='newCityPopulation' onChange={this.handleChange} /><br/>
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


                    {this.props.currentCountryID ?
                        <div className='row job-card-row'>
                            <label>
                                <strong>Current preference state: </strong>
                            </label>{preference.state}<br/>
                            <label>
                                <strong>New selected state: </strong>
                            </label>
                            {this.displayNewState()}
                            <select onChange={this.handleChangeState} className='location-select'>
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
                                <strong>Current preference city: </strong>
                            </label>{preference.city}<br/>
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
                        </div>
                        :
                        null
                    }<br/>
                    <input className='page-buttons' type="submit" value="Edit Preference" />
                </form>
                <button onClick = {this.handleBackToPreferences} className='page-buttons'>Back to preference</button>
                <button className='page-buttons' onClick={this.handleBackToDashboard}>Go to dashboard</button>
            </div>
        )
    }
}

export default EditPreference