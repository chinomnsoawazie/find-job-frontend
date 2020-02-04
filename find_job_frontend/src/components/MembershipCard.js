import React from 'react'

const MembershipCard = (props) => {
    const {membership, monthDisplay} = props

    return (
        <>
        <div className='row' >
             <p><strong>Orgarnization: </strong> {membership.organization}</p>
         </div>

         <div className='row' >
             <p><strong>Start Date: </strong> {monthDisplay(parseInt(membership.start_date.split('-')[1]))}, {membership.start_date.split('-')[0]} </p> 
         </div>

         <div className='row' >
             <p><strong>End Date: </strong> {monthDisplay(parseInt(membership.end_date.split('-')[1]))}, {membership.end_date.split('-')[0]} </p> 
         </div>
             
         <div className='row'>
                 <button onClick={() => this.props.history.push('/edit-work-history')} className='profile-entry-button'>Edit</button>
                 <button onClick={() => this.props.history.push('/profile-entry-point')} className='profile-entry-button'>Delete</button>
         </div><br/>
     </>
    )
}

export default MembershipCard
