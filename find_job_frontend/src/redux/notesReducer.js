import { LOGOUT, SET_NOTES, SET_VIEW_NOTE, RESET_VIEW_NOTE, SET_NEW_NOTE_JOB_ID, SET_CURRENT_NOTE } from './actionTypes'

const initialState = {
   notes: '',
   currentNote: '',
   viewNote: false,
   newNoteJobID: ''
}

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT:
        return{
            ...state,
            notes: '',
            currentNote: '',
            viewNote: false,
            newNoteJobID: ''
        }

        case SET_NOTES:
        return {
            ...state,
            notes: action.payload
        }

        case SET_VIEW_NOTE:
        return{
            ...state,
            viewNote: true
        }

        case RESET_VIEW_NOTE:
        return{
            ...state,
            viewNote: false
        }

        case SET_NEW_NOTE_JOB_ID:
        return{
            ...state,
            newNoteJobID: action.payload
        }

        case SET_CURRENT_NOTE:
        return {
            ...state,
            currentNote: action.payload
        }

        default:
        return state
    }
}

export default notesReducer