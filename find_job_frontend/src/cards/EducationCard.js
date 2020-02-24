import React from 'react'

const EducationCard = (props) => {
    const { education } = props
    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Institution: </strong>
            </label>{education.name_of_institution}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Degree/Certificate obtained: </strong>
            </label>{education.degree_or_certificate}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Start date: </strong>
            </label>{education.start_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>End date: </strong>
            </label>{education.end_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>GPA: </strong>
            </label>{education.gpa}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Major: </strong>
            </label>{education.major}
        </div>
        <div className='row job-card-row'>
            <label>
                <strong>Minor: </strong>
            </label>{education.minor}
        </div>

        <div className='row columned-row' >
            <div className='column job-card-row'>
                <strong>State: </strong><br/>{education.state}
            </div>
            <div className='column job-card-row'>
                <strong>City: </strong><br/>{education.city}
            </div>

            <div className='column job-card-row'>
                <strong>Country: </strong><br/> {education.country}
            </div>
        </div>

        <button className='page-buttons'>Edit education</button>
    </>
    )
}

export default EducationCard