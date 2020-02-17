import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../redux/actions'
import {withRouter} from 'react-router-dom'


const LogOut = (props) => {
    const {first_name} = props
    
    const handleLogout = () => {
        logout(props)
    }
    
    return (
        <div  className="generic-image sign-in">
            Welcome <strong>{first_name}</strong>
        <NavLink to='/'>
            <button onClick={handleLogout} className="button" >Logout</button>
        </NavLink>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        first_name: state.allInfoOnUser.first_name
    }
}

export default connect(mapStateToProps)(withRouter(LogOut))