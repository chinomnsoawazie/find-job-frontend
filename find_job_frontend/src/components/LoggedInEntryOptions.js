import React from 'react'
import {NavLink} from 'react-router-dom'

const LoggedInEntryOptions = (props) => {

    const {user} = props
    return (
        <div className='entry-pg'>
            <div className='column'>

                <div className='row'>
                <h4 className='landing-pg-row'><strong > Welcome {user.first_name}</strong></h4><br/>
                <p className='landing-pg-row'>What would you like to do?</p>
                </div> <br/>

                <NavLink to='my-dashboard'>
                <div className='row'>
                    <button className='landing-pg-button'>View dashboard</button>
                </div><br/>
                </NavLink>

                <NavLink to='profile-entry-point'>
                <div className='row '>
                    <button className='landing-pg-button'>View Profile</button>
                </div><br/>
                </NavLink>

                <NavLink to='search-jobs'>
                    <div className='row'>
                        <button className='landing-pg-button'>Search for jobs</button>
                    </div>
                </NavLink>
            </div>

        
        </div>
    )
}

export default LoggedInEntryOptions
