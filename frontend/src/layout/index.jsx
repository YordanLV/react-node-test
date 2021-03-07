import { createGlobalStyle } from 'styled-components'
import React from 'react'

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    color: #d1d1d1;
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  )
}

export default Layout
