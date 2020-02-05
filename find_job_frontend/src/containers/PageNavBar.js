import React from 'react'
import logo from '../pictures/logo.png'
import searchJob from '../pictures/searchJob.png'
import notificationIcon from '../pictures/notificationIcon.png'
import Login from '../components/LogIn'
import LogOut from '../components/LogOut'
import { NavLink, withRouter } from 'react-router-dom'




const PageNavBar = (props) => {
    const {loggedIn, logOut, user} = props

    const homeDisplay = () => {

        if(loggedIn){
            props.history.push('/logged-in-options')
        }else{
            props.history.push('/')
        }
    }

    const handleNav = () => {
        props.history.push('my-dashboard')

    }


    const whatToShow = () =>{

        if(loggedIn){
          return  <header>
            <nav className='main-nav-bar' style={{ borderBottom: "solid", borderWidth: "2px", borderColor: "#929ca7", borderRadius: "30px",}}>
                    <div  className="generic-image logo"> 
                        <img src={logo} height='32' width='32'  className="logo" alt="logo"/>
                        <button onClick={homeDisplay} className="button"> Home</button>
                    </div>

                    <div  className="generic-image search-icon" >
                        <button onClick={() => props.history.push('search-jobs')} className="button"><img src={searchJob} height='32' width='32'  alt="search"/>Search Jobs</button>
                    </div>

                    <div className="generic-image sign-up">
                        <button onClick={handleNav} className="button">My Dashboard</button>
                    </div>

                   <LogOut user={user} logOut={logOut}/>
            </nav>
        </header>
        }else{

            return  <header>
            <nav className='main-nav-bar' style={{ borderBottom: "solid", borderWidth: "2px", borderColor: "#929ca7", borderRadius: "30px",}}>
                    
                    <div width='20%' className="generic-image logo"> 
                        <img src={logo} height='32' width='32'  className="logo" alt="logo"/>
                        <button onClick={() => props.history.push('/')} className="button"> Home</button>
                    </div>

                    <div  className="generic-image search-icon" >
                        <button onClick={() => props.history.push('search-jobs')} className="button"><img src={searchJob} height='32' width='32'  alt="search"/>Search Jobs</button>
                    </div>
                    
                    <div width='20%' className="generic-image sign-up">
                        <img src={notificationIcon} height='32' width='32' className="notification-icon" alt="notifications"/>
                        <button onClick={() => props.history.push('signup')} className="button">Sign Up</button>
                    </div>

                   <Login/>
            </nav>
        </header>
        }

    }
    return (
       whatToShow()
    )
}

export default withRouter(PageNavBar) 



