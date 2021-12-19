import './App.scss'
import { LotteryProvider } from './context/LotteryContext'
import FlashMessage from './components/ui/FlashMessage'
import { FlashMessageProvider } from './context/FlashMessageContext'
import Layout from './components/Layout'

const App = () => (
  <FlashMessageProvider>
    <div className="App">
      <LotteryProvider>
        <Layout />
      </LotteryProvider>
    </div>
    <FlashMessage />
  </FlashMessageProvider>
)

export default App
