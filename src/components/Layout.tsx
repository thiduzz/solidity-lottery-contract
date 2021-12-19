import { useEffect, useState } from 'react'
import { useLottery } from '../context/LotteryContext'
import { Loading, LoadingSizes, LoadingTypes } from './ui/Loading'
import Logo from './ui/Logo'
import Menu from './ui/Menu'
import ViewContainer from './ViewContainer'
import useWeb3 from '../hooks/useWeb3'

const Layout = () => {
  const topbarClasses = 'top-bar'

  const { inProgress: inProgressUserSetup } = useWeb3()
  const { state: lotteryState, stateWeb3: lotteryStateWeb3 } = useLottery()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(
      inProgressUserSetup ||
        lotteryStateWeb3.inProgressBalance ||
        lotteryState.inProgress.init,
    )
  }, [inProgressUserSetup, lotteryState.inProgress.init, lotteryStateWeb3])

  if (isLoading) {
    return (
      <Loading size={LoadingSizes.FULLSCREEN} type={LoadingTypes.GRADIENT} />
    )
  }
  return (
    <>
      <div className={topbarClasses}>
        <Logo />
        <Menu />
      </div>
      <ViewContainer />
    </>
  )
}

export default Layout
