const initialState = {
  loading: false,
  logs: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LOGS_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_LOGS_SUCCESS':
      return {
        loading: false,
        logs: action.payload,
        error: ''
      }
    case 'FETCH_LOGS_FAILURE':
      return {
        loading: false,
        logs: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer