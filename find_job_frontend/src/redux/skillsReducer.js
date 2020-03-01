import { LOGOUT, SET_SKILLS, SET_VIEW_SKILLS, RESET_VIEW_SKILLS, SET_CURRENT_SKILL, } from './actionTypes'

const initialState = {
   skills: '',
   currentSkill: '',
   viewSkills: false
}

const skillsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            skills: '',
            currentSkill: '',
            viewSkills: false
        }

        case SET_SKILLS:
        return {
            ...state,
            skills: action.payload
        }

        case SET_VIEW_SKILLS:
        return {
            ...state,
            viewSkills: true
        }

        case RESET_VIEW_SKILLS:
        return{
            ...state,
            viewSkills: false
        }

        case SET_CURRENT_SKILL:
        return {
            ...state,
            currentSkill: action.payload
        }

        default:
        return state
    }
}

export default skillsReducer