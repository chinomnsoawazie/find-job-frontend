import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCityID, setCurrentCountryID, setCurrentStateID, createEmployment } from '../redux/actions'


export class CreateEmployment extends Component {
    state = {
        company_name: '',
        job_title: '',
        start_date: '',
        end_date: '',
        duties: '',
        currently_work_here: false,
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
        if (this.displayNewCountry() === 'No country selected' || this.displayNewState() === 'No state selected' || this.displayNewCity() === 'No city selected'){
            alert('Please select country, state, and/or city')
        }else{
            let newEmployment = {
                user_id: this.props.user_id,
                company_name: this.state.company_name,
                job_title: this.state.job_title,
                start_date: this.state.start_date,
                end_date: this.state.end_date,
                duties: this.state.duties,
                country: this.displayNewCountry(),
                state: this.displayNewState(),
                city: this.displayNewCity(),
                currently_work_here: this.state.currently_work_here,
            }
            createEmployment(newEmployment, this.props)
        }
        
    }

    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Create Employment</strong></h2>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Organization/Company name: </strong>
                        </label>
                        <input type='text'  value={this.state.company_name} name='company_name' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Job Title: </strong>
                        </label>
                        <input type='text' value={this.state.job_title} name='job_title' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Duties: </strong>
                        </label><br/>
                        <textarea className='note' type='text' value={this.state.duties} name='duties' onChange={this.handleChange} /><br/>
                    </div><br/>


                    <div className='row job-card-row'>
                        <label>
                            <strong>Start date: </strong>
                        </label>
                        <input type='date' value={this.state.start_date} name='start_date' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Still work here?: </strong>
                        </label>
                        <select onChange={this.handleChange} name='currently_work_here'>
                            <option defaultValue={false} >No</option>
                            <option value={true}>Yes</option>
                        </select>
                        {/* <input type='text' value={this.state.duties} name='duties' onChange={this.handleChange} /><br/> */}
                    </div><br/>

                    {this.state.currently_work_here ? 
                        null
                        :
                        <>
                        <div className='row job-card-row'>
                            <label>
                                <strong>End date: </strong>
                            </label>
                            <input type='date' value={this.state.end_date} min={todaysDate} name='end_date'  onChange={this.handleChange} /><br/>
                        </div><br/>
                        </>
                    }

                    <div className='row job-card-row'>
                        <label>
                            <strong>Country: </strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select'>
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>State: </strong>
                        </label>{this.displayNewState()}
                        <select onChange={this.handleChangeState} className='location-select'>
                            <option defaultValue='Select state'>change state</option> 
                            {states.map(state => <option key={uuid()} value={state.id}>{state.name}</option>)}
                        </select>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>City: </strong>
                        </label>{this.displayNewCity()}
                        <select onChange={this.handleChangeCity} className='location-select'>
                            <option defaultValue='Select city'>change city</option>
                            {cities.length <= 0 ?
                                <option key={uuid()} value={'State has no city'}>State has no cities</option>
                                :
                                cities.map(city => <option key={uuid()} value={city.id}>{city.name}</option>)
                            }                        </select>
                    </div><br/>
                    <input className='page-buttons' type="submit" value="Create employment" />
                </form>
                <button onClick = {() => this.props.push('/user-profile')} className='page-buttons'>Back to profile</button>
                <button className='page-buttons' onClick={() => this.props.push('/dashboard')}>Go to dashboard</button>
            </div>
        )
    }
}

export default CreateEmployment