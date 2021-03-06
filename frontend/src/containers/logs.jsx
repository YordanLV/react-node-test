import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchLogs } from '../actions/logs'

const LogsContainer = () => {
  const loading = useSelector(state => state.logs.loading)
  const error = useSelector(state => state.logs.error)
  const logs = useSelector(state => state.logs.logs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchLogs())
  }, [dispatch])

  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <h2>{error}</h2>
  ) : (
    <div>
      <h2>Logs</h2>
      <div>
        {logs.map(log => <div>{log.date}</div>)}
      </div>
    </div>
  )
}

export default LogsContainer;
