import './App.scss'
import Logo from './components/ui/Logo'
import Menu from './components/ui/Menu'
import { LotteryProvider } from './context/LotteryContext'
import FlashMessage from './components/ui/FlashMessage'
import { FlashMessageProvider } from './context/FlashMessageContext'
import useWeb3 from './hooks/useWeb3'
import { AppProvider } from './context/AppContext'
import ViewContainer from './components/ViewContainer'

const App = () => {
  const topbarClasses = 'top-bar'

  const { currentUser } = useWeb3()
  // eslint-disable-next-line
  console.log(currentUser)
  return (
    <AppProvider>
      <FlashMessageProvider>
        <div className="App">
          <LotteryProvider>
            <div className={topbarClasses}>
              <Logo />
              <Menu />
            </div>
            <ViewContainer />
          </LotteryProvider>
        </div>
        <FlashMessage />
      </FlashMessageProvider>
    </AppProvider>
  )
}

export default App
