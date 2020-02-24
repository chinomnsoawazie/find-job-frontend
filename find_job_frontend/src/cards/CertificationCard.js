import React from 'react'

const CertificationCard = (props) => {
    const { certification } = props
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

        <div className='row job-card-row'>
            <label>
                <strong>Valid until: </strong>
            </label>{certification.valid_until}
        </div>

        <button className='page-buttons'>Edit certification</button>
    </>
    )
}

export default CertificationCard