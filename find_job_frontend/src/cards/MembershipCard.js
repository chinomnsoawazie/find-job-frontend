import React from 'react'

const MembershipCard = (props) => {
    const { membership } = props
    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Organization:</strong>
            </label>{membership.organization}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Date joined:</strong>
            </label>{membership.start_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>End date:</strong>
            </label>{membership.end_date}
        </div>

        <button className='page-buttons'>Edit membership</button>
    </>
    )
}

export default MembershipCard
