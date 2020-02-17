import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import logo from '../pictures/logo.png'
import searchJob from '../pictures/searchJob.png'
import { logout } from '../redux/actions'

const NavBar = (props) => {

    const {loggedIn, first_name} = props

    const homeDisplay = () =>{
        if(loggedIn){
            props.history.push('/logged-in-options')
        }else{
            props.history.push('/')
        }
    }

    const handleLogout = () => {
        logout(props)

    }
    return (
        <header>
            <nav className='nav-bar-items row' style={{  borderTop: "solid", borderBottom: "solid", borderWidth: "2px", borderColor: "#929ca7", borderRadius: "30px"}}>
                <div className='column'>
                    <img src={logo} height='32' width='32'  className="logo" alt="logo"/>
                    <button onClick={homeDisplay} className="home-button">Home</button>
                </div>

                <div  className='column'>
                    <button onClick={() => props.history.push('/search-for-jobs')} className="nav-buttons"><img src={searchJob} height='15' width='15'  alt="search"/>Search for jobs</button>
                </div>

               {loggedIn ?
               <>
                <div className='column'>
                    <button onClick={() => props.history.push('/my-dashboard')} className="nav-buttons">My Dashboard</button>
                </div>

                <div className='column'>
                    Welcome <strong>{first_name}</strong>!
                </div>

                <div className='column'>
                    <button onClick={() => props.history.push('/my-dashboard')} className="nav-buttons">View profile</button>
                </div>

                <div className='column'>
                    <button onClick={handleLogout} className="nav-buttons">logout</button>
                </div>
               </>

                :
                <>
                <div className='column'>
                    <button onClick={() => props.history.push('/login')} className="nav-buttons">Sign in</button>
                </div>
                            
                <div className='column'>
                    <button onClick={() => props.history.push('/my-dashboard')} className="nav-buttons">Sign up</button>
                </div>
                </>
            }

            </nav>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.allUserInfo.loggedIn,
        first_name: state.allUserInfo.first_name
    }
}

export default connect(mapStateToProps)(withRouter(NavBar))
