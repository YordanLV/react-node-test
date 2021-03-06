import axios from 'axios'

export const fetchLogs = (page, page_Size) => {
  return (dispatch) => {
    dispatch(fetchLogsRequest())
    axios
      .get(`http://localhost:3005/logs?page=${page}&page_size=${page_Size}`)
      .then(response => {
        const logs = response.data
        dispatch(fetchLogsSuccess(logs))
      })
      .catch(error => {
        dispatch(fetchLogsFailure(error.message))
      })
  }
}

export const fetchLogsRequest = () => {
  return {
    type: 'FETCH_LOGS_REQUEST'
  }
}

export const fetchLogsSuccess = logs => {
  return {
    type: 'FETCH_LOGS_SUCCESS',
    payload: logs
  }
}

export const fetchLogsFailure = error => {
  return {
    type: 'FETCH_LOGS_FAILURE',
    payload: error
  }
}