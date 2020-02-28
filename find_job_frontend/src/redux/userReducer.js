import { SET_USER, LOGOUT, SET_VIEW_PERSONAL_INFO, RESET_VIEW_PERSONAL_INFO} from './actionTypes'

const initialState = {
    user_id: '',
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    country: '',
    state: '',
    city: '',
    age: '',
    highest_education: '',
    years_of_experience: '',
    userCertifications: [],
    loggedIn: '',
    token: '',
    viewPersonalInfo: false,
    user: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
        let user = action.payload.user
        let token = action.payload.token
        return{
            ...state,
            user_id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            country: user.country,
            state: user.state,
            city: user.city,
            age: user.age,
            highest_education: user.highest_education,
            years_of_experience: user.years_of_experience,
            userCertifications: user.certifications,
            loggedIn: true,
            token: token,
            user: user
        }

        case LOGOUT:
        return{
            ...state,
            user_id: '',
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            country: '',
            state: '',
            city: '',
            age: '',
            highest_education: '',
            years_of_experience: '',
            userCertifications: [],
            loggedIn: '',
            token: '',
            viewPersonaInfo: false,
            user: ''
        }

        case SET_VIEW_PERSONAL_INFO:
        return{
            ...state,
            viewPersonalInfo: true
        }

        case RESET_VIEW_PERSONAL_INFO:
        return{
            ...state,
            viewPersonalInfo: false
        }

        default:
        return state
    }
}

export default userReducer