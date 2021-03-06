import axios from 'axios'

export const fetchLogs = () => {
  return (dispatch) => {
    dispatch(fetchLogsRequest())
    axios
      .get('http://localhost:3005/logs?page=0&page_size=5')
      .then(response => {
        const logs = response.data
        console.log(logs);
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