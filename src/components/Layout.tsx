import { useEffect, useState } from 'react'
import { useLottery } from '../context/LotteryContext'
import { Loading, LoadingSizes, LoadingTypes } from './ui/Loading'
import Logo from './ui/Logo'
import Menu from './ui/Menu'
import ViewContainer from './ViewContainer'

const Layout = () => {
  const topbarClasses = 'top-bar'

  const {
    lottery: {
      state: {
        inProgress: { init: initProgress },
      },
    },
    web3: {
      state: {
        inProgress: { user: userProgress, balance: balanceProgress },
      },
    },
  } = useLottery()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(initProgress || userProgress || balanceProgress)
  }, [initProgress, userProgress, balanceProgress])

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
      <ViewContainer loading={isLoading} />
    </>
  )
}

export default Layout
