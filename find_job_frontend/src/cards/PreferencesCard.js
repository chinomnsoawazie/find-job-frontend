import React from 'react'
import { setCurrentPreference, deletePreference, searchJobsByPreference } from '../redux/actions'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

function PreferencesCard(props) {
    const {preference, dispatch} = props

    const viewPreference = () => {
        setCurrentPreference(preference, dispatch)
        props.history.push('/individual-preference')
    }

    const handleDeletePreference = () => {
        deletePreference(preference, props)
    }

    const handleSearchPreferenceJobs = () => {
        let location = {
                        state: preference.state,
                        city: preference.city
                        }
        let title = preference.job_title
        let minimumPay = preference.min_pay
        let date1 = new Date(preference.posting_date_start)
        let todaysDate =  new Date().toJSON().slice(0,10).replace(/-/g,'-')
        let date2 = new Date(todaysDate)
        let Difference_In_Time = date2.getTime() -  date1.getTime()
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

        // debugger
        searchJobsByPreference(title, minimumPay, location, props, Difference_In_Days)
    }

    return (
        <div>
            <div  className='row job-card-row'><strong>Name: </strong> {preference.name}</div>
            <div  className='row job-card-row'><strong>Job Title: </strong> {preference.job_title}</div>
            <div  className='row job-card-row'><strong>Min. pay: </strong> ${preference.min_pay}</div> 
            <div  className='row job-card-row'><strong>Location: </strong><br/>
            Country: {preference.country}<br/> State: {preference.state}<br/>City: {preference.city}</div>
            <div className='row job-card-row'>
                <button onClick={viewPreference} className='page-buttons'>View more details</button>
                <button onClick={handleSearchPreferenceJobs} className='page-buttons'>Get matching jobs</button>
                <button onClick={handleDeletePreference} className='page-buttons'>Delete preference</button>
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        myEmail: state.allJobInfo.myEmail,
        USAJobsAPIKey: state.allJobInfo.USAJobsAPIKey
    }
}

export default connect(mapStateToProps)(withRouter(PreferencesCard))