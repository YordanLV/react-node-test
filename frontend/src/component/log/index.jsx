import React, { memo } from 'react'
import styled from 'styled-components';

const LogWrapper = styled.div`
  padding: 0.25rem;
  &.WARNING{
    color: yellow;
  }
  &.ERROR{
    color: red;
  }
`;

const Log = ({ date, logType, warningMessage }) => {
  return (
    <LogWrapper className={logType}>
      {date} - {logType} - {warningMessage}
    </LogWrapper>
  )
}

export default memo(Log)