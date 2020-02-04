import React from 'react'
import {NavLink} from 'react-router-dom'

const BackButton = (props) => {
    const {buttonText} = props
    return (
        <NavLink to="/jobs" >
<button   className='side-bar-button'>Back to {buttonText}</button> 
    </NavLink>
    )
}


export default BackButton
