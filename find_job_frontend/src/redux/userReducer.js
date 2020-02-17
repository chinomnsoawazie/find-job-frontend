import { SET_USER, LOGOUT } from './actionTypes'

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
    userPreferences: [],
    userSkills: [],
    userMemberships: [],
    userEmployments: [],
    userEducations: [],
    userCertifications: [],
    userJobs: [],
    userNotes: [],
    userTasks: [],
    loggedIn: '',
    token: ''
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
            userPreferences: user.preferences,
            userSkills: user.skills,
            userMemberships: user.memberships,
            userEmployments: user.employments,
            userEducations: user.educations,
            userCertifications: user.certifications,
            userJobs: user.jobs,
            userNotes: user.notes,
            userTasks: user.tasks,
            loggedIn: true,
            token: token
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
            userPreferences: [],
            userSkills: [],
            userMemberships: [],
            userEmployments: [],
            userEducations: [],
            userCertifications: [],
            userJobs: [],
            userNotes: [],
            userTasks: [],
            loggedIn: '',
            token: ''
        }



            default:
                return state
    }

}

export default userReducer