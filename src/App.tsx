import './App.scss'
import { LotteryProvider } from './context/LotteryContext'
import FlashMessage from './components/ui/FlashMessage'
import { FlashMessageProvider } from './context/FlashMessageContext'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'

const App = () => (
  <AppProvider>
    <FlashMessageProvider>
      <div className="App">
        <LotteryProvider>
          <Layout />
        </LotteryProvider>
      </div>
      <FlashMessage />
    </FlashMessageProvider>
  </AppProvider>
)

export default App
