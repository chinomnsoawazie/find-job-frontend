import React from 'react'
import {withRouter} from 'react-router-dom'

const WorkHistoryCard = (props) => {
    const {employment, monthDisplay} = props
    // console.log(employment)

    const handleDelete = (employment) =>{
        {/*a function to deleted emploument  and then redirects to same page and hopefully renders with the deleted history excluded*/}
        props.history.push('/profile-work-history')
    }

    return (
        <>
           <div className='row' >
                <p><strong>Company: </strong> {employment.company_name}</p>
            </div>

            <div className='row' >
                <p><strong>Country: </strong>{employment.country} <strong>State: </strong>{employment.state} <strong>City:</strong> {employment.city} </p>
            </div>

            <div className='row' >
                <p><strong>Job title: </strong> {employment.job_title}</p> 
            </div>

            <div className='row' >
                <p><strong>Start Date: </strong> {monthDisplay(employment.start_month)}, {employment.start_year} </p> 
            </div>

            <div className='row' >
                <p><strong>End Date: </strong> {monthDisplay(employment.end_month)}, {employment.end_year} </p> 
            </div>

            <div className='row' >
                <p><strong>Duties: </strong> {employment.duties} </p> 
            </div>

            <div className='row' >
                <p><strong>Currently work here? </strong> {employment.currently_work_here ? 'Yes' : 'No'} </p> 
            </div>
                
            <div className='row'>
                    <button onClick={() => props.history.push('/edit-work-history')} className='profile-entry-button'>Edit</button>
                    <button onClick={handleDelete} className='profile-entry-button'>Delete</button>
            </div><br/>
            {/* <NavLink to='/profile-entry-point'>
                    <button  className='profile-entry-button'>Back to profile</button>
                    </NavLink> */}
        </>
    )
}

export default withRouter(WorkHistoryCard)
