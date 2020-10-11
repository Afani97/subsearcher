import { render } from 'solid-js/dom'
import App from './components/App.jsx'
import '../src/assets/main.css'
import { addDarkModeSelector, watchDarkMode } from './dark-mode'

addDarkModeSelector()
watchDarkMode()

render(() => <App />, document.getElementById('root'))
