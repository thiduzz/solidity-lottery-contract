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
      <Status />
    </div>
  )
}

export default App
