import React from 'react'
import {withRouter} from 'react-router-dom'

const EntryPoint = (props) => {
    return (
        <div className='entry-pg'>
            <div className='column'>

            <div className='row'>
                <h4 className='landing-pg-row'><strong > Welcome to FindJobs</strong></h4> 
                </div> <br/>

                <div className='row'>
                        <strong className='landing-pg-row'>To have the best experience</strong>
                </div>

                <div className='row'>
                    <button onClick={() => props.history.push('login')} className='landing-pg-button'>Sign in</button>
                </div><br/>

                <div className='row landing-pg-row'>
                    <p className='landing-pg-row'><strong >or</strong></p>
                </div>
                
                <div className='row '>
                    <button onClick={() => props.history.push('signup')} className='landing-pg-button'>Sign up</button>
                </div><br/>

                <div className='row'>
                <strong className='landing-pg-row'>You can also just search for Jobs</strong>
                </div>

                    <div className='row'>
                        <button onClick={() => props.history.push('search-jobs')} className='landing-pg-button'>Search for jobs</button>
                    </div>
            </div>
        </div>
    )
}

export default withRouter(EntryPoint)
