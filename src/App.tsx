import './App.scss'
import { Status } from './components/Status'
import Logo from './components/Logo'
import Menu from './components/Menu'
import Web3Client from './clients/web3'

const App = () => {
  const topbarClasses = 'top-bar'

  const client = new Web3Client()

  return (
    <div className="App">
      <div className={topbarClasses}>
        <Logo />
        <Menu />
      </div>
      <Status client={client} />
    </div>
  )
}

export default App
