import React from 'react'
import WorkHistoryCard from '../components/WorkHistoryCard'
import { withRouter } from 'react-router'


const AllWorkHistory = (props) => {
    const {userEmployments, monthDisplay} = props
    return (
        <>
            <div className='profile-child'>
                {userEmployments.map(employment => <WorkHistoryCard key={employment.id} employment={employment} monthDisplay={monthDisplay} />)}    
            </div>
            

            <div className='row'>
            <button onClick={() => props.history.push('/profile-entry-point')} className='profile-entry-button'>Back to profile</button>
    </div><br/>
    </>
    )
}

export default withRouter(AllWorkHistory)
