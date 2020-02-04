import React from 'react'
import {withRouter, NavLink} from 'react-router-dom'


const ProfileEntryPoint = (props) => {
    return (
        <div className='main-container'>

            <div className='column'>
                <div className='row'>
                    <button className='profile-entry-button'>Personal information</button>
                </div>

                <div className='row'>
                        <button onClick={() => props.history.push('profile-info')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

                <div className='row'>
                    <button className='profile-entry-button'>Work history</button>
                </div>
                <div className='row'>
                        <button onClick={() => props.history.push('profile-work-history')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

                <div className='row'>
                    <button className='profile-entry-button'>Educational history</button>
                </div>
                <div className='row'>
                        <button onClick={() => props.history.push('profile-education-history')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

                <div className='row'>
                    <button className='profile-entry-button'>Skills</button>
                </div>
                <div className='row'>
                        <button onClick={() => props.history.push('profile-skills')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

                <div className='row'>
                    <button className='profile-entry-button'>Memberships</button>
                </div>
                <div className='row'>
                        <button onClick={() => props.history.push('profile-memberships')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

                <div className='row'>
                    <button className='profile-entry-button'>Certifications</button>
                </div>
                <div className='row'>
                        <button onClick={() => props.history.push('profile-certifications')} className='job-card-button'>View</button>
                    <NavLink to='edit-personal-info'>
                        <button className='job-card-button'>Add</button>
                    </NavLink>
                </div><br/>

            </div>
        </div>
    )
}

export default withRouter(ProfileEntryPoint)
