import React from 'react'
import { deletePreference, searchJobsByPreference } from '../redux/actions'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

function PreferenceCard(props) {
    const {currentPreference} = props

    const handleDeletePreference = () => {
        deletePreference(currentPreference, props)
    }

    const handleSearchPreferenceJobs = () => {
        let location = {
                        state: currentPreference.state,
                        city: currentPreference.city
                        }
        let title = currentPreference.job_title
        let minimumPay = currentPreference.min_pay
        let date1 = new Date(currentPreference.posting_date_start)
        let todaysDate =  new Date().toJSON().slice(0,10).replace(/-/g,'-')
        let date2 = new Date(todaysDate)
        let Difference_In_Time = date2.getTime() -  date1.getTime()
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)
        searchJobsByPreference(title, minimumPay, location, props, Difference_In_Days)
    }

    return (
        <div className='job-card-div'>
               <div className='row'>
                 <h3><strong>Name of Preference: </strong>{currentPreference.name}</h3>
            </div>
            <div className='row job-card-row' >
                <p><strong>Job title:</strong> {currentPreference.job_title}</p> 
            </div>

            <div className='row job-card-row' >
                <p><strong>Industry:</strong> {currentPreference.industry}</p> 
            </div>
            <div className='row job-card-row' >
                <p><strong>Minimum Pay:</strong> ${currentPreference.min_pay}</p> 
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row'>
                    <strong>State: </strong><br/>{currentPreference.state}
                </div>
                <div className='column job-card-row'>
                    <strong>City: </strong><br/>{currentPreference.city}
                </div>
                <div className='column job-card-row'>
                    <strong>City Population: </strong><br/>{currentPreference.city_population}
                </div>

                <div className='column job-card-row'>
                    <strong>Country: </strong><br/> {currentPreference.country}
                </div>
            </div>

            <div className='row columned-row' >
                <div className='column job-card-row' >
                    <strong>Jobs posting date start:</strong><br/> {currentPreference.posting_date_start}
                </div>

                <div className='column job-card-row' >
                    <strong>Applications closing date start:</strong><br/>{currentPreference.application_closing_date}
                </div>
            </div>
            <button onClick={() => props.history.push('/edit-preference')} className='page-buttons'>Edit preference</button>
            <button onClick={handleDeletePreference} className='page-buttons'>Delete preference</button>
            <button onClick={handleSearchPreferenceJobs} className='page-buttons'>Search matching jobs</button>
            <button onClick={() => props.history.push('/all-preferences')} className='page-buttons'>Back to all preferences</button>
            <button onClick={() => props.history.push('/dashboard')} className='page-buttons'>Back to dashboard</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myEmail: state.allJobInfo.myEmail,
        USAJobsAPIKey: state.allJobInfo.USAJobsAPIKey
    }
}

export default connect(mapStateToProps)(withRouter(PreferenceCard))