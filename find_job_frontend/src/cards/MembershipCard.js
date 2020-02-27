import React from 'react'
import { setCurrentMembership, deleteMembership } from '../redux/actions'

const MembershipCard = (props) => {
    const { membership, push, dispatch} = props

    const handleEditMembership = () => {
        setCurrentMembership(membership, dispatch)
        push('/edit-membership')
    }

    const handleDeleteMembership = () => {
        deleteMembership(membership, props)
    }



    return (
    <>
        <div className='row job-card-row'>
            <label>
                <strong>Organization: </strong>
            </label>{membership.organization}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>Date joined: </strong>
            </label>{membership.start_date}
        </div>

        <div className='row job-card-row'>
            <label>
                <strong>End date: </strong>
            </label>{membership.end_date || 'N/A'}
        </div>

        <button onClick={handleEditMembership}  className='page-buttons'>Edit membership</button>
        <button onClick={handleDeleteMembership} className='page-buttons'>Delete membership</button>

    </>
    )
}

export default MembershipCard
