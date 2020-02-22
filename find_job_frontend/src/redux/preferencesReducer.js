import { LOGOUT, SET_PREFERENCES, SET_CURRENT_PREFERENCE, SET_CURRENT_COUNTRY_ID, SET_CURRENT_STATE_ID, SET_CURRENT_CITY_ID, RESET_LOCATION_IDS } from './actionTypes'

const initialState = {
   preferences: '',
   currentPreference: '',
   currentCountryID: '',
   currentStateID: '',
   currentCityID: ''
}

const preferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            preferences: '',
            currentPreference: '',
            currentCountryID: '',
            currentStateID: '',
            currentCityID: ''
        }

        case SET_PREFERENCES:
        return {
            ...state,
            preferences: action.payload
        }

        case SET_CURRENT_PREFERENCE:
        return {
            ...state,
            currentPreference: action.payload
        }

        case SET_CURRENT_COUNTRY_ID:
        return {
            ...state,
            currentCountryID: action.payload
        }

        case SET_CURRENT_STATE_ID:
        return {
            ...state,
            currentStateID: action.payload
        }

        case SET_CURRENT_CITY_ID:
        return {
            ...state,
            currentCityID: action.payload
        }

        case RESET_LOCATION_IDS:
        return{
            ...state,
            currentCountryID: '',
            currentStateID: '',
            currentCityID: ''
        }

        default:
        return state
    }
}

export default preferencesReducer