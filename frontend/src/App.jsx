import { Provider } from 'react-redux'
import store from './store'
import CountriesContainer from './containers/logs'

function App() {
  return (
    <Provider store={store}>
      <CountriesContainer />
    </Provider>
  )
}

export default App