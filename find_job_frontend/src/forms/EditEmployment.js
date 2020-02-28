import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCountryID, setCurrentStateID, setCurrentCityID, editEmployment} from '../redux/actions'

export class EditEmployment extends Component {
    state = {
        newCompany: '',
        newJobTitle: '',
        newMinPay: '',
        newStartDate: '',
        newEndDate: '',
        newDuties: '',
        newCurrentlyWorkHere: 'true'
    }

    // componentDidMount() {
    //     this.setState({newCurrentlyWorkHere: this.props.currentEmployment.currently_work_here})
    // }

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
        let newCountry = this.displayNewCountry() === 'No new country selected' ? this.props.currentEmployment.country : this.displayNewCountry()
        let newState = this.displayNewState() === 'No new state selected' ? this.props.currentEmployment.state : this.displayNewState()
        let newCity = this.displayNewCity() === 'No new city selected' ? this.props.currentEmployment.city : this.displayNewCity()
        let finalNewCurrentlyWorkHere = this.state.newCurrentlyWorkHere === 'true' ? true : false
            let changedEmployment = {
                id: this.props.currentEmployment.id,
                user_id: this.props.currentEmployment.user_id,
                company_name: this.state.newCompany || this.props.currentEmployment.company_name,
                job_title: this.state.newJobTitle || this.props.currentEmployment.job_title,
                start_date: this.state.newStartDate || this.props.currentEmployment.start_date,
                end_date: this.state.newEndDate || this.props.currentEmployment.end_date,
                duties: this.state.newDuties || this.props.currentEmployment.duties,
                country: newCountry || this.props.currentEmployment.country,
                state: newState || this.props.currentEmployment.state,
                city: newCity || this.props.currentEmployment.city,
                currently_work_here: this.state.newCurrentlyWorkHere ? finalNewCurrentlyWorkHere : null || this.props.currentEmployment.currently_work_here,
            }
            editEmployment(changedEmployment, this.props)
    }


    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        let employment = this.props.currentEmployment
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                   <h2><strong>Edit Employment</strong></h2>
                   <div className='row job-card-row'>
                        <label>
                            <strong>Current Organization/Company name: </strong>
                        </label>{employment.company_name}
                    </div>
                    <div className='row job-card-row'>
                        <label>
                            <strong>New Organization/Company name: </strong>
                        </label>
                        <input type='text'  value={this.state.company_name} name='company_name' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current Job Title: </strong>
                        </label>{employment.job_title}
                    </div>

                    <div className='row job-card-row'>
                        <label>
                            <strong>New Job Title: </strong>
                        </label>
                        <input type='text' value={this.state.job_title} name='job_title' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current duties: </strong>
                        </label><br/>{employment.duties}
                    </div>
                    <div className='row job-card-row'>
                        <label>
                            <strong>New duties: </strong>
                        </label><br/>
                        <textarea className='note' type='text' value={this.state.duties} name='duties' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current start date: </strong>
                        </label>{employment.start_date}
                    </div>
                    <div className='row job-card-row'>
                        <label>
                            <strong>New start date: </strong>
                        </label>
                        <input type='date' value={this.state.start_date} name='start_date' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Still work here?: </strong>
                        </label>Current ans: {employment.currently_work_here ? 'Yes' : 'No'}
                    </div>

                    {employment.currently_work_here ?
                        <div className='row job-card-row'>
                            <label>
                                <strong>Do you still work here?: </strong>
                            </label>
                            <select onChange={this.handleChange} name='newCurrentlyWorkHere'>
                                <option defaultValue >Select</option>
                                <option value={false} >No</option>
                                <option value={true}>Yes</option>
                            </select>
                        </div>
                        :
                        null
                    }<br/>

                    {this.state.newCurrentlyWorkHere === 'true' ? 
                        null
                        :
                        <>
                        <div className='row job-card-row'>
                            <label>
                                <strong>End date: </strong>
                            </label>
                            <input type='date'  max={todaysDate} name='newEndDate'  onChange={this.handleChange} /><br/>
                        </div><br/>
                        </>
                    }

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current country: </strong>
                        </label>{employment.country}
                    </div>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Country: </strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select'>
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>


                    {this.props.currentCountryID ? 
                        <div className='row job-card-row'>
                            <label>
                                <strong>Current state: </strong>
                            </label>{employment.state}<br/>
                            <label>
                                <strong>State: </strong>
                            </label>{this.displayNewState()}
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
                                <strong>Current city: </strong>
                            </label>{employment.city}<br/>
                            <label>
                                <strong>City: </strong>
                            </label>{this.displayNewCity()}
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
                    <input className='page-buttons' type="submit" value="Edit employment" />
                </form>
                <button onClick = {() => this.props.push('/user-profile')} className='page-buttons'>Back to profile</button>
                <button className='page-buttons' onClick={() => this.props.push('/dashboard')}>Go to dashboard</button>
            </div>
        )
    }
}

export default EditEmployment