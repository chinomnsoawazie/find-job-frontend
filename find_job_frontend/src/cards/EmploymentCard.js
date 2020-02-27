import React from 'react'
import { setCurrentEmployment, deleteEmployment } from '../redux/actions'

const EmploymentCard = (props) => {
    const { employment, push, dispatch } = props

    const handleEmploymentEdit = () => {
        setCurrentEmployment(employment, dispatch)
        push('/edit-employment')
    }

    const handleEmploymentDelete = () => {
        deleteEmployment(employment, props)
    }
    
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
                <strong>Currently work here?: </strong>
            </label>{employment.currently_work_here ? 'Yes' : 'No'}
        </div>

        {employment.currently_work_here ? 
            null
            :
            <div className='row job-card-row'>
                <label>
                    <strong>End date: </strong>
                </label>{employment.end_date}
            </div>
        }

        <div className='row job-card-row'>
            <label>
                <strong>Duties: </strong>
            </label>{employment.duties}
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

        <div className='row' >
            
        </div>

        <button onClick={handleEmploymentEdit} className='page-buttons'>Edit employment</button>
        <button onClick={handleEmploymentDelete} className='page-buttons'>Delete employment</button>

    </>
    )
}

export default EmploymentCard
