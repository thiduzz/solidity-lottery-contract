import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { Loading } from '../components/Loading'
import useLotteryContract from '../hooks/useLotteryContract'

const throwMissingProvider: (value: string) => void = () => {
  throw new Error('The LotteryContext is missing!')
}

interface ILotteryContext {
  managerAddress: string
  joiners: Array<string>
  balance: string
  inProgress: boolean
  error: Error | null
  join: (value: string) => void
}

export const LotteryContext = createContext<ILotteryContext>({
  managerAddress: '',
  joiners: [],
  balance: '',
  inProgress: true,
  error: null,
  join: throwMissingProvider,
})

export const LotteryProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const { inProgress, error, lottery, join } = useLotteryContract()

  const state = useMemo(
    () => ({ inProgress, error, join, ...lottery }),
    [inProgress, error, lottery, join],
  )

  if (inProgress) {
    return <Loading />
  }

  if (error) {
    // eslint-disable-next-line
    console.log(error)
    return <div>Whoops! 😟</div>
  }
  return (
    <LotteryContext.Provider value={state}>{children}</LotteryContext.Provider>
  )
}

export const useLottery = () => useContext(LotteryContext)
