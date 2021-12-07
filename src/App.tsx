import './App.scss'
import { GradientText } from './components/GradientText'
import Logo from './components/Logo'
import Menu from './components/Menu'

const App = () => {
  const topbarClasses = 'top-bar'
  const text = 'This is a boilerplate Tailwind project'
  return (
    <div className="App">
      <div className={topbarClasses}>
        <Logo />
        <Menu />
      </div>
      <GradientText text={text} />
    </div>
  )
}

export default App
