
import { LOGOUT, SET_TODOS, SET_VIEW_TODO, RESET_VIEW_TODO, SET_NEW_TODO_JOB_ID, SET_CURRENT_TODO } from './actionTypes'

const initialState = {
   toDos: '',
   currentToDo: '',
   viewToDo: false,
   newToDoJobID: ''
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            toDos: '',
            currentToDo: '',
            viewToDo: false,
            newToDoJobID: ''
        }

        case SET_TODOS:
        return {
            ...state,
            toDos: action.payload
        }

        case SET_VIEW_TODO:
        return{
            ...state,
            viewToDo: true
        }

        case RESET_VIEW_TODO:
        return{
            ...state,
            viewToDo: false
        }

        case SET_NEW_TODO_JOB_ID:
        return{
            ...state,
            newToDoJobID: action.payload
        }

        case SET_CURRENT_TODO:
        return {
            ...state,
            currentToDo: action.payload
        }

        default:
        return state
    }
}

export default todoReducer