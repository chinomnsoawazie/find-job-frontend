import React from 'react'
import { withRouter } from 'react-router'
import { setFromFavoriteJobs, setFromAppliedJobs } from '../redux/actions'

const DashBoard = (props) => {
    const handleClick = (event) =>{
        event.preventDefault()
        if(event.target.name === '/favorite-jobs'){
            setFromFavoriteJobs(props.dispatch)
        }else if(event.target.name === '/applied-jobs'){
            setFromAppliedJobs(props.dispatch)
        }
        props.history.push(event.target.name)
    }

    return (
        <div className='dashboard'>

            <div className='column'>
                <div className='row'>
                    <button onClick={handleClick} name='/favorite-jobs' className='dashboard-buttons'>Favorite jobs</button>
                </div><br/>
                <div className='row'>
                    <button onClick={handleClick} className='dashboard-buttons' name='/applied-jobs' >Applied Jobs</button>
                </div>
            </div>

            <div className='column'>
                <div className='row'>
                    <button onClick={handleClick} name='/all-preferences' className='dashboard-buttons'>My preferences </button>
                </div><br/>
                <div className='row'>
                    <button onClick={handleClick} name='/user-profile' className='dashboard-buttons'>My Profile</button>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(DashBoard) 