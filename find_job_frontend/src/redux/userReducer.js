const initialState = {
    user: ''
  }
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "REMOVE_ALL":
        return {
          ...state,
          user: []
        }
  
      default:
        return state
    }
  }
  
  export default userReducer