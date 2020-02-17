import React from 'react'
import { withRouter } from 'react-router'

const MyDashBoard = (props) => {


    const handleClick = (event) =>{
        // event.preventDefault()
        //make this a class component and story from dashboard stuff here
        // toggleFromDashboard(event.target.name)
        props.history.push(event.target.name)
    }


    return (
        <div className='main-container'>

            <div className='column'>
                <div className='row'>
                    <button onClick={() => props.history.push('/favorite-jobs')} name='favorite-jobs' className='dashboard-buttons'>Favorite jobs</button>
                </div><br/>
                <div className='row'>
                    <button onClick={handleClick} className='dashboard-buttons' name='applied-key' >Applied Jobs</button>
                </div>
            </div>

            <div className='column'>
                <div className='row'>
                    <button className='dashboard-buttons'>My preferences </button>
                </div><br/>
                <div className='row'>
                    <button className='dashboard-buttons'>Update Profile</button>
                </div>
            </div>
            
        </div>
    )
}

export default withRouter(MyDashBoard) 
