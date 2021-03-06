import { Provider } from 'react-redux'

import LogsContainer from './containers/logs'
import Layout from './layout'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <LogsContainer />
      </Layout>
    </Provider>
  )
}

export default App