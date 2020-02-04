import React from 'react'
import CertificationCard from '../components/CertificationCard'
import { withRouter } from 'react-router'

const AllCertifications = (props) => {
    const {userCertifications, monthDisplay} = props
    return (
        <>
            <div className='profile-child'>
                {userCertifications.map(certification => <CertificationCard key={certification.id} certification={certification} monthDisplay={monthDisplay}/>)}    
            </div>

            <div className='row'>
                <button onClick={() => props.history.push('/profile-entry-point')} className='profile-entry-button'>Back to profile</button>
            </div>
        </>
    )
}

export default withRouter(AllCertifications) 
