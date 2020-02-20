import React from 'react'
import { withRouter } from 'react-router'

const DashBoard = (props) => {
    const handleClick = (event) =>{
        event.preventDefault()
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
                    <button className='dashboard-buttons'>My preferences </button>
                </div><br/>
                <div className='row'>
                    <button className='dashboard-buttons'>My Profile</button>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(DashBoard) 