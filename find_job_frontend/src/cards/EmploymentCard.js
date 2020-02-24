import React from 'react'

const EmploymentCard = (props) => {
    const { employment } = props
    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Organization: </strong>
            </label>{employment.company_name}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Job Title: </strong>
            </label>{employment.job_title}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Start date: </strong>
            </label>{employment.start_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>End date: </strong>
            </label>{employment.end_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Duties: </strong>
            </label>{employment.duties}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Currently work here?: </strong>
            </label>{employment.currently_work_here ? 'Yes' : 'No'}
        </div>

        <div className='row columned-row' >
            <div className='column job-card-row'>
                <strong>State: </strong><br/>{employment.state}
            </div>
            <div className='column job-card-row'>
                <strong>City: </strong><br/>{employment.city}
            </div>

            <div className='column job-card-row'>
                <strong>Country: </strong><br/> {employment.country}
            </div>
        </div>

        <button className='page-buttons'>Edit Employment</button>
    </>
    )
}

export default EmploymentCard
