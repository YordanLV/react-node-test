import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { uid } from 'react-uid';

import Log from '../component/log';
import { fetchLogs } from '../actions/logs'

const LogsContainer = () => {
  const [page, setPage] = useState(0);

  const loading = useSelector(state => state.logs.loading)
  const error = useSelector(state => state.logs.error)
  const logs = useSelector(state => state.logs.logs)
  const dispatch = useDispatch()

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  const nextPage = () => {
    dispatch(fetchLogs(page + 1, 40))
    setPage(page + 1);
  };

  const trackScrolling = () => {
    const wrappedElement = document.querySelector('body');
    if (isBottom(wrappedElement)) {
      nextPage();
    }
  };

  useEffect(() => {
    dispatch(fetchLogs(page, 40))
    document.addEventListener('scroll', trackScrolling);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, page])


  return error ? (
    <h2>{error}</h2>
  ) : (
    <div>
      <h2>Logs</h2>
      <div>
        {logs.map(log => <Log key={uid(log)} date={log.date} logType={log.logType} warningMessage={log.warningMessage} />)}
        {loading && "Loading..."}
      </div>
    </div>
  )
}

export default LogsContainer;
