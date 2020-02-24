import { LOGOUT, SET_CERTIFICATIONS, SET_VIEW_CERTIFICATIONS, RESET_VIEW_CERTIFICATIONS} from './actionTypes'

const initialState = {
   certifications: '',
   currentCertification: '',
   viewCertifications: false
}

const certificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            certifications: '',
            currentCertification: '',
            viewCertifications: false
        }

        case SET_CERTIFICATIONS:
        return {
            ...state,
            certifications: action.payload
        }

        case SET_VIEW_CERTIFICATIONS:
        return {
            ...state,
            viewCertifications: true
        }

        case RESET_VIEW_CERTIFICATIONS:
        return{
            ...state,
            viewCertifications: false
        }

        default:
        return state
    }
}

export default certificationsReducer