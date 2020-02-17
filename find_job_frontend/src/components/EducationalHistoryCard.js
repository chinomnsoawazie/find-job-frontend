import React from 'react'

const EducationalHistoryCard = (props) => {
    const {education, monthDisplay} = props

    return (
        <>
        <div className='row' >
             <p><strong>Institution: </strong> {education.name_of_institution}</p>
         </div>
         <div className='row' >
             <p><strong>Degree or Diploma obtained: </strong> {education.degree_or_certification}</p>
         </div>

         <div className='row' >
             <p><strong>Country: </strong>{education.country} <strong>State: </strong>{education.state} <strong>City:</strong> {education.city} </p>
         </div>

         <div className='row' >
             <p><strong>Start Date: </strong> {monthDisplay(parseInt(education.start_date.split('-')[1]))}, {education.start_date.split('-')[0]} </p> 
         </div>

         <div className='row' >
             <p><strong>End Date: </strong> {monthDisplay(parseInt(education.end_date.split('-')[1]))}, {education.end_date.split('-')[0]} </p> 
         </div>

         <div className='row' >
             <p><strong>GPA: </strong> {education.gpa}</p>
         </div>

         <div className='row' >
             <p><strong>Major: </strong> {education.major}</p>
         </div>

         <div className='row' >
             <p><strong>Minor: </strong> {education.minor}</p>
         </div>
             
         <div className='row'>
                 <button onClick={() => this.props.history.push('/edit-work-history')} className='profile-entry-button'>Edit</button>
                 <button onClick={() => this.props.history.push('/profile-entry-point')} className='profile-entry-button'>Delete</button>
         </div><br/>
     </>
    )
}

export default EducationalHistoryCard
