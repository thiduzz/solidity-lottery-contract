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
  const {
    lottery: {
      state: {
        inProgress: { init },
      },
    },
    web3: {
      state: { inProgressBalance },
    },
  } = useLottery()
  const [isLoading, setIsLoading] = useState(true)

  console.log('Init Layout value:' + init) // eslint-disable-line
  useEffect(() => {
    console.log(
      `Resetting load: user: ${inProgressUserSetup} balance: ${inProgressBalance} init: ${init}`,
    ) // eslint-disable-line
    setIsLoading(inProgressUserSetup || inProgressBalance || init)
  }, [inProgressUserSetup, init, inProgressBalance])

  console.log('Load:' + isLoading) // eslint-disable-line
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
