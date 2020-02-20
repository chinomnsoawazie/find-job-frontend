import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const LoggedInOptions = (props) => {
    const push = props.history.push
    return (
        <div className='entry-page'>
            <div className='column'>
                <div className='row'>
                <h4><strong > Welcome {props.first_name}</strong></h4><br/>
                <p>What would you like to do?</p>
                </div> <br/>

                <div className='row'>
                    <button className='page-buttons' onClick={() => push('/dashboard')}>View dashboard</button>
                </div><br/>

                <div className='row '>
                    <button onClick={() => push('/profile-entry-point')} className='page-buttons'>View Profile</button>
                </div><br/>

                    <div className='row'>
                        <button onClick={() => push('/search-for-jobs')} className='page-buttons'>Search for jobs</button>
                    </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return {
        first_name: state.allUserInfo.first_name
    }
}
export default connect(mapStateToProps)(withRouter(LoggedInOptions))