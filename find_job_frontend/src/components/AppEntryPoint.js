import React from 'react'
import { withRouter } from 'react-router-dom'

const AppEntryPoint = (props) => {
    return (
        <div className='entry-page'>
            <div className='row'>
                <h4 ><strong > Welcome to FindJobs</strong></h4> 
                </div>

                <div className='row'>
                    <strong>For best experience</strong>
                </div>

                <div className='row'>
                    <button onClick={() => props.history.push('login')} className='page-buttons'>Sign in</button>
                </div>

                <div className='row'>
                    <p><strong >or</strong></p>
                </div>
                
                <div className='row '>
                    <button onClick={() => props.history.push('/create-user')} className='page-buttons'>Sign up</button>
                </div><br/>

                <div className='row'>
                    <strong>You can also just search for Jobs</strong>
                </div>

                <div className='row'>
                    <button onClick={() => props.history.push('/search-for-jobs')} className='page-buttons'>Search for jobs</button>
                </div>
        </div>
    )
}

export default withRouter(AppEntryPoint)
