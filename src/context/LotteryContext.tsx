import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import useLotteryContract from '../hooks/useLotteryContract'
import {
  ILotteryState,
  InitialLotteryState,
  LotteryAction,
} from '../reducers/lottery'
import useWeb3 from '../hooks/useWeb3'
import { LotteryContract } from '../contracts/lottery'
import { InitialWeb3State, IWeb3State, Web3Action } from '../reducers/web3'

interface ILotteryStateContext {
  state: ILotteryState
  dispatch: Dispatch<LotteryAction>
  actions: any
}

interface IWeb3tateContext {
  state: IWeb3State
  dispatch: Dispatch<Web3Action>
  actions: any
}

interface ILotteryContext {
  lottery: ILotteryStateContext
  web3: IWeb3tateContext
}

const InitContextState = {
  lottery: {
    state: { ...InitialLotteryState },
    dispatch: () => {},
    actions: {},
  },
  web3: {
    state: { ...InitialWeb3State },
    dispatch: () => {},
    actions: {},
  },
}

export const LotteryContext = createContext<ILotteryContext>(InitContextState)

export const LotteryProvider = ({
  children,
}: PropsWithChildren<Record<never, never>>) => {
  const {
    web3: web3State,
    web3Dispatch,
    actions: webActions,
  } = useWeb3(LotteryContract.options.address)

  const {
    lottery: lotteryState,
    lotteryDispatch,
    actions: lotteryActions,
  } = useLotteryContract()

  const [state, setState] = useState<ILotteryStateContext>(
    InitContextState.lottery,
  )
  const [stateWeb3, setStateWeb3] = useState<IWeb3tateContext>(
    InitContextState.web3,
  )

  useEffect(() => {
    setState({
      state: lotteryState,
      dispatch: lotteryDispatch,
      actions: lotteryActions,
    })
    return () => {}
  }, [lotteryState, lotteryDispatch, lotteryActions])

  useEffect(() => {
    setStateWeb3({
      state: web3State,
      dispatch: web3Dispatch,
      actions: webActions,
    })
  }, [web3State, web3Dispatch, webActions])

  const contextState = useMemo<ILotteryContext>(
    () => ({ lottery: state, web3: stateWeb3 }),
    [stateWeb3, state],
  )

  return (
    <LotteryContext.Provider value={contextState}>
      {children}
    </LotteryContext.Provider>
  )
}

export const useLottery = () => useContext(LotteryContext)
