import React from 'react'
import EducationalHistoryCard from '../components/EducationalHistoryCard'
import { withRouter } from 'react-router'

const AllEducationHistory = (props) => {
    const {userEducations, monthDisplay} = props
    return (
        <>
            <div className='profile-child'>
                {userEducations.map(education => <EducationalHistoryCard key={education.id} education={education} monthDisplay={monthDisplay} />)}    
            </div>

            <div className='row'>
                <button onClick={() => props.history.push('/profile-entry-point')} className='profile-entry-button'>Back to profile</button>
            </div>
    </>
    )
}

export default withRouter(AllEducationHistory) 



