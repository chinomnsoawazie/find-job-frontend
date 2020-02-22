import React from 'react'
import { deletePreference } from '../redux/actions'

function PreferenceCard(props) {
    const {currentPreference} = props

    const handleDeletePreference = () => {
        deletePreference(currentPreference, props)
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
            {/*no need to set currentPreference in edit preference below the current preference in this component is what you'll be dealing with in the editPreference form */}
            <button onClick={() => props.push('/edit-preference')} className='page-buttons'>Edit preference</button>
            <button onClick={handleDeletePreference} className='page-buttons'>Delete preference</button>

            <button onClick={() => props.push('/all-preferences')} className='page-buttons'>Back to all preferences</button>
            <button onClick={() => props.push('/dashboard')} className='page-buttons'>Back to dashboard</button>

        </div>
    )
}



export default PreferenceCard