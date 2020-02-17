import React from 'react'

const CertificationCard = (props) => {
    const {certification, monthDisplay} = props

    console.log(certification)

    return (
        <>
        <div className='row' >
             <p><strong>Description: </strong> {certification.description}</p>
         </div>

         <div className='row' >
             <p><strong>Issued By: </strong> {certification.issued_by}</p>
         </div>

         <div className='row' >
             <p><strong>Issuing Date: </strong> {monthDisplay(parseInt(certification.issuing_date.split('-')[1]))} {certification.issuing_date.split('-')[2]}, {certification.issuing_date.split('-')[0]} </p> 
         </div>

         <div className='row' >
             <p><strong>Renewable? </strong> {certification.renewable ? 'Yes' : 'No'}</p>
         </div>

         <div className='row' >
             <p><strong>Renewal Date: </strong> {monthDisplay(parseInt(certification.valid_until.split('-')[1]))} {certification.valid_until.split('-')[2]}, {certification.valid_until.split('-')[0]} </p> 
         </div>

         <div className='row'>
                 <button onClick={() => this.props.history.push('/edit-work-history')} className='profile-entry-button'>Edit</button>
                 <button onClick={() => this.props.history.push('/profile-entry-point')} className='profile-entry-button'>Delete</button>
         </div><br/>
     </>
    )
}

export default CertificationCard
