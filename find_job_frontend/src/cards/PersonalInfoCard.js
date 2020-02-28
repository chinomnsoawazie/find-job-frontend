import React from 'react'
import {connect} from 'react-redux'
import { deleteUser } from '../redux/actions'

const PersonalInfoCard = (props) => {
    const {first_name, last_name, username, email, country, state, city, age, highest_education, years_of_experience, user_id} = props

    const handleDeleteUser = () => {
        deleteUser(user_id, props.dispatch, props.push)
    }
    return (
        <>
            <div className='row job-card-row'>
                <label>
                    <strong>First name: </strong>
                </label>{first_name}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Last name: </strong>
                </label>{last_name}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Username: </strong>
                </label>{username}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Email: </strong>
                </label>{email}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Country: </strong>
                </label>{country}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>State: </strong>
                </label>{state}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>City: </strong>
                </label>{city}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Age: </strong>
                </label>{age}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Highest education: </strong>
                </label>{highest_education}
            </div>

            <div className='row job-card-row'>
                <label>
                    <strong>Years of experience: </strong>
                </label>{years_of_experience}
            </div>
            <button onClick={() => props.push('/edit-user')} className='page-buttons'>Edit personal info</button>
            <button onClick={handleDeleteUser} className='page-buttons'>Delete account</button>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        first_name: state.allUserInfo.first_name,
        last_name: state.allUserInfo.last_name,
        username: state.allUserInfo.username,
        email: state.allUserInfo.email,
        country: state.allUserInfo.country,
        state: state.allUserInfo.state,
        city: state.allUserInfo.city,
        age: state.allUserInfo.age,
        highest_education: state.allUserInfo.highest_education,
        years_of_experience: state.allUserInfo.years_of_experience,
        user_id: state.allUserInfo.user_id
    }
}

export default connect(mapStateToProps)(PersonalInfoCard)