import { SET_API_KEYS, LOGOUT } from './actionTypes'

const initialState = {
    USAJobsAPIKey: '',
    Google_mapsAPIKey: '',
    myEmail: ''
}

const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_API_KEYS:
        // console.log(action.payload)
        return{
            ...state,
            USAJobsAPIKey: action.payload.USAJobsAPIKey,
            Google_mapsAPIKey: action.payload.GOOGLE_MAPS_API_KEY,
            myEmail: action.payload.myEmail
        }

        case LOGOUT:
            return{
                ...state,
                USAJobsAPIKey: '',
                Google_mapsAPIKey: '',
                myEmail: ''
            }

            default:
                return state
    }

}

export default jobsReducer