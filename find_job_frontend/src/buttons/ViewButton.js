import React from 'react'
import {NavLink} from 'react-router-dom'

const ViewButton = (props) => {

    const {job, showJob, buttonText} = props

    const handleClick = () => {
        showJob(job)
    }

    // const userType = () =>{
    //     if(job.user)
    // }

    return (
        <NavLink to={`/jobs/${job.id}`} >
            <button  onClick={handleClick}   className='side-bar-button'>{buttonText}</button> 
        </NavLink>
    )
}

export default ViewButton
