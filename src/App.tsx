import './App.scss'
import { Status } from './components/Status'
import Logo from './components/Logo'
import Menu from './components/Menu'

const App = () => {
  const topbarClasses = 'top-bar'

  return (
    <div className="App">
      <div className={topbarClasses}>
        <Logo />
        <Menu />
      </div>

      <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700">
        <Status />
      </div>
    </div>
  )
}

export default App
