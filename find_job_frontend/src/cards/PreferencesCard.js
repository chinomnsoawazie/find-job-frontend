import React from 'react'
import { setCurrentPreference, deletePreference } from '../redux/actions'
import {withRouter} from 'react-router-dom'


function PreferencesCard(props) {
    const {preference, dispatch} = props

    const viewPreference = () => {
        setCurrentPreference(preference, dispatch)
        props.history.push('/individual-preference')
    }

    const handleDeletePreference = () => {
        deletePreference(preference, props)
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
                <button onClick={handleDeletePreference} className='page-buttons'>Delete preference</button>
                <button onClick={() => props.history.push('/dashboard')} className='page-buttons'>Back to dashboard</button>
            </div> 
        </div>
    )
}

export default withRouter(PreferencesCard)