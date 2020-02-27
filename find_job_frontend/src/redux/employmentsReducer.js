import { LOGOUT, SET_EMPLOYMENTS, SET_VIEW_EMPLOYMENTS, RESET_VIEW_EMPLOYMENTS, SET_CURRENT_EMPLOYMENT} from './actionTypes'

const initialState = {
   employments: '',
   currentEmployment: '',
   viewEmployments: false
}

const employmentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            employments: '',
            currentEmployment: '',
            viewEmployments: false
        }

        case SET_EMPLOYMENTS:
        return {
            ...state,
            employments: action.payload
        }

        case SET_VIEW_EMPLOYMENTS:
        return {
            ...state,
            viewEmployments: true
        }

        case RESET_VIEW_EMPLOYMENTS:
        return{
            ...state,
            viewEmployments: false
        }

        case SET_CURRENT_EMPLOYMENT:
        return {
            ...state,
            currentEmployment: action.payload
        }

        default:
        return state
    }
}

export default employmentsReducer