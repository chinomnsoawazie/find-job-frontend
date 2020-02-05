const initialState = {
    jobs: ''
  }
  
  const jobsReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REMOVE_ALL":
        return {
          ...state,
          jobs: []
        }
  
      default:
        return state
    }
  }
  
  export default jobsReducer