import React from 'react'
import { setCurrentCertification, deleteCertification } from '../redux/actions'

const CertificationCard = (props) => {
    const { certification, push, dispatch } = props

    const handleEditCertification = () => {
        setCurrentCertification(certification, dispatch)
        push('/edit-certification')
    }

    const handleDeleteCertification = () => {
        deleteCertification(certification, props)
    }
    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Description: </strong>
            </label>{certification.description}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Issuing body/organization: </strong>
            </label>{certification.issued_by}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Issuing date: </strong>
            </label>{certification.issuing_date}
        </div>
        <div className='row job-card-row'>
            <label>
                <strong>Renewable?: </strong>
            </label>{certification.renewable ? 'Yes' : 'No'}
        </div>


        {certification.renewable ?
        <div className='row job-card-row'>
            <label>
                <strong>Valid until: </strong>
            </label>{certification.valid_until}
        </div>
        :
        null
        }

        <button onClick={handleEditCertification} className='page-buttons'>Edit certification</button>
        <button onClick={handleDeleteCertification} className='page-buttons'>Delete certification</button>
    </>
    )
}

export default CertificationCard