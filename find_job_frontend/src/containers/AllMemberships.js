import React from 'react'
import { withRouter } from 'react-router'
import MembershipCard from '../components/MembershipCard'

const AllMemberships = (props) => {
    const {userMemberships, monthDisplay} = props
    return (
        <>
            <div className='profile-child'>
                {userMemberships.map(membership => <MembershipCard key={membership.id} membership={membership} monthDisplay={monthDisplay}/>)}    
            </div>

            <div className='row'>
                <button onClick={() => props.history.push('/profile-entry-point')} className='profile-entry-button'>Back to profile</button>
            </div>
        </>
    )
}

export default withRouter(AllMemberships) 
