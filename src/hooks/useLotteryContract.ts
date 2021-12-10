import { useCallback, useEffect, useState } from 'react'
import { LotteryContract } from '../contracts/lottery'
import { web3 } from '../clients/web3'

interface ILotteryState {
  managerAddress: string
  joiners: Array<string>
  balance: string
}

const useLotteryContract = () => {
  const [lotteryState, setLotteryState] = useState<ILotteryState>({
    managerAddress: '',
    joiners: [],
    balance: '',
  })
  const [error, setError] = useState<Error | null>(null)
  const [inProgress, setInProgress] = useState(true)

  const fetch = useCallback(async () => {
    try {
      const joiners = await LotteryContract.methods.getJoiners().call()
      const balance = await web3.eth.getBalance(LotteryContract.options.address)
      const managerAddress = await LotteryContract.methods.manager().call()
      setLotteryState({
        managerAddress,
        joiners,
        balance,
      })
    } catch (e) {
      setError(e as Error)
    } finally {
      setInProgress(false)
    }
  }, [])

  const join = useCallback(
    async (value) => {
      try {
        const accounts = await web3.eth.getAccounts()
        await LotteryContract.methods.join().send({
          from: accounts[0],
          value: web3.utils.toWei(value, 'ether'),
        })
        setInProgress(false)
        setError(null)
        fetch()
      } catch (e) {
        setError(e as Error)
      } finally {
        setInProgress(false)
      }
    },
    [fetch],
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  return {
    inProgress,
    error,
    lottery: lotteryState,
    join,
  }
}

export default useLotteryContract
