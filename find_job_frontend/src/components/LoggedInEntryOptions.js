import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const LoggedInEntryOptions = (props) => {
    const push = props.history.push
    return (
        <div className='entry-pg'>
            <div className='column'>

                <div className='row'>
                <h4 className='landing-pg-row'><strong > Welcome {props.first_name}</strong></h4><br/>
                <p className='landing-pg-row'>What would you like to do?</p>
                </div> <br/>

                <div className='row'>
                    <button className='landing-pg-button' onClick={() => push('/my-dashboard')}>View dashboard</button>
                </div><br/>

                <div className='row '>
                    <button onClick={() => push('/profile-entry-point')} className='landing-pg-button'>View Profile</button>
                </div><br/>

                    <div className='row'>
                        <button onClick={() => push('/search-jobs')} className='landing-pg-button'>Search for jobs</button>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        first_name: state.allInfoOnUser.first_name
    }
}
export default connect(mapStateToProps)(withRouter(LoggedInEntryOptions))
