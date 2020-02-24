import { LOGOUT, SET_EDUCATIONS, SET_VIEW_EDUCATIONS, RESET_VIEW_EDUCATIONS} from './actionTypes'

const initialState = {
   educations: '',
   currentEducation: '',
   viewEducations: false
}

const educationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            educations: '',
            currentEducation: '',
            viewEducations: false
        }

        case SET_EDUCATIONS:
        return {
            ...state,
            educations: action.payload
        }

        case SET_VIEW_EDUCATIONS:
        return {
            ...state,
            viewEducations: true
        }

        case RESET_VIEW_EDUCATIONS:
        return{
            ...state,
            viewEducations: false
        }

        default:
        return state
    }
}

export default educationsReducer