import React, { memo } from 'react'

const Log = ({ date, logType, warningMessage }) => {
  return (
    <div>
      {date} - {logType} - {warningMessage}
    </div>
  )
}

export default memo(Log)