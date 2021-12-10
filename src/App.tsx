import './App.scss'
import { Status } from './components/Status'
import Logo from './components/Logo'
import Menu from './components/Menu'
import { JoinForm } from './components/JoinForm'
import { LotteryProvider } from './context/LotteryContext'

const App = () => {
  const topbarClasses = 'top-bar'

  return (
    <div className="App">
      <LotteryProvider>
        <div className={topbarClasses}>
          <Logo />
          <Menu />
        </div>

        <div className="p-10 min-h-screen flex items-center justify-center bg-cool-gray-700 flex-col">
          <Status />
          <JoinForm />
        </div>
      </LotteryProvider>
    </div>
  )
}

export default App
