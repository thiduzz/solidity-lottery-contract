import { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { Loading, LoadingSizes, LoadingTypes } from '../components/ui/Loading'
import useLotteryContract, { ILotteryState } from '../hooks/useLotteryContract'

const throwMissingProvider: (value: string) => void = () => {
  throw new Error('The LotteryContext is missing!')
}

interface ILotteryContext {
  lottery: ILotteryState
  inProgress: boolean
  error: Error | null
  join: (address: string, value: string) => void
  fetch: () => void
}

export const LotteryContext = createContext<ILotteryContext>({
  inProgress: true,
  error: null,
  join: throwMissingProvider,
  fetch: () => {
    throw new Error('The LotteryContext is missing!')
  },
  lottery: { managerAddress: '', joiners: [] },
})

export const LotteryProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const { inProgress, error, join, fetch, lottery } = useLotteryContract()

  const state = useMemo(
    () => ({
      inProgress,
      error,
      join,
      fetch,
      lottery,
    }),
    [inProgress, error, join, fetch, lottery],
  )

  if (inProgress) {
    return (
      <Loading size={LoadingSizes.FULLSCREEN} type={LoadingTypes.GRADIENT} />
    )
  }

  return (
    <LotteryContext.Provider value={state}>{children}</LotteryContext.Provider>
  )
}

export const useLottery = () => useContext(LotteryContext)
