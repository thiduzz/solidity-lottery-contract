import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react'
import useLotteryContract from '../hooks/useLotteryContract'
import {
  ILotteryState,
  InitialLotteryState,
  LotteryAction,
} from '../reducers/lottery'
import useWeb3, { ILotteryStateWeb3 } from '../hooks/useWeb3'
import { LotteryContract } from '../contracts/lottery'

interface ILotteryContext {
  state: ILotteryState
  stateWeb3: ILotteryStateWeb3
  dispatch: Dispatch<LotteryAction>
  actions: any
}

export const LotteryContext = createContext<ILotteryContext>({
  state: { ...InitialLotteryState },
  stateWeb3: { balance: '', inProgressBalance: false },
  dispatch: () => {},
  actions: {},
})

export const LotteryProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const { balance, inProgressBalance } = useWeb3(
    LotteryContract.options.address,
  )
  const { lottery, lotteryDispatch, actions } = useLotteryContract()

  const state = useMemo(
    () => ({
      state: lottery,
      stateWeb3: { balance, inProgressBalance },
      dispatch: lotteryDispatch,
      actions,
    }),
    [lotteryDispatch, lottery, actions, balance, inProgressBalance],
  )

  return (
    <LotteryContext.Provider value={state}>{children}</LotteryContext.Provider>
  )
}

export const useLottery = () => useContext(LotteryContext)
