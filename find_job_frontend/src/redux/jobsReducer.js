import {SET_CURRENT_JOB, JOB_FROM_MY_DASHBOARD} from './actionTypes'

const initialState = {
    jobs: '',
    currentJob: '',
    jobFromMyDashboard: ''
  }
  
  const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REMOVE_ALL":
      return {
        ...state,
        jobs: []
      }

      case SET_CURRENT_JOB:
      return{
        ...state,
        currentJob: action.payload
      }

      case JOB_FROM_MY_DASHBOARD:
        return {
          ...state,
          jobFromMyDashboard: true
        }


  
      default:
        return state
    }
  }
  
  export default jobsReducer