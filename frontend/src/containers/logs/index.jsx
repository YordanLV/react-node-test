import { uid } from 'react-uid';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AwesomeDebouncePromise from 'awesome-debounce-promise'

import { fetchLogs } from '../../actions/logs'
import InfoCards from '../../component/infoCards'
import Log from '../../component/log'

const LogsContainer = () => {
  const page_size = 30;
  const [page, setPage] = useState(0)
  const [endOfPage, setEndOfPage] = useState(false)

  const loading = useSelector(state => state.logs.loading)
  const error = useSelector(state => state.logs.error)
  const logs = useSelector(state => state.logs.logs)
  const dispatch = useDispatch()

  const isBottom = (el) => {
    return el.getBoundingClientRect().bottom <= window.innerHeight + 100
  }

  const nextPage = () => {
    dispatch(fetchLogs(page + 1, page_size))
    setPage(page + 1)
  };

  const trackScrolling = () => {
    const wrappedElement = document.querySelector('body')
    if (isBottom(wrappedElement)) {
      nextPage();
      setTimeout(() => {
        setEndOfPage(true);
      }, 500);
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
      <InfoCards label="Warnings" number={totalWarnings} topPostion={10} />
      <InfoCards label="Errors" number={totalErrors} topPostion={130} />
      <InfoCards label="Infos" number={totalInfos} topPostion={250} />
      <div>
        {logs.map(log => {
          const { date, logType, warningMessage } = log
          return <Log key={uid(log)} date={date} logType={logType} warningMessage={warningMessage} />
        })}
        <div>
          {loading ? "Loading..." : endOfPage && (
            <div>=== End Of List ===</div>
          )}
        </div>
        <div>{error && error}</div>
      </div>
    </div>
  )
}

export default LogsContainer
