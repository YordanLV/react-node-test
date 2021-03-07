import { uid } from 'react-uid';
import { useSelector, useDispatch } from 'react-redux'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { useEffect, useState } from 'react'

import Log from '../../component/log';
import InfoCards from '../../component/infoCards'
import { fetchLogs } from '../../actions/logs'

const LogsContainer = () => {
  const page_size = 30;
  const [page, setPage] = useState(0);

  const loading = useSelector(state => state.logs.loading)
  const error = useSelector(state => state.logs.error)
  const logs = useSelector(state => state.logs.logs)
  const dispatch = useDispatch()

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight + 100
  }

  const nextPage = () => {
    dispatch(fetchLogs(page + 1, page_size))
    setPage(page + 1);
  };

  const trackScrolling = () => {
    const wrappedElement = document.querySelector('body')
    if (isBottom(wrappedElement)) {
      nextPage();
    }
  };

  const trackScrollingDebounce = AwesomeDebouncePromise(trackScrolling, 330);

  useEffect(() => {
    dispatch(fetchLogs(page, page_size))
    document.addEventListener('wheel', trackScrollingDebounce)
    return () => {
      document.removeEventListener('wheel', trackScrollingDebounce)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  const totalWarnings = logs.filter(log => log.logType === 'WARNING').length
  const totalErrors = logs.filter(log => log.logType === 'ERROR').length
  const totalInfos = logs.filter(log => log.logType === 'INFO').length

  return (
    <div>
      <h1>Logs</h1>
      <InfoCards label="Warnings" number={totalWarnings} topPostion={0} />
      <InfoCards label="Errors" number={totalErrors} topPostion={120} />
      <InfoCards label="Infos" number={totalInfos} topPostion={240} />
      <div>
        {logs.map(log => {
          const { date, logType, warningMessage } = log
          return <Log key={uid(log)} date={date} logType={logType} warningMessage={warningMessage} />
        })}
        {loading && "Loading..."}
        {error && "Error"}
      </div>
    </div>
  )
}

export default LogsContainer
