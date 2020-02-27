import React from 'react'
import { setCurrentEducation, deleteEducation } from '../redux/actions'

const EducationCard = (props) => {
    const { education, push, dispatch} = props

    const handleEducationEdit = () => {
        setCurrentEducation(education, dispatch)
        push('/edit-education')
    }

    const handleEducationDelete = () => {
        deleteEducation(education, props)
    }


    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Institution: </strong>
            </label>{education.name_of_institution}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Degree/Certificate: </strong>
            </label>{education.degree_or_certificate}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Start date: </strong>
            </label>{education.start_date}
        </div>

        {education.complete_status ?
            <div className='row job-card-row'>
                <label>
                    <strong>End date: </strong>
                </label>{education.end_date}
            </div>
            :
            <div className='row job-card-row'>
            <label>
                <strong>Completion status: </strong>
                </label> Not completed
            </div>
        }


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

        <button onClick={handleEducationEdit} className='page-buttons'>Edit education</button>
        <button onClick={handleEducationDelete} className='page-buttons'>Delete education</button>

    </>
    )
}

export default EducationCard