import { LOGOUT, SET_MEMBERSHIPS, SET_VIEW_MEMBERSHIPS, RESET_VIEW_MEMBERSHIPS, SET_CURRENT_MEMBERSHIP} from './actionTypes'

const initialState = {
   memberships: '',
   currentMembership: '',
   viewMemberships: false
}

const membershipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            memberships: '',
            currentMembership: '',
            viewMemberships: false
        }

        case SET_MEMBERSHIPS:
        return {
            ...state,
            memberships: action.payload
        }

        case SET_VIEW_MEMBERSHIPS:
        return {
            ...state,
            viewMemberships: true
        }

        case RESET_VIEW_MEMBERSHIPS:
        return {
            ...state,
            viewMemberships: false
        }

        case SET_CURRENT_MEMBERSHIP:
        return {
            ...state,
            currentMembership: action.payload
        }

        default:
        return state
    }
}

export default membershipsReducer