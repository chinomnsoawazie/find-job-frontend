import React from 'react'
import profileIcon from '../pictures/profileIcon.png'
import {withRouter} from 'react-router-dom'

const LogIn = (props) => { 
    return (
            <div width='20%' className="generic-image sign-in">
            <img src={profileIcon} height='32' width='32' className="profile-icon" alt="profile-icon"/>
            <button onClick={() => props.history.push('login') } className="button" >Login</button>
         </div>
    )
}

export default withRouter(LogIn)



