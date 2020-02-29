import React, { Component } from 'react'
import {countriesList, statesList, citiesList} from '../components/CountriesStatesAndCities'
import uuid from 'react-uuid'
import { setCurrentCountryID, setCurrentStateID, setCurrentCityID, editEducation, resetLocations, } from '../redux/actions'

export class EditEducation extends Component {
    state = {
        newNameOfInstitution: '',
        newDegreeOrCertificate: '',
        newStartDate: '',
        newEndDate: '',
        newGPA: '',
        newMajor: '',
        newCompleteStatus: '',
        newMinor: ''
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
        let newCountry = this.displayNewCountry() === 'No new country selected' ? this.props.currentEducation.country : this.displayNewCountry()
        let newState = this.displayNewState() === 'No new state selected' ? this.props.currentEducation.state : this.displayNewState()
        let newCity = this.displayNewCity() === 'No new city selected' ? this.props.currentEducation.city : this.displayNewCity()
        let finalNewCompleteStatus = this.state.newCompleteStatus === 'true' ? true : false
            let changedEducation = {
                id: this.props.currentEducation.id,
                user_id: this.props.currentEducation.user_id,
                name_of_institution: this.state.newCompany || this.props.currentEducation.name_of_institution,
                degree_or_certificate: this.state.newDegreeOrCertificate || this.props.currentEducation.degree_or_certificate,
                gpa: this.state.newGPA || this.props.currentEducation.gpa,
                start_date: this.state.newStartDate || this.props.currentEducation.start_date,
                end_date: this.state.newEndDate || this.props.currentEducation.end_date,
                country: newCountry || this.props.currentEducation.country,
                state: newState || this.props.currentEducation.state,
                city: newCity || this.props.currentEducation.city,
                major: this.state.newMajor || this.props.currentEducation.major,
                minor: this.state.newMinor || this.props.currentEducation.minor,
                complete_status: this.state.newCompleteStatus ? finalNewCompleteStatus : null || this.props.currentEducation.currently_work_here,
            }
            editEducation(changedEducation, this.props)
    }

    handleBackToProfile = () =>{
        resetLocations(this.props.dispatch)
        this.props.push('/user-profile')
    }

    handleBackToDashboard = () => {
        resetLocations(this.props.dispatch)
        this.props.push('/dashboard')
    }


    render() {
        let states = statesList.filter(state => state.country_id === this.props.currentCountryID)
        let cities = citiesList.filter(city => city.state_id === this.props.currentStateID)
        let education = this.props.currentEducation
        const todaysDate = new Date().toJSON().slice(0,10).replace(/-/g,'-')
        return (
            <div className='forms'>
                <form onSubmit={this.handleSubmit}>
                    <h2><strong>Edit education</strong></h2>
                    <div className='row job-card-row'>
                        <label>
                            <strong>Current institution name: </strong>
                        </label>
                        {education.name_of_institution}<br/>
                        <label>
                            <strong>New institution name: </strong>
                        </label>
                        <input type='text'  value={this.state.newNameOfInstitution} name='newNameOfInstitution' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current Degree/Certificate: </strong>
                        </label>{education.degree_or_certificate}<br/>
                        <label>
                            <strong>New Degree/Certificate: </strong>
                        </label>
                        <input type='text' value={this.state.newDegreeOrCertificate} name='newDegreeOrCertificate' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current major: </strong>
                        </label>{education.major}<br/>
                        <label>
                            <strong>New major: </strong>
                        </label>
                        <input type='text' value={this.state.newMajor} name='newMajor' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current minor: </strong>
                        </label>{education.minor}<br/>
                        <label>
                            <strong>New minor: </strong>
                        </label>
                        <input type='text' value={this.state.newMinor} name='newMinor' onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current GPA: </strong>
                        </label>{education.gpa}<br/>
                        <label>
                            <strong>New GPA: </strong>
                        </label>
                        <input  type='number' style={{width: 40}} step='0.01' value={this.state.newGPA} name='newGPA' min={1} max={5} onChange={this.handleChange} /><br/>
                    </div><br/>


                    <div className='row job-card-row'>
                        <label>
                            <strong>Current start date: </strong>
                        </label>{education.start_date}<br/>
                        <label>
                            <strong>New start date: </strong>
                        </label>
                        <input type='date' value={this.state.newStartDate} name='newStartDate' max={todaysDate}  onChange={this.handleChange} /><br/>
                    </div><br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current completion status: </strong>
                        </label> {education.complete_status ? 'Completed' : 'In progress'}<br/>
                        <label>
                            <strong>New completion status: </strong>
                        </label>
                        <select onChange={this.handleChange} name='newCompleteStatus'  >
                            <option defaultValue >Select</option>
                            <option value={false} >No</option>
                            <option value={true}>Yes</option>
                        </select>
                    </div><br/>

                    {this.state.newCompleteStatus === 'true'? 
                        <div className='row job-card-row'>
                            <label>
                                <strong>End date: </strong>
                            </label>
                            <input type='date' value={this.state.newEndDate} max={todaysDate} name='newEndDate'  onChange={this.handleChange} /><br/>
                        </div>
                        :
                        null
                    }<br/>

                    <div className='row job-card-row'>
                        <label>
                            <strong>Current country </strong>
                        </label>{education.country}<br/>
                        <label>
                            <strong>New country: </strong>
                        </label>{this.displayNewCountry()}
                        <select onChange={this.handleChangeCountry} className='location-select'>
                            <option defaultValue='Select country'>select country</option>
                            {countriesList.map(country =>  <option key={uuid()} value={country.id} name={country.id}> {country.name}</option>)}
                        </select>
                    </div><br/>

                    {this.props.currentCountryID ?
                        <div className='row job-card-row'>
                            <label>
                                <strong>Current state </strong>
                            </label>{education.state}<br/>
                            <label>
                                <strong>New state: </strong>
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
                                <strong>Current city </strong>
                            </label>{education.city}<br/>
                            <label>
                                <strong>New city: </strong>
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
                    <input className='page-buttons' type="submit" value="Edit education" />
                </form>
                <button onClick = {this.handleBackToProfile} className='page-buttons'>Back to profile</button>
                <button className='page-buttons' onClick={this.handleBackToDashboard}>Go to dashboard</button>
            </div>
        )
    }
}

export default EditEducation