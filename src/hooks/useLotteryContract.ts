import { useCallback, useEffect, useState } from 'react'
import { LotteryContract } from '../contracts/lottery'

export interface ILotteryState {
  managerAddress: string
  joiners: Array<string>
}

const useLotteryContract = () => {
  const [lotteryState, setLotteryState] = useState<ILotteryState>({
    managerAddress: '',
    joiners: [],
  })
  const [error, setError] = useState<Error | null>(null)
  const [inProgress, setInProgress] = useState(true)

  const fetch = useCallback(async () => {
    try {
      const joiners = await LotteryContract.methods.getJoiners().call()

      const managerAddress: Lowercase<string> = await LotteryContract.methods
        .manager()
        .call()
      setLotteryState({
        managerAddress,
        joiners,
      })
    } catch (e) {
      setError(e as Error)
    } finally {
      setInProgress(false)
    }
  }, [])

  const join = useCallback(
    async (address: string, value: string) => {
      try {
        await LotteryContract.methods.join().send({
          from: address,
          value,
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
    fetch,
  }
}

export default useLotteryContract
